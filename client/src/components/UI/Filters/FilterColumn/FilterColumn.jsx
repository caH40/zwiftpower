import React, { useState } from 'react';

import ButtonForFilterCheckbox from '../ButtonForFilterCheckbox/ButtonForFilterCheckbox';
import IconOpenClose from '../../../icons/IconOpenClose';
import PopupMenuCP from '../../PopupMenuCP/PopupMenuCP';

import styles from './FilterColumn.module.css';

function FilterColumn() {
  const [isOpened, setIsOpened] = useState(false);

  const openMenuCP = () => setIsOpened((prev) => !prev);

  return (
    <div className={styles.box}>
      <ButtonForFilterCheckbox getClick={openMenuCP}>
        <span>Данные CP</span>
        <IconOpenClose isOpened={isOpened} />
      </ButtonForFilterCheckbox>
      {isOpened && <PopupMenuCP setIsOpened={setIsOpened} />}
    </div>
  );
}

export default FilterColumn;
