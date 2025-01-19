import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { sendNotification } from '../../../redux/features/api/notifications/sendNotification';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import TextAreaRFH from '../TextArea/TextAreaRFH';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import Button from '../Button/Button';
import InputSimple from '../Input/InputSimple';
import InputAuth from '../InputAuth/InputAuth';
import { validateTelegram, validateWebsite } from '../../../utils/validatorService';
import SelectWithRHF from '../SelectWithRHF/SelectWithRHF';

import styles from './FormOrganizerMain.module.css';

/**
 * Форма изменения данных организатора (описание, лого, изображение и т.д...).
 */
export default function FormOrganizerMain({
  isPublished,
  name = 'NameTest',
  shortName = 'ShortNameTest ',
  logoSrc,
  backgroundImage,
  description,
  clubMain,
  telegram,
  website,
  country,
  socialLinks,
}) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      isPublished,
      logoSrc,
      backgroundImage,
      description,
      clubMain,
      telegram,
      website,
      country,
      socialLinks,
    },
  });

  const onSubmit = (formData) => {
    console.log(formData);

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
        <h3 className={styles.title}>Тип оповещения на e-mail</h3>

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
          options={[{ id: 'id-test', name: 'name-test' }]}
        />
      </div>

      <div className={styles.wrapper__textarea}>
        <TextAreaRFH
          id={'description-FormOrganizerMain'}
          register={register('description')}
          label={'Описание'}
          validationText={errors.subject ? errors.subject.message : ''}
        />
      </div>

      <div className={styles.box__btn}>
        <Button>Отправить</Button>
      </div>
    </form>
  );
}
