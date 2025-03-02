import cn from 'classnames';

import TableCatchup from '../../Tables/TableCatchup/TableCatchup';
import TableCatchupLeaders from '../../Tables/TableCatchupLeaders/TableCatchupLeaders';
import TableCatchupSummary from '../../Tables/TableCatchupSummary/TableCatchupSummary';

import styles from './CatchUpComponent.module.css';

// Определяем категории, включаем 'D' для сезонов после 2023 года.
const season = new Date().getFullYear() - 1;
const categories = ['A', 'B', 'C'];
if (+season > 2023) {
  categories.push('D', 'E');
}

/**
 * Компонент отображения результатов серии заездов типа CatchUp.
 */
export default function CatchUpComponent({ series }) {
  const { results, resultsSummary, leaderboard } = series.seriesResults;

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__tables}>
          {/* Таблица побед каждой группы */}
          {!!resultsSummary?.length && (
            <section className={styles.table__total}>
              <TableCatchupSummary resultsSummary={resultsSummary} categories={categories} />
            </section>
          )}

          {/* Таблица лидеров по победам в группах */}
          {!!leaderboard?.length && (
            <section className={styles.wrapper__wide}>
              <TableCatchupLeaders leaderboard={leaderboard} />
            </section>
          )}

          {/* Таблица победителей в заездах */}
          <section className={cn(styles.wrapper__wide, styles.table__main)}>
            {!!results.length && <TableCatchup catchups={results} />}
          </section>
        </div>
      </div>
    </div>
  );
}
