export function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  }).format(date);
}
