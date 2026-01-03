import styles from './CloseButton.module.css';

export default function CloseButton({ onClick, radius = 24 }) {
  return (
    <button
      className={styles.btn}
      style={{ width: radius, height: radius }}
      onClick={() => onClick()}
      type="button"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
}
