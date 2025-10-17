// types
import { UserProfileFetch } from '../common/types/userProfile.interface.js';
import { PowerCurveSchema, TUserStreams } from '../types/model.interface.js';
import { TTeamAppearance } from '../types/team.types.js';
import { Profile, StreamEnabled } from '../types/types.interface.js';

/**
 *  Подготавливает данные профайла для отправки на клиент
 */
export const userProfileDto = ({
  profile,
  powerCurve,
  quantityRace,
  streams,
  teamAppearance,
}: {
  profile: Profile;
  powerCurve: PowerCurveSchema | null;
  quantityRace: number;
  streams?: TUserStreams;
  teamAppearance?: TTeamAppearance;
}) => {
  const powerCurveForResponse: PowerCurveSchema | null = powerCurve ? { ...powerCurve } : null;

  const profileForResponse: Profile = { ...profile };

  const teamWithAppearance = profileForResponse.team && {
    ...profileForResponse.team,
    appearance: teamAppearance,
  };

  const streamsEnabled = getStreamEnabled(streams);

  const userProfileFetch: UserProfileFetch = {
    profile: { ...profileForResponse, team: teamWithAppearance },
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
