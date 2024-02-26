// types
import { GetRidersQuery } from '../types/http.interface.js';

export const getRidersService = async (query: GetRidersQuery) => {
  console.log(query);
};
