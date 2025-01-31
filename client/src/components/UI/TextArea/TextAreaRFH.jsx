import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames/bind';

import styles from './TextArea.module.css';

const cx = cn.bind(styles);

/**
 * Textarea с использованием библиотеки react form hook.
 */
export default function TextAreaRFH({ register, label, id, validationText, loading }) {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        <div className={styles.box__info}>{label}</div>
        <span className={styles.error}>{validationText}</span>
      </label>
      <TextareaAutosize
        {...register}
        className={cx('textarea', { error__textarea: validationText })}
        disabled={loading}
        minRows={3} // Минимальное количество строк
      />
    </>
  );
}
