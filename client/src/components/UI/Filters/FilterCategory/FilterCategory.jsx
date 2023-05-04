import React from 'react';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';

import styles from './FilterCategory.module.css';

function FilterCategory() {
  return (
    <div className={styles.box}>
      <ButtonForFilter position={'left'}>Все</ButtonForFilter>
      <ButtonForFilter position={'center'}>A</ButtonForFilter>
      <ButtonForFilter position={'right'} active={true}>
        E
      </ButtonForFilter>
    </div>
  );
}

export default FilterCategory;
