import { AxiosError } from 'axios';

/**
 * Обработка получаемого error и возврат в нужном формате
 */
export const parseError = (error: unknown): object => {
  if (error instanceof Error) {
    switch (error.name) {
      // обработка ошибок Axios
      case 'AxiosError':
        if (error instanceof AxiosError) {
          if (error.response) {
            return {
              type: 'AxiosError',
              status: error.response.status,
              response: error.response.data,
            };
          } else if (error.request) {
            // Запрос был сделан, но ответ не получен
            // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
            // http.ClientRequest в node.js
            return { stack: error.stack };
          }
        }
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        return { stack: error.stack };

      default:
        return { stack: error.stack };
    }
  } else {
    return { message: 'Сгенерированная ошибка не типа Error' };
  }
};
