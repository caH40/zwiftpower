import { viParams } from '../assets/constants';

/**
 * Цвет заливки для блока Нормализованной мощности и Индекс вариабельности
 * @param {number} vi Индекс вариабельности
 * @returns {string} цвет
 */
const { z1, z2, z3, z4 } = viParams;

export const getBgColor = (vi) => {
  if (vi <= z1.value) {
    return z1.color;
  } else if (vi <= z2.value) {
    return z2.color;
  } else if (vi <= z3.value) {
    return z3.color;
  } else {
    return z4.color;
  }
};
