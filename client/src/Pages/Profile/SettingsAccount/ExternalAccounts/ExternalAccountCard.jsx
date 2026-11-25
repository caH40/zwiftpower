import { useState } from 'react';
import cn from 'classnames/bind';

import Button from '../../../../components/UI/Button/Button';
import InputAuth from '../../../../components/UI/InputAuth/InputAuth';

import { validateExternalLink } from './services';

import styles from './ExternalAccountCard.module.css';

const cx = cn.bind(styles);

/**
 * Карточка привязки аккаунта одного стороннего сервиса (Strava, Garmin Connect).
 * Ссылка на профиль хранится в состоянии карточки; сохранение на сервере появится на следующем шаге.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {import('./services').ExternalService} props.service - Описание сервиса.
 * @param {string} [props.initialValue] - Ранее привязанная ссылка на профиль.
 * @param {(payload: { service: string, url: string }) => void} [props.onSave] - Обработчик сохранения ссылки.
 */
export default function ExternalAccountCard({ service, initialValue = '', onSave }) {
  const [savedLink, setSavedLink] = useState(initialValue);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(!initialValue);

  /**
   * Ввод ссылки: ошибка валидации сбрасывается при правке поля.
   * @param {Object} event - Событие изменения поля.
   */
  const handleChange = (event) => {
    setValue(event.target.value);

    if (error) {
      setError('');
    }
  };

  /**
   * Сохранение ссылки: проверка домена сервиса и переход в режим просмотра.
   * @param {Object} event - Событие отправки формы.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateExternalLink(value, service);

    if (validationError) {
      setError(validationError);
      return;
    }

    const link = value.trim();

    setSavedLink(link);
    setValue(link);
    setError('');
    setIsEditing(false);

    // Сохранение ссылки в профиле пользователя подключается на следующем шаге.
    onSave?.({ service: service.id, url: link });
  };

  /** Переход к редактированию уже привязанной ссылки. */
  const handleEdit = () => {
    setValue(savedLink);
    setError('');
    setIsEditing(true);
  };

  /** Отмена редактирования: возврат к последней сохранённой ссылке. */
  const handleCancel = () => {
    setValue(savedLink);
    setError('');
    setIsEditing(false);
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={cx('badge', service.theme)} aria-hidden="true">
          {service.icon ? (
            <img className={styles.logo} src={service.icon} alt="" />
          ) : (
            service.monogram
          )}
        </span>
        <h4 className={styles.name}>{service.name}</h4>
        <span className={cx('status', { statusLinked: Boolean(savedLink) })}>
          {savedLink ? 'Привязан' : 'Не привязан'}
        </span>
      </div>

      {isEditing ? (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <p className={styles.hint}>{service.hint}</p>
          <div className={styles.field}>
            <InputAuth
              register={{ name: service.id, value, onChange: handleChange }}
              input={{
                id: `external-${service.id}`,
                type: 'url',
                autoComplete: 'off',
                placeholder: service.placeholder,
                'aria-label': service.name,
              }}
              validationText={error}
            />
            <Button type="submit" disabled={!value.trim()}>
              Сохранить
            </Button>
          </div>
          {Boolean(savedLink) && (
            <button className={styles.cancel} type="button" onClick={handleCancel}>
              Отменить
            </button>
          )}
        </form>
      ) : (
        <div className={styles.linkBox}>
          <a className={styles.link} href={savedLink} target="_blank" rel="noreferrer noopener">
            {savedLink}
          </a>
          <button className={styles.edit} type="button" onClick={handleEdit}>
            Изменить
          </button>
        </div>
      )}
    </article>
  );
}
