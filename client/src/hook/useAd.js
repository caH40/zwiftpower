import { useEffect } from 'react';

import { adBlockRecommendation } from '../yandex/ad-blocks';

/**
 * Хук для рекомендательного виджета
 * @param {number} number номер блока присвоенный РСЯ, диапазон  4-8
 */
export const useAd = (number) => {
  useEffect(() => {
    adBlockRecommendation(number);
  }, []);
};
