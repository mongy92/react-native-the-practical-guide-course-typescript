export function formatDateYYYYMMDD(date: Date) {
  return date.toISOString().slice(0, 10);
}
