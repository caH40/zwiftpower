import { useForm, useFieldArray } from 'react-hook-form';
import cn from 'classnames/bind';

import StageSeriesCard from '../UI/StageSeriesCard/StageSeriesCard';

import styles from './StagesSeriesEdit.module.css';
import { useSelector } from 'react-redux';
import StagesInSeries from '../StagesInSeries/StagesInSeries';
import { useState } from 'react';

const cx = cn.bind(styles);

const defaultValues = [
  // {
  //   eventId: '24esed',
  //   name: 'BCA Bolognya',
  //   startEvent: new Date().toISOString(),
  //   event: 'asldkjlkjasd',
  //   order: 1,
  //   label: '',
  //   includeResults: true,
  // },
  // {
  //   eventId: '24esed2',
  //   name: 'BCA Wattopia',
  //   startEvent: new Date().toISOString(),
  //   event: 'asldkjlkjasd',
  //   order: 0,
  //   label: 'Пролог',
  //   includeResults: true,
  // },
];

/**
 * Компонент добавления/удаления и редактирования этапов в Серии заездов.
 */
export default function StagesSeriesEdit() {
  const [loading, setLoading] = useState(false);
  // Эвенты, которые можно добавить в Серю как этапы.
  const { eventsForSeries } = useSelector((state) => state.fetchEvents);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { stages: defaultValues || [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stages',
  });

  const onSubmit = (data) => {
    console.log('Отправленные данные:', data);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {fields.map((stage, index) => (
          <StageSeriesCard
            key={stage.eventId}
            name={stage.name}
            startEvent={stage.startEvent}
            propertyOrder={`stages.${index}.order`}
            propertyStageName={`stages.${index}.label`}
            propertyIncludeResults={`stages.${index}.includeResults`}
            register={register}
            errors={errors}
            handleClick={() => remove(index)}
            loading={false}
          />
        ))}

        <button type="button" onClick={() => append({ order: 0, includeResults: false })}>
          Добавить этап
        </button>
        <button type="submit">Сохранить</button>
      </form>

      <div className={cx('wrapper__stages', { inactive: loading })}>
        <StagesInSeries stages={eventsForSeries} action="add" />
      </div>
    </div>
  );
}
