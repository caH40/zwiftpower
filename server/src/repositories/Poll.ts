import { PollModel } from '../Model/Poll.js';

// type
import { TPoll } from '../types/model.interface.js';

export class PollRepository {
  async create(
    poll: Omit<TPoll, '_id' | 'createdAt' | 'updatedAt' | 'creator'> & { creator: string }
  ): Promise<void> {
    await PollModel.create(poll);
  }

  async getById(pollId: string): Promise<TPoll | null> {
    return PollModel.findById(pollId).lean();
  }
}
