export const formatDateToString = date => new Date(date).toJSON()?.split('T')[0];

export const formatDateToNumber = date => new Date(date).getTime();
