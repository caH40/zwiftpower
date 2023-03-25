export function formatDateToString(date) {
  if (!date) return '2023-01-01';
  return new Date(date).toJSON().split('T')[0];
}

export function formatDateToNumber(date) {
  return new Date(date).getTime();
}

export function getStringDate(date) {
  const formatter = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formatter.format(date);
}
