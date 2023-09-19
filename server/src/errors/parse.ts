// обработка получаемого error и возврат в нужном формате
export const parseError = (error: unknown): object => {
  if (error instanceof Error) {
    switch (error.name) {
      default:
        return { stack: error.stack };
    }
  } else {
    return { message: 'Сгенерированная ошибка не типа Error' };
  }
};
