import { PollRepository } from '../repositories/Poll.js';

// types
import { TResponseService } from '../types/http.interface.js';
import { TPoll } from '../types/model.interface.js';

/**
 * Класс сервиса голосование.
 */
export class PollService {
  private pollRepository: PollRepository = new PollRepository();
  constructor() {}

  public create = async (
    poll: Omit<TPoll, '_id' | 'createdAt' | 'updatedAt' | 'creator'> & { creator: string }
  ): Promise<TResponseService<null>> => {
    await this.pollRepository.create(poll);
    return { data: null, message: 'Голосование создано.' };
  };
}
