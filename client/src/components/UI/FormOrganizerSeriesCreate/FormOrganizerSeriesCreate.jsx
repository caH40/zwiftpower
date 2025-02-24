import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import cn from 'classnames/bind';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { getDateTimeStart } from '../../../utils/date-local';
import { fetchPostSeriesOrganizer } from '../../../redux/features/api/series/fetchSeries';
import { serializeOrganizerSeriesCreate } from '../../../utils/serialization/organizer-data';
import { convertToKBytes, convertToMBytes } from '../../../utils/bytes';
import TextAreaRFH from '../TextArea/TextAreaRFH';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import Button from '../Button/Button';
import InputAuth from '../InputAuth/InputAuth';
import BlockUploadImage from '../../BlockUploadImage/BlockUploadImage';
import StagesInSeries from '../../StagesInSeries/StagesInSeries';

import styles from './FormOrganizerSeriesCreate.module.css';

const cx = cn.bind(styles);

// Сегодняшняя дата для инициализации в формате dd-mm-yyyy.
const dateNow = getDateTimeStart(new Date().toISOString()).date;

/**
 * Форма изменения данных организатора (описание, лого, изображение и т.д...).
 */
export default function FormOrganizerSeriesCreate({
  isCreating,
  eventsForSeries,
  seriesOne: {
    dateStart,
    dateEnd,
    name,
    logoUrls,
    posterUrls,
    mission,
    description,
    stages,
    hasGeneral,
    hasTeams,
    isFinished,
    type,
  },
  loading,
}) {
  // Статус загрузки текущей формы на сервер.
  const [loadingForm, setLoadingForm] = useState(false);

  // Эвенты для добавления в Серию заездов.
  const [events, setEvents] = useState(eventsForSeries);

  // Эвенты добавленные в Серию заездов.
  const [stagesAdded, setStagesAdded] = useState(stages);

  // Ссылка на лого Организатора. Используется в форме редактирования, для отображения изображения с сервера.
  const [logoSrcState, setLogoSrcState] = useState(logoUrls?.original);

  // Ссылка на постер Организатора. Используется в форме редактирования, для отображения изображения с сервера.
  const [posterSrcState, setPosterSrcState] = useState(posterUrls?.small);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    values: {
      dateStart: isCreating ? dateNow : dateStart,
      dateEnd: isCreating ? dateNow : dateEnd,
      name,
      description,
      mission,
      hasGeneral,
      hasTeams,
      isFinished,
      type,
    },
    defaultValues: { logoFile: null, posterFile: null },
  });

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    try {
      setLoadingForm(true);
      console.log(stagesAdded);

      // Сериализация данных перед отправкой на сервер.
      // const serializedSeriesData = serializeOrganizerSeriesCreate({
      //   ...formData,
      //   stages: stagesAdded,
      // });

      // // .unwrap() возвращает промис, для работы с async/await
      // const data = await dispatch(fetchPostSeriesOrganizer(serializedSeriesData)).unwrap();

      // // Успешный результат.
      // dispatch(getAlert({ message: data.message, type: 'success', isOpened: true }));

      // // Очистка полей формы
      // reset();
      // setStagesAdded([]);
    } catch (error) {
      console.log(error); // eslint-disable-line
    } finally {
      setLoadingForm(false);
    }
  };

  // Удаление Эвента(этапа) из серии.
  const deleteStage = (currentStage) => {
    setStagesAdded((prev) => prev.filter((elm) => elm._id !== currentStage._id));
    setEvents((prev) => [...prev, currentStage]);
  };

  // Добавление Эвента(этапа) в серию.
  const addStage = (currentStage) => {
    setStagesAdded((prev) => {
      // Получение последнего номера Этапа для вычисления следующего номера.
      const orders = prev.map((e) => (isNaN(e.order) ? 0 : e.order));
      const lastOrder = Math.max(...orders, 0);

      return [...prev, { ...currentStage, order: lastOrder + 1 }];
    });
    setEvents((prev) => prev.filter((elm) => elm._id !== currentStage._id));
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper__fields}>
        <div className={styles.box__checkbox}>
          <span>Наличие команд</span>
          <CheckboxRFH
            register={register('hasTeams')}
            id={'hasTeams-FormOrganizerSeriesCreate'}
            loading={loading}
            tooltip={'Расчет/отображение командного расчета'}
          />
        </div>

        <div className={styles.box__checkbox}>
          <span>Отображение итоговых таблиц</span>
          <CheckboxRFH
            register={register('hasGeneral')}
            id={'hasGeneral-FormOrganizerSeriesCreate'}
            loading={loading}
          />
        </div>

        <div className={styles.box__checkbox}>
          <span>Серия завершена</span>
          <CheckboxRFH
            register={register('isFinished')}
            id={'isFinished-FormOrganizerSeriesCreate'}
            loading={loading}
            tooltip={'запрет на обновление итоговых таблиц'}
          />
        </div>

        <div className={styles.wrapper__input}>
          <InputAuth
            label={'Название (добавляйте год для уникальности)'}
            register={register('name', {
              required: 'Обязательное поле',
              minLength: { value: 6, message: 'Больше 5ти символов' },
              maxLength: { value: 50, message: 'Не больше 50 символов' },
            })}
            validationText={errors.name?.message || ''}
            input={{ id: 'name-FormOrganizerSeriesCreate', type: 'text' }}
            placeholder="Название всей серии заездов"
            loading={loading || loadingForm}
          />
        </div>

        {/* Поле для даты старта серии */}
        <div className={styles.wrapper__input}>
          <InputAuth
            label={'Дата старта Серии'}
            register={register('dateStart', {
              required: 'Обязательное поле',
              validate: (value) => {
                const startDate = new Date(value);
                const endDate = new Date(getValues('dateEnd')); // Получаем дату окончания.

                if (isNaN(endDate.getTime())) {
                  return 'Некорректная дата';
                }

                if (endDate < startDate) {
                  return 'Дата начала не может быть позже даты окончания';
                }
                return true;
              },
            })}
            validationText={errors.dateStart?.message || ''}
            input={{ id: 'dateStart-FormOrganizerSeriesCreate', type: 'date' }}
            loading={loading || loadingForm}
          />
        </div>

        {/* Поле для даты завершения серии */}
        <div className={styles.wrapper__input}>
          <InputAuth
            label="Дата завершения Серии"
            register={register('dateEnd', {
              required: 'Обязательное поле',
              validate: (value) => {
                const startDate = new Date(getValues('dateStart')); // Получаем дату старта.
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
            validationText={errors.dateEnd?.message || ''}
            input={{ id: 'dateEnd-FormOrganizerSeriesCreate', type: 'date' }}
            loading={loading || loadingForm}
          />
        </div>

        {/* Блок загрузки логотипа серии */}
        <div className={styles.wrapper__file}>
          <Controller
            name="logoFile"
            control={control}
            defaultValue={null}
            rules={{
              validate: {
                fileSize: (value) => {
                  if (!value) {
                    return true;
                  }
                  const maxSizeInKBytes = 100; // 100 КB
                  return convertToKBytes(value.size) <= maxSizeInKBytes
                    ? true
                    : `Размер файла (${convertToKBytes(value.size)} Кб) превышает 100 Кб.`;
                },
                fileType: (value) => {
                  if (!value) {
                    return true;
                  }

                  return value &&
                    ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(
                      value.type
                    )
                    ? true
                    : 'Разрешены только JPEG, PNG, WEBP, SVG';
                },
              },
            }}
            render={({ field }) => (
              <BlockUploadImage
                title={'Лого (не более 100Кб)'}
                poster={field.value}
                setPoster={field.onChange}
                posterUrl={logoSrcState}
                setPosterUrl={setLogoSrcState}
                accept={'.jpg, .jpeg, .png, .webp, .svg'}
                validationText={errors.logoFile?.message ? errors.logoFile.message : ''}
              />
            )}
          />
        </div>

        {/* Блок загрузки Главного изображения (обложки) */}
        <div className={styles.wrapper__file}>
          <Controller
            name="posterFile"
            control={control}
            defaultValue={null}
            rules={{
              validate: {
                fileSize: (value) => {
                  if (!value) {
                    return true;
                  }
                  const maxSizeInMBytes = 5; // 5 MB
                  return convertToMBytes(value.size) <= maxSizeInMBytes
                    ? true
                    : `Размер файла (${convertToMBytes(value.size)} Мб) превышает 5 MB.`;
                },
                fileType: (value) => {
                  if (!value) {
                    return true;
                  }

                  return value && ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
                    ? true
                    : 'Разрешены только JPEG, PNG, WEBP';
                },
              },
            }}
            render={({ field }) => (
              <BlockUploadImage
                title={'Постер для страницы Серии (не более 5Мб)'}
                poster={field.value}
                setPoster={field.onChange}
                posterUrl={posterSrcState}
                setPosterUrl={setPosterSrcState}
                accept={'.jpg, .jpeg, .png, .webp'}
                validationText={errors.posterFile?.message ? errors.posterFile.message : ''}
              />
            )}
          />
        </div>

        <div className={styles.wrapper__textarea}>
          <TextAreaRFH
            id={'mission-FormOrganizerSeriesCreate'}
            register={register('mission', {
              maxLength: {
                value: 200,
                message: 'Длина текста не более 300 символов.',
              },
            })}
            label={'Короткое описание (цель, девиз, не более 200 символов)'}
            validationText={errors.mission?.message || ''}
            loading={loading || loadingForm}
          />
        </div>

        <div className={styles.wrapper__textarea}>
          <TextAreaRFH
            id={'description-FormOrganizerSeriesCreate'}
            register={register('description')}
            label={'Описание'}
            validationText={errors.description?.message || ''}
            loading={loading || loadingForm}
          />
        </div>

        <div className={styles.wrapper__textarea}>
          <TextAreaRFH
            id={'rules-FormOrganizerSeriesCreate'}
            register={register('rules')}
            label={'Правила'}
            validationText={errors.rules?.message || ''}
            loading={loading || loadingForm}
          />
        </div>
      </div>

      <div className={cx('wrapper__stages', { inactive: loading || loadingForm })}>
        <StagesInSeries stages={stagesAdded} action="delete" handleAction={deleteStage} />

        <StagesInSeries stages={events} action="add" handleAction={addStage} />
      </div>

      <div className={styles.box__btn}>
        <Button disabled={loading || loadingForm}>Отправить</Button>
      </div>
    </form>
  );
}
