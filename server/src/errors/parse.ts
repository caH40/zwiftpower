// обработка получаемого error и возврат в нужном формате
export const parseError = (error: unknown): object => {
  if (error instanceof Error) {
    switch (error.name) {
      case 'MongoParseError':
        return { message: error.message, name: error.name };
      default:
        return error;
    }
  } else {
    return { message: 'Сгенерированная ошибка не типа Error' };
  }
};
