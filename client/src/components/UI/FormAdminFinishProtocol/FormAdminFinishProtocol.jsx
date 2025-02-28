import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import cn from 'classnames/bind';

import { getAlert } from '../../../redux/features/alertMessageSlice';
import { fetchFinishProtocol } from '../../../redux/features/api/finish-protocol/fetchFinishProtocol';
import TextAreaRFH from '../TextArea/TextAreaRFH';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import Button from '../Button/Button';
import InputAuth from '../InputAuth/InputAuth';
import SelectWithRHF from '../SelectWithRHF/SelectWithRHF';

import styles from './FormAdminFinishProtocol.module.css';

/**
 * Форма изменения данных организатора (описание, лого, изображение и т.д...).
 */
export default function FormAdminFinishProtocol({
  isCreating,
  protocol: { _id, organizer, name, description, isDefault, createdAt, updatedAt },
  loading,
  setTrigger,
  organizers,
}) {
  const [loadingForm, setLoadingForm] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    values: {
      _id,
      organizer,
      name,
      description,
      isDefault,
      createdAt,
      updatedAt,
    },
    defaultValues: { logoFile: null, posterFile: null },
  });

  // Обработчик отправки формы на сервер.
  const onSubmit = async (formData) => {
    try {
      console.log(formData);
      // return;
      setLoadingForm(true);

      const fetchHandler = isCreating ? fetchFinishProtocol : () => {};

      // .unwrap() возвращает промис, для работы с async/await
      const data = await dispatch(fetchHandler({ ...formData, isCreating })).unwrap();

      // Успешный результат.
      dispatch(getAlert({ message: data.message, type: 'success', isOpened: true }));

      if (isCreating) {
        // Очистка полей формы
        // reset();
      } else {
        // Триггер запускает запрос на получение обновлённых данных.
        setTrigger((prev) => !prev);
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
          <SelectWithRHF
            label={'Организатор'}
            register={register('organizer')}
            validationText={errors.clubMain?.message || ''}
            id={'organizer-FormOrganizerMain'}
            options={organizers}
            loading={loading || loadingForm}
          />
        </div>

        <div className={styles.box__checkbox}>
          <span>Общий доступ к конфигурации</span>
          <CheckboxRFH
            register={register('isDefault')}
            id={'isDefault-FormAdminFinishProtocol'}
            loading={loading || loadingForm}
            tooltip={'Стандартный протокол (общий)'}
          />
        </div>

        {/* Показывать только при редактировании */}
        {!isCreating && (
          <>
            <div className={styles.wrapper__input}>
              <InputAuth
                label={'Дата создания'}
                register={register('createdAt')}
                input={{ id: 'createdAt-FormAdminFinishProtocol', type: 'text' }}
                loading={true} // disabled
              />
            </div>

            <div className={styles.wrapper__input}>
              <InputAuth
                label={'Дата последнего редактирования'}
                register={register('updatedAt')}
                input={{ id: 'updatedAt-FormAdminFinishProtocol', type: 'text' }}
                loading={true} // disabled
              />
            </div>
          </>
        )}

        <div className={styles.wrapper__input}>
          <InputAuth
            label={'Название конфигурации (должно быть уникальным у Организатора)'}
            register={register('name', {
              required: 'Обязательное поле',
              minLength: { value: 6, message: 'Больше 5ти символов' },
              maxLength: { value: 50, message: 'Не больше 50 символов' },
            })}
            validationText={errors.name?.message || ''}
            input={{ id: 'name-FormOrganizerSeriesCreate', type: 'text' }}
            placeholder="Название всей серии заездов"
            loading={loading || loadingForm}
          />
        </div>

        <div className={styles.wrapper__textarea}>
          <TextAreaRFH
            id={'description-FormOrganizerSeriesCreate'}
            register={register('description')}
            label={'Описание'}
            validationText={errors.description?.message || ''}
            loading={loading || loadingForm}
          />
        </div>
      </div>

      <div className={styles.box__btn}>
        <Button disabled={loading || loadingForm}>Отправить</Button>
      </div>
    </form>
  );
}
