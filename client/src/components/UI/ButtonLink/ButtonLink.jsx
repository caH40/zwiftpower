import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './ButtonLink.module.css';

function ButtonLink({ children, addCls = '', to, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <Link to={to} className={cn(styles.button, cns(styles, addCls))}>
        {children}
      </Link>
    </MyTooltip>
  );
}

export default ButtonLink;
