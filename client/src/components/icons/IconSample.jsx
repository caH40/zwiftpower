import React from 'react';
import cn from 'classnames';

import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconSample({ tooltip, getClick, squareSize = 24 }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div
        className={cn(styles.box__rules, styles.animate, { [styles.pointer]: getClick })}
        style={{ width: squareSize, height: squareSize }}
        onClick={getClick}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.50022 10.7485L3.73936 8.00088L5.68495 6.87695L4.81527 6.375L2 8.00088L8.50022 11.7513L14.9995 8.00088L12.1842 6.375L11.3164 6.87695L13.2611 8.00088L8.50022 10.7485Z"
            fill="#0F4FA8"
          />
          <path
            d="M8.50022 13.9975L3.73936 11.2499L5.68495 10.126L4.81527 9.62402L2 11.2499L8.50022 15.0003L14.9995 11.2499L12.1842 9.62402L11.3164 10.126L13.2611 11.2499L8.50022 13.9975Z"
            fill="#0F4FA8"
          />
          <path
            d="M8.50022 1L2 4.75043L8.50022 8.49977L14.9995 4.74934L8.50022 1ZM8.50022 2.00281L13.2611 4.75043L8.50022 7.49805L3.73936 4.75043L8.50022 2.00281Z"
            fill="#0F4FA8"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconSample;
