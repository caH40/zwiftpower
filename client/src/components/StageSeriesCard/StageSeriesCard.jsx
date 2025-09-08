import { getTimerLocal } from '../../utils/date-local';
import IconConnection from '../icons/IconConnection';
import IconEdit from '../icons/IconEdit';
import IconDelete from '../icons/IconDelete';
import CheckboxSimple from '../UI/Checkbox/CheckboxSimple';
import MyTooltip from '../../HOC/MyTooltip';

import styles from './StageSeriesCard.module.css';

/**
 * Карточка изменения параметров Этапа, добавленного в Серию заездов.
 * @param {Object} props - Пропсы компонента.
 * @param {String} props.name - Название Эвента (этапа Серии заездов).
 * @param {Number} props.order - Номер этапа.
 * @param {String} [props.stageLabel] - Название этапа.
 * @param {String} props.startEvent - Дата старта Эвента.
 * @param {any} props.handleEdit - Обработчик нажатия иконки редактирования.
 * @param {any} props.handleDelete - Обработчик нажатия иконки удаления.
 * @param {Boolean} props.connected - Указывает о наличии такого же номера этапа у других этапов (0 не учитывается)
 * @param {Boolean} props.seriesId - _id Серии заездов.
 * @param {Boolean} props.loading - Дата старта Эвента.
 */
export default function StageSeriesCard({
  name,
  order,
  stageLabel,
  includeResults,
  eventStart,
  handleEdit,
  handleDelete,
  loading,
  stageId,
  seriesId,
  connected,
}) {
  const stage = {
    name,
    eventStart,
    order,
    includeResults,
    stageId,
    label: stageLabel,
    seriesId,
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__top}>
        {/* Номер этапа */}
        <MyTooltip tooltip="Номер этапа" placement={'top'}>
          <div className={styles.order}>{order}</div>
        </MyTooltip>

        {/* Название Эвента и дата старта */}
        <div className={styles.titles}>
          <h3 className={styles.title}>{name}</h3>
          <h3 className={styles.subtitle}>{getTimerLocal(eventStart, 'DDMMYYHm')}</h3>
        </div>
      </div>

      <div className={styles.box__checkbox}>
        <span>Результаты учитываются:</span>
        <CheckboxSimple loading={loading} checked={includeResults} disabled={true} />
      </div>

      {stageLabel && (
        <div className={styles.box__checkbox}>
          <span>Название Этапа:</span>
          <div className={styles.stage__label}>{stageLabel}</div>
        </div>
      )}

      <div className={styles.wrapper__values}>
        {/* Название этапа, если есть */}

        {/* Отображение  */}
        <div className={styles.box__iconConnection}>
          {connected && (
            <IconConnection
              tooltip={'Номер этапа совпадает с номером другого этапа'}
              squareSize={45}
            />
          )}
        </div>
      </div>

      <div className={styles.box__icon}>
        <IconEdit getClick={() => handleEdit(stage)} squareSize={18} />
        <IconDelete getClick={() => handleDelete(stageId, 'delete', name)} squareSize={18} />
      </div>
    </section>
  );
}
