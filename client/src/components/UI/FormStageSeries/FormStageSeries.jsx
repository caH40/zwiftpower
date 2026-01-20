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
const FormStageSeries = forwardRef(
  ({ stage, setTrigger, setStageForEdit, loading, setLoading }, ref) => {
    const dispatch = useDispatch();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: 'all',
      values: stage,
      defaultValues: { logoFile: null, posterFile: null, requiredForGeneral: true },
    });

    const onSubmit = async ({
      stageId,
      order,
      label,
      includeResults,
      seriesId,
      disableTimeGapRule,
      requiredForGeneral,
    }) => {
      try {
        setLoading(true);

        const stage = {
          event: stageId,
          order: +order,
          label: label,
          includeResults: includeResults,
          disableTimeGapRule,
          requiredForGeneral,
        };
        const res = await dispatch(fetchUpdateSeriesStage({ stage, seriesId })).unwrap();

        dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));

        setTrigger((prev) => !prev);
        setStageForEdit(null);
      } catch (error) {
        console.log(error); // eslint-disable-line
      } finally {
        setLoading(false);
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
          <span>Обязательный этап для попадания в генеральный зачёт:</span>
          <CheckboxRFH
            register={register('requiredForGeneral')}
            id={'requiredForGeneral-StageSeriesCard'}
            loading={loading}
            tooltip={
              'Обязательно финишировать на этапе для попадания в генеральный зачёт. Очки/время могут не учитываться в ГК'
            }
          />

          <span>Учитывать результаты заезда в генеральном зачёте:</span>
          <CheckboxRFH
            register={register('includeResults')}
            id={'includeResults-StageSeriesCard'}
            loading={loading}
            tooltip={'Учитывать результаты заезда в генеральном зачёте'}
          />

          <span className={styles.checkbox__text}>
            Отключить правило разрыва времени для этого этапа:
          </span>
          <CheckboxRFH
            id="disableTimeGapRule-StageSeriesCard"
            register={register('disableTimeGapRule')}
            loading={loading}
            tooltip="Отключить применение правила одинакового времени для группового финиша на этапе"
          />
        </div>

        <div className={styles.spacer__btn}>
          <Button disabled={loading}>Сохранить</Button>
        </div>
      </form>
    );
  }
);

// Устанавливаем displayName для компонента
FormStageSeries.displayName = 'FormStageSeries';

export default FormStageSeries;
