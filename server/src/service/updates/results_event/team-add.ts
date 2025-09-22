// types
import { Types } from 'mongoose';

import { User } from '../../../Model/User.js';
import { ResultEventAdditional, TTeamForProfile } from '../../../types/types.interface.js';
import { TeamMemberModel } from '../../../Model/TeamMember.js';

/**
 * Добавление информации о принадлежности райдера к команде.
 */
export async function addTeamInResults(
  results: ResultEventAdditional[]
): Promise<ResultEventAdditional[]> {
  const zwiftIds = results.map(({ profileId }) => profileId);

  const usersDB = await User.find({ zwiftId: { $in: zwiftIds } }, { zwiftId: true }).lean<
    {
      _id: Types.ObjectId;
      zwiftId: number;
    }[]
  >();

  const usersIds = usersDB.map(({ _id }) => _id);

  // Данные команды по userId.
  const teamMembersDB = await TeamMemberModel.find(
    { user: { $in: usersIds } },
    { _id: false, team: true, user: true }
  )
    .populate({ path: 'team', select: ['-_id', 'name', 'shortName', 'urlSlug'] })
    .lean<{ user: Types.ObjectId; team: TTeamForProfile }[]>();

  const users: Map<number, TTeamForProfile | undefined> = new Map(
    usersDB.map((user) => {
      const team = teamMembersDB.find((member) => member.user.equals(user._id))?.team;

      return [user.zwiftId, team];
    })
  );

  return results.map((result) => {
    const profileData = { ...result.profileData, team: users.get(result.profileId) };

    return { ...result, profileData };
  });
}
