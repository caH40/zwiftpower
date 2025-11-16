//types
import { TPollWithAnswersDto } from '../types/dto.interface';
import { TPoll } from '../types/model.interface';
import { TUserWithFLLZ } from '../types/poll.types';

export function pollWithAnswersDto(
  poll: TPoll,
  answers: {
    optionId: number;
    total: number;
    users: TUserWithFLLZ[] | null;
  }[],
  users: TUserWithFLLZ[] | null
): TPollWithAnswersDto {
  const _id = poll._id.toString();

  const startDate = poll.startDate.toString();
  const endDate = poll.endDate.toString();
  const createdAt = poll.createdAt.toString();
  const updatedAt = poll.updatedAt.toString();
  const creator = poll.creator.toString();

  return {
    ...poll,
    users,
    _id,
    pollAnswers: answers,
    creator,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  };
}
