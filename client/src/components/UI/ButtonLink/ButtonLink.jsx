import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { addClasses as cns } from '../../../utils/additional-classes';
import MyTooltip from '../../../HOC/MyTooltip';

import styles from './ButtonLink.module.css';

function ButtonLink({ children, addCls = '', to, toolTip }) {
  return (
    <MyTooltip toolTip={toolTip}>
      <Link to={to} className={cn(styles.button, cns(addCls, styles))}>
        {children}
      </Link>
    </MyTooltip>
  );
}

export default ButtonLink;
