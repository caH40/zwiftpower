import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames/bind';

import Button from '../../../../components/UI/Button/Button';
import InputAuth from '../../../../components/UI/InputAuth/InputAuth';

import { getAlert } from '../../../../redux/features/alertMessageSlice';
import { putExternalAccount } from '../../../../redux/features/api/external-accounts/putExternalAccount';

import { getExternalAccountUrl, validateExternalAccountId } from './services';

import styles from './ExternalAccountCard.module.css';

const cx = cn.bind(styles);

/**
 * Карточка привязки аккаунта одного стороннего сервиса (Strava, Garmin Connect).
 * Вводится и сохраняется только ID аккаунта, ссылка на профиль собирается по шаблону сервиса.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {import('./services').ExternalService} props.service - Описание сервиса.
 * @param {string} [props.initialValue] - Ранее сохранённый ID аккаунта.
 * @param {(payload: { service: string, accountId: string }) => void} [props.onSave] - Обработчик сохранения ID.
 */
export default function ExternalAccountCard({ service, initialValue = '', onSave }) {
  const dispatch = useDispatch();
  const { serviceInProgress } = useSelector((state) => state.externalAccounts);
  const isLoading = serviceInProgress === service.id;

  const [savedId, setSavedId] = useState(initialValue);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(!initialValue);

  const profileUrl = getExternalAccountUrl(service, savedId);

  /**
   * Ввод ID: ошибка валидации сбрасывается при правке поля.
   * @param {Object} event - Событие изменения поля.
   */
  const handleChange = (event) => {
    setValue(event.target.value);

    if (error) {
      setError('');
    }
  };

  /**
   * Сохранение ID: проверка формата, отправка в API и переход в режим просмотра.
   * @param {Object} event - Событие отправки формы.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateExternalAccountId(value, service);

    if (validationError) {
      setError(validationError);
      return;
    }

    const accountId = value.trim();

    try {
      const result = await dispatch(putExternalAccount({ service: service.id, accountId })).unwrap();

      // Режим просмотра и уведомление — только после успешного ответа сервера.
      setSavedId(accountId);
      setValue(accountId);
      setError('');
      setIsEditing(false);

      dispatch(
        getAlert({
          // Текст берём из ответа сервера, свой — только если сервер его не прислал.
          message: result?.message || `ID аккаунта ${service.name} сохранён`,
          type: 'success',
          isOpened: true,
        })
      );
      onSave?.({ service: service.id, accountId });
    } catch (message) {
      // Ошибку уже показал снекбар из handlerErrorAsyncThunk, дублируем текстом под полем.
      setError(typeof message === 'string' ? message : 'Не удалось сохранить ID аккаунта');
    }
  };

  /** Переход к редактированию уже сохранённого ID. */
  const handleEdit = () => {
    setValue(savedId);
    setError('');
    setIsEditing(true);
  };

  /** Отмена редактирования: возврат к последнему сохранённому ID. */
  const handleCancel = () => {
    setValue(savedId);
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
        <span className={cx('status', { statusLinked: Boolean(savedId) })}>
          {savedId ? 'Привязан' : 'Не привязан'}
        </span>
      </div>

      {isEditing ? (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <p className={styles.hint}>{service.hint}</p>
          <div className={styles.field}>
            <InputAuth
              register={{ name: service.id, value, onChange: handleChange }}
              loading={isLoading}
              input={{
                id: `external-${service.id}`,
                type: 'text',
                inputMode: service.inputMode,
                autoComplete: 'off',
                placeholder: service.placeholder,
                'aria-label': `ID аккаунта ${service.name}`,
              }}
              validationText={error}
            />
            <Button type="submit" disabled={!value.trim() || isLoading}>
              {isLoading ? 'Сохраняем…' : 'Сохранить'}
            </Button>
          </div>
          {Boolean(savedId) && (
            <Button type="button" addCls="back" getClick={handleCancel}>
              Отменить
            </Button>
          )}
        </form>
      ) : (
        <div className={styles.linkBox}>
          <a
            className={styles.link}
            href={profileUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {profileUrl}
          </a>
          <Button type="button" getClick={handleEdit}>
            Изменить
          </Button>
        </div>
      )}
    </article>
  );
}
