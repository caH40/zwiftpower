import React from 'react';

import Button from '../Button/Button';
import SimpleCheckbox from '../SimpleCheckbox/SimpleCheckbox';
import SimpleInput from '../SimpleInput/SimpleInput';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import TextArea from '../TextArea/TextArea';

import { seriesType } from '../../../asset/series-type';

import styles from './FormEditSeries.module.css';

function FormEditSeries({ series, setSeries, sendForm }) {
  return (
    <form className={styles.form} name="series">
      <SimpleInput
        name="Название серии"
        state={series}
        setState={setSeries}
        property="name"
        type="text"
      />
      <SimpleInput
        name="Дата старта"
        state={series}
        setState={setSeries}
        property="dateStart"
        type="date"
        min="2016-01-01"
        max="2030-01-01"
      />
      <SimpleSelect
        name="Тип серии"
        state={series}
        setState={setSeries}
        property="type"
        options={seriesType}
      />
      <SimpleSelect
        name="Организатор"
        state={series}
        setState={setSeries}
        property="organizer"
        options={[{ name: 'KOM-ON', id: '1' }]}
      />
      <TextArea
        name="Краткое описание"
        state={series}
        setState={setSeries}
        property="descriptionShort"
      />
      <TextArea name="Описание" state={series} setState={setSeries} property="description" />

      <div className={styles.box__checkbox}>
        <SimpleCheckbox
          state={series}
          setState={setSeries}
          property="hasGeneral"
          title="Генеральный зачёт:"
          tooltip="Показывать генеральную квалификацию Серии."
        />

        <SimpleCheckbox
          state={series}
          setState={setSeries}
          property="hasTeams"
          title="Командный зачёт:"
          tooltip="Показывать командный зачёт Серии."
        />

        <SimpleCheckbox
          state={series}
          setState={setSeries}
          property="isFinished"
          title="Серия завершена:"
          tooltip="При активации не обновляется генеральная квалификация Серии."
        />
      </div>

      <div className={styles.right}>
        <Button getClick={sendForm}>сохранить</Button>
      </div>
    </form>
  );
}

export default FormEditSeries;
