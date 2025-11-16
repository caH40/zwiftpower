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
  }[]
): TPollWithAnswersDto {
  const _id = poll._id.toString();

  return { ...poll, _id, pollAnswers: answers };
}
