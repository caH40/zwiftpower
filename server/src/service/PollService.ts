import { PollRepository } from '../repositories/Poll.js';
import { PollAnswerRepository } from '../repositories/PollAnswer.js';
import { RiderRepository } from '../repositories/Rider.js';
import { pollWithAnswersDto } from '../dto/poll.js';
import { getOrThrow } from '../utils/getOrThrow.js';

// types
import { TResponseService } from '../types/http.interface.js';
import { TPoll, TPollAnswer } from '../types/model.interface.js';
import { TPollAnswerWithUser, TUserAnonymized, TUserWithFLLZ } from '../types/poll.types.js';
import { TPollWithAnswersDto } from '../types/dto.interface.js';
import { UserRepository } from '../repositories/User.js';
import { getTimerLocal } from '../utils/date-local.js';

/**
 * Класс сервиса голосование.
 * Голосования можно создавать в определенных местах, вэтих местах происходит привязка
 * по _id документа голосования из БД.
 */
export class PollService {
  private pollRepository: PollRepository = new PollRepository();
  private pollAnswerRepository: PollAnswerRepository = new PollAnswerRepository();
  private riderRepository: RiderRepository = new RiderRepository();
  private userRepository: UserRepository = new UserRepository();
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
  public getById = async (
    pollId: string,
    userId?: string // _id пользователя, если запрос приходит от авторизованного.
  ): Promise<TResponseService<TPollWithAnswersDto>> => {
    const poll = await getOrThrow(
      this.pollRepository.getById(pollId),
      `Не найдено голосование с _id: "${pollId}"`
    );

    // Все ответы пользователей для данного голосования.
    const pollAnswers = await this.pollAnswerRepository.getAll(pollId);

    // Добавление ФИО и лого пользователя в ответ, если голосование не анонимное.
    const currentPollAnswers = await this.getPollAnswersWithUser(pollAnswers);

    const groupedAndSortedPollAnswers = this.groupAndSortPollAnswers(currentPollAnswers);

    const isUserAnswered = userId ? await this.isUserAnswered(userId, pollAnswers) : false;

    const { zwiftId } = userId
      ? await getOrThrow(this.userRepository.getZwiftId(userId))
      : { zwiftId: undefined };

    // Обезличивание если голосование анонимное.
    const finalPollAnswers = poll.isAnonymous
      ? this.setAnonymous(groupedAndSortedPollAnswers, zwiftId)
      : groupedAndSortedPollAnswers;

    // Массив всех проголосовавших пользователей, отсортированных по дате голосования.
    const allUsers = this.getAllUsers(currentPollAnswers, poll.isAnonymous, zwiftId);

    // DTO;
    const afterDto = pollWithAnswersDto(poll, finalPollAnswers, allUsers, isUserAnswered);

    return { data: afterDto, message: 'Запрашиваемое голосование' };
  };

  /**
   * Сохранение данных как проголосовал пользователь.
   */
  public createUserPollAnswers = async ({
    pollId,
    userId,
    selectedOptionIds,
  }: {
    pollId: string;
    userId: string;
    selectedOptionIds: number[];
  }): Promise<TResponseService<TPollWithAnswersDto>> => {
    const poll = await getOrThrow(
      this.pollRepository.getById(pollId),
      `Не найдено голосование с _id: "${pollId}"`
    );
    const now = new Date();
    if (now < poll.startDate) {
      throw new Error(
        `Голосование начнется ${getTimerLocal(poll.startDate.toString(), 'DDMMYYYY')}`
      );
    }
    if (poll.endDate < now) {
      throw new Error(
        `Голосование завершилось ${getTimerLocal(poll.endDate.toString(), 'DDMMYYYY')}`
      );
    }
    await this.pollAnswerRepository.update({ pollId, userId, selectedOptionIds });

    const response = await this.getById(pollId, userId);

    return { data: response.data, message: 'Данные голосования успешно сохранены!' };
  };

  /**
   * Проверяется проголосовал ли авторизованный пользователь нет.
   */
  private isUserAnswered = async (
    userId: string,
    pollAnswers: (Pick<TPollAnswer, '_id' | 'createdAt' | 'updatedAt' | 'selectedOptionIds'> & {
      user: {
        zwiftId: number;
      };
    })[]
  ): Promise<boolean> => {
    const { zwiftId } = await getOrThrow(this.userRepository.getZwiftId(userId));

    return pollAnswers.some((a) => a.user.zwiftId === zwiftId);
  };

  private getAllUsers = (
    pollAnswers:
      | TPollAnswerWithUser[]
      | (Omit<TPollAnswerWithUser, 'user'> & {
          user: null;
        })[],
    isAnonymous: boolean,
    userZwiftId?: number
  ): (TUserWithFLLZ | TUserAnonymized)[] => {
    const usersFiltered = pollAnswers
      .filter((a): a is TPollAnswerWithUser => a.user !== null)
      .toSorted((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const users = [...new Map(usersFiltered.map((a) => [a.user.zwiftId, a.user])).values()];

    if (isAnonymous) {
      return users.map((u) => {
        if (u.zwiftId === userZwiftId) {
          return u;
        } else {
          return { zwiftId: null, firstName: null, lastName: null, imageSrc: null };
        }
      });
    }

    return users;
  };

  private groupAndSortPollAnswers = (
    pollAnswers: TPollAnswerWithUser[]
  ): {
    optionId: number;
    total: number;
    users: TUserWithFLLZ[];
  }[] => {
    const answers: Map<
      number,
      {
        optionId: number;
        total: number;
        users: TUserWithFLLZ[];
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
            users: [answer.user],
          });
        }
      }
    }
    return [...answers.values()];
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

  /**
   * Обезличивание данных.
   */
  private setAnonymous = (
    pollAnswers: {
      optionId: number;
      total: number;
      users: TUserWithFLLZ[];
    }[],
    zwiftId?: number
  ): {
    optionId: number;
    total: number;
    users: (TUserWithFLLZ | TUserAnonymized)[];
  }[] => {
    return pollAnswers.map((a) => {
      const users = a.users.map((u) =>
        u.zwiftId === zwiftId
          ? u
          : { zwiftId: null, firstName: null, lastName: null, imageSrc: null }
      );
      return { ...a, users };
    });
  };
}
