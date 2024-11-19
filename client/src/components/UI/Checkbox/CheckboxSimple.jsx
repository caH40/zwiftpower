import MyTooltip from '../../../HOC/MyTooltip';

import styles from './Checkbox.module.css';

function CheckboxSimple({ checked, handleCheckboxChange, name, tooltip, disabled, ...props }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <input
        onChange={handleCheckboxChange}
        checked={checked}
        type="checkbox"
        className={styles.input}
        name={name}
        disabled={disabled}
        {...props}
      />
    </MyTooltip>
  );
}

export default CheckboxSimple;
