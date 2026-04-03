export function formatDateTime(value: string | number | Date): string {
  return new Date(value).toLocaleString();
}
