export function convertDate(date, time = '00:00') {
  const millisecondsInHour = 3600000;
  const millisecondsInMinute = 60000;

  const timeArr = time.split(':');
  const timeMilliseconds = timeArr[0] * millisecondsInHour + timeArr[1] * millisecondsInMinute;

  const dateArr = date.split('.');
  const dateNewFormat = [dateArr[1], dateArr[0], dateArr[2]].join('.');

  const dateMilliseconds = new Date(dateNewFormat).getTime() + timeMilliseconds;

  return dateMilliseconds;
}
// строку в милисекунды
export function convertTime(time = '00:00') {
  const millisecondsInHour = 3600000;
  const millisecondsInMinute = 60000;

  const timeArr = time.split(':');
  if (timeArr.length === 3) {
    return (
      timeArr[0] * millisecondsInHour + timeArr[1] * millisecondsInMinute + timeArr[2] * 1000
    );
  }
  if (timeArr.length === 2) {
    return timeArr[0] * millisecondsInMinute + timeArr[1] * 1000;
  }
  return false;
}
export function secondesToTime(rowSeconds) {
  if (rowSeconds === null) return '';
  let seconds = rowSeconds;
  seconds /= 1000;
  if (seconds > 3599) {
    const hour = Math.trunc(seconds / 3600);
    const minutes = Math.trunc((seconds - hour * 3600) / 60);
    const second = Math.trunc(seconds - hour * 3600 - minutes * 60);
    return `${addNull(hour)}:${addNull(minutes)}:${addNull(second)}`;
  }
  if (seconds <= 3600) {
    const minutes = Math.trunc(seconds / 60);
    const second = Math.trunc(seconds - minutes * 60);
    return `${addNull(minutes)}:${addNull(second)}`;
  } else {
    return null;
  }
}
export function secondesToMinutes(rowSeconds) {
  let seconds = rowSeconds;
  seconds /= 1000;
  if (seconds > 3599) {
    const hour = Math.trunc(seconds / 3600);
    const minutes = Math.trunc((seconds - hour * 3600) / 60);
    return minutes;
  }
  return Math.trunc(seconds / 60);
}

export function secondesToTimeThousandths(seconds) {
  if (seconds > 3599000) {
    const hour = Math.trunc(seconds / 3600000);
    const minutes = Math.trunc((seconds - hour * 3600000) / 60000);
    const second = Math.trunc((seconds - hour * 3600000 - minutes * 60000) / 1000);
    const milliseconds = seconds - hour * 3600000 - minutes * 60000 - second * 1000;
    return `${addNull(hour)}:${addNull(minutes)}:${addNull(second)}.${milliseconds}`;
  }
  if (seconds < 3600000) {
    const minutes = Math.trunc(seconds / 60000);
    const second = Math.trunc((seconds - minutes * 60000) / 1000);
    const milliseconds = seconds - minutes * 60000 - second * 1000;
    return `${addNull(minutes)}:${addNull(second)}.${milliseconds}`;
  } else {
    return seconds;
  }
}
export function addNull(rowNumber) {
  const number = String(rowNumber);
  if (number.length === 1) {
    return '0' + number;
  }
  if (number.length === 2) {
    return number;
  } else {
    return number;
  }
}
// формирование даты согласно локали 'ru'
export function getLocalDate(date, params) {
  const dateForFormat = new Date(date);
  if (!date || date === 0) return 'Дата отсутствует, проверяйте старт заезда для каждой группы';
  const formatter = new Intl.DateTimeFormat('ru', {
    year: '2-digit',
    month: ['short', 'onlyDate'].includes(params) ? 'numeric' : 'long',
    day: 'numeric',
    weekday: ['short', 'onlyDate'].includes(params) ? undefined : 'long',
    hour: ['onlyDate'].includes(params) ? undefined : '2-digit',
    minute: ['onlyDate'].includes(params) ? undefined : '2-digit',
  });
  const dateLocal = formatter.format(dateForFormat);
  return dateLocal;
}
// дата с заменой сегодняшней даты на слово 'Сегодня'
export function getToday(data) {
  const dataConverted = getLocalDate(data, 'short');
  const onlyDate = getLocalDate(Date.now(), 'onlyDate');
  return dataConverted.replace(onlyDate, 'Сегодня');
}
// дата с заменой сегодняшней даты на слово 'Сегодня'
export function getTodayTomorrow(data) {
  const dataNow = getLocalDate(data, 'onlyDate');

  const onlyDateToday = getLocalDate(Date.now(), 'onlyDate');

  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const onlyDateTomorrow = getLocalDate(Date.now() + millisecondsInDay, 'onlyDate');

  let dateStr = 'Нет даты...';

  if (dataNow === onlyDateToday) dateStr = 'Сегодня';
  if (dataNow === onlyDateTomorrow) dateStr = 'Завтра';

  return dateStr;
}

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
