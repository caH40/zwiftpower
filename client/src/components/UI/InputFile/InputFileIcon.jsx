import { useRef, useState } from 'react';
import cn from 'classnames/bind';

import styles from './InputFileIcon.module.css';

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
  const [isFocused, setIsFocused] = useState(false);
  const refInput = useRef(null);
  const refImg = useRef(null);

  const getClick = () => {
    if (refInput.current) {
      refInput.current.click();
    }
  };

  const handleKeyDown = (event) => {
    event.preventDefault(); // Отменяет стандартное поведение. Space (пробел) по умолчанию активирует
    // кнопку и скроллит страницу, если фокус находится на div, span, img или button
    if (event.key === 'Enter' || event.key === ' ') {
      getClick();
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
        onFocus={() => setIsFocused(true)} // При фокусе на input добавляем класс
        onBlur={() => setIsFocused(false)} // При потере фокуса убираем класс
        // tabIndex="-1" // Не фокусируется на элементе при табуляции.
      />
      <img
        src={icon.src}
        width={icon.width}
        height={icon.height}
        alt={icon.alt}
        onClick={getClick}
        ref={refImg}
        onKeyDown={handleKeyDown}
        className={cx('btn__icon', {
          icon__disabled: disabled || loading,
          focus: isFocused,
        })}
        // tabIndex={0} // Делает элемент фокусируемым
        role="button" // Семантически обозначает кнопку
        aria-disabled={disabled || loading} // Для доступности
      />
    </div>
  );
}
