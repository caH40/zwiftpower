import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getTranslation } from '../../../utils/translation';
import { sendNotification } from '../../../redux/features/api/notifications/sendNotification';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import TextAreaSimple from '../TextArea/TextAreaSimple';
import CheckboxSimple from '../Checkbox/CheckboxSimple';
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
export default function FormNotification() {
  const [notificationsTypes, setNotificationsTypes] = useState(notificationsTypesInit);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const { name, checked: active } = event.target;
    setNotificationsTypes((prev) => ({ ...prev, [name]: active }));
  };

  const handlerSendNotification = () => {
    // Проверка, что выбран хотя бы один тип оповещения.
    if (
      !notificationsTypes.development &&
      !notificationsTypes.events &&
      !notificationsTypes.news
    ) {
      const message = 'Необходимо выбрать хотя бы один тип оповещения!';
      dispatch(getAlert({ message, type: 'error', isOpened: true }));
      return;
    }

    dispatch(sendNotification({ notificationsTypes, text })).then((data) => {
      dispatch(getAlert({ message: data.message, type: 'success', isOpened: true }));
      setNotificationsTypes(notificationsTypesInit);
      setText('');
    });
  };

  // Задаем фиксированный порядок для отображения.
  const orderedKeys = ['news', 'events', 'development'];

  return (
    <form className={styles.wrapper}>
      <div className={styles.wrapper__notifications}>
        <h3 className={styles.title}>Тип оповещения на e-mail</h3>

        <ul className={styles.list}>
          {orderedKeys.map((key) => (
            <li className={styles.item} key={key}>
              <span>{getTranslation(key)}</span>
              <CheckboxSimple
                checked={notificationsTypes[key]}
                handleCheckboxChange={handleCheckboxChange}
                name={key}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.wrapper__textarea}>
        <TextAreaSimple state={text} setState={setText} name={'Текст сообщения'} />
      </div>

      <div className={styles.box__btn}>
        <Button getClick={handlerSendNotification}>Отправить</Button>
      </div>
    </form>
  );
}
