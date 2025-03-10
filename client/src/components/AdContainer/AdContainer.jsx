import { adBlocks } from '../../yandex/blocks';

import styles from './AdContainer.module.css';

/**
 * Контейнер для блока рекламы
 * @param {{number}} number номер блока рекламы
 * @returns
 */
function AdContainer({
  number,
  marginBottom = 0,
  height = 'auto',
  maxHeight = 'none',
  maxWidth = 'none',
}) {
  const adBlock = adBlocks.find((block) => block.id === number)?.label;

  return adBlock ? (
    <div
      className={styles.block}
      style={{ marginBottom, maxHeight, maxWidth, height }}
      id={`yandex_rtb_${adBlock}`}
    ></div>
  ) : null;
}

export default AdContainer;
