import { useEffect } from 'react';

import { adBlockRecommendation } from '../yandex/ad-blocks';
import { isDevelopmentMode } from '../config/environment';

/**
 * Хук для рекомендательного виджета
 * @param {number[]} numbers номера блоков присвоенных РСЯ (../yandex/blocks)
 * @param {string | undefined} type тип инициализируемого рекламного блока. У Баннера и РВ нет типа, у ленты - 'feed'
 */
export const useAd = (numbers, type) => {
  useEffect(() => {
    if (isDevelopmentMode) {
      return;
    }

    for (const number of numbers) {
      adBlockRecommendation(number, type);
    }
  }, []);
};
