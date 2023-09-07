export function secondesToTime(seconds: number) {
  seconds = seconds / 1000;
  if (seconds > 3599) {
    const hour = Math.trunc(seconds / 3600);
    const minutes = Math.trunc((seconds - hour * 3600) / 60);
    const second = Math.trunc(seconds - hour * 3600 - minutes * 60);

    return `${addNull(hour)}:${addNull(minutes)}:${addNull(second)}`;
  }
  if (seconds < 3600) {
    const minutes = Math.trunc(seconds / 60);
    const second = Math.trunc(seconds - minutes * 60);
    return `${addNull(minutes)}:${addNull(second)}`;
  } else {
    return seconds;
  }
}
/**
 * Добавление нулей впереди для числе от 0 до 9
 */
function addNull(number: number) {
  const numberStr = String(number);
  if (numberStr.length === 1) {
    return '0' + numberStr;
  }
  if (numberStr.length === 2) {
    return numberStr;
  } else {
    return numberStr;
  }
}
