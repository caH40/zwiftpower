/**
 * Рекомендательный виджет
 * <div id="yandex_rtb_C-A-5165832-4"></div>
 * @param {number} number номер блока присвоенный РСЯ, диапазон  4-8 (создаются блоки на сайте РСЯ)
 */
export const adBlockRecommendation = (number) => {
  window.yaContextCb.push(() => {
    window.Ya.Context.AdvManager.renderWidget({
      renderTo: `yandex_rtb_C-A-5165832-${number}`,
      blockId: `C-A-5165832-${number}`,
    });
  });
};
