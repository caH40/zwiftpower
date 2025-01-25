import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { validateTelegram, validateWebsite } from '../../../utils/validatorService';
import { serializeOrganizerData } from '../../../utils/serialization/organizer-data';
import { fetchPutOrganizersMainData } from '../../../redux/features/api/organizer/fetchOrganizerModerator';
import { convertToKBytes, convertToMBytes } from '../../../utils/bytes';
import TextAreaRFH from '../TextArea/TextAreaRFH';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import Button from '../Button/Button';
import InputSimple from '../Input/InputSimple';
import InputAuth from '../InputAuth/InputAuth';
import SelectWithRHF from '../SelectWithRHF/SelectWithRHF';
import BlockUploadImage from '../../BlockUploadImage/BlockUploadImage';

import styles from './FormOrganizerMain.module.css';

/**
 * Форма изменения данных организатора (описание, лого, изображение и т.д...).
 */
export default function FormOrganizerMain({
  organizer: {
    organizerId,
    isPublished,
    name,
    shortName,
    logoUrls,
    posterUrls,
    description,
    clubMain,
    telegram,
    website,
    country,
    socialLinks,
  },
  clubs = [],
  loading,
}) {
  // Ссылка на лого Организатора.
  const [logoSrcState, setLogoSrcState] = useState(logoUrls.original);

  // Ссылка на постер Организатора.
  const [posterSrcState, setPosterSrcState] = useState(posterUrls.small);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    values: {
      isPublished,
      description,
      clubMain,
      telegram,
      website,
      country,
      socialLinks,
    },
    defaultValues: { logoFile: null, posterFile: null },
  });

  const onSubmit = async (formData) => {
    // Необходима сериализация данных перед передачей на сервер, так как передаются данные типа File (изображения).

    const serializedOrganizerData = serializeOrganizerData({ ...formData, organizerId });

    dispatch(fetchPutOrganizersMainData(serializedOrganizerData)).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(getAlert({ message: data.payload.message, type: 'success', isOpened: true }));
        reset(); // Очистка полей формы.
      } else {
        return; // Ошибка обрабатывается в sendNotification
      }
    });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper__fields}>
        <div className={styles.box__checkbox}>
          <span>Отображать страницы Организатора</span>
          <CheckboxRFH
            register={register('isPublished')}
            id={'isPublished-FormOrganizerMain'}
            loading={loading}
          />
        </div>

        <InputSimple disabled={true} value={name} label={'Название'} />

        <InputSimple disabled={true} value={shortName} label={'Сокращённое название'} />

        <InputAuth
          label={'Группа в телеграмм'}
          register={validateTelegram({ property: 'telegram.group', register })}
          validationText={errors.telegram?.group?.message || ''}
          input={{ id: 'telegram.group-FormOrganizerMain', type: 'text' }}
          placeholder="Например: group_zwift_cycling"
          loading={loading}
        />

        <InputAuth
          label={'Канал в телеграмм'}
          register={validateTelegram({ property: 'telegram.channel', register })}
          validationText={errors.telegram?.channel?.message || ''}
          input={{ id: 'telegram.channel-FormOrganizerMain', type: 'text' }}
          placeholder="Например: channel_zwift_cycling"
          loading={loading}
        />

        <InputAuth
          label={'Сайт'}
          register={validateWebsite({ property: 'website', register })}
          validationText={errors.website?.message || ''}
          input={{ id: 'website-FormOrganizerMain', type: 'text' }}
          placeholder="https://example.com"
          loading={loading}
        />

        <SelectWithRHF
          label={'Основной клуб в Zwift'}
          register={register('clubMain')}
          validationText={errors.clubMain?.message || ''}
          id={'clubMain-FormOrganizerMain'}
          options={clubs.map((club) => ({ id: club.id, value: club.id, name: club.name }))}
          loading={loading}
        />

        {/* Блок загрузки Главного изображения (обложки) */}
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

        {/* Блок загрузки Главного изображения (обложки) */}
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
              title={'Постер для страницы Организатора (не более 5Мб)'}
              poster={field.value}
              setPoster={field.onChange}
              posterUrl={posterSrcState}
              setPosterUrl={setPosterSrcState}
              accept={'.jpg, .jpeg, .png, .webp'}
              validationText={errors.posterFile?.message ? errors.posterFile.message : ''}
            />
          )}
        />

        <div className={styles.wrapper__textarea}>
          <TextAreaRFH
            id={'description-FormOrganizerMain'}
            register={register('description')}
            label={'Описание'}
            validationText={errors.subject ? errors.subject.message : ''}
            loading={loading}
          />
        </div>
      </div>

      <div className={styles.box__btn}>
        <Button>Отправить</Button>
      </div>
    </form>
  );
}
