// types
import { UserResultFetch } from '../common/types/userResults.interface.js';
import { UserResultsDtoArg } from '../types/dto_inner/userResults.interface.js';
import { UserResult } from '../types/types.interface.js';

//
// подготовка данных мощности определенного райдера для страницы профайл/мощность для контроллера
export const userResultsDto = ({ userResults, quantityPages }: UserResultsDtoArg) => {
  const userResultsForResponse: UserResult[] = [...userResults];

  const userResultFetch: UserResultFetch = {
    userResults: userResultsForResponse,
    quantityPages,
    message: 'Результаты райдера',
  };

  return userResultFetch;
};
