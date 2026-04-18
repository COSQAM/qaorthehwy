import { describe, it, expect } from 'vitest';
import { formatTime, formatSessionTime } from '../sessions';

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
