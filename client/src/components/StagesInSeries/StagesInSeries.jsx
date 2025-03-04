import { useMemo } from 'react';

import { getTimerLocal } from '../../utils/date-local';
import IconAdd from '../icons/IconAdd';
import IconDelete from '../icons/IconDelete';
// import SelectNumbers from '../UI/SelectNumbers/SelectNumbers';

import styles from './StagesInSeries.module.css';

// Массив значений номеров этапов для выбора в селекте.
const orders = Array(15)
  .fill(null)
  .map((_, index) => index + 1);

/**
 * Блок отображения добавленных Эвентов (этапов) в серию заездов для формы редактирования Серии.
 *
 * @param {object} props
 * @param {{_id: string, eventStart: string, name: string}[]} props.stages - Данные Эвентов.
 * @param {'delete' | 'add'} props.action - Тип действия (удаление или добавление).
 * @param {function} props.handleAction - Обработчик нажатия.
 */
export default function StagesInSeries({ stages, action, handleAction, loading }) {
  const actionData = useMemo(
    () => ({
      delete: { title: 'Этапы в Серии', icon: IconDelete, isVisibleOrder: true },
      add: { title: 'Эвенты для добавления в Серию', icon: IconAdd, isVisibleOrder: false },
    }),
    []
  );

  const { title, icon: IconComponent, isVisibleOrder } = actionData[action];

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.wrapper__stages}>
        {/* Шапка таблицы */}
        <div className={styles.stage}>
          <span className={styles.column__name}>Дата</span>
          <span className={styles.column__name}>Название</span>
          {isVisibleOrder && <span className={styles.column__name}>Этап</span>}
          <span className={styles.column__name}>Упр.</span>
        </div>

        {/* Тело таблицы */}
        {stages.map((stage) => (
          <div className={styles.stage} key={stage._id}>
            <div className={styles.date}>{getTimerLocal(stage.eventStart, 'DDMMYYHm')}</div>
            <div className={styles.name}>{stage.name}</div>
            {
              isVisibleOrder && stage.order
              // <div className={styles.name}>
              //   <SelectNumbers options={orders} defaultValue={stage.order} />
              // </div>
            }
            <div className={styles.control}>
              <IconComponent squareSize={18} getClick={() => handleAction(stage._id, 'add')} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
