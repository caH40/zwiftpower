// types
import { UserSchema } from '../types/model.interface.js';
import { TAuthService, TResponseAfterRegistrationDto } from '../types/types.interface.js';

type Params = {
  user: UserSchema;
  accessToken: string;
  authType: TAuthService;
};
export function dtoResponseAfterRegistration({
  accessToken,
  user,
  authType,
}: Params): TResponseAfterRegistrationDto {
  return {
    user: {
      username: user.username,
      email: user.email,
      _id: String(user._id),
      role: user.role,
      photoProfile: user.externalAccounts?.vk?.avatarSrc,
    },
    token: {
      authType,
      accessToken,
    },
  };
}
