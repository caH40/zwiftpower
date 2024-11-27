import mongoose from 'mongoose';

import { User } from '../../Model/User.js';

// types
import { TResponseService } from '../../types/http.interface.js';
import { TUserStreams } from '../../types/model.interface.js';
import { TResponseEnabledUserStream, TResponseStreamDto } from '../../types/types.interface.js';
import { getTwitchChannelsService } from '../twitch/twitch.js';
import { Rider } from '../../Model/Rider.js';
import { getYoutubeChannelsService } from '../youtube/youtube.js';

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

type TStreamsFromDB = {
  zwiftId: number;
  streams: TUserStreams;
  _id: mongoose.Types.ObjectId;
};

/**
 * Сервис получения включенных трансляций пользователей.
 */
export async function getEnabledUserStreamsService(): Promise<
  TResponseService<TResponseEnabledUserStream[]>
> {
  // Получение пользователей у которых включено отображение канала с трансляциями из twitch,или youtube.
  const streamsDB = await User.find(
    {
      $and: [
        { 'streams.streamingRestricted': false },
        { $or: [{ 'streams.twitch.isEnabled': true }, { 'streams.youtube.isEnabled': true }] },
      ],
    },
    { zwiftId: true, streams: true }
  ).lean<TStreamsFromDB[]>();

  // Создание массива из zwiftId для последующего получения данных Riders.
  const zwiftIds = streamsDB.map(({ zwiftId }) => zwiftId);

  // Получение данных Riders для отображения в карточки канала с трансляцией.
  const ridersDB = await Rider.find(
    { zwiftId: zwiftIds },
    { _id: false, ...zwiftDataSliced }
  ).lean<TRidersFromDB[]>();

  // Получение данных активных(live) трансляций из twitch и youtube.
  const { channelNamesTwitch, channelHandlesYoutube } = streamsDB.reduce(
    (acc, cur) => {
      if (cur.streams.twitch) {
        acc.channelNamesTwitch.push(cur.streams.twitch.channelName);
      }
      if (cur.streams.youtube) {
        acc.channelHandlesYoutube.push(cur.streams.youtube.channelHandle);
      }

      return acc;
    },
    {
      channelNamesTwitch: [] as string[],
      channelHandlesYoutube: [] as string[],
    }
  );

  // Получение информации о каналах их трансляциях с twitch.
  // Получение информации о каналах их трансляциях с youtube.
  const [channelsTwitchData, channelsYoutubeData] = await Promise.all([
    getTwitchChannelsService(channelNamesTwitch),
    getYoutubeChannelsService(channelHandlesYoutube),
  ]);

  // const channelsYoutubeData = [
  //   {
  //     online: false,
  //     title: null,
  //     thumbnailUrl: null,
  //     viewerCount: null,
  //     startedAt: null,
  //     channel: {
  //       title: 'Aleksandr Ber',
  //       bannerUrl:
  //         'https://yt3.googleusercontent.com/EQ73srhqkJ455TSmQnoEGZ9hMMUjcyw-4OECbTSC3HzfG7kS541o0nm-UMGWv758IgIJT6-5cQU',
  //       description: undefined,
  //       handleYoutube: 'cah40yc',
  //     },
  //   },
  // ];

  // Формирование массива трансляций пользователей с данными zwiftData этих пользователей.
  const streams = createStreamsForClient(
    streamsDB,
    ridersDB,
    channelsTwitchData,
    channelsYoutubeData
  );

  const message = 'Список трансляций пользователей, включенных для просмотра.';

  return { data: streams, message };
}

/**
 * Формирование массива трансляций пользователей с данными zwiftData этих пользователей.
 */
function createStreamsForClient(
  streamsFromDB: TStreamsFromDB[],
  ridersFromDB: TRidersFromDB[],
  channelsTwitchData: TResponseStreamDto[],
  channelsYoutubeData: TResponseStreamDto[]
) {
  const streams = streamsFromDB.map((stream) => {
    const _id = String(stream._id);

    // Не все райдеры привязали zwiftId к профилю, поэтому у некоторых riderCurrent = undefined
    const riderCurrent = ridersFromDB.find((rider) => rider.zwiftId === stream.zwiftId);

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

    let twitch = null;
    if (stream.streams.twitch) {
      const channelName = stream.streams.twitch.channelName.toLocaleLowerCase();

      twitch =
        channelsTwitchData.find((channelData) => {
          return channelData.channel.title.toLocaleLowerCase() === channelName;
        }) || null;
    }

    let youtube = null;
    if (stream.streams.youtube) {
      const channelHandle = stream.streams.youtube.channelHandle.toLocaleLowerCase();

      youtube =
        channelsYoutubeData.find((channelData) => {
          return channelData.channel.handleYoutube?.toLocaleLowerCase() === channelHandle;
        }) || null;
    }

    return { _id, zwiftData, twitch, youtube };
  });

  return streams;
}
