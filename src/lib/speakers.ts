export interface SpeakerLike {
  firstName: string;
  lastName: string;
}

export function speakerSlug(speaker: SpeakerLike) {
  return `${speaker.firstName}-${speaker.lastName}`
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export interface SessionLike {
  speakers: string[];
}

export function getCoSpeakerIds(
  sessions: SessionLike[],
  currentSpeakerId: string,
) {
  return Array.from(
    new Set(
      sessions
        .flatMap((s) => s.speakers)
        .filter((id) => id !== currentSpeakerId),
    ),
  );
}
