/**
 * Проверка наличия секунд во времени (секунды не равны нулю)
 */
export const checkSeconds = (dateRaw) => {
  const dateRawNumber = new Date(dateRaw).getTime();
  const formatterSec = new Intl.DateTimeFormat('ru', {
    second: '2-digit',
  });

  return formatterSec.format(dateRawNumber) !== '0' ? true : false;
};
