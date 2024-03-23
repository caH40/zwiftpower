import { UserResult } from '../types.interface.js';

/**
 * Интерфейс входящих аргументов ДТО для результатов райдера для страницы профиль/результаты
 */
export interface UserResultsDtoArg {
  userResults: UserResult[];

  quantityPages: number;
}
