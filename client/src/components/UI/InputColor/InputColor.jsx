import cn from 'classnames/bind';

import styles from './InputColor.module.css';

const cx = cn.bind(styles);

export default function InputColor({ label, register, loading, id, ...props }) {
  return (
    <div className={cn(styles.wrapper)}>
      <div className={styles.box__text}>
        {label ? (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        ) : undefined}
      </div>

      <input
        {...register}
        type="color"
        className={cx('input')}
        id={id}
        {...props}
        disabled={loading}
      />
    </div>
  );
}
