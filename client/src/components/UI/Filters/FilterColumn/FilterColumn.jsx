import React from 'react';

import ButtonForFilterCheckbox from '../ButtonForFilterCheckbox/ButtonForFilterCheckbox';
import IconOpenClose from '../../../icons/IconOpenClose';

import styles from './FilterColumn.module.css';

function FilterColumn() {
  const openMenuCP = () => {};
  return (
    <div className={styles.box}>
      <ButtonForFilterCheckbox getClick={openMenuCP}>
        <span>Данные CP</span>
        <IconOpenClose />
      </ButtonForFilterCheckbox>
    </div>
  );
}

export default FilterColumn;
