import { optionsSeasons } from '../../../../assets/options';
import SimpleSelectFunction from '../../SimpleSelect/SimpleSelectFunction';

import styles from './FilterCatchup.module.css';

function FilterCatchup({ season, reducer }) {
  return (
    <form className={styles.box}>
      <SimpleSelectFunction
        reducer={reducer}
        options={optionsSeasons}
        value={season}
        closeEmptyOption={true}
      />
    </form>
  );
}

export default FilterCatchup;
