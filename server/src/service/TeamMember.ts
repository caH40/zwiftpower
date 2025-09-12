import { TeamMemberModel } from '../Model/TeamMember.js';
import { Rider } from '../Model/Rider.js';
import { teamMemberPublicDto } from '../dto/team-member.js';

// types
import { TTeamMembersPublicDB } from '../types/mongodb-response.types.js';
import { TTeamMembersForDto, TTeamRole } from '../types/team.types.js';
import { RiderProfileSchema } from '../types/model.interface.js';
import { TeamModel } from '../Model/Team.js';
import { Types } from 'mongoose';
import { TTeamMemberPublicDto } from '../types/dto.interface.js';

export class TeamMemberService {
  constructor() {}

  /**
   * Получение данных всех участников команды.
   */
  async getAll(urlSlug: string): Promise<{ data: TTeamMemberPublicDto[]; message: string }> {
    const { _id } = await this.getTeamId(urlSlug);
    const teamMembersDB = await TeamMemberModel.find(
      { team: _id },
      { role: true, specialization: true, createdAt: true }
    )
      .populate({ path: 'user', select: ['zwiftId', '-_id'] })
      .lean<TTeamMembersPublicDB[]>();

    const zwiftIds = teamMembersDB
      .map(({ user }) => user.zwiftId)
      .filter((item): item is number => !!item);

    const ridersDB = await Rider.find({ zwiftId: { $in: zwiftIds } }, { _id: false }).lean<
      RiderProfileSchema[]
    >();

    const teamMembers = teamMembersDB.reduce<TTeamMembersForDto[]>((acc, cur) => {
      const rider = ridersDB.find((r) => r.zwiftId === cur.user.zwiftId);
      acc.push({ ...cur, rider });
      return acc;
    }, []);

    const membersAfterDto = teamMembers.map((m) => teamMemberPublicDto(m));

    return { data: membersAfterDto, message: 'Участники команды' };
  }

  // async get(urlSlug: string): Promise<unknown> {
  // const teamDB = await TeamModel.findOne({ urlSlug }).lean<TTeam>();
  // if (!teamDB) {
  //   throw new Error(`Не найдена запрашиваемая команда с urlSlug: "${urlSlug}"!`);
  // }
  // return { data: teamDB };
  // }

  /**
   * Создание участника команды.
   */
  async create({
    userId,
    teamRole,
    teamId,
  }: {
    userId: string;
    teamId: string;
    teamRole?: TTeamRole;
  }): Promise<{ message: string }> {
    await TeamMemberModel.create({ user: userId, role: teamRole, team: teamId });

    return { message: 'Участник добавлен в команду' };
  }

  // private static ALL_MEMBERS_PUBLIC_PROJECTION: { a: true };

  private async getTeamId(urlSlug: string): Promise<{ _id: Types.ObjectId }> {
    const teamDB = await TeamModel.exists({ urlSlug });

    if (!teamDB) {
      throw new Error(`Не найдена команда с urlSlug:'${urlSlug}'`);
    }

    return teamDB;
  }
}
