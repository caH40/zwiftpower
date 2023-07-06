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
function addNull(number) {
  number = String(number);
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
