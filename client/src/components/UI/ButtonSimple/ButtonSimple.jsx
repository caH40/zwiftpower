import cn from 'classnames/bind';

import styles from './ButtonSimple.module.css';

const cx = cn.bind(styles);

/**
 *
 * @param {Object} props
 * @param {'blue' | 'orange'} [props.theme] - Тема кнопки.
 * @returns
 */
export default function ButtonSimple({ children, theme = 'blue', ...props }) {
  return (
    <button className={cx('button', theme)} {...props}>
      {children}
    </button>
  );
}
