import Spinner from '../../components/UI/Spinner/Spinner';

import styles from './LoadingPage.module.css';

export function LoadingPage() {
  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
}
