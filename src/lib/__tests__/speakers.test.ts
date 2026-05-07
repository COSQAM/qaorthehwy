import { describe, it, expect } from 'vitest';
import { speakerSlug, getCoSpeakerIds, isSpeakerConfirmed } from '../speakers';

describe('speakerSlug', () => {
  it('lowercases first and last name joined by a dash', () => {
    expect(speakerSlug({ firstName: 'Jenna', lastName: 'Charlton' })).toBe(
      'jenna-charlton',
    );
  });

  it('normalizes already-lowercase names', () => {
    expect(speakerSlug({ firstName: 'andrew', lastName: 'knight' })).toBe(
      'andrew-knight',
    );
  });

  it('preserves non-ASCII characters', () => {
    expect(speakerSlug({ firstName: 'Ashley', lastName: 'René' })).toBe(
      'ashley-rené',
    );
  });

  it('replaces whitespace inside firstName or lastName with hyphens', () => {
    // Sessionize allows multi-word firstName; keep the URL slug URL-safe.
    expect(
      speakerSlug({ firstName: 'Ashley René', lastName: 'Casey' }),
    ).toBe('ashley-rené-casey');
    expect(
      speakerSlug({ firstName: 'Mary', lastName: 'Van Der Berg' }),
    ).toBe('mary-van-der-berg');
  });

  it('collapses repeated internal whitespace', () => {
    expect(
      speakerSlug({ firstName: 'Jane   Q', lastName: 'Public' }),
    ).toBe('jane-q-public');
  });
});

describe('getCoSpeakerIds', () => {
  const sessionSolo = { speakers: ['alpha'] };
  const sessionDual = { speakers: ['alpha', 'beta'] };
  const sessionOtherDual = { speakers: ['alpha', 'gamma'] };

  it('returns empty array when the speaker has only solo sessions', () => {
    expect(getCoSpeakerIds([sessionSolo], 'alpha')).toEqual([]);
  });

  it('returns the co-speaker id for a dual session', () => {
    expect(getCoSpeakerIds([sessionDual], 'alpha')).toEqual(['beta']);
  });

  it('excludes the current speaker from the result', () => {
    const ids = getCoSpeakerIds([sessionDual], 'alpha');
    expect(ids).not.toContain('alpha');
  });

  it('dedupes co-speakers across multiple sessions', () => {
    const ids = getCoSpeakerIds(
      [sessionDual, sessionDual, sessionOtherDual],
      'alpha',
    );
    expect(ids.sort()).toEqual(['beta', 'gamma']);
  });

  it('works when the current speaker is only listed in some sessions', () => {
    const ids = getCoSpeakerIds(
      [{ speakers: ['alpha', 'beta'] }, { speakers: ['beta', 'gamma'] }],
      'beta',
    );
    expect(ids.sort()).toEqual(['alpha', 'gamma']);
  });
});

describe('isSpeakerConfirmed', () => {
  it('returns true when the speaker has no sessions (preserves visibility for unscheduled keynotes)', () => {
    expect(isSpeakerConfirmed('alpha', [])).toBe(true);
    expect(
      isSpeakerConfirmed('alpha', [{ speakers: ['beta'], isConfirmed: false }]),
    ).toBe(true);
  });

  it('returns true when the speaker has one confirmed session', () => {
    expect(
      isSpeakerConfirmed('alpha', [
        { speakers: ['alpha'], isConfirmed: true },
      ]),
    ).toBe(true);
  });

  it('returns true when isConfirmed is missing on the speaker session', () => {
    // Treat absent flag as confirmed, matching isSessionConfirmed.
    expect(isSpeakerConfirmed('alpha', [{ speakers: ['alpha'] }])).toBe(true);
  });

  it('returns false when the speaker has only one unconfirmed session', () => {
    expect(
      isSpeakerConfirmed('alpha', [
        { speakers: ['alpha'], isConfirmed: false },
      ]),
    ).toBe(false);
  });

  it('returns true when the speaker has a mix of confirmed and unconfirmed sessions', () => {
    expect(
      isSpeakerConfirmed('alpha', [
        { speakers: ['alpha'], isConfirmed: false },
        { speakers: ['alpha'], isConfirmed: true },
      ]),
    ).toBe(true);
  });

  it('returns false when the speaker has multiple sessions all unconfirmed', () => {
    expect(
      isSpeakerConfirmed('alpha', [
        { speakers: ['alpha'], isConfirmed: false },
        { speakers: ['alpha', 'beta'], isConfirmed: false },
      ]),
    ).toBe(false);
  });

  it('ignores sessions belonging only to other speakers', () => {
    expect(
      isSpeakerConfirmed('alpha', [
        { speakers: ['beta'], isConfirmed: false },
        { speakers: ['alpha'], isConfirmed: true },
      ]),
    ).toBe(true);
  });
});
