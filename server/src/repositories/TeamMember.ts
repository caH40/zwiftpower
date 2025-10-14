import { TeamMemberModel } from '../Model/TeamMember';

// types
import { TTeamSpecialization } from '../types/team.types';

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
}
