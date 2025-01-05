import { useDispatch } from 'react-redux';

import useBlockParameters from '../../../../hook/useBlockParameters';
import { closePopupInput } from '../../../../redux/features/popupInputSlice';

import styles from './RSelect.module.css';

/**
 * Select при работе с redux, выбор value происходит по name
 */
function RSelect({ subgroupIndex, label, property, disabled, options, closeEmptyOption }) {
  const dispatch = useDispatch();
  const { inputHandler, blockWithParameters } = useBlockParameters(subgroupIndex);

  return (
    <>
      <label className={styles.label}>{label || property}</label>
      <select
        className={styles.select}
        value={blockWithParameters()[property] || ''} // select не может быть null
        onChange={(e) => {
          dispatch(inputHandler({ [property]: e.target.value, index: subgroupIndex }));
          // закрывать модальное окно после выбора селекта
          dispatch(closePopupInput());
        }}
        disabled={disabled}
      >
        {!closeEmptyOption && <option className={styles.option} value=""></option>}
        {/* <option className={styles.option} value=""></option> */}
        {options.map((element) => (
          <option className={styles.option} value={element.name} key={element.id}>
            {element.translate ? element.translate : element.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default RSelect;
