import { formatDateToNumber, formatDateToString } from '../../../utils/format-date';

export const handlerValue = (type, value) =>
	type === 'date' ? formatDateToString(value) : value;

export const handlerNewValue = (type, e) =>
	type === 'date' ? formatDateToNumber(e.target.value) : e.target.value;
