export function secondesToTimeThousandths(seconds: number) {
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
    return String(seconds);
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

/**
 * Добавление тысячных
 */
function addNullThousandths(number: number) {
  const numberStr = String(number);
  if (numberStr.length === 1) return '00' + numberStr;
  if (numberStr.length === 2) return '0' + numberStr;
  return numberStr;
}
