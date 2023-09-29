import React from 'react';

import SimpleSelect from '../../SimpleSelect/SimpleSelect';
import { optionsSeasons } from '../../../../assets/options';

import styles from './FilterCatchup.module.css';

function FilterCatchup({ form, setForm }) {
  return (
    <form className={styles.box}>
      <SimpleSelect
        state={form}
        setState={setForm}
        property="season"
        options={optionsSeasons}
        closeEmptyOption={true}
      />
    </form>
  );
}

export default FilterCatchup;
