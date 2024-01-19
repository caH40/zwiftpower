// формирование даты согласно локали 'ru'
type TypeTimeFormat = 'HM' | 'HmS' | 'DDMMYYHm' | 'DDMMYY' | undefined;

export function getTimerLocal(
  date: number | string,
  timeFormat: TypeTimeFormat,
  long?: string
): string {
  const dateForFormat = new Date(date);
  if (!date || date === 0) {
    return 'Дата отсутствует...';
  }

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
    month: '2-digit',
    day: '2-digit',
    weekday: long ? 'long' : undefined,
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
    weekday: long ? 'long' : undefined,
  });

  switch (timeFormat) {
    case 'HM':
      return formatterHourAndMinutes.format(dateForFormat);
    case 'HmS':
      return formatterHmS.format(dateForFormat);
    case 'DDMMYYHm':
      return formatterDDMMYYHm.format(dateForFormat);
    case 'DDMMYY':
      return formatterDDMMYY.format(dateForFormat);

    default:
      return formatterDDMMYYYY.format(dateForFormat);
  }
}
