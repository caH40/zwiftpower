import { Types } from 'mongoose';
import { ZwiftSignedRiders } from '../Model/ZwiftSignedRiders.js';

export class SignedRidersRepository {
  /**
   * Получение подгрупп в которых зарегистрированы райдеры команды teamId.
   */
  async getSubgroupForTeamMembers(teamId: string): Promise<{ subgroup: Types.ObjectId }[]> {
    return await ZwiftSignedRiders.find({ team: teamId }, { subgroup: 1, _id: 0 }).lean();
  }
}
