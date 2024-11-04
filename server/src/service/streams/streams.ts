import mongoose from 'mongoose';

import { User } from '../../Model/User.js';

// types
import { TResponseService } from '../../types/http.interface.js';
import { TUserStreams } from '../../types/model.interface.js';
import { TResponseEnabledUserStream } from '../../types/types.interface.js';

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

  const streams = streamsDB.map((stream) => {
    const _id = String(stream._id);
    const zwiftData = { ...stream.zwiftData, id: stream.zwiftId };
    const twitch = { channelName: stream.streams.twitch.channelName };

    return { _id, zwiftData, twitch };
  });

  const message = 'Список включенныех трансляций пользователей.';
  return { data: streams, message };
}
