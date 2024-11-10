import mongoose from 'mongoose';

import { User } from '../../Model/User.js';

// types
import { TResponseService } from '../../types/http.interface.js';
import { TUserStreams } from '../../types/model.interface.js';
import { TResponseEnabledUserStream } from '../../types/types.interface.js';
import { getTwitchChannelsService } from '../twitch/twitch.js';

const zwiftDataSliced = {
  'zwiftData.firstName': true,
  'zwiftData.lastName': true,
  'zwiftData.category': true,
  'zwiftData.racingScore': true,
  'zwiftData.imageSrc': true,
  'zwiftData.countryAlpha3': true,
  'zwiftData.male': true,
};

type TStreamsFromDB = {
  _id: mongoose.Types.ObjectId;
  zwiftId: number;
  zwiftData: {
    firstName: string;
    lastName: string;
    category: string;
    racingScore: string;
    imageSrc: string;
    countryAlpha3: string;
    male: boolean;
  };
  streams: TUserStreams;
};

/**
 * Сервис получения включенных трансляций пользователей.
 */
export async function getEnabledUserStreamsService(): Promise<
  TResponseService<TResponseEnabledUserStream[]>
> {
  const streamsDB = await User.find(
    {
      $and: [{ 'streams.streamingRestricted': false }, { 'streams.twitch.isEnabled': true }],
    },
    { zwiftId: true, streams: true, ...zwiftDataSliced }
  ).lean<TStreamsFromDB[]>();

  const channelsNames = streamsDB.map((stream) => stream.streams.twitch.channelName);

  const channelsData = await getTwitchChannelsService(channelsNames);

  const streams = streamsDB.map((stream) => {
    const _id = String(stream._id);
    const zwiftData = { ...stream.zwiftData, id: stream.zwiftId };

    const channelName = stream.streams.twitch.channelName?.toLocaleLowerCase();

    const twitch =
      channelsData.find((channelData) => channelData.user.login === channelName) || null;

    return { _id, zwiftData, twitch };
  });

  const message = 'Список трансляций пользователей, включенных для просмотра.';
  return { data: streams, message };
}
