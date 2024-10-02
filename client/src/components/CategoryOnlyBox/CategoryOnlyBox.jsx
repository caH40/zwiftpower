import classNames from 'classnames/bind';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './CategoryOnlyBox.module.css';

const cx = classNames.bind(styles);

function CategoryOnlyBox({ label = '', squareSize = 24, female, hideLabel, tooltip }) {
  const labelCurrent = label === 'APlus' ? 'A+' : label;
  const value = hideLabel ? '' : labelCurrent;

  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cx('category', label, { W: female })}
        style={{ width: squareSize, height: squareSize, fontSize: squareSize * 0.6 }}
      >
        {value}
      </div>
    </MyTooltip>
  );
}

export default CategoryOnlyBox;
