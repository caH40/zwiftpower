import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { fetchPatchCategoryInSeriesResult } from '../../../redux/features/api/series/fetchEditSeriesResults';
import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import Button from '../Button/Button';
import InputAuth from '../InputAuth/InputAuth';
import LogoRider from '../../LogoRider/LogoRider';

import styles from './FormPenalty.module.css';

/**
 * Форма изменения категории райдера в заезде.
 *
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.profile - Профиль райдера.
 * @param {string} props.penalty.reason - Причина штрафа.
 * @param {number} props.penalty.seconds - Количество штрафных секунд.
 * @param {Object} props.penalty.moderator - Модератор, установивший штраф.
 * @param {string} props.penalty.modifiedAt - Дата и время изменения штрафа.
 */

export default function FormPenalty({
  profile,
  seriesId,
  stageResultId,
  urlSlug,
  stageOrder,
  penalty,
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
      dispatch(fetchGetStageResults({ urlSlug, stageOrder }));
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

      <div className={styles.wrapper__fields}>
        <InputAuth
          label={'Добавление секунд к результату'}
          register={register('penalty', {
            maxLength: { value: 50, message: 'Не больше 50 символов' },
          })}
          validationText={errors.penalty?.message || ''}
          input={{ id: 'penalty-FormPenalty', type: 'number' }}
          placeholder="Количество секунд"
          id={'penalty-FormCategoryForm'}
          loading={isLoading}
        />

        <InputAuth
          label={'Причина штрафа'}
          register={register('reason', {
            maxLength: { value: 50, message: 'Не больше 50 символов' },
          })}
          validationText={errors.reason?.message || ''}
          input={{ id: 'reason-FormPenalty', type: 'text' }}
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
