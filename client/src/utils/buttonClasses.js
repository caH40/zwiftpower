import cn from 'classnames';

function getButtonPositionClass({ styles, index, quantityBtn }) {
  if (quantityBtn === 1) {
    return styles.button__solo;
  }

  if (index === 0) {
    return styles.button__left;
  }

  if (index === quantityBtn - 1) {
    return styles.button__right;
  }

  if (index > 0 && index < quantityBtn - 1) {
    return styles.button__center;
  }

  return '';
}

export function getButtonClasses({ styles, index, quantityBtn, isActive }) {
  const positionClass = getButtonPositionClass({ styles, index, quantityBtn });

  if (isActive) {
    return cn(styles.button, styles.active, positionClass);
  }

  return cn(styles.button, positionClass);
}
