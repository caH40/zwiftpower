import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';

import { addClasses as cns } from '../../../utils/additional-classes';

import styles from './InputAuth.module.css';

const cx = cn.bind(styles);

function InputAuth({ label, register, input, validationText, link, addCls = ' ', ...props }) {
  return (
    <div className={cn(styles.wrapper, cns(styles, addCls))}>
      <div className={styles.box__text}>
        {label ? (
          <label className={styles.label} htmlFor={input.id}>
            {label}
          </label>
        ) : undefined}

        {validationText ? <span className={styles.wrong}>{validationText}</span> : undefined}

        {link ? (
          <Link className={styles.link} to={link.to}>
            {link.text}
          </Link>
        ) : undefined}
      </div>

      <input
        {...register}
        {...input}
        className={cx('input', { error: validationText?.length > 0 })}
        {...props}
      />
    </div>
  );
}

export default InputAuth;
