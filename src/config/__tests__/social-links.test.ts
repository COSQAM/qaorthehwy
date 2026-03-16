import { describe, it, expect } from 'vitest';
import {
  getLinkLabel,
  getLinkAriaLabel,
  getSpeakerSlug,
  filterKeynoteSpeakers,
  linkLabelMap,
  knownLinkTypes,
} from '../social-links';

describe('getLinkLabel', () => {
  it('maps Twitter to Twitter', () => {
    expect(getLinkLabel('Twitter')).toBe('Twitter');
  });

  it('maps LinkedIn to LinkedIn', () => {
    expect(getLinkLabel('LinkedIn')).toBe('LinkedIn');
  });

  it('maps Blog to Blog', () => {
    expect(getLinkLabel('Blog')).toBe('Blog');
  });

  it('maps Company_Website to Website', () => {
    expect(getLinkLabel('Company_Website')).toBe('Website');
  });

  it('returns the raw linkType for unknown types', () => {
    expect(getLinkLabel('YouTube')).toBe('YouTube');
    expect(getLinkLabel('Mastodon')).toBe('Mastodon');
  });
});

describe('getLinkAriaLabel', () => {
  it('includes speaker name when provided', () => {
    expect(getLinkAriaLabel('LinkedIn', 'Jane Doe')).toBe("Jane Doe's LinkedIn");
  });

  it('uses friendly label with speaker name for Company_Website', () => {
    expect(getLinkAriaLabel('Company_Website', 'Jane Doe')).toBe("Jane Doe's Website");
  });

  it('returns just the label when no speaker name', () => {
    expect(getLinkAriaLabel('Twitter')).toBe('Twitter');
  });

  it('returns just the label for undefined speaker name', () => {
    expect(getLinkAriaLabel('Blog', undefined)).toBe('Blog');
  });
});

describe('getSpeakerSlug', () => {
  it('generates lowercase slug from first and last name', () => {
    expect(getSpeakerSlug('Matthew-Hope', 'Eland')).toBe('matthew-hope-eland');
  });

  it('handles already lowercase names', () => {
    expect(getSpeakerSlug('jane', 'doe')).toBe('jane-doe');
  });

  it('handles mixed case names', () => {
    expect(getSpeakerSlug('John', 'Smith')).toBe('john-smith');
  });
});

describe('filterKeynoteSpeakers', () => {
  const speakers = [
    { isTopSpeaker: true, name: 'Keynote 1' },
    { isTopSpeaker: false, name: 'Regular 1' },
    { isTopSpeaker: true, name: 'Keynote 2' },
    { isTopSpeaker: false, name: 'Regular 2' },
  ];

  it('returns only speakers with isTopSpeaker true', () => {
    const keynotes = filterKeynoteSpeakers(speakers);
    expect(keynotes).toHaveLength(2);
    expect(keynotes.every((s) => s.isTopSpeaker)).toBe(true);
  });

  it('returns empty array when no keynotes', () => {
    const noKeynotes = [
      { isTopSpeaker: false, name: 'Regular 1' },
      { isTopSpeaker: false, name: 'Regular 2' },
    ];
    expect(filterKeynoteSpeakers(noKeynotes)).toHaveLength(0);
  });

  it('returns all speakers when all are keynotes', () => {
    const allKeynotes = [
      { isTopSpeaker: true, name: 'Keynote 1' },
      { isTopSpeaker: true, name: 'Keynote 2' },
    ];
    expect(filterKeynoteSpeakers(allKeynotes)).toHaveLength(2);
  });
});

describe('linkLabelMap and knownLinkTypes', () => {
  it('knownLinkTypes matches linkLabelMap keys', () => {
    expect(knownLinkTypes).toEqual(Object.keys(linkLabelMap));
  });

  it('includes all expected link types', () => {
    expect(knownLinkTypes).toContain('Twitter');
    expect(knownLinkTypes).toContain('LinkedIn');
    expect(knownLinkTypes).toContain('Blog');
    expect(knownLinkTypes).toContain('Company_Website');
  });
});
