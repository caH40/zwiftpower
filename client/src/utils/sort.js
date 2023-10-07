import { alphabet } from '../assets/alphabet';

/**
 * Сортировка райдеров в таблице зарегистрированных райдеров по Имени по возрастанию
 */
export const sortRidersByFirstName = (riders) => {
  return [...riders].sort((a, b) => {
    // исключение имен у которых первый символ имени не из алфавита
    if (!alphabet.includes(a.firstName[0].toLowerCase())) {
      return 1;
    }

    return a.firstName
      .toLowerCase()
      .replace(' ')
      .localeCompare(b.firstName.toLowerCase().replace(' '), 'en');
  });
};
