import cn from 'classnames/bind';

import styles from '../SimpleSelect/SimpleSelect.module.css';

const cx = cn.bind(styles);

/**
 * Select для использования библиотеки react-hook-form
 */
function SelectWithRHF({
  register,
  label = null,
  options,
  validationText,
  closeEmptyOption,
  loading,
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box__text}>
        {label ? (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        ) : undefined}

        {validationText ? <span className={styles.wrong}>{validationText}</span> : undefined}
      </div>

      <div className={styles.wrapper__select}>
        <select
          className={cx('select', { error: validationText })}
          {...register}
          {...props}
          disabled={loading}
        >
          {!closeEmptyOption && <option className={styles.option} value=""></option>}

          {options.map((element) => (
            <option className={styles.option} value={element.value} key={element.id}>
              {element.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectWithRHF;
