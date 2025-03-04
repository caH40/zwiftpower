import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import cn from 'classnames/bind';

import { getAlert } from '../../redux/features/alertMessageSlice';
import { fetchUpdateSeriesStages } from '../../redux/features/api/series/fetchSeries';
import StagesInSeries from '../StagesInSeries/StagesInSeries';
import StageSeriesCard from '../UI/StageSeriesCard/StageSeriesCard';

import styles from './StagesSeriesEdit.module.css';

const cx = cn.bind(styles);

/**
 * Компонент добавления/удаления и редактирования этапов в Серии заездов.
 * @param {Object} props - Пропсы компонента.
 * @param {Boolean} props.setTrigger - Триггер повторного для запроса (обновления) данных для формы и списка Эвентов.
 */
export default function StagesSeriesEdit({ setTrigger, stages, seriesId }) {
  const [loading, setLoading] = useState(false);
  // Эвенты, которые можно добавить в Серю как этапы.
  const { eventsForSeries } = useSelector((state) => state.fetchEvents);

  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    values: { stages: stages || [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stages',
  });

  const onSubmit = (data) => {
    console.log('Отправленные данные:', data);
  };

  // Обработчик нажатия на иконку добавления Эвента в Этапы Серии заездов.
  const handleClickForStage = async (eventId, action) => {
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

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {fields.map((stage, index) => (
          <StageSeriesCard
            key={stage._id}
            name={stage.name}
            eventStart={stage.eventStart}
            propertyOrder={`stages.${index}.order`}
            propertyStageName={`stages.${index}.label`}
            propertyIncludeResults={`stages.${index}.includeResults`}
            register={register}
            errors={errors}
            handleDelete={handleClickForStage}
            seriesId={seriesId}
            loading={false}
            stageId={stage._id}
          />
        ))}

        {/* <button type="button" onClick={() => append({ order: 0, includeResults: false })}>
          Добавить этап
        </button>
        <button type="submit">Сохранить</button> */}
      </form>

      <div className={cx('stages')}>
        <StagesInSeries
          stages={eventsForSeries}
          action="add"
          loading={loading}
          handleAction={handleClickForStage}
        />
      </div>
    </div>
  );
}
