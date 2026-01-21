import InputAuth from '../UI/InputAuth/InputAuth';

import styles from './BlockInputsTime.module.css';

/**
 * Форма для ввода времени с полями для каждой части времени (чч,мм,сс,млс).
 */
export default function BlockInputsTime({ register, errors }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__inputs}>
        <InputAuth
          label="часы"
          input={{ id: 'hours-BlockInputsTime', type: 'number' }}
          id={'hours-BlockInputsTime'}
          autoComplete="off"
          type="number"
          register={register('time.hours', {
            pattern: {
              value: /^([0-9]|[1-9][0-9])$/,
              message: '0-99',
            },
          })}
          validationText={!!errors.time?.hours?.message || ''}
        />

        <InputAuth
          label="минуты"
          input={{ id: 'minutes-BlockInputsTime', type: 'number' }}
          id={'minutes-BlockInputsTime'}
          autoComplete="off"
          type="number"
          register={register('time.minutes', {
            // required: 'обязательное поле',
            pattern: {
              value: /^([0-9]|[1-5][0-9])$/,
              message: '0-59',
            },
          })}
          validationText={!!errors.time?.minutes?.message || ''}
        />

        <InputAuth
          label="секунды"
          input={{ id: 'seconds-BlockInputsTime', type: 'number' }}
          id={'seconds-BlockInputsTime'}
          autoComplete="off"
          type="number"
          register={register('time.seconds', {
            pattern: {
              value: /^([0-9]|[1-5][0-9])$/,
              message: '0-59',
            },
          })}
          validationText={!!errors.time?.seconds?.message || ''}
        />

        <InputAuth
          label="млсек"
          input={{ id: 'milliseconds-BlockInputsTime', type: 'number' }}
          id={'milliseconds-BlockInputsTime'}
          autoComplete="off"
          type="number"
          register={register('time.milliseconds', {
            pattern: {
              value: /^([0-9]|[0-9][0-9]|[0-9][0-9][0-9])$/,
              message: '0-999',
            },
          })}
          validationText={!!errors.time?.milliseconds?.message || ''}
        />
      </div>

      <div className={styles.validate}>
        {errors.time?.hours?.message && <span>часы: {errors.time?.hours?.message}, </span>}
        {errors.time?.minutes?.message && (
          <span>минуты: {errors.time?.minutes?.message}, </span>
        )}
        {errors.time?.seconds?.message && (
          <span>секунды: {errors.time?.seconds?.message}, </span>
        )}
        {errors.time?.milliseconds?.message && (
          <span>миллисекунды: {errors.time?.milliseconds?.message}, </span>
        )}
      </div>
    </div>
  );
}
