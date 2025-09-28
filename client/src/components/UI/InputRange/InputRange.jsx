import cn from 'classnames/bind';

import styles from './InputRange.module.css';

const cx = cn.bind(styles);

export default function InputRange(props) {
  return <input type="range" {...props} className={cx('input', 'minimal')} />;
}
