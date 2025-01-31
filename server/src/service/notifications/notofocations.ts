import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';
import { TNotifications } from '../../types/model.interface.js';
import { createNotificationLetter } from '../mail/letters/createNotificationLetter.js';
import { mailService } from '../mail/nodemailer.js';
import { mailUserNotification, mailPassNotification } from '../../config/environment.js';

type Params = {
  text: string;
  subject: string;
  title: string;
  notificationsTypes: TNotifications;
};

export async function postNotificationService({
  text,
  subject,
  title,
  notificationsTypes,
}: Params): Promise<TResponseService<null>> {
  // Создание массива из включенных типов имен оповещений.
  const tags = Object.entries(notificationsTypes)
    .filter(([, isEnabled]) => isEnabled) // Оставляем только включенные уведомления.
    .map(([key]) => key);

  // Создание динамического условия запроса на основе выбранных типов оповещений.
  const conditions = tags.map((tag) => ({ [`notifications.${tag}`]: true }));

  // Выполнение запроса с использованием динамического условия
  const usersDB = await User.find(
    { $or: conditions },
    { email: true, zwiftId: true, _id: false }
  ).lean<{ email: string; zwiftId: number }[]>();

  const sendAllEmails = usersDB.map((user) => {
    const letter = createNotificationLetter({
      text,
      title,
      tags,
      zwiftId: user.zwiftId,
    });

    return mailService({
      email: user.email,
      subject,
      letter,
      auth: {
        user: mailUserNotification,
        pass: mailPassNotification,
      },
    });
  });

  await Promise.allSettled(sendAllEmails);

  return { data: null, message: 'Оповещение отправлено пользователям на email!' };
}

/**
 * Формирует письмо для предварительного просмотра.
 */
export async function createNotificationLetterService({
  text,
  title,
  notificationsTypes,
}: Params): Promise<TResponseService<string>> {
  // Создание массива из включенных типов имен оповещений.
  const tags = Object.entries(notificationsTypes)
    .filter(([, isEnabled]) => isEnabled) // Оставляем только включенные уведомления.
    .map(([key]) => key);

  const letter = createNotificationLetter({
    text,
    title,
    tags,
    zwiftId: 7777777, // 7777777 - для примера
  });

  return { data: letter, message: 'Оповещение отправлено пользователям на email!' };
}
