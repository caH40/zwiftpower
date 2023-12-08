import { AxiosError } from 'axios';
import { LogsErrorSchema } from '../types/model.interface.js';

/**
 * Обработка получаемого error и возврат в нужном формате
 */
export const parseError = (error: unknown): Omit<LogsErrorSchema, 'timestamp'> => {
  if (error instanceof Error) {
    const message = error?.message || 'Нет описания ошибки';
    switch (error.name) {
      // обработка ошибок Axios
      case 'AxiosError':
        if (error instanceof AxiosError) {
          if (error.response) {
            return {
              type: 'AxiosError',
              message,
              stack: error.stack,
              config: error.config,
              responseData: error.response.data,
            };
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            return { stack: error.stack, message };
          }
        }
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        return { stack: error.stack, message };

      default:
        return { stack: error.stack, message };
    }
  } else {
    return { message: 'Сгенерированная ошибка не типа Error' };
  }
};
