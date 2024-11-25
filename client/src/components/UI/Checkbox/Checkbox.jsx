import { useState } from 'react';
import { useDispatch } from 'react-redux';

import MyTooltip from '../../../HOC/MyTooltip';

import styles from './Checkbox.module.css';

function Checkbox({ state, apiRequest, property, message, resultId, tooltip }) {
  const [check, setCheck] = useState(() => state);

  const dispatch = useDispatch();

  const changeValue = () => {
    setCheck((prev) => !prev);

    // check отправляется как !check так как на текущем рендере еще не изменилось состояние check
    dispatch(
      apiRequest({
        property,
        data: { value: String(!check), message: message },
        id: resultId,
      })
    );
  };

  return (
    <MyTooltip tooltip={tooltip}>
      <input onChange={changeValue} checked={check} type="checkbox" className={styles.input} />
    </MyTooltip>
  );
}

export default Checkbox;
