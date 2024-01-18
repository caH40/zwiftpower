import cn from 'classnames';

import { adBlocks } from '../../yandex/blocks';

/**
 * Контейнер для блока рекламы
 * @param {{number}} number номер блока рекламы
 * @returns
 */
function AdContainer({ number, marginBottom = 0, maxHeight = 'none' }) {
  const adBlock = adBlocks.find((block) => block.id === number)?.label;

  return adBlock ? (
    <div
      className={cn('ad__block')}
      style={{ marginBottom, maxHeight }}
      id={`yandex_rtb_${adBlock}`}
    ></div>
  ) : null;
}

export default AdContainer;
