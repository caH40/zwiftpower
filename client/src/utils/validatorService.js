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

export function validateTelegram({ property, register }) {
  return {
    ...register(property, {
      // Регулярное выражение для проверки URL группы Telegram
      pattern: {
        value: /^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/,
        message:
          'URL должен начинаться с "https://t.me/" и содержать от 5 до 32 символов (буквы, цифры, _).',
      },
      // Проверка максимальной длины
      maxLength: {
        value: 255,
        message: 'Длина URL не должна превышать 255 символов.',
      },
    }),
  };
}

export function validateWebsite({ property, register }) {
  return {
    ...register(property, {
      pattern: {
        value: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[\w#?&%=.,;]*)?$/i,
        message: 'Введите правильный URL (например, https://example.com)',
      },
      minLength: { value: 5, message: 'Необходимо минимум 5 символов' },
      maxLength: { value: 100, message: 'Не более 100 символов' },
    }),
  };
}

/**
 * Проверяет вводимые данные для url ВКонтакте.
 */
export function validateVk({ property, register }) {
  return {
    ...register(property, {
      pattern: {
        value: /^(https?:\/\/)?(www\.)?vk\.com\/[a-zA-Z0-9_]{1,}[a-zA-Z0-9_\-.]*$/i,
        message: 'Введите правильный URL ВКонтакте (например, https://vk.com/example)',
      },
      minLength: { value: 5, message: 'Необходимо минимум 5 символов' },
      maxLength: { value: 100, message: 'Не более 100 символов' },
    }),
  };
}
