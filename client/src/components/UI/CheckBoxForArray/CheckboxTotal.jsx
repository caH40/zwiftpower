import styles from './CheckBoxForArray.module.css';

/**
 * добавляет/убирает все ids из массива
 *
 * при изменении состояния checked отмечаются/снимаются отметки со всех checkbox в таблице
 * изменение происходит в каждом checkbox
 * @param {{id:string}} id id элемента, добавляемого,удаляемого в массив arrayId
 */
export function CheckBoxTotal({ checked, setChecked, arrayId, setArrayId, ids }) {
  const changeValue = () => {
    if (checked) {
      setArrayId([]);
      setChecked(false);
    } else {
      setArrayId(ids);
      setChecked(true);
    }
  };
  return (
    <input className={styles.input} type="checkbox" onChange={changeValue} checked={checked} />
  );
}
