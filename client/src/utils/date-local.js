// формирование даты согласно локали 'ru'
export function getTimerLocal(date, timeFormat) {
  const dateForFormat = new Date(date);
  if (!date || date === 0) return 'Дата отсутствует, проверяйте старт заезда для каждой группы';

  const formatterHourAndMinutes = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formatterHMS = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  let timeLocal = '00:00';

  if (timeFormat === 'HM') {
    timeLocal = formatterHourAndMinutes.format(dateForFormat);
  }

  if (timeFormat === 'HMS') {
    timeLocal = formatterHMS.format(dateForFormat);
  }

  return timeLocal;
}
