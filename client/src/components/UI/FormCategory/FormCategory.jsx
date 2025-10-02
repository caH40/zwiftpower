import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { fetchPatchCategoryInSeriesResult } from '../../../redux/features/api/series/fetchEditSeriesResults';
import { getTimerLocal } from '../../../utils/date-local';
import { seriesCategoryOptions } from '../../../assets/options';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import Button from '../Button/Button';
import InputAuth from '../InputAuth/InputAuth';
import LogoRider from '../../LogoRider/LogoRider';
import CategoryBox from '../../CategoryBox/CategoryBox';
import SelectWithRHF from '../SelectWithRHF/SelectWithRHF';

import styles from './FormCategory.module.css';

/**
 * Форма изменения категории райдера в заезде.
 */

export default function FormCategory({
  category,
  seriesCategories = ['A', 'B', 'C', 'D', 'APlus'],
  profile,
  seriesId,
  stageResultId,
  modifiedCategory,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: { newCategory: null, reason: '' },
  });

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const response = await dispatch(
        fetchPatchCategoryInSeriesResult({
          value: formData.newCategory,
          reason: formData.reason,
          seriesId,
          stageResultId,
        })
      ).unwrap();
      // Успешный результат.
      dispatch(getAlert({ message: response.message, type: 'success', isOpened: true }));
      dispatch(closePopupFormContainer());
    } catch (error) {
      console.error(error); // eslint-disable-line
    } finally {
      setIsLoading(false);
    }
  };

  const riderName = `${profile.firstName} ${profile.lastName}`;
  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Изменение категории</h3>

      <div className={styles.riderContainer}>
        <div className={styles.logoContainer}>
          <LogoRider
            source={profile.imageSrc}
            firstName={profile.firstName}
            lastName={profile.lastName}
          />
        </div>
        <span>{riderName}</span>
      </div>

      <div className={styles.categoriesContainer}>
        <div className={styles.catInRace}>
          Категория в заезде: <CategoryBox showLabel={true} label={category} circle={true} />
        </div>

        <div className={styles.catCurrentContainer}>
          <div className={styles.catCurrent}>
            Категория текущая:
            <CategoryBox
              showLabel={true}
              label={modifiedCategory?.value || category}
              circle={true}
            />
          </div>

          {modifiedCategory?.value && (
            <div className={styles.description}>
              <p>Установлена: {getTimerLocal(modifiedCategory.modifiedAt, 'DDMMYYHm')}</p>
              <p>Модератор: {modifiedCategory.moderator || 'автоматически'}</p>
              {modifiedCategory.reason && <p>Причина: {modifiedCategory.reason}</p>}
            </div>
          )}
        </div>
      </div>

      <div className={styles.wrapper__fields}>
        <SelectWithRHF
          label={'Новая категория'}
          register={register('newCategory')}
          validationText={errors.newCategory?.message || ''}
          id={'newCategory-FormCategoryForm'}
          options={seriesCategoryOptions(seriesCategories)}
          loading={isLoading}
        />

        <InputAuth
          label={'Причина изменения категории'}
          register={register('reason', {
            maxLength: { value: 50, message: 'Не больше 50 символов' },
          })}
          validationText={errors.reason?.message || ''}
          input={{ id: 'name-FormTeamCreate', type: 'text' }}
          placeholder="Причина изменения категории"
          id={'reason-FormCategoryForm'}
          loading={isLoading}
        />
      </div>

      <div className={styles.box__btn}>
        <Button disabled={isLoading || Object.keys(errors).length > 0}>Сохранить</Button>
      </div>
    </form>
  );
}
