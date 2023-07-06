export function secondesToTime(rowSeconds) {
  if (rowSeconds === null) return '';
  if (rowSeconds < 1000) return rowSeconds;
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

function addNull(rowNumber) {
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

export function gapWithStr(gap) {
  if (!gap) return gap;
  if (gap.toString().length < 4) return `+${gap}мс`;
  return `+${gap}`;
}
