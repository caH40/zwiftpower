import logErrorSlice from '../features/api/logErrorSlice';
import logsAdminsSlice from '../features/api/logsAdminsSlice';
import logsErrorsSlice from '../features/api/logsErrorsSlice';
import logDeleteSlice from '../features/api/logDeleteSlice';

export const logsReducers = {
  logsAdmins: logsAdminsSlice,
  logsErrors: logsErrorsSlice,
  logError: logErrorSlice,
  logErrorDelete: logDeleteSlice,
};
