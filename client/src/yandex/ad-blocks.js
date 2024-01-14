import { adBlocks } from './blocks';

/**
 * Рекомендательный виджет
 * <div id="yandex_rtb_C-A-5165832-4"></div>
 * @param {number} number номер блока присвоенный РСЯ, диапазон  4-8 (создаются блоки на сайте РСЯ)
 */
export const adBlockRecommendation = (number) => {
  const label = adBlocks.find((block) => block.id === number)?.label;

  if (!label) {
    return;
  }

  window.yaContextCb.push(() => {
    window.Ya.Context.AdvManager.renderWidget({
      renderTo: `yandex_rtb_${label}`,
      blockId: label,
    });
  });
};
