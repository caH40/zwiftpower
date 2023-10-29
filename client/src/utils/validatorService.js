export function validateUsername(register) {
  return {
    ...register('username', {
      required: 'Обязательное поле',
      pattern: {
        value: /^[a-z0-9_.-@]+$/i,
        message: 'Разрешены a-Z 0-9 Символы . _ - @',
      },
      minLength: { value: 4, message: 'Больше 3х символов' },
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
      maxLength: { value: 20, message: 'Не больше 20 символов' },
    }),
  };
}
