import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { getTranslation } from '../../../utils/translation';
import {
  getNotificationLetterPreview,
  sendNotification,
} from '../../../redux/features/api/notifications/sendNotification';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import { createHtml } from '../../../utils/html';
import { resetNotification } from '../../../redux/features/api/notifications/notificationSlice';
import TextAreaRFH from '../TextArea/TextAreaRFH';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import Button from '../Button/Button';

import styles from './FormNotification.module.css';

const notificationsTypesInit = {
  news: false,
  events: false,
  development: false,
};

/**
 * Форма создания и отправки оповещения на email пользователей.
 */
export default function FormNotification({ loading }) {
  const [errorCheckboxes, setErrorCheckboxes] = useState('');
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      subject: '',
      text: '',
      title: '',
      notificationsTypes: notificationsTypesInit,
    },
  });

  useEffect(() => {
    if (errorCheckboxes) {
      setErrorCheckboxes(''); // Сбрасываем ошибку при изменении чекбоксов.
    }
  }, [JSON.stringify(watch('notificationsTypes'))]);

  // Отправка запроса на получение письма для проверки содержания перед отправкой.
  const handleRefreshPreview = () => {
    const { notificationsTypes, subject, title, text } = getValues();
    const textFormatted = createHtml.description(text);
    dispatch(
      getNotificationLetterPreview({ notificationsTypes, subject, title, text: textFormatted })
    );
  };

  // Обработчик отправки данных на сервер.
  const onSubmit = ({ notificationsTypes, subject, title, text }) => {
    // Проверка, что выбран хотя бы один тип оповещения.
    if (
      !notificationsTypes.development &&
      !notificationsTypes.events &&
      !notificationsTypes.news
    ) {
      const message = 'Необходимо выбрать хотя бы один тип оповещения!';
      setErrorCheckboxes(message);

      return;
    }

    const textFormatted = createHtml.description(text);

    dispatch(
      sendNotification({ notificationsTypes, text: textFormatted, title, subject })
    ).then((data) => {
      if (data.meta.requestStatus === 'fulfilled') {
        dispatch(resetNotification());
        dispatch(getAlert({ message: data.payload.message, type: 'success', isOpened: true }));
        reset(); // Очистка полей формы.
      } else {
        return; // Ошибка обрабатывается в sendNotification
      }
    });
  };

  // Задаем фиксированный порядок для отображения.
  const orderedKeys = ['news', 'events', 'development'];

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrapper__notifications}>
        <h3 className={styles.title}>Тип оповещения на e-mail</h3>

        <ul className={styles.list}>
          {orderedKeys.map((key) => (
            <li className={styles.item} key={key}>
              <span>{getTranslation(key)}</span>
              <CheckboxRFH
                register={register(`notificationsTypes.${key}`)}
                id={`notificationsTypes.${key}-FormNotification`}
                loading={loading}
              />
            </li>
          ))}
        </ul>
        {errorCheckboxes && <span className={styles.error}>{errorCheckboxes}</span>}
      </div>

      <div className={styles.wrapper__textarea}>
        <div className={styles.wrapper__field}>
          <TextAreaRFH
            id={'subject-FormNotification'}
            register={register('subject', { required: 'Обязательное поле' })}
            label={'Тема письма'}
            validationText={errors.subject ? errors.subject.message : ''}
            loading={loading}
          />
        </div>

        <div className={styles.wrapper__field}>
          <TextAreaRFH
            id={'title-FormNotification'}
            register={register('title', { required: 'Обязательное поле' })}
            label={'Заголовок сообщения'}
            validationText={errors.title ? errors.title.message : ''}
            loading={loading}
          />
        </div>

        <div className={styles.wrapper__field}>
          <TextAreaRFH
            id={'text-FormNotification'}
            register={register('text', { required: 'Обязательное поле' })}
            label={'Текст сообщения'}
            validationText={errors.text ? errors.text.message : ''}
            loading={loading}
          />
        </div>
      </div>

      <div className={styles.box__btn}>
        <Button
          getClick={handleRefreshPreview}
          disabled={Object.keys(errors).length > 0 || loading}
        >
          Проверить
        </Button>

        <Button disabled={Object.keys(errors).length > 0 || loading}>Отправить</Button>
      </div>
    </form>
  );
}
