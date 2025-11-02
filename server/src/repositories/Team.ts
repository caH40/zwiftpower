import { Types } from 'mongoose';
import { TeamModel } from '../Model/Team.js';

// types
import { TTeam } from '../types/model.interface.js';
import { TTeamForListDB, TTeamPublicDB } from '../types/mongodb-response.types.js';
import { TTeamAppearance } from '../types/team.types.js';

export class TeamRepository {
  constructor() {}

  /**
   * Данные команды.
   */
  async getById(teamId: string): Promise<TTeam | null> {
    return TeamModel.findById(teamId).lean();
  }

  /**
   * данные по appearance у всех команд.
   */
  async getTeamsAppearance(): Promise<{ urlSlug: string; appearance?: TTeamAppearance }[]> {
    return await TeamModel.find({}, { _id: 0, urlSlug: 1, appearance: 1 }).lean();
  }

  /**
   * Возвращает команду по slug.
   */
  async getByUrlSlug(urlSlug: string): Promise<TTeam | null> {
    return this.getByUrlSlugAndProjection(urlSlug);
  }
  /**
   * Возвращает имя команды по slug.
   */
  async getName(urlSlug: string): Promise<{ name: string } | null> {
    return this.getByUrlSlugAndProjection(urlSlug, { name: 1 });
  }
  /**
   * Возвращает данные команды для клиента по slug.
   */
  async getForClient(urlSlug: string): Promise<TTeamPublicDB | null> {
    return this.getByUrlSlugAndProjection(urlSlug, {
      _id: 1,
      creator: 0,
      pendingRiders: 0,
      bannedRiders: 0,
      createdAt: 0,
      updatedAt: 0,
    });
  }
  /**
   * Возвращает данные команд для клиента по slug.
   */
  async getAllForClient(): Promise<TTeamForListDB[]> {
    return TeamModel.find(
      {},
      {
        _id: 1,
        name: 1,
        shortName: 1,
        urlSlug: 1,
        logoFileInfo: 1,
        posterFileInfo: 1,
      }
    ).lean<TTeamForListDB[]>();
  }

  /**
   * Возвращает список пользователей, подавших заявки на вступление в команду.
   */
  async getPendingRidersList(teamCreatorId: string) {
    return TeamModel.findOne(
      { creator: teamCreatorId },
      { _id: false, 'pendingRiders.user': true }
    ).lean<{ pendingRiders: { user: Types.ObjectId }[] }>();
  }

  /**
   * Удаление заявки от кандидата из массива заявок команды.
   */
  removePendingUser = async (teamCreatorId: string, teamMemberId: string): Promise<void> => {
    await TeamModel.findOneAndUpdate(
      { creator: teamCreatorId },
      { $pull: { pendingRiders: { user: teamMemberId } } }
    ).lean();
  };

  /**
   * Возвращает пользователей, подавших заявки на вступление в команду.
   */
  async getPendingRiders(teamCreatorId: string) {
    return TeamModel.findOne(
      { creator: teamCreatorId },
      { _id: false, pendingRiders: true, name: true }
    )
      .populate({ path: 'pendingRiders.user', select: ['zwiftId'] })
      .lean<
        Pick<TTeam, 'name'> & {
          pendingRiders: {
            user: { zwiftId?: number; _id: Types.ObjectId } | null;
            requestedAt: Date;
          }[];
        }
      >();
  }

  /**
   * Возвращает команду по slug.
   * Если указана проекция, возвращает только выбранные поля.
   */
  private async getByUrlSlugAndProjection<K extends keyof TTeam>(
    urlSlug: string,
    paramsProjection?: Record<K, 1 | 0>
  ) {
    const projection = paramsProjection ? { _id: 0, ...paramsProjection } : undefined;

    return TeamModel.findOne({ urlSlug }, projection).lean();
  }
}
