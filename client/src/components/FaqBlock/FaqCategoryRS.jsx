import IconCategoryEnforced from '../icons/IconScoreBased';
import TableCategoryRS from '../Tables/TableCategory/TableCategoryRS';

import styles from './FaqBlock.module.css';

/**
 * Краткое описание Racing Score.
 */
function FaqCategoryRS() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Отображение категорий на основе Racing Score</h2>
      <div className={styles.box}>
        <p className={styles.text}>
          Категории согласно информации с официального сайта Звифта:{' '}
          <a
            href="https://support.zwift.com/en_us/racing-score-faq-BkG9_Rqrh"
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            Racing Score FAQ
          </a>
          <br />
          Эти категории основаны на диапазонах оценок и делят гонщиков на категории в
          зависимости от их результатов в гонках и мощности.
        </p>
        <div className={styles.icon}>
          <IconCategoryEnforced squareSize={50} />
        </div>
      </div>
      <TableCategoryRS />
    </div>
  );
}

export default FaqCategoryRS;
