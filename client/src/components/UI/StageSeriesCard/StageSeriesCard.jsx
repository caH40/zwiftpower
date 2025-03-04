import { getTimerLocal } from '../../../utils/date-local';
import IconDelete from '../../icons/IconDelete';
import CheckboxRFH from '../Checkbox/CheckboxRFH';
import InputAuth from '../InputAuth/InputAuth';

import styles from './StageSeriesCard.module.css';

/**
 * Карточка изменения параметров Этапа, добавленного в Серию заездов.
 * @param {Object} props - Пропсы компонента.
 * @param {String} props.name - Название Эвента (этапа Серии заездов).
 * @param {String} props.startEvent - Дата старта Эвента.
 * @param {RegisterOptions} props.register - Метод библиотеки react-hook-form.
 * @param {FieldErrors} props.errors - Метод библиотеки react-hook-form.
 * @param {any} props.handleClick - Обработчик нажатия иконки.
 * @param {Boolean} props.loading - Дата старта Эвента.
 */
export default function StageSeriesCard({
  name,
  propertyOrder,
  propertyStageName,
  propertyIncludeResults,
  startEvent,
  register,
  errors,
  handleClick,
  loading,
}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.box__icon}>
        <IconDelete getClick={handleClick} />
      </div>
      <h3 className={styles.title}>{name}</h3>
      <h3 className={styles.subtitle}>{getTimerLocal(startEvent, 'DDMMYYHm')}</h3>

      <div className={styles.box__field}>
        <InputAuth
          label={'Номер этапа (0 не отображается)*'}
          register={register(propertyOrder, { required: 'Обязательное поле' })}
          validationText={errors[propertyOrder]?.message || ''}
          input={{ id: `${propertyOrder}-StageSeriesCard`, type: 'number' }}
          placeholder="Введите 0-100"
          loading={loading}
        />
      </div>

      <div className={styles.box__field}>
        <InputAuth
          label={'Название этапа'}
          register={register(propertyStageName, { required: 'Обязательное поле' })}
          validationText={errors[propertyStageName]?.message || ''}
          input={{ id: `${propertyStageName}-StageSeriesCard`, type: 'text' }}
          loading={loading}
        />
      </div>

      <div className={styles.box__checkbox}>
        <span>Учитывать результаты заезда в генеральном зачёте</span>
        <CheckboxRFH
          register={register(propertyIncludeResults)}
          id={`${propertyIncludeResults}-StageSeriesCard`}
          loading={loading}
          tooltip={'запрет на обновление итоговых таблиц'}
        />
      </div>
    </section>
  );
}
