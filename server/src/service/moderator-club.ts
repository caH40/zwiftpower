import { User } from '../Model/User.js';

/**
 * Проверка является ли userId модератором клуба в котором создается данный Эвент
 */
export const checkModeratorClub = async (
  userId: string,
  clubId: string,
  forView?: string
): Promise<void> => {
  if (!forView || forView === 'true') {
    return;
  }

  // есть ли клуб в списке модерируемых клубов у пользователя userId
  const userDB = await User.findOne({
    _id: userId,
    'moderator.clubs': clubId,
  });

  // не достаточно иметь клуб в списке модерируемых, необходимо быть еще админом или модератором
  if (!userDB || !['admin', 'moderator'].includes(userDB.role)) {
    throw new Error('У вас нет прав для редактирования/создания Эвента в данном клубе!');
  }
};
