// формирование даты согласно локали 'ru'
export function getTimerLocal(date, timeFormat, long) {
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
  const formatterYMD = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: long ? 'long' : '2-digit',
    day: '2-digit',
    weekday: long && 'long',
  });
  const formatterYMDHM = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: long ? 'long' : '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: long && 'long',
  });

  let timeLocal = '00:00';

  if (timeFormat === 'HM') {
    timeLocal = formatterHourAndMinutes.format(dateForFormat);
  }

  if (timeFormat === 'HMS') {
    timeLocal = formatterHMS.format(dateForFormat);
  }

  if (timeFormat === 'YMDHM') {
    timeLocal = formatterYMDHM.format(dateForFormat);
  }

  if (timeFormat === 'YMD') {
    timeLocal = formatterYMD.format(dateForFormat);
  }

  return timeLocal;
}

// формирование времени и даты для input
export function getDateTimeStart(dateRaw) {
  const dateRawNumber = new Date(dateRaw).getTime();
  const formatter = new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateFormatted = formatter.format(dateRawNumber);
  const date = dateFormatted.slice(0, 10).split('.').reverse().join('-');
  const time = dateFormatted.slice(12);

  return { date, time };
}

// дата с заменой сегодняшней даты на слово 'Сегодня', время остается
export function getToday(data) {
  const dataConverted = getTimerLocal(data, 'YMDHM');
  const onlyDate = getTimerLocal(Date.now(), 'YMD');
  return dataConverted.replace(onlyDate, 'Сегодня');
}

// замена даты на слово 'Завтра' или 'Сегодня'
export function getTodayTomorrow(data) {
  const dataNow = getTimerLocal(data, 'YMD');

  const onlyDateToday = getTimerLocal(Date.now(), 'YMD');

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const onlyDateTomorrow = getTimerLocal(Date.now() + millisecondsInDay, 'YMD');

  let dateStr = 'Нет даты...';

  if (dataNow === onlyDateToday) dateStr = 'Сегодня';
  if (dataNow === onlyDateTomorrow) dateStr = 'Завтра';

  return dateStr;
}
