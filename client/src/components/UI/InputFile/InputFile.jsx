'use client';

import { useRef } from 'react';
import cn from 'classnames/bind';

import styles from './InputFile.module.css';

const cx = cn.bind(styles);

/**
 * Input в виде кнопки для загрузки файлов
 */
export default function InputFile({
  label,
  name,
  multiple = false,
  accept,
  getChange,
  loading,
  disabled,
}) {
  const refInput = useRef(null);
  const getClick = (e) => {
    e.preventDefault();
    if (refInput.current) {
      refInput.current.click();
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        ref={refInput}
        type="file"
        multiple={multiple}
        accept={accept}
        className={cx('hidden')}
        onChange={getChange}
        name={name}
      />
      <button
        className={cx('btn', { loading: disabled || loading })}
        onClick={getClick}
        disabled={loading || disabled}
      >
        {label}
      </button>
    </div>
  );
}
