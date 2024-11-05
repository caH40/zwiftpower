import styles from './TextArea.module.css';

export default function TextAreaSimple({ state, setState, name }) {
  return (
    <>
      {name ? <label className={styles.label}>{name}:</label> : undefined}
      <textarea
        value={state}
        onChange={(e) => setState(e.target.value)}
        className={styles.textarea}
      />
    </>
  );
}
