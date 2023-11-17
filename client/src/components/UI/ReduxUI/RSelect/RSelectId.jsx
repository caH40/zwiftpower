import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';
import { closePopupInput } from '../../../../redux/features/popupInputSlice';

import styles from './RSelect.module.css';

/**
 * Select при работе с redux, выбор value происходит по id
 */
function RSelectId({ subgroupIndex, label, property, disabled, options }) {
  const dispatch = useDispatch();
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);

  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <select
        className={styles.select}
        value={blockWithParameters()[property] || ''} // select не может быть null
        onChange={(e) => {
          dispatch(inputHandler({ [property]: +e.target.value, index: subgroupIndex }));
          // закрывать модальное окно после выбора селекта
          dispatch(closePopupInput());
        }}
        disabled={disabled}
      >
        <option className={styles.option} value=""></option>
        {options.map((element) => (
          <option className={styles.option} value={element.id} key={element.id}>
            {element.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default RSelectId;
