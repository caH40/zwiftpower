// types
import { TTeamMemberPublicDto } from '../types/dto.interface.js';
import { TTeamMembersForDto } from '../types/team.types.js';

export function teamMemberPublicDto(member: TTeamMembersForDto): TTeamMemberPublicDto {
  const _id = member._id.toString();

  const { rider, role, specialization, createdAt } = member;

  return { rider, role, specialization, createdAt, _id };
}
