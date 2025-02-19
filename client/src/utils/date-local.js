/**
 * Формирование даты согласно локали 'ru'
 * @param {string | number} date дата в миллисекундах или в виде строки
 * @param {'HM' | 'HmS' | 'DDMMYYHm' | 'DDMMYYHms' | 'DDMMYY'} timeFormat формат возвращаемой даты
 * @param {boolean} long название месяца (true) или цифрами
 */
export function getTimerLocal(date, timeFormat, long) {
  const dateForFormat = new Date(date);
  if (!date || date === 0) return 'Дата отсутствует...';

  const formatterHourAndMinutes = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const formatterHmS = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const formatterDDMMYY = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: long ? 'long' : '2-digit',
    day: '2-digit',
    weekday: long && 'long',
  });
  const formatterDDMMYYYY = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const formatterDDMMYYHm = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: long ? 'long' : '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: long && 'long',
  });
  const formatterDDMMYYHms = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: long ? 'long' : '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: long && 'long',
  });

  switch (timeFormat) {
    case 'HM':
      return formatterHourAndMinutes.format(dateForFormat);
    case 'HmS':
      return formatterHmS.format(dateForFormat);
    case 'DDMMYYHm':
      return formatterDDMMYYHm.format(dateForFormat);
    case 'DDMMYYHms':
      return formatterDDMMYYHms.format(dateForFormat);
    case 'DDMMYY':
      return formatterDDMMYY.format(dateForFormat);

    default:
      return formatterDDMMYYYY.format(dateForFormat);
  }
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
    second: '2-digit',
  });
  const dateFormatted = formatter.format(dateRawNumber);

  const date = dateFormatted.slice(0, 10).split('.').reverse().join('-');
  const time = dateFormatted.slice(12);

  return { date, time };
}

// дата с заменой сегодняшней даты на слово 'Сегодня', время остается
export function getToday(data) {
  const dataConverted = getTimerLocal(data, 'DDMMYYHm');
  const onlyDate = getTimerLocal(Date.now(), 'DDMMYY');
  return dataConverted.replace(onlyDate, 'Сегодня');
}

/**
 * Если событие стартует сегодня или завтра, то возвращается соответствующее слово, иначе дата.
 */
export function getTodayTomorrow(data) {
  if (!data) {
    return 'нет даты...';
  }

  const dataNow = getTimerLocal(data, 'DDMMYY');

  const onlyDateToday = getTimerLocal(Date.now(), 'DDMMYY');

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const onlyDateTomorrow = getTimerLocal(Date.now() + millisecondsInDay, 'DDMMYY');

  let dateStr = getTimerLocal(data, 'DDMMYY');

  if (dataNow === onlyDateToday) dateStr = 'Сегодня';
  if (dataNow === onlyDateTomorrow) dateStr = 'Завтра';

  return dateStr;
}
