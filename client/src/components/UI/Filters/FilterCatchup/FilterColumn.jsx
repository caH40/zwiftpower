import React from 'react';

import SimpleSelect from '../../SimpleSelect/SimpleSelect';
import { optionsSeasons } from '../../../../asset/seasons';

import styles from './FilterCatchup.module.css';

function FilterCatchup({ form, setForm }) {
  return (
    <form className={styles.box}>
      <SimpleSelect
        state={form}
        setState={setForm}
        property="season"
        options={optionsSeasons}
      />
    </form>
  );
}

export default FilterCatchup;
