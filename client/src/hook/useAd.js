import { useEffect } from 'react';

import { adBlockRecommendation } from '../yandex/ad-blocks';

/**
 * Хук для рекомендательного виджета
 * @param {number[]} numbers номера блоков присвоенных РСЯ (../yandex/blocks)
 */
export const useAd = (numbers) => {
  useEffect(() => {
    for (const number of numbers) {
      adBlockRecommendation(number);
    }
  }, []);
};
