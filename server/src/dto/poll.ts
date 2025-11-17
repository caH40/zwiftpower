//types
import { TPollWithAnswersDto } from '../types/dto.interface';
import { TPoll } from '../types/model.interface';
import { TUserAnonymized, TUserWithFLLZ } from '../types/poll.types';

export function pollWithAnswersDto(
  poll: TPoll,
  answers: {
    optionId: number;
    total: number;
    users: (TUserWithFLLZ | TUserAnonymized)[];
  }[],
  users: (TUserWithFLLZ | TUserAnonymized)[],
  isUserAnswered: boolean
): TPollWithAnswersDto {
  const _id = poll._id.toString();

  const startDate = poll.startDate.toISOString();
  const endDate = poll.endDate.toISOString();
  const createdAt = poll.createdAt.toISOString();
  const updatedAt = poll.updatedAt.toISOString();
  const creator = poll.creator.toString();

  return {
    ...poll,
    users,
    _id,
    pollAnswers: answers,
    creator,
    isUserAnswered,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  };
}
