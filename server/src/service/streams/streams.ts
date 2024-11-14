import mongoose from 'mongoose';

import { User } from '../../Model/User.js';

// types
import { TResponseService } from '../../types/http.interface.js';
import { TUserStreams } from '../../types/model.interface.js';
import { TResponseEnabledUserStream } from '../../types/types.interface.js';
import { getTwitchChannelsService } from '../twitch/twitch.js';
import { Rider } from '../../Model/Rider.js';

const zwiftDataSliced = {
  zwiftId: true,
  firstName: true,
  lastName: true,
  'competitionMetrics.category': true,
  'competitionMetrics.racingScore': true,
  imageSrc: true,
  countryAlpha3: true,
  male: true,
};

type TRidersFromDB = {
  zwiftId: number;
  firstName: string;
  lastName: string;
  competitionMetrics: {
    category: string;
    racingScore: string;
  };
  imageSrc: string;
  countryAlpha3: string;
  male: boolean;
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
    { zwiftId: true, streams: true }
  ).lean<{ zwiftId: number; streams: TUserStreams; _id: mongoose.Types.ObjectId }[]>();

  const zwiftIds = streamsDB.map(({ zwiftId }) => zwiftId);

  const ridersDB = await Rider.find(
    { zwiftId: zwiftIds },
    { _id: false, ...zwiftDataSliced }
  ).lean<TRidersFromDB[]>();

  const channelsNames = streamsDB.map((stream) => stream.streams.twitch.channelName);

  const channelsData = await getTwitchChannelsService(channelsNames);

  const streams = streamsDB.map((stream) => {
    const _id = String(stream._id);

    // Не все райдеры привязали zwiftId к профилю, поэтому у некоторых riderCurrent = undefined
    const riderCurrent = ridersDB.find((rider) => rider.zwiftId === stream.zwiftId);

    const zwiftData = riderCurrent && {
      id: riderCurrent.zwiftId,
      firstName: riderCurrent.firstName,
      lastName: riderCurrent.lastName,
      category: riderCurrent.competitionMetrics?.category,
      racingScore: riderCurrent.competitionMetrics?.racingScore,
      imageSrc: riderCurrent.imageSrc,
      countryAlpha3: riderCurrent.countryAlpha3,
      male: riderCurrent.male,
    };

    const channelName = stream.streams.twitch.channelName?.toLocaleLowerCase();

    const twitch =
      channelsData.find((channelData) => channelData.user.login === channelName) || null;

    return { _id, zwiftData, twitch };
  });

  const message = 'Список трансляций пользователей, включенных для просмотра.';
  return { data: streams, message };
}
