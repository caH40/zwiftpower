import React from 'react';
import cn from 'classnames';

import styles from './CategoryBox.module.css';

function CategoryBox({ label = '', showLabel, quantityRiders = '', circle }) {
  return (
    <div className={cn(styles.category, styles[label], { [styles.circle]: circle })}>{`${
      showLabel ? label : ''
    } ${quantityRiders}`}</div>
  );
}

export default CategoryBox;
