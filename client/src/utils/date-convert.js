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
/**
 * Получение времени из миллисекунд
 * @param {*} rowSeconds
 * @param {boolean} isShort короткая запись, с нулями с одной цифрой или без
 * @returns
 */

export function secondesToTime(rowSeconds, isShort) {
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

    if (isShort) {
      return `${minutes}:${addNull(second)}`;
    } else {
      return `${addNull(minutes)}:${addNull(second)}`;
    }
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
    return `${addNull(hour)}:${addNull(minutes)}:${addNull(second)}.${addNullThousandths(
      milliseconds
    )}`;
  }
  if (seconds < 3600000) {
    const minutes = Math.trunc(seconds / 60000);
    const second = Math.trunc((seconds - minutes * 60000) / 1000);
    const milliseconds = seconds - minutes * 60000 - second * 1000;
    return `${addNull(minutes)}:${addNull(second)}.${addNullThousandths(milliseconds)}`;
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
function addNullThousandths(number) {
  number = String(number);
  if (number.length === 1) return '00' + number;
  if (number.length === 2) return '0' + number;
  return number;
}
