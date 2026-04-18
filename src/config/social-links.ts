/** Maps Sessionize link types to user-friendly display labels */
export const linkLabelMap: Record<string, string> = {
  Twitter: 'Twitter',
  LinkedIn: 'LinkedIn',
  Blog: 'Blog',
  Company_Website: 'Website',
};

/** Known link types that have dedicated icons */
export const knownLinkTypes = Object.keys(linkLabelMap);

/** Get the display label for a Sessionize link type */
export function getLinkLabel(linkType: string): string {
  return linkLabelMap[linkType] || linkType;
}

/** Get the aria-label for a social link */
export function getLinkAriaLabel(linkType: string, speakerName?: string): string {
  const label = getLinkLabel(linkType);
  return speakerName ? `${speakerName}'s ${label}` : label;
}

/** Filter keynote speakers from a list of speakers */
export function filterKeynoteSpeakers(speakers: Array<{ isTopSpeaker: boolean }>): typeof speakers {
  return speakers.filter((s) => s.isTopSpeaker);
}
