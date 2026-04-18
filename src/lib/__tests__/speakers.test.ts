import { describe, it, expect } from 'vitest';
import { speakerSlug, getCoSpeakerIds } from '../speakers';

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
