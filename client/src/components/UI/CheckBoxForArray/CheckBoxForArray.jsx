import { useEffect, useState } from 'react';

import styles from './CheckBoxForArray.module.css';

/**
 *
 * @param {{id:string}} id id элемента, добавляемого,удаляемого в массив arrayId
 */
export function CheckBoxForArray({ checkedTotal, arrayId, setArrayId, id }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(arrayId.includes(id));
  }, [checkedTotal]);

  const changeValue = () => {
    // данная функция вызвалась после снятия/установки крыжика
    if (checked) {
      // checkbox был отмечен, данная функция вызвалась после снятия крыжика
      setChecked(false);
      setArrayId(arrayId.filter((elm) => elm !== id));
    } else {
      setChecked(true);
      setArrayId([...arrayId, id]);
    }
  };
  return (
    <input className={styles.input} type="checkbox" onChange={changeValue} checked={checked} />
  );
}
