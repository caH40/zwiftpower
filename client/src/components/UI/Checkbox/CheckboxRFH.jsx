import MyTooltip from '../../../HOC/MyTooltip';

import styles from './Checkbox.module.css';

/**
 * RFH - React Form Hook
 */
export default function CheckboxRFH({ register, id, loading, tooltip }) {
  return (
    <MyTooltip tooltip={tooltip}>
      <input
        type="checkbox"
        className={styles.input}
        {...register}
        id={id}
        disabled={loading}
      />
    </MyTooltip>
  );
}
