import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import { RACE_SERIES_CATEGORIES } from '../../../assets/rule-category';
import { seriesCategoryOptions } from '../../../assets/options';
import { timeDetailsToMilliseconds } from '../../../utils/date-convert';
import { fetchZwiftProfile } from '../../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import { setZwiftId } from '../../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import { fetchPostStageResultInSeries } from '../../../redux/features/api/series/fetchEditSeriesResults';
import Button from '../Button/Button';
import SelectWithRHF from '../SelectWithRHF/SelectWithRHF';
import BlockInputsTime from '../../BlockInputsTime/BlockInputsTime';
import RSimpleInput from '../ReduxUI/RInput/RSimpleInput';
import LogoRider from '../../LogoRider/LogoRider';

import styles from './FormAddStageResult.module.css';

/**
 * Форма ручного добавления результата этапа серии.
 */

/**
 * @param {Object} props - Пропсы.
 * @param {string} props.seriesId - _id серии в БД.
 * @param {string} props.urlSlug - url серии.
 * @param {number} props.stageOrder - номер этапа серии.
 * @param {string} props.eventId - ID Эвента в Звифте. FIXME: при нескольких эвентах в этапе,
 * выбирать основной, а не повторные заезды.
 * @param {string[]} props.seriesCategories - Названия категорий в серии.
 * @returns
 */
export default function FormAddStageResult({
  seriesId,
  urlSlug,
  stageOrder,
  category,
  seriesCategories = RACE_SERIES_CATEGORIES,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const dispatch = useDispatch();

  // Данные получаются по zwiftId при запросе из данной формы.
  const { zwiftId, profile: zwiftProfile } = useSelector((state) => state.getZwiftProfile);

  const findRider = () => {
    dispatch(fetchZwiftProfile(zwiftId));
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
    values: { category },
    defaultValues: {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
    },
  });

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    const durationInMilliseconds = timeDetailsToMilliseconds(formData.time);

    if (durationInMilliseconds <= 0) {
      dispatch(
        getAlert({
          message: 'Финишное время должно быть больше 0!',
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }

    if (!zwiftProfile?.id) {
      dispatch(
        getAlert({
          message: 'Нет данных по райдеру!',
          type: 'error',
          isOpened: true,
        })
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(
        fetchPostStageResultInSeries({
          durationInMilliseconds,
          seriesId,
          stageOrder: Number(stageOrder),
          profileId: zwiftProfile.id,
        })
      ).unwrap();
      // Успешный результат.
      dispatch(getAlert({ message: response.message, type: 'success', isOpened: true }));
      dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
      dispatch(closePopupFormContainer());
    } catch (error) {
      console.error(error); // eslint-disable-line
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Добавление результата в этап №{stageOrder}</h3>

      <div className={styles.fieldsContainer}>
        <div className={styles.fieldContainer}>
          <span className={styles.label}>Поиск профиля на сервере Zwift, введите ZwiftId:</span>
          <div>
            <RSimpleInput
              value={zwiftId}
              name={'Zwift Id'}
              reducer={setZwiftId}
              type="number"
            />
            <Button getClick={findRider}>НАЙТИ</Button>
          </div>
          {zwiftProfile?.id && (
            <>
              <div className={styles.box__rider}>
                <div className={styles.box__img}>
                  <LogoRider
                    source={zwiftProfile?.imageSrc}
                    firstName={zwiftProfile.firstName}
                    lastName={zwiftProfile?.lastName}
                  />
                </div>
                <div className={styles.box__name}>
                  <span>{zwiftProfile.firstName}</span>
                  <span>{zwiftProfile.lastName}</span>
                  <div>
                    <span>zwiftId:</span>
                    <span>{zwiftProfile.id}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <SelectWithRHF
          label={'Категория райдера'}
          register={register('category')}
          validationText={errors.category?.message || ''}
          id={'category-FormCategoryForm'}
          options={seriesCategoryOptions(seriesCategories)}
          loading={isLoading}
        />

        <div>
          <h4 className={styles.fieldLabel}>Финишное время</h4>
          <BlockInputsTime register={register} errors={errors} />
        </div>
      </div>

      <div className={styles.box__btn}>
        <Button disabled={isLoading || Object.keys(errors).length > 0}>Сохранить</Button>
      </div>
    </form>
  );
}
