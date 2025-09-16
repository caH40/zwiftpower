import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { getDateTimeStart } from '../../../utils/date-local';
import { fetchGetEventsForMailing } from '../../../redux/features/api/eventPreviewSlice';
import Button from '../Button/Button';
import InputAuth from '../InputAuth/InputAuth';

import styles from './FormEventsEmailPreview.module.css';

// Сегодняшняя дата для инициализации в формате dd-mm-yyyy.
const dateNow = getDateTimeStart(new Date().toISOString()).date;

/**
 * Форма создания команды.
 * @param {Object} props - Пропсы компонента.
 * @param {Boolean} props.loading - Дата старта Эвента.
 */

export default function FormEventsEmailPreview({ loading }) {
  // Статус загрузки текущей формы на сервер.
  const [loadingForm, setLoadingForm] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    values: { startDate: dateNow, endDate: dateNow },
  });

  // Следим за изменениями обеих дат.
  const watchStartDate = watch('startDate');
  const watchEndDate = watch('endDate');

  // Эффект для перепроверки даты окончания при изменении даты начала
  useEffect(() => {
    if (watchStartDate) {
      trigger('endDate'); // Принудительно валидируем endDate
    }
  }, [watchStartDate, trigger]);

  // Эффект для перепроверки даты начала при изменении даты окончания
  useEffect(() => {
    if (watchEndDate) {
      trigger('startDate'); // Принудительно валидируем startDate
    }
  }, [watchEndDate, trigger]);

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    try {
      setLoadingForm(true);

      const data = await dispatch(fetchGetEventsForMailing(formData)).unwrap();

      // Успешный результат.
      dispatch(getAlert({ message: data.message, type: 'success', isOpened: true }));
      reset();
    } catch (error) {
      console.log(error); // eslint-disable-line
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper__fields}>
        {/* Поле для даты старта серии */}
        <div className={styles.wrapper__input}>
          <InputAuth
            label={'Дата начала выборки старта Эвентов*'}
            register={register('startDate', {
              required: 'Обязательное поле',
              validate: (value) => {
                const startDate = new Date(value);
                const endDate = new Date(getValues('endDate'));

                if (isNaN(endDate.getTime())) {
                  return 'Некорректная дата';
                }

                if (endDate < startDate) {
                  return 'Дата начала не может быть позже даты окончания';
                }
                return true;
              },
            })}
            validationText={errors.startDate?.message || ''}
            input={{
              id: 'startDate-FormOrganizerSeriesCreate',
              type: 'date',
              max: watchEndDate,
            }}
            loading={loading || loadingForm}
          />
        </div>

        {/* Поле для даты завершения серии */}
        <div className={styles.wrapper__input}>
          <InputAuth
            label="Дата окончания выборки Эвентов*"
            register={register('endDate', {
              required: 'Обязательное поле',
              validate: (value) => {
                const startDate = new Date(getValues('startDate')); // Получаем дату старта.
                const endDate = new Date(value);

                if (isNaN(endDate.getTime())) {
                  return 'Некорректная дата';
                }

                if (endDate < startDate) {
                  return 'Дата окончания не может быть раньше даты начала';
                }
                return true;
              },
            })}
            validationText={errors.endDate?.message || ''}
            input={{
              id: 'endDate-FormOrganizerSeriesCreate',
              type: 'date',
              min: watchStartDate,
            }}
            loading={loading || loadingForm}
          />
        </div>
      </div>

      <div className={styles.box__btn}>
        <Button disabled={loading || loadingForm || Object.keys(errors).length > 0}>
          Отправить
        </Button>
      </div>
    </form>
  );
}
