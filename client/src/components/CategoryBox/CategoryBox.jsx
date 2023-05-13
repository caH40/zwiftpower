import React from 'react';
import cn from 'classnames';

import styles from './CategoryBox.module.css';

function CategoryBox({ label, quantityRiders = '', circle }) {
  return (
    <div
      className={cn(styles.category, styles[label], { [styles.circle]: circle })}
    >{`${label} ${quantityRiders}`}</div>
  );
}

export default CategoryBox;
