import { useMemo } from 'react';

import { getTimerLocal } from '../../utils/date-local';
import IconAdd from '../icons/IconAdd';
import IconDelete from '../icons/IconDelete';

import styles from './StagesInSeries.module.css';

/**
 * Блок отображения добавленных Эвентов (этапов) в серию заездов для формы редактирования Серии.
 *
 * @param {object} props
 * @param {{_id: string, eventStart: string, name: string}[]} props.stages - Данные Эвентов.
 * @param {'delete' | 'add'} props.action - Тип действия (удаление или добавление).
 * @param {function} props.handleAction - Обработчик нажатия.
 */
export default function StagesInSeries({ stages, action, handleAction }) {
  const actionData = useMemo(
    () => ({
      delete: { title: 'Этапы в Серии', icon: IconDelete },
      add: { title: 'Эвенты для добавления в Серию', icon: IconAdd },
    }),
    []
  );

  const { title, icon: IconComponent } = actionData[action];

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.wrapper__stages}>
        {/* Шапка таблицы */}
        <div className={styles.stage}>
          <span>Дата</span>
          <span>Название</span>
          <span>Упр.</span>
        </div>

        {/* Тело таблицы */}
        {stages.map((stage) => (
          <div className={styles.stage} key={stage._id}>
            <div className={styles.date}>{getTimerLocal(stage.eventStart, 'DDMMYYHm')}</div>
            <div className={styles.name}>{stage.name}</div>
            <div className={styles.control}>
              <IconComponent squareSize={18} getClick={() => handleAction(stage)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
