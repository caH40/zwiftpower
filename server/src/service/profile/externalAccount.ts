// types
import { TExternalService } from '../../types/types.interface';

type Params = {
  userId: string;
  service: TExternalService;
  accountId: number;
};

export async function putExternalAccountService({
  userId,
  service,
  accountId,
}: Params): Promise<void> {
  console.log({ userId, service, accountId });
  // const userDB: { notifications: TNotifications } | null = await User.findOne(
  //   { zwiftId },
  //   { notifications: true, _id: false }
  // ).lean();

  // if (!userDB) {
  //   throw new Error(`Не найден пользователь с zwiftId:${zwiftId} в БД!`);
  // }

  // const data = { notifications: userDB.notifications || notificationDefault, zwiftId };

  // const message = 'Данные по параметрам оповещений для пользователя.';
}
