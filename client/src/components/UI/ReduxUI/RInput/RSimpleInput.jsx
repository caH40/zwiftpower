import { useDispatch } from 'react-redux';

import styles from './RInput.module.css';

function RSimpleInput({ reducer, value, label, type, property, disabled }) {
  const dispatch = useDispatch();

  return (
    <>
      <label className={styles.label}>
        {label || property}
        <input
          className={styles.input}
          type={type}
          value={value}
          onChange={(e) => dispatch(reducer(e.target.value))}
          disabled={disabled}
        />
      </label>
    </>
  );
}

export default RSimpleInput;
