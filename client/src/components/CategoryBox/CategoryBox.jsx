import React from 'react';

import styles from './CategoryBox.module.css';

function CategoryBox({ label, quantityRiders }) {
  const classBox = `${styles.category} ${styles[label]}`;
  return <div className={classBox}>{`${label} ${quantityRiders}`}</div>;
}

export default CategoryBox;
