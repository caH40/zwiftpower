import { PollAnswerModel } from '../Model/PollAnswer.js';

// type
import { TPollAnswer } from '../types/model.interface.js';

export class PollAnswerRepository {
  /**
   * Получения всех голосов для голосования с pollId.
   */
  async getAll(pollId: string): Promise<
    (Pick<TPollAnswer, '_id' | 'updatedAt' | 'selectedOptionIds' | 'createdAt'> & {
      user: { zwiftId: number };
    })[]
  > {
    return PollAnswerModel.find({ poll: pollId }, { poll: 0 })
      .populate<{ user: { zwiftId: number } }>({ path: 'user', select: ['-_id', 'zwiftId'] })
      .lean();
  }

  async update({
    pollId,
    userId,
    selectedOptionIds,
  }: {
    pollId: string;
    userId: string;
    selectedOptionIds: number[];
  }): Promise<void> {
    await PollAnswerModel.findOneAndUpdate(
      { user: userId, poll: pollId },
      { $set: { selectedOptionIds } },
      { upsert: true }
    );
  }
}
