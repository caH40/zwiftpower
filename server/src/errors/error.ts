// import { nodeEnvType } from '../config/environment.js';
// import { logError } from '../logger/logger.js';
// import { ignoreError } from './ignore.js';
// import { parseError } from './parse.js';

export const errorHandler = (error: unknown): void => {
  if (error instanceof Error) {
    console.log(error.message); //eslint-disable-line
  }

  // try {
  //   // выход, если ошибка из списка игнорируемых
  //   if (ignoreError(error)) {
  //     return;
  //   }
  //   // если разработка, то выводить ошибку в консоль
  //   if (nodeEnvType === 'development') {
  //     console.log(error); // eslint-disable-line
  //   }

  //   const errorParsed = parseError(error);

  //   // логирование ошибки
  //   logError(errorParsed);
  // } catch (error) {
  //   console.log(error); // eslint-disable-line
  // }
};
