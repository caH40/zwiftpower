import styles from './ButtonText.module.css';

function ButtonText({ getClick, children, disabled }) {
  return (
    <button className={styles.button} onClick={getClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default ButtonText;
