import CardRecommendation from '../CardRecommendation/CardRecommendation';

import { ogPages } from './data';
import styles from './RecommendationBlock.module.css';

function RecommendationBlock() {
  return (
    <>
      {ogPages.map((ogPage) => (
        <CardRecommendation ogPage={ogPage} key={ogPage.id} />
      ))}
    </>
  );
}

export default RecommendationBlock;
