import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import { RACE_SERIES_CATEGORIES, ZWIFT_CATEGORIES } from '../../../assets/rule-category';
import { seriesCategoryOptions } from '../../../assets/options';
import { timeDetailsToMilliseconds } from '../../../utils/date-convert';
import { fetchZwiftProfile } from '../../../redux/features/api/zwiftProfiles/fetchZwiftProfile';
import {
  resetZwiftProfile,
  setZwiftId,
} from '../../../redux/features/api/zwiftProfiles/zwiftProfileSlice';
import { fetchPostStageResultInSeries } from '../../../redux/features/api/series/fetchEditSeriesResults';
import InputAuth from '../InputAuth/InputAuth';
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
  subgroupLabels = ZWIFT_CATEGORIES,
}) {
  const [isLoading, setIsLoading] = useState(false);
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
    values: {
      category,
      profileData: zwiftProfile?.id
        ? {
            firstName: zwiftProfile.firstName,
            lastName: zwiftProfile.lastName,
            gender: zwiftProfile.male ? 'мужчина' : 'женщина',
            weight: zwiftProfile.weight / 1000,
            heightInCentimeters: zwiftProfile.height / 10,
            age: zwiftProfile.age,
          }
        : null,
    },
    defaultValues: {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      heartRateData: 0,
      avgWatts: 0,
      subgroupLabel: 'A',
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

    const profileData = {
      firstName: formData.profileData.firstName,
      lastName: formData.profileData.lastName,
      gender: formData.profileData.gender === 'мужчина' ? 'male' : 'female',
      weightInGrams: Number(formData.profileData.weight) * 1000,
      heightInCentimeters: Number(formData.profileData.heightInCentimeters),
      age: Number(formData.profileData.age),
      imageSrc: zwiftProfile.imageSrc,
      countryAlpha3: zwiftProfile.countryAlpha3,
    };

    try {
      const response = await dispatch(
        fetchPostStageResultInSeries({
          category: formData.category,
          subgroupLabel: formData.subgroupLabel,
          durationInMilliseconds,
          heartRateData: Number(formData.heartRateData),
          avgWatts: Number(formData.avgWatts),
          seriesId,
          stageOrder: Number(stageOrder),
          profileId: zwiftProfile.id,
          ...profileData,
        })
      ).unwrap();

      // Успешный результат.
      dispatch(resetZwiftProfile());
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

        {/* Данные райдера */}
        <InputAuth
          label={'Имя'}
          register={register('profileData.firstName')}
          validationText={errors.profileData?.firstName?.message || ''}
          input={{ id: 'profileData.firstName-FormTeamCreate', type: 'text' }}
          placeholder="Имя райдера"
          id={'profileData.firstName-FormCategoryForm'}
          loading={isLoading}
        />

        <InputAuth
          label={'Фамилия'}
          register={register('profileData.lastName')}
          validationText={errors.profileData?.lastName?.message || ''}
          input={{ id: 'profileData.lastName-FormTeamCreate', type: 'text' }}
          placeholder="Фамилия райдера"
          id={'profileData.lastName-FormCategoryForm'}
          loading={isLoading}
        />

        <InputAuth
          label={'Пол'}
          register={register('profileData.gender')}
          validationText={errors.profileData?.gender?.message || ''}
          input={{ id: 'profileData.gender-FormTeamCreate', type: 'text' }}
          placeholder="male или female"
          id={'profileData.gender-FormCategoryForm'}
          loading={isLoading}
        />

        <InputAuth
          label={'Вес, кг'}
          register={register('profileData.weight')}
          validationText={errors.profileData?.weight?.message || ''}
          input={{ id: 'profileData.weight-FormTeamCreate', type: 'number', step: 0.1 }}
          placeholder="Вес в килограммах"
          id={'profileData.weight-FormCategoryForm'}
          loading={isLoading}
        />

        <InputAuth
          label={'Рост (в сантиметрах)'}
          register={register('profileData.heightInCentimeters')}
          validationText={errors.profileData?.heightInCentimeters?.message || ''}
          input={{
            id: 'profileData.heightInCentimeters-FormTeamCreate',
            type: 'number',
            step: '0.1',
          }}
          placeholder="Рост в сантиметрах"
          id={'profileData.heightInCentimeters-FormCategoryForm'}
          loading={isLoading}
        />

        <InputAuth
          label={'Возраст'}
          register={register('profileData.age')}
          validationText={errors.profileData?.age?.message || ''}
          input={{ id: 'profileData.age-FormTeamCreate', type: 'number' }}
          placeholder="Возраст райдера"
          id={'profileData.age-FormCategoryForm'}
          loading={isLoading}
        />

        <SelectWithRHF
          label={'Категория райдера'}
          register={register('category')}
          validationText={errors.category?.message || ''}
          id={'category-FormCategoryForm'}
          options={seriesCategoryOptions(seriesCategories)}
          loading={isLoading}
        />

        <SelectWithRHF
          label={'Группа в которой ехал райдер'}
          register={register('subgroupLabel')}
          validationText={errors.subgroupLabel?.message || ''}
          id={'subgroupLabel-FormCategoryForm'}
          options={seriesCategoryOptions(subgroupLabels)}
          loading={isLoading}
        />

        <InputAuth
          label={'Средние ватты за заезд'}
          register={register('avgWatts', { required: 'Обязательное поле' })}
          validationText={errors.avgWatts?.message || ''}
          input={{ id: 'avgWatts-FormTeamCreate', type: 'number' }}
          placeholder="Средние ватты"
          id={'avgWatts-FormCategoryForm'}
          loading={isLoading}
        />

        <InputAuth
          label={'Средняя частота пульса за заезд'}
          register={register('heartRateData')}
          validationText={errors.heartRateData?.message || ''}
          input={{ id: 'heartRateData-FormTeamCreate', type: 'number' }}
          placeholder="Средняя частота пульса"
          id={'heartRateData-FormCategoryForm'}
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
