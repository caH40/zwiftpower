import UnderConstruction from '../UnderConstruction/UnderConstruction';

import styles from './StagesSeriesEdit.module.css';
/**
 * Компонент добавления/удаления и редактирования этапов в Серии заездов.
 */
export default function StagesSeriesEdit() {
  return (
    <div className={styles.wrapper}>
      <UnderConstruction />
      {/* <div className={cx('wrapper__stages', { inactive: loading || loadingForm })}>
        <StagesInSeries stages={stagesAdded} action="delete" handleAction={deleteStage} />

        <StagesInSeries stages={events} action="add" handleAction={addStage} />
      </div> */}
    </div>
  );
}
