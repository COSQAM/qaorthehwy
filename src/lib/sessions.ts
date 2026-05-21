export function isValidDate(dateString: string | null | undefined): boolean {
  if (!dateString) return false;
  return !isNaN(new Date(dateString).getTime());
}

export function formatTime(dateString: string | null | undefined) {
  if (!isValidDate(dateString)) return null;
  return new Date(dateString!).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatSessionTime(
  startsAt: string | null | undefined,
  endsAt: string | null | undefined,
) {
  const start = formatTime(startsAt);
  const end = formatTime(endsAt);
  if (!start || !end) return "TBA";
  return `${start} - ${end}`;
}

export function formatDuration(
  startsAt: string | null | undefined,
  endsAt: string | null | undefined,
): string | null {
  if (!isValidDate(startsAt) || !isValidDate(endsAt)) return null;
  const minutes = Math.round(
    (new Date(endsAt!).getTime() - new Date(startsAt!).getTime()) / 60000,
  );
  if (minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining} min`;
  if (remaining === 0) return `${hours}h`;
  return `${hours}h ${remaining}min`;
}

export type SessionKind = 'service' | 'keynote' | 'workshop' | 'breakout';

export interface SessionKindInput {
  startsAt?: string | null;
  endsAt?: string | null;
  isServiceSession?: boolean;
  isPlenumSession?: boolean;
}

export function getSessionKind(session: SessionKindInput): SessionKind {
  if (session.isServiceSession) return 'service';
  if (session.isPlenumSession) return 'keynote';
  if (isValidDate(session.startsAt) && isValidDate(session.endsAt)) {
    const minutes =
      (new Date(session.endsAt!).getTime() - new Date(session.startsAt!).getTime()) / 60000;
    if (minutes >= 60) return 'workshop';
  }
  return 'breakout';
}

export interface SessionConfirmation {
  isConfirmed?: boolean;
  isServiceSession?: boolean;
}

export function isSessionConfirmed(session: SessionConfirmation): boolean {
  if (session.isServiceSession) return true;
  return session.isConfirmed !== false;
}
