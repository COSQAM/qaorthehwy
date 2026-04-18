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
