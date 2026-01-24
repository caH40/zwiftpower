import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import {
  fetchRemoveDisqualificationStageResult,
  fetchSetDisqualificationStageResult,
} from '../../../redux/features/api/series/fetchEditSeriesResults';
import { fetchGetStageResults } from '../../../redux/features/api/series/fetchSeries';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { closePopupFormContainer } from '../../../redux/features/popupFormContainerSlice';
import Button from '../Button/Button';
import InputAuth from '../InputAuth/InputAuth';
import LogoRider from '../../LogoRider/LogoRider';
import SelectWithRHF from '../SelectWithRHF/SelectWithRHF';
import { DISQUALIFICATION_OPTIONS } from '../../../assets/dsq';

import styles from './FormDisqualification.module.css';

/**
 * Форма установки/снятия дисквалификации результата райдера на этапе серии.
 *
 * @param {Object} props - Пропсы.
 * @param {Object} props.disqualification - Объект с данными дисквалификации.
 * @param {boolean} props.disqualification.status - Флаг, активна ли дисквалификация / отсутствует ли в зачёте.
 * @param {TDisqualificationLabel} [props.disqualification.label] - Краткий код статуса (2–3 заглавные буквы).
 * @param {string} [props.disqualification.reason] - Подробное описание причины дисквалификации.
 * @param {Types.ObjectId} [props.disqualification.moderator] - ID модератора, который установил дисквалификацию.
 * @param {Date} [props.disqualification.modifiedAt] - Дата и время последнего изменения.
 * @param {Object} props.profile - Данные райдера.
 * @param {string} props.stageResultId - _id результата.
 * @param {string} props.urlSlug - urlSlug серии заездов.
 * @param {number} props.stageOrder - номер этапа.
 */

export default function FormDisqualification({
  disqualification,
  profile,
  stageResultId,
  urlSlug,
  stageOrder,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },

    setValue,
    watch,
  } = useForm({
    mode: 'all',
    values: {
      disqualification,
      profile,
      stageResultId,
      urlSlug,
    },
    defaultValues: { disqualification: {} },
  });

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const fetchHandler = formData.disqualification.label
        ? fetchSetDisqualificationStageResult
        : fetchRemoveDisqualificationStageResult;

      const response = await dispatch(
        fetchHandler({
          disqualification: formData.disqualification,
          resultId: stageResultId,
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

  const label = watch('disqualification.label');
  useEffect(() => {
    const elm = DISQUALIFICATION_OPTIONS.find((o) => o.value === label);
    const value = elm ? `${elm.value} - ${elm.name}` : '';

    setValue('disqualification.reason', value);
  }, [label, setValue]);

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <h3 className={styles.title}>Дисквалификация</h3>

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
        <SelectWithRHF
          label={'Выбор дисквалификации'}
          register={register('disqualification.label')}
          validationText={errors.disqualification?.label?.message || ''}
          id={'disqualification.label-FormDisqualification'}
          options={DISQUALIFICATION_OPTIONS}
          loading={isLoading}
        />

        <InputAuth
          label={'Причина'}
          register={register('disqualification.reason', {
            maxLength: { value: 50, message: 'Не больше 50 символов' },
          })}
          validationText={errors.disqualification?.reason?.message || ''}
          input={{ id: 'reason-FormDisqualification', type: 'text' }}
          placeholder="Причина"
          id={'reason-FormDisqualification'}
          loading={isLoading}
        />
      </div>

      <div className={styles.box__btn}>
        <Button disabled={isLoading || Object.keys(errors).length > 0}>Сохранить</Button>
      </div>
    </form>
  );
}
