export function formatTime(dateString: string | null | undefined) {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleString("en-US", {
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
