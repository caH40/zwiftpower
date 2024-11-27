import { useMemo } from 'react';

import { createObjStream } from '../utils/stream';
import { shuffleArray } from '../utils/shuffle';

/**
 * Разделение трансляций на две группы: онлайн и офлайн.
 * Случайное перемешивание трансляций внутри групп.
 * Трансляции от одного пользователя идут парами при одинаковом состоянии(онлайн/офлайн),
 * так как разделение трансляций одного пользователя на разные элементы массива происходит после смешивания.
 *
 * @param {Array} streams - Массив всех трансляций.
 * @returns {Object} Объект с двумя группами трансляций: онлайн и офлайн.
 */
export const useSeparateStreams = (streams) => {
  const { streamsOnline, streamsOffline } = useMemo(() => {
    const shuffledStreams = shuffleArray(streams);

    return shuffledStreams.reduce(
      (acc, stream) => {
        if (stream.twitch && stream.twitch.online) {
          const data = createObjStream({ stream, platform: 'twitch' });
          acc.streamsOnline.push(data);
        }
        if (stream.youtube && stream.youtube.online) {
          const data = createObjStream({ stream, platform: 'youtube' });
          acc.streamsOnline.push(data);
        }
        if (stream.twitch && !stream.twitch.online) {
          const data = createObjStream({ stream, platform: 'twitch' });
          acc.streamsOffline.push(data);
        }
        if (stream.youtube && !stream.youtube.online) {
          const data = createObjStream({ stream, platform: 'youtube' });
          acc.streamsOffline.push(data);
        }
        return acc;
      },
      { streamsOnline: [], streamsOffline: [] }
    );
  }, [streams]);

  return { streamsOnline, streamsOffline };
};
