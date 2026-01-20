import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames/bind';

import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchUpdateSeriesStages } from '../../redux/features/api/series/fetchSeries';
import { getDuplicates } from '../../utils/duplicates';
import StagesInSeries from '../StagesInSeries/StagesInSeries';
import FormStageSeries from '../UI/FormStageSeries/FormStageSeries';
import StageSeriesCard from '../StageSeriesCard/StageSeriesCard';

import styles from './StagesSeriesEdit.module.css';

const cx = cn.bind(styles);

/**
 * Компонент добавления/удаления и редактирования этапов в Серии заездов.
 * @param {Object} props - Пропсы компонента.
 * @param {Boolean} props.setTrigger - Триггер повторного для запроса (обновления) данных для формы и списка Эвентов.
 */
export default function StagesSeriesEdit({ setTrigger, stages, seriesId }) {
  const [loading, setLoading] = useState(false);
  const [stageForEdit, setStageForEdit] = useState();

  // Повторяющиеся номера (order) этапов в Серии (0 не учитывается).
  const [duplicateStageNumber, setDuplicateStageNumber] = useState([]);

  // Эвенты, которые можно добавить в Серю как этапы.
  const { eventsForSeries } = useSelector((state) => state.fetchEvents);

  const formRef = useRef(null);

  const dispatch = useDispatch();

  // Поиск номеров этапов, которые встречаются у двух и более этапов.
  useEffect(() => {
    if (!stages?.length) {
      return;
    }

    const duplicates = getDuplicates({
      elements: stages.map((elm) => elm.order),
      exception: 0,
    });

    setDuplicateStageNumber([...duplicates]);
  }, [stages]);

  // Обработчик нажатия на иконку добавления Эвента в Этапы Серии заездов.
  const handleClickForStage = async (eventId, action, eventName) => {
    if (action === 'delete') {
      const response = window.confirm(
        `Вы действительно хотите удалить Этап: "${eventName}" из Серии заездов?`
      );
      if (!response) {
        const message = `Отмена удаления Этапа:  "${eventName}"`;
        dispatch(getAlert({ message, type: 'warning', isOpened: true }));

        return;
      }
    }

    try {
      const stage = {
        event: eventId,
        order: 0,
        label: '',
        includeResults: true,
      };
      const res = await dispatch(fetchUpdateSeriesStages({ action, stage, seriesId })).unwrap();

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));

      setTrigger((prev) => !prev);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  // Обработчик нажатия на иконку редактирования параметров Этапа Серии заездов.
  const handleClickEditStage = async (stage) => {
    setStageForEdit(stage);

    await new Promise((resolve) => setTimeout(resolve, 0)); // Дождаться рендера формы
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Этапы, добавленные в текущую серию</h3>
      <div className={styles.wrapper__stages}>
        {stages.map((stage) => (
          //  Карточка Этапа для контроля параметров.
          <StageSeriesCard
            key={stage._id}
            handleDelete={handleClickForStage}
            handleEdit={handleClickEditStage}
            name={stage.name}
            order={stage.order}
            stageLabel={stage.label}
            includeResults={stage.includeResults}
            eventStart={stage.eventStart}
            seriesId={seriesId}
            stageId={stage._id}
            connected={duplicateStageNumber.includes(stage.order)}
            disableTimeGapRule={stage.disableTimeGapRule}
            requiredForGeneral={stage.requiredForGeneral}
          />
        ))}
      </div>

      {/* Форма изменения параметров Этапа */}
      {stageForEdit?.seriesId && (
        <FormStageSeries
          stage={stageForEdit}
          setStageForEdit={setStageForEdit}
          loading={loading}
          setLoading={setLoading}
          setTrigger={setTrigger}
          ref={formRef}
        />
      )}

      {/* Таблица со список Эвентов для возможного добавления как этапов в Серию */}
      <div className={cx('stages')}>
        <StagesInSeries
          stages={eventsForSeries}
          action="add"
          loading={loading}
          handleAction={handleClickForStage}
          setStageForEdit={setStageForEdit}
        />
      </div>
    </div>
  );
}
