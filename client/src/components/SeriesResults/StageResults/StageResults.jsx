import { useParams } from 'react-router-dom';

import UnderConstruction from '../../UnderConstruction/UnderConstruction';

import styles from './StageResults.module.css';

/**
 * Страница с результатами этапа Серии заездов.
 */
export default function StageResults() {
  const params = useParams();

  // console.log(params);

  return (
    <div className={styles.wrapper}>
      <UnderConstruction />
    </div>
  );
}
