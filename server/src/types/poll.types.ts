import { TPollAnswer } from './model.interface';

export type TPollOption = {
  optionId: number; // Локальный ID варианта внутри опроса.
  title: string; // Текст варианта ответа.
};
export type TPollAnswerWithUser = Pick<
  TPollAnswer,
  '_id' | 'updatedAt' | 'selectedOptionIds' | 'createdAt'
> & {
  user: TUserWithFLLZ;
};

/**
 * Данные пользователя с FirstName, LastName, Logo, ZwiftId
 */
export type TUserWithFLLZ = {
  zwiftId: number;
  firstName: string;
  lastName: string;
  imageSrc: string | null;
};
