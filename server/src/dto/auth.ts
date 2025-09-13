import { Types } from 'mongoose';

// types
import { GenerateToken } from '../types/auth.interface.js';
import { UserSchema } from '../types/model.interface.js';

type Params = {
  user: UserSchema;
  team?: Types.ObjectId;
  riderImg?: string | null;
  organizerId: Types.ObjectId | undefined;
};

/**
 * Формирование данных пользователя, его авторизации для клиента и токена доступа после авторизации.
 */
export function dtoProfileDataForClient({
  user,
  riderImg,
  organizerId,
  team,
}: Params): GenerateToken {
  const vkProfile = user.externalAccounts?.vk;
  const vk = vkProfile && {
    firstName: vkProfile.firstName,
    lastName: vkProfile.lastName,
    avatarSrc: vkProfile.avatarSrc,
  };
  return {
    username: user.username,
    email: user.email,
    id: user._id!,
    role: user.role,
    photoProfile: riderImg,
    zwiftId: user.zwiftId,
    moderator: user.moderator,
    team: team?.toString(),
    externalAccounts: {
      vk,
    },
    ...(organizerId && { organizer: String(organizerId) }),
  };
}

/**
 * Формирование данных пользователя, его авторизации для клиента и токена доступа после регистрации.
 */
export function dtoProfileDataForClientAfterReg({ user }: { user: UserSchema }): GenerateToken {
  const vkProfile = user.externalAccounts?.vk;
  const vk = vkProfile && {
    firstName: vkProfile.firstName,
    lastName: vkProfile.lastName,
    avatarSrc: vkProfile.avatarSrc,
  };
  return {
    username: user.username,
    email: user.email,
    id: user._id!,
    role: user.role,
    externalAccounts: {
      vk,
    },
  };
}
