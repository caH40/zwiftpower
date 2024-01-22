/**
 * Проверка наличия секунд во времени (секунды не равны нулю)
 */
export const checkSeconds = (dateRaw) => {
  const dateRawNumber = new Date(dateRaw).getTime();
  const formatterSec = new Intl.DateTimeFormat('ru', {
    second: '2-digit',
  });

  const secondsStr = formatterSec.format(dateRawNumber);

  return secondsStr === '0' || secondsStr === '00' ? false : true;
};
