// types
import { UserProfileFetch } from '../common/types/userProfile.interface.js';
import { PowerCurveSchema, TUserStreams } from '../types/model.interface.js';
import { Profile, StreamEnabled } from '../types/types.interface.js';

/**
 *  Подготавливает данные профайла для отправки на клиент
 */
export const userProfileDto = ({
  profile,
  powerCurve,
  quantityRace,
  streams,
}: {
  profile: Profile;
  powerCurve: PowerCurveSchema | null;
  quantityRace: number;
  streams?: TUserStreams;
}) => {
  const powerCurveForResponse: PowerCurveSchema | null = powerCurve ? { ...powerCurve } : null;

  const profileForResponse: Profile = { ...profile };

  const streamsEnabled = getStreamEnabled(streams);

  const userProfileFetch: UserProfileFetch = {
    profile: profileForResponse,
    powerCurve: powerCurveForResponse,
    quantityRace,
    streams: streamsEnabled,
    message: 'Профиль райдера',
  };

  return userProfileFetch;
};

function getStreamEnabled(streams?: TUserStreams): StreamEnabled[] | null {
  if (!streams) return null;

  const streamLinks = [
    streams.twitch?.isEnabled &&
      streams.twitch.channelName && {
        platform: 'twitch',
        url: `https://twitch.tv/${streams.twitch.channelName}`,
      },
    streams.youtube?.isEnabled &&
      streams.youtube.channelHandle && {
        platform: 'youtube',
        url: `https://www.youtube.com/@${streams.youtube.channelHandle}/streams`,
      },
  ].filter(Boolean) as StreamEnabled[];

  return streamLinks.length ? streamLinks : null;
}
