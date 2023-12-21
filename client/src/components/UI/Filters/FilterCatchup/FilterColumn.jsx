import { optionsSeasons } from '../../../../assets/options';
import SimpleSelectFunction from '../../SimpleSelect/SimpleSelectFunction';

function FilterCatchup({ season, reducer }) {
  return (
    <form>
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
