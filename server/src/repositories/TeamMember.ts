import { Types } from 'mongoose';
import { TeamMemberModel } from '../Model/TeamMember.js';

// types
import { TTeamRole, TTeamSpecialization } from '../types/team.types.js';

type TPopulatedTeamMember = {
  specialization?: TTeamSpecialization;
  user: {
    zwiftId: number;
  };
};

export class TeamMemberRepository {
  /**
   * Запрос для Team.getStatistics
   * Данные об участниках команды.
   */
  async getTeamMemberData(teamId: string): Promise<TPopulatedTeamMember[]> {
    return await TeamMemberModel.find(
      { team: teamId },
      {
        user: 1,
        specialization: 1,
        _id: 0,
      }
    )
      .populate({ path: 'user', select: ['-_id', 'zwiftId'] })
      .lean<TPopulatedTeamMember[]>();
  }

  /**
   * Получение массива данных участника команды {_id,zwiftId}
   */
  async getUserAndZwiftIds(teamId: string): Promise<
    {
      _id: Types.ObjectId;
      user: { _id: Types.ObjectId; zwiftId: number };
      createdAt: Date;
      role?: TTeamRole;
      specialization?: TTeamSpecialization;
    }[]
  > {
    return await TeamMemberModel.find(
      { team: teamId },
      { role: 1, user: 1, specialization: 1, createdAt: 1 }
    )
      .populate<{ user: { _id: Types.ObjectId; zwiftId: number } }>({
        path: 'user',
        select: ['zwiftId'],
      })
      .lean();
  }
}
