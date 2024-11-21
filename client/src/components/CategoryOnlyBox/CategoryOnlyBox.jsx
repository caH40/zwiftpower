import classNames from 'classnames/bind';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './CategoryOnlyBox.module.css';

const cx = classNames.bind(styles);

function CategoryOnlyBox({ label = 'hidden', squareSize = 24, female, hideLabel, tooltip }) {
  let labelCurrent = label;
  switch (label) {
    case 'APlus':
      labelCurrent = 'A+';
      break;
  }

  const value = labelCurrent === 'hidden' ? '?' : labelCurrent;

  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cx('category', label, { W: female })}
        style={{ width: squareSize, height: squareSize, fontSize: squareSize * 0.6 }}
      >
        {!hideLabel && value}
      </div>
    </MyTooltip>
  );
}

export default CategoryOnlyBox;
