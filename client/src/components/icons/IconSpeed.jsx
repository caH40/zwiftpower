import MyTooltip from '../../HOC/MyTooltip';

import styles from './icon.module.css';

function IconSpeed({ squareSize = 24, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <div className={styles.box__rules} style={{ width: squareSize, height: squareSize }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5883 11.2642L10.687 5.13856C10.5511 5.0538 10.3943 5.00613 10.2329 5.00055C10.0716 4.99497 9.91165 5.03169 9.76991 5.10685C9.62817 5.18201 9.50983 5.29286 9.4273 5.42776C9.34477 5.56267 9.30108 5.71667 9.30081 5.87363V8.17512L4.38618 5.13856C4.25029 5.0538 4.09345 5.00613 3.9321 5.00055C3.77075 4.99497 3.61083 5.03169 3.46909 5.10685C3.32735 5.18201 3.20902 5.29286 3.12649 5.42776C3.04396 5.56267 3.00027 5.71667 3 5.87363V18.1249C3.00027 18.2819 3.04396 18.4359 3.12649 18.5708C3.20902 18.7057 3.32735 18.8165 3.46909 18.8917C3.61083 18.9669 3.77075 19.0036 3.9321 18.998C4.09345 18.9924 4.25029 18.9447 4.38618 18.86L9.30081 15.8234V18.1249C9.30081 18.357 9.39565 18.5796 9.56445 18.7437C9.73326 18.9078 9.96221 19 10.2009 19C10.3734 18.9996 10.5421 18.951 10.687 18.86L20.5883 12.7343C20.7146 12.655 20.8185 12.5462 20.8904 12.4178C20.9623 12.2894 21 12.1455 21 11.9993C21 11.8531 20.9623 11.7092 20.8904 11.5808C20.8185 11.4524 20.7146 11.3435 20.5883 11.2642Z"
            fill="black"
          />
        </svg>
      </div>
    </MyTooltip>
  );
}

export default IconSpeed;
