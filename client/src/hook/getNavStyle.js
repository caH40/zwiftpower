import cn from 'classnames';

export const getNavStyle = (isActive, index, styles, quantityBtn) => {
  // в зависимости от относительного положения и количества кнопок применяются разные стили

  const positions = {
    [styles.button__left]: index === 0 && quantityBtn !== 1,
    [styles.button__center]: index !== 0 && quantityBtn > 2 && index + 1 !== quantityBtn,
    [styles.button__right]: index !== 0 && index + 1 === quantityBtn,
  };

  if (isActive) {
    return cn(styles.button, styles.active, positions);
  } else {
    return cn(styles.button, positions);
  }
};
