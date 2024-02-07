import { Club } from '../Model/Club.js';
import { User } from '../Model/User.js';

/**
 * Проверка является ли userId модератором клуба в котором создается данный Эвент
 */
export const checkModeratorClub = async (userId: string, clubId: string): Promise<void> => {
  const clubDB = await Club.findOne({ id: clubId }, { id: true }).lean();

  if (!clubDB) {
    throw new Error(`Не найден клуб "${clubId}" в котором создается заезд!`);
  }

  const userDB = await User.findOne({
    _id: userId,
    'moderator.clubs': clubDB._id,
  });

  if (!userDB) {
    throw new Error('У вас нет прав для редактирования/создания Эвента в данном клубе!');
  }
};
