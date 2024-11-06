import { User } from '../../Model/User.js';
import { TResponseService } from '../../types/http.interface.js';
import { TNotifications } from '../../types/model.interface.js';
import { createNotificationLetter } from '../mail/letters/createNotificationLetter.js';
import { mailService } from '../mail/nodemailer.js';

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
  const usersDB = await User.find({ $or: conditions }, { email: true, _id: false }).lean<
    { email: string }[]
  >();

  const letter = createNotificationLetter({
    text,
    title,
    tags,
  });

  const sendAllEmails = usersDB.map((user) =>
    mailService({
      email: user.email,
      subject,
      letter,
    })
  );

  await Promise.allSettled(sendAllEmails);

  // console.log(response);

  return { data: null, message: 'Оповещение отправлено пользователям на email!' };
}
