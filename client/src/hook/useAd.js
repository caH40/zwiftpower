import { useEffect } from 'react';

import { adBlockRecommendation } from '../yandex/ad-blocks';
import { isDevelopmentMode } from '../config/environment';

/**
 * Хук для рекомендательного виджета
 * @param {number[]} numbers номера блоков присвоенных РСЯ (../yandex/blocks)
 */
export const useAd = (numbers) => {
  useEffect(() => {
    if (isDevelopmentMode) {
      return;
    }

    for (const number of numbers) {
      adBlockRecommendation(number);
    }
  }, []);
};
