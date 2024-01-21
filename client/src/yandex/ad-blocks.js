import { adBlocks } from './blocks';

/**
 * Рекомендательный виджет
 * @param {number} number номер блока присвоенный РСЯ, диапазон  4-8 (создаются блоки на сайте РСЯ)
 * @param {string | undefined} type тип инициализируемого рекламного блока. У Баннера и РВ нет типа, у ленты - 'feed'
 */
export const adBlockRecommendation = (number, type) => {
  const label = adBlocks.find((block) => block.id === number)?.label;

  if (!label) {
    return;
  }

  window.yaContextCb.push(() => {
    const renderOptions = {
      renderTo: `yandex_rtb_${label}`,
      blockId: label,
    };

    if (type === 'feed') {
      renderOptions.type = 'feed';
    }

    window.Ya.Context.AdvManager.renderWidget(renderOptions);
  });
};
