import cn from 'classnames';

import { adBlocks } from '../../yandex/blocks';

/**
 * Контейнер для блока рекламы
 * @param {{number}} number номер блока рекламы
 * @returns
 */
function AdContainer({ number, marginBottom }) {
  const adBlock = adBlocks.find((block) => block.id === number)?.label;

  return adBlock ? (
    <div className={cn({ [marginBottom]: marginBottom })} id={`yandex_rtb_${adBlock}`}></div>
  ) : null;
}

export default AdContainer;
