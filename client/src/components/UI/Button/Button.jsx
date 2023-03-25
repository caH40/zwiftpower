import React from 'react';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes.js';

import MyTooltip from '../../../HOC/MyTooltip.jsx';

import styles from './Button.module.css';

const Button = ({ getClick, children, addCls = '', toolTip, disabled, ...props }) => {
  return (
    <>
      {disabled ? ( // mui toolpit не работает с кнопкой с disabled (mui рекомендует поместить кнопку в <span>)
        <button
          className={cn(styles.button, cns(addCls, styles))}
          onClick={
            getClick
              ? (e) => {
                e.preventDefault();
                getClick();
							  }
              : undefined
          }
          disabled={disabled}
          {...props}
        >
          {children}
        </button>
      ) : (
        <MyTooltip toolTip={toolTip}>
          <button
            className={cn(styles.button, cns(addCls, styles))}
            onClick={
              getClick
                ? (e) => {
                  e.preventDefault();
                  getClick();
								  }
                : undefined
            }
            disabled={disabled}
            {...props}
          >
            {children}
          </button>
        </MyTooltip>
      )}
    </>
  );
};

export default Button;
