import { useState } from 'react';
import { useDispatch } from 'react-redux';

import MyTooltip from '../../../HOC/MyTooltip';

import styles from './Checkbox.module.css';

function CheckboxSimple({
  state,
  apiRequest,
  property,
  message,
  setUpdate,
  resultId,
  tooltip,
}) {
  const [check, setCheck] = useState(() => state);

  const dispatch = useDispatch();

  const changeValue = () => {
    setCheck((prev) => !prev);
  };

  return (
    <MyTooltip tooltip={tooltip}>
      <input onChange={changeValue} checked={check} type="checkbox" className={styles.input} />
    </MyTooltip>
  );
}

export default CheckboxSimple;
