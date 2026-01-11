/**
 * Описание возможных причин дисквалификации
 */
export const dsqValues = [
  { type: 'VIRTUAL_POWER', label: 'VP' },
  { type: 'DSQ', label: 'DSQ' },
  { type: 'OFF_RECORD', label: 'OFR' }, // выступают вне зачета заезда
  { type: 'DNF', label: 'DNF' },
  { type: 'FINISH_TIME_LIMIT', label: 'LMT' }, // не уложился в лимит времени
];
