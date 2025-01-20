'use client';

import { useRef } from 'react';
import cn from 'classnames/bind';

import styles from './InputFile.module.css';

const cx = cn.bind(styles);

/**
 * Input в виде Icon для загрузки файлов
 */
export default function InputFileIcon({
  icon,
  name,
  multiple = false,
  accept,
  getChange,
  loading,
  disabled,
}) {
  const refInput = useRef(null);
  const getClick = () => {
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
        disabled={disabled || loading}
      />
      <img
        src={icon.src}
        width={icon.width}
        height={icon.height}
        alt={icon.alt}
        onClick={getClick}
        className={cx('btn__icon', { icon__disabled: disabled || loading })}
      />
    </div>
  );
}
