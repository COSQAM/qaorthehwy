import { describe, it, expect } from 'vitest';
import { normalizeLineTerminators } from '../sanitize.mjs';

describe('normalizeLineTerminators', () => {
  it('passes through primitives unchanged', () => {
    expect(normalizeLineTerminators(null)).toBeNull();
    expect(normalizeLineTerminators(undefined)).toBeUndefined();
    expect(normalizeLineTerminators(42)).toBe(42);
    expect(normalizeLineTerminators(true)).toBe(true);
  });

  it('leaves regular strings untouched', () => {
    expect(normalizeLineTerminators('hello world')).toBe('hello world');
    expect(normalizeLineTerminators('line 1\nline 2')).toBe('line 1\nline 2');
    expect(normalizeLineTerminators('line 1\r\nline 2')).toBe('line 1\r\nline 2');
  });

  it('replaces U+2028 (LINE SEPARATOR) with \\n', () => {
    expect(normalizeLineTerminators('a\u2028b')).toBe('a\nb');
  });

  it('replaces U+2029 (PARAGRAPH SEPARATOR) with \\n', () => {
    expect(normalizeLineTerminators('a\u2029b')).toBe('a\nb');
  });

  it('replaces U+0085 (NEXT LINE) with \\n', () => {
    expect(normalizeLineTerminators('a\u0085b')).toBe('a\nb');
  });

  it('replaces U+000B (VERTICAL TAB) with \\n', () => {
    expect(normalizeLineTerminators('a\u000Bb')).toBe('a\nb');
  });

  it('replaces U+000C (FORM FEED) with \\n', () => {
    expect(normalizeLineTerminators('a\u000Cb')).toBe('a\nb');
  });

  it('replaces multiple occurrences in one string', () => {
    expect(normalizeLineTerminators('a\u2028b\u2029c\u0085d')).toBe('a\nb\nc\nd');
  });

  it('recurses into arrays', () => {
    expect(normalizeLineTerminators(['a\u2028b', 'plain', 'c\u2029d'])).toEqual([
      'a\nb',
      'plain',
      'c\nd',
    ]);
  });

  it('recurses into objects', () => {
    const input = {
      description: 'first\u2028line',
      nested: { bio: 'x\u2029y' },
      count: 3,
    };
    expect(normalizeLineTerminators(input)).toEqual({
      description: 'first\nline',
      nested: { bio: 'x\ny' },
      count: 3,
    });
  });

  it('does not mutate the input object', () => {
    const input = { bio: 'a\u2028b' };
    const result = normalizeLineTerminators(input);
    expect(input.bio).toBe('a\u2028b');
    expect(result.bio).toBe('a\nb');
  });

  it('handles arrays of objects (Sessionize session shape)', () => {
    const input = [
      { id: '1', description: 'para\u2028break', speakers: ['a'] },
      { id: '2', description: 'nothing', speakers: ['b'] },
    ];
    const result = normalizeLineTerminators(input);
    expect(result[0].description).toBe('para\nbreak');
    expect(result[1].description).toBe('nothing');
    expect(result[0].speakers).toEqual(['a']);
  });
});
