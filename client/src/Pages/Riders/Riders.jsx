import useTitle from '../../hook/useTitle';

import styles from './Riders.module.css';

function Riders() {
  useTitle('Участники заездов');
  return <div className={styles.wrapper}>Riders</div>;
}

export default Riders;
