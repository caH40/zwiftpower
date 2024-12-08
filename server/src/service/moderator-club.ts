import { User } from '../Model/User.js';

type Params = { userId: string; clubId: string; forView?: boolean };

/**
 * Проверка является ли userId модератором клуба в котором создается данный Эвент
 */
export const checkModeratorClub = async ({
  userId,
  clubId,
  forView,
}: Params): Promise<void> => {
  // Если forView true, то открыт к просмотру всем пользователям.
  if (forView) {
    return;
  }

  // Есть ли клуб в списке модерируемых клубов у пользователя userId.
  // !!! Почему нет дополнительной проверки наличия id пользователя в списке модераторов в документе Club???
  const userDB = await User.findOne({
    _id: userId,
    'moderator.clubs': clubId,
  });

  // Открыт доступ админам.
  if (['admin'].includes(String(userDB?.role))) {
    return;
  }

  // Достаточно иметь клуб в списке модерируемых.
  if (!userDB) {
    throw new Error('У вас нет прав для редактирования/создания Эвента в данном клубе!');
  }
};
