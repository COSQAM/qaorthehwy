import { describe, it, expect } from 'vitest';
import {
  formatTime,
  formatSessionTime,
  isSessionConfirmed,
  formatDuration,
  getSessionKind,
} from '../sessions';

describe('formatTime', () => {
  it('returns null for null/undefined/empty', () => {
    expect(formatTime(null)).toBeNull();
    expect(formatTime(undefined)).toBeNull();
    expect(formatTime('')).toBeNull();
  });

  it('returns null for invalid date strings', () => {
    expect(formatTime('not-a-date')).toBeNull();
  });

  it('formats a valid ISO date string in en-US hour:minute AM/PM', () => {
    const out = formatTime('2026-06-12T09:30:00');
    expect(out).toMatch(/^\d{1,2}:\d{2}\s?(AM|PM)$/);
  });
});

describe('formatSessionTime', () => {
  it('returns "TBA" when both times are null', () => {
    expect(formatSessionTime(null, null)).toBe('TBA');
  });

  it('returns "TBA" when either time is missing', () => {
    expect(formatSessionTime('2026-06-12T09:30:00', null)).toBe('TBA');
    expect(formatSessionTime(null, '2026-06-12T10:20:00')).toBe('TBA');
  });

  it('returns "TBA" when either time is invalid', () => {
    expect(formatSessionTime('not-a-date', '2026-06-12T10:20:00')).toBe('TBA');
  });

  it('joins start and end with " - " when both are valid', () => {
    const out = formatSessionTime('2026-06-12T09:30:00', '2026-06-12T10:20:00');
    expect(out).toMatch(/^\d{1,2}:\d{2}\s?(AM|PM) - \d{1,2}:\d{2}\s?(AM|PM)$/);
  });
});

describe('isSessionConfirmed', () => {
  it('returns true when isConfirmed is true', () => {
    expect(isSessionConfirmed({ isConfirmed: true })).toBe(true);
  });

  it('returns true when isConfirmed is missing', () => {
    expect(isSessionConfirmed({})).toBe(true);
  });

  it('returns true when isConfirmed is undefined', () => {
    expect(isSessionConfirmed({ isConfirmed: undefined })).toBe(true);
  });

  it('returns false when isConfirmed is false', () => {
    expect(isSessionConfirmed({ isConfirmed: false })).toBe(false);
  });

  it('returns true for service sessions even when isConfirmed is false', () => {
    // Sessionize sets isConfirmed=false on breaks, lunch, etc. — they have no speaker to confirm.
    expect(isSessionConfirmed({ isConfirmed: false, isServiceSession: true })).toBe(true);
  });
});

describe('formatDuration', () => {
  it('returns null for invalid start or end', () => {
    expect(formatDuration(null, '2026-06-12T09:50:00')).toBeNull();
    expect(formatDuration('2026-06-12T09:00:00', null)).toBeNull();
    expect(formatDuration('not-a-date', '2026-06-12T09:50:00')).toBeNull();
  });

  it('returns null when end is not after start', () => {
    expect(formatDuration('2026-06-12T09:00:00', '2026-06-12T09:00:00')).toBeNull();
    expect(formatDuration('2026-06-12T09:50:00', '2026-06-12T09:00:00')).toBeNull();
  });

  it('formats sub-hour durations as "N min"', () => {
    expect(formatDuration('2026-06-12T09:00:00', '2026-06-12T09:50:00')).toBe('50 min');
    expect(formatDuration('2026-06-12T08:50:00', '2026-06-12T09:00:00')).toBe('10 min');
  });

  it('formats exact-hour durations as "Nh"', () => {
    expect(formatDuration('2026-06-12T09:00:00', '2026-06-12T11:00:00')).toBe('2h');
    expect(formatDuration('2026-06-12T12:50:00', '2026-06-12T13:50:00')).toBe('1h');
  });

  it('formats hour+minute durations as "Nh Mmin"', () => {
    expect(formatDuration('2026-06-12T11:50:00', '2026-06-12T13:00:00')).toBe('1h 10min');
    expect(formatDuration('2026-06-12T09:00:00', '2026-06-12T12:00:00')).toBe('3h');
  });
});

describe('getSessionKind', () => {
  it('returns "service" for service sessions regardless of other flags', () => {
    expect(getSessionKind({ isServiceSession: true, isPlenumSession: true })).toBe('service');
    expect(getSessionKind({
      isServiceSession: true,
      startsAt: '2026-06-12T11:50:00',
      endsAt: '2026-06-12T13:00:00',
    })).toBe('service');
  });

  it('returns "keynote" for plenary non-service sessions', () => {
    expect(getSessionKind({
      isPlenumSession: true,
      startsAt: '2026-06-12T08:00:00',
      endsAt: '2026-06-12T08:50:00',
    })).toBe('keynote');
  });

  it('returns "workshop" for non-plenary non-service sessions >= 60 min', () => {
    expect(getSessionKind({
      startsAt: '2026-06-12T09:00:00',
      endsAt: '2026-06-12T12:00:00',
    })).toBe('workshop');
    expect(getSessionKind({
      startsAt: '2026-06-12T12:50:00',
      endsAt: '2026-06-12T13:50:00',
    })).toBe('workshop');
  });

  it('returns "breakout" for sub-hour non-plenary non-service sessions', () => {
    expect(getSessionKind({
      startsAt: '2026-06-12T09:00:00',
      endsAt: '2026-06-12T09:50:00',
    })).toBe('breakout');
  });

  it('returns "breakout" when times are missing', () => {
    expect(getSessionKind({})).toBe('breakout');
  });
});
