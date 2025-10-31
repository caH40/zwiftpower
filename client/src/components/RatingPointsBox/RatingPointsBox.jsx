import styles from './RatingPointsBox.module.css';

export default function RatingPointsBox({ points }) {
  return <div className={styles.wrapper}>{points}</div>;
}
