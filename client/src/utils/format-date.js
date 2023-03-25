export const formatDateToString = (date) => new Date(date).toJSON()?.split('T')[0];

export const formatDateToNumber = (date) => new Date(date).getTime();

export const getStringDate = (date) => {
  const formatter = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formatter.format(date);
};
