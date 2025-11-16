import { PollRepository } from '../repositories/Poll.js';
import { PollAnswerRepository } from '../repositories/PollAnswer.js';
import { RiderRepository } from '../repositories/Rider.js';
import { pollWithAnswersDto } from '../dto/poll.js';
import { getOrThrow } from '../utils/getOrThrow.js';

// types
import { TResponseService } from '../types/http.interface.js';
import { TPoll, TPollAnswer } from '../types/model.interface.js';
import { TPollAnswerWithUser, TUserWithFLLZ } from '../types/poll.types.js';
import { TPollWithAnswersDto } from '../types/dto.interface.js';

/**
 * Класс сервиса голосование.
 * Голосования можно создавать в определенных местах, вэтих местах происходит привязка
 * по _id документа голосования из БД.
 */
export class PollService {
  private pollRepository: PollRepository = new PollRepository();
  private pollAnswerRepository: PollAnswerRepository = new PollAnswerRepository();
  private riderRepository: RiderRepository = new RiderRepository();
  constructor() {}

  /**
   * Создание голосования.
   */
  public create = async (
    poll: Omit<TPoll, '_id' | 'createdAt' | 'updatedAt' | 'creator'> & { creator: string }
  ): Promise<TResponseService<null>> => {
    await this.pollRepository.create(poll);
    return { data: null, message: 'Голосование создано.' };
  };

  /**
   * Получение голосования и голосов для него.
   */
  public getById = async (pollId: string): Promise<TResponseService<TPollWithAnswersDto>> => {
    const poll = await getOrThrow(
      this.pollRepository.getById(pollId),
      `Не найдено голосование с _id: "${pollId}"`
    );

    // Все ответы пользователей для данного голосования.
    const pollAnswers = await this.pollAnswerRepository.getAll(pollId);

    // Добавление ФИО и лого пользователя в ответ, если голосование не анонимное.
    const currentPollAnswers = await this.getCurrentPollAnswer(pollAnswers, poll.isAnonymous);

    const groupedAndSortedPollAnswers = this.groupAndSortPollAnswers(currentPollAnswers);

    // DTO;
    const afterDto = pollWithAnswersDto(poll, groupedAndSortedPollAnswers);

    return { data: afterDto, message: 'Голосование создано.' };
  };

  private groupAndSortPollAnswers = (
    pollAnswers: TPollAnswerWithUser[] | (Omit<TPollAnswerWithUser, 'user'> & { user: null })[]
  ): {
    optionId: number;
    total: number;
    users: TUserWithFLLZ[] | null;
  }[] => {
    const answers: Map<
      number,
      {
        optionId: number;
        total: number;
        users: TUserWithFLLZ[] | null;
      }
    > = new Map();

    // Подсчет голосов для каждого id.
    for (const answer of pollAnswers) {
      for (const selectedId of answer.selectedOptionIds) {
        const existing = answers.get(selectedId);

        if (existing) {
          existing.total++;

          if (existing.users && answer.user) {
            existing.users.push(answer.user);
          }
        } else {
          answers.set(selectedId, {
            optionId: selectedId,
            total: 1,
            users: answer.user ? [answer.user] : null,
          });
        }
      }
    }
    return [...answers.values()];
  };

  // Формирование ответа пользователя в зависимости анонимное голосование или нет.
  private getCurrentPollAnswer = async (
    pollAnswers: (Pick<TPollAnswer, '_id' | 'updatedAt' | 'selectedOptionIds'> & {
      user: {
        zwiftId: number;
      };
    })[],
    isAnonymous: boolean
  ): Promise<
    TPollAnswerWithUser[] | (Omit<TPollAnswerWithUser, 'user'> & { user: null })[]
  > => {
    if (!isAnonymous && pollAnswers.length > 0) {
      return await this.getPollAnswersWithUser(pollAnswers);
    }

    const res = pollAnswers.map((p) => ({
      ...p,
      user: null,
    }));

    return res;
  };

  private getPollAnswersWithUser = async (
    pollAnswers: (Pick<TPollAnswer, '_id' | 'updatedAt' | 'selectedOptionIds'> & {
      user: {
        zwiftId: number;
      };
    })[]
  ): Promise<TPollAnswerWithUser[]> => {
    const zwiftIds = pollAnswers.map((p) => p.user.zwiftId);
    const riders = await this.riderRepository.getFLs(zwiftIds);

    const ridersMap = new Map(riders.map((r) => [r.zwiftId, r]));

    const withUsers = pollAnswers.map((p) => ({
      ...p,
      user: ridersMap.get(p.user.zwiftId),
    }));

    return withUsers.filter((a): a is TPollAnswerWithUser => a.user !== undefined);
  };
}
