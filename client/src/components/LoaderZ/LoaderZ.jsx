import React from 'react';
import cn from 'classnames';

import styles from './LoaderZ.module.css';

function LoaderZ({ isLoading }) {
  return (
    <svg
      className={cn(styles.loader, { [styles.loader]: isLoading })}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={cn(styles.path, { [styles.loading]: isLoading })}
        transform-origin="center"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.99641 75.4477L1.99706 75.4466L26.4007 33.5347H15.6544C7.00872 33.5347 0 26.0277 0 16.7674C0 7.50701 7.00872 0 15.6544 0H100L62.1637 66.4653H72.6309C81.2766 66.4653 88.2853 73.9723 88.2853 83.2326C88.2853 92.493 81.2766 100 72.6309 100H15.6544C7.05578 100 0.0763463 92.5745 0.000622075 83.3837H0C0 83.3543 3.61355e-05 83.3251 0.000108962 83.2959C3.63418e-05 83.2748 0 83.2537 0 83.2326H0.000324946C0.0138338 80.1225 0.452191 78.0043 1.99641 75.4477Z"
        fill="#05316D"
      />
    </svg>
  );
}

export default LoaderZ;
