import MyTooltip from '../../../HOC/MyTooltip';

import styles from './Checkbox.module.css';

/**
 * Универсальный чекбокс, который пропсом принимает обработчик нажатия кнопки.
 */
export default function CheckboxU({ handlerCheckbox, checked, name, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <input
        onChange={handlerCheckbox}
        checked={checked}
        type="checkbox"
        className={styles.input}
        name={name}
        id={name}
      />
    </MyTooltip>
  );
}
