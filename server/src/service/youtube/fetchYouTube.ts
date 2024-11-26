import axios from 'axios';
import { youtubeAPIKey } from '../../config/environment.js';

type Params = {
  url: string;
  params?: Record<string, string | number>;
};

/**
 * Запрос на API youtube.
 */
export async function fetchYoutubeData<T>({ url, params }: Params): Promise<T> {
  const response = await axios.get(url, {
    params: {
      ...params,
      key: youtubeAPIKey,
    },
  });

  return response.data;
}
