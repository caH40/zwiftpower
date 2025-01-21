import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import TextAreaRFH from '../TextArea/TextAreaRFH';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import Button from '../Button/Button';
import InputSimple from '../Input/InputSimple';
import InputAuth from '../InputAuth/InputAuth';
import { validateTelegram, validateWebsite } from '../../../utils/validatorService';
import SelectWithRHF from '../SelectWithRHF/SelectWithRHF';
import BlockUploadImage from '../../BlockUploadImage/BlockUploadImage';
import { serializeOrganizerData } from '../../../utils/serialization/organizer-data';
import { fetchPutOrganizersMainData } from '../../../redux/features/api/organizer/fetchOrganizerModerator';

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
    logoSrc,
    backgroundImage,
    description,
    clubMain,
    telegram,
    website,
    country,
    socialLinks,
  },
  clubs = [],
}) {
  // Ссылка на лого Организатора.
  const [logoSrcState, setLogoSrcState] = useState(logoSrc);

  // Ссылка на постер Организатора.
  const [backgroundImageSrcState, setBackgroundImageSrcState] = useState(backgroundImage);

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
    defaultValues: { logoFile: null, backgroundImageFile: null },
  });

  const onSubmit = async (formData) => {
    // Необходима сериализация данных перед передачей на сервер, так как передаются данные типа File (изображения).

    const serializedOrganizerData = serializeOrganizerData({ ...formData, organizerId });

    dispatch(fetchPutOrganizersMainData(serializedOrganizerData));

    // console.log(formData);
    // dispatch(sendNotification({ notificationsTypes, text, title, subject })).then((data) => {
    //   if (data.meta.requestStatus === 'fulfilled') {
    //     dispatch(getAlert({ message: data.payload.message, type: 'success', isOpened: true }));
    //     reset(); // Очистка полей формы.
    //   } else {
    //     return; // Ошибка обрабатывается в sendNotification
    //   }
    // });
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper__fields}>
        <div className={styles.box__checkbox}>
          <span>Отображать страницы Организатора</span>
          <CheckboxRFH
            register={register('isPublished')}
            id={'isPublished-FormOrganizerMain'}
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
        />

        <InputAuth
          label={'Канал в телеграмм'}
          register={validateTelegram({ property: 'telegram.channel', register })}
          validationText={errors.telegram?.channel?.message || ''}
          input={{ id: 'telegram.channel-FormOrganizerMain', type: 'text' }}
          placeholder="Например: channel_zwift_cycling"
        />

        <InputAuth
          label={'Сайт'}
          register={validateWebsite({ property: 'website', register })}
          validationText={errors.website?.message || ''}
          input={{ id: 'website-FormOrganizerMain', type: 'text' }}
          placeholder="https://example.com"
        />

        <SelectWithRHF
          label={'Основной клуб в Zwift'}
          register={register('clubMain')}
          validationText={errors.clubMain?.message || ''}
          id={'clubMain-FormOrganizerMain'}
          options={clubs.map((club) => ({ id: club.id, value: club.id, name: club.name }))}
        />

        {/* Блок загрузки Главного изображения (обложки) */}
        <Controller
          name="logoFile"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <BlockUploadImage
              title={'Загрузка лого Организатора'}
              poster={field.value}
              setPoster={field.onChange}
              posterUrl={logoSrcState}
              setPosterUrl={setLogoSrcState}
              validationText={errors.posterFile?.message ? errors.posterFile.message : ''}
            />
          )}
        />

        {/* Блок загрузки Главного изображения (обложки) */}
        <Controller
          name="backgroundImageFile"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <BlockUploadImage
              title={'Загрузка постера для страницы Организатора'}
              poster={field.value}
              setPoster={field.onChange}
              posterUrl={backgroundImageSrcState}
              setPosterUrl={setBackgroundImageSrcState}
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
          />
        </div>
      </div>

      <div className={styles.box__btn}>
        <Button>Отправить</Button>
      </div>
    </form>
  );
}
