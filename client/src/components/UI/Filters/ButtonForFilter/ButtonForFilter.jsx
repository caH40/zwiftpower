import { useDispatch } from 'react-redux';
import cn from 'classnames';

import styles from './ButtonForFilter.module.css';

function ButtonForFilter({ positionClassName, children, active, reducer, label }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(reducer({ name: children, isActive: true }))}
      className={cn(styles.button, styles[positionClassName], {
        [styles.active]: active,
      })}
    >
      {label || children}
    </button>
  );
}

export default ButtonForFilter;
