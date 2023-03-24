export function validateUsername(register) {
  return {
    ...register('username', {
      required: 'Обязательное поле',
      minLength: { value: 5, message: 'Больше 4х символов' },
      maxLength: { value: 15, message: 'Не больше 15 символов' },
    }),
  };
}

export function validateEmail(register) {
  return {
    ...register('email', {
      required: 'Обязательное поле',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Некорректный email',
      },
    }),
  };
}

export function validatePassword(register) {
  return {
    ...register('password', {
      required: 'Обязательное поле',
      minLength: { value: 6, message: 'Больше 5ти символов' },
      maxLength: { value: 15, message: 'Не больше 15 символов' },
    }),
  };
}
