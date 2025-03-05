import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { forwardRef } from 'react';

import { getTimerLocal } from '../../../utils/date-local';
import { fetchUpdateSeriesStage } from '../../../redux/features/api/series/fetchSeries';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import Button from '../Button/Button';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import InputAuth from '../InputAuth/InputAuth';

import styles from './FormStageSeries.module.css';

/**
 * Форма изменения параметров Этапа, добавленного в Серию заездов.
 * @param {Object} props - Пропсы компонента.
 * @param {Object} props.stage - Данные этапа серии для редактирования.
 * @param {Boolean} props.loading - Дата старта Эвента.
 */
const FormStageSeries = forwardRef(({ stage, setTrigger, setStageForEdit, loading }, ref) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    values: stage,
    defaultValues: { logoFile: null, posterFile: null },
  });

  const onSubmit = async ({ stageId, order, label, includeResults, seriesId }) => {
    try {
      const stage = {
        event: stageId,
        order: +order,
        label: label,
        includeResults: includeResults,
      };
      const res = await dispatch(fetchUpdateSeriesStage({ stage, seriesId })).unwrap();

      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));

      setTrigger((prev) => !prev);
      setStageForEdit(null);
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };

  return (
    <form ref={ref} className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>{stage.name}</h3>
      <h3 className={styles.subtitle}>{getTimerLocal(stage.eventStart, 'DDMMYYHm')}</h3>

      <div className={styles.box__field}>
        <InputAuth
          label={'Номер этапа (0 не отображается)*'}
          register={register('order', { required: 'Обязательное поле' })}
          validationText={errors.order?.message || ''}
          input={{ id: 'order-StageSeriesCard', type: 'number' }}
          placeholder="Введите 0-100"
          loading={loading}
        />
      </div>

      <div className={styles.box__field}>
        <InputAuth
          label={'Название этапа'}
          register={register('label')}
          validationText={errors.label?.message || ''}
          input={{ id: 'label-StageSeriesCard', type: 'text' }}
          loading={loading}
        />
      </div>

      <div className={styles.box__checkbox}>
        <span>Учитывать результаты заезда в генеральном зачёте:</span>
        <CheckboxRFH
          register={register('includeResults')}
          id={'includeResults-StageSeriesCard'}
          loading={loading}
          tooltip={'Учитывать результаты заезда в генеральном зачёте'}
        />
      </div>

      <div className={styles.spacer__btn}>
        <Button>Сохранить</Button>
      </div>
    </form>
  );
});

// Устанавливаем displayName для компонента
FormStageSeries.displayName = 'FormStageSeries';

export default FormStageSeries;
