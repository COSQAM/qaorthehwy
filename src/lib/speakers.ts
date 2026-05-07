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
  isConfirmed?: boolean;
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

export function isSpeakerConfirmed(
  speakerId: string,
  sessions: SessionLike[],
): boolean {
  const ownSessions = sessions.filter((s) => s.speakers.includes(speakerId));
  if (ownSessions.length === 0) return true;
  return ownSessions.some((s) => s.isConfirmed !== false);
}
