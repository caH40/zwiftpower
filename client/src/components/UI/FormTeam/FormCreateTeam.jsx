import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { serializeTeamCreate } from '../../../utils/serialization/team-data';
import { fetchPostTeam, fetchPutTeam } from '../../../redux/features/api/team/fetchTeam';
import { convertToKBytes, convertToMBytes } from '../../../utils/bytes';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { checkAuth } from '../../../redux/features/authSlice';
import Button from '../Button/Button';
import BlockUploadImage from '../../BlockUploadImage/BlockUploadImage';
import TextAreaRFH from '../TextArea/TextAreaRFH';
import InputAuth from '../InputAuth/InputAuth';

import styles from './FormCreateTeam.module.css';

/**
 * Форма создания команды.
 * @param {Object} props - Пропсы компонента.
 * @param {Boolean} props.loading - Дата старта Эвента.
 */

export default function FormCreateTeam({
  isCreating,

  team,
  loading,
  onSuccessUpdate,
}) {
  const [resetImage, setResetImage] = useState(false);
  // Статус загрузки текущей формы на сервер.
  const [loadingForm, setLoadingForm] = useState(false);

  const navigate = useNavigate();

  // Ссылка на лого Команды. Используется в форме редактирования, для отображения изображения с сервера.
  const [logoSrcState, setLogoSrcState] = useState(team?.logoUrls?.original);

  // Ссылка на постер Команды. Используется в форме редактирования, для отображения изображения с сервера.
  const [posterSrcState, setPosterSrcState] = useState(team?.posterUrls?.small);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,

    formState: { errors },
  } = useForm({
    mode: 'all',
    values: !isCreating && team ? team : {},

    defaultValues: { logoFile: null, posterFile: null },
  });

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    try {
      setLoadingForm(true);

      // Сериализация данных перед отправкой на сервер.
      const serializedSeriesData = serializeTeamCreate(formData);

      const fetchHandler = isCreating ? fetchPostTeam : fetchPutTeam;

      const data = await dispatch(fetchHandler({ team: serializedSeriesData })).unwrap();

      // Успешный результат.
      dispatch(getAlert({ message: data.message, type: 'success', isOpened: true }));

      if (isCreating) {
        // FIXME: не сбрасываются изображения
        // Очистка полей формы

        reset();
        setResetImage((p) => !p);
        setLogoSrcState(null);
        setPosterSrcState(null);

        // Переход на страницу участников
        navigate(`/teams/${data.data?.urlSlug}/members`);

        // Обновление auth чуть позже (через микротаску или таймер)
        setTimeout(() => {
          dispatch(checkAuth());
        }, 500);
      } else {
        // Получение обновленных данных команды.
        reset();
        onSuccessUpdate();
      }
    } catch (error) {
      console.log(error); // eslint-disable-line
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper__fields}>
        <div className={styles.wrapper__input}>
          <InputAuth
            label={'Название*'}
            register={register('name', {
              required: 'Обязательное поле',
              minLength: { value: 2, message: 'Больше 1 символа' },
              maxLength: { value: 50, message: 'Не больше 50 символов' },
            })}
            validationText={errors.name?.message || ''}
            input={{ id: 'name-FormTeamCreate', type: 'text' }}
            placeholder="Название команды"
            loading={loading || loadingForm}
          />
        </div>

        <div className={styles.wrapper__input}>
          <InputAuth
            label={'Короткое название*'}
            register={register('shortName', {
              required: 'Обязательное поле',
              minLength: { value: 2, message: 'Больше 1 символов' },
              maxLength: { value: 12, message: 'Не больше 12 символов' },
            })}
            validationText={errors.shortName?.message || ''}
            input={{ id: 'shortName-FormTeamCreate', type: 'text' }}
            placeholder="Короткое название команды"
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
                resetTrigger={resetImage}
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
                title={'Постер для страницы Серии (не более 5Мб)*'}
                poster={field.value}
                setPoster={field.onChange}
                posterUrl={posterSrcState}
                setPosterUrl={setPosterSrcState}
                accept={'.jpg, .jpeg, .png, .webp'}
                validationText={errors.posterFile?.message ? errors.posterFile.message : ''}
                resetTrigger={resetImage}
              />
            )}
          />
        </div>

        <div className={styles.wrapper__textarea}>
          <TextAreaRFH
            id={'mission-FormTeamCreate'}
            register={register('mission', {
              maxLength: {
                value: 200,
                message: 'Длина текста не более 200 символов.',
              },
            })}
            label={'Цель, девиз, не более 200 символов'}
            validationText={errors.mission?.message || ''}
            loading={loading || loadingForm}
          />
        </div>

        <div className={styles.wrapper__textarea}>
          <TextAreaRFH
            id={'description-FormTeamCreate'}
            register={register('description')}
            label={'Описание'}
            validationText={errors.description?.message || ''}
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
