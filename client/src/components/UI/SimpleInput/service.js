function formatDateToString(date) {
  if (!date) return '2023-01-01';
  return new Date(date).toJSON().split('T')[0];
}

export const handlerValue = (type, value) =>
  type === 'date' ? formatDateToString(value) : value;

export const handlerNewValue = (type, e) =>
  type === 'date' ? new Date(e.target.value).getTime() : e.target.value;
