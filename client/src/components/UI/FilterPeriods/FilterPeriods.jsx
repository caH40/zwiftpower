import { optionsPeriodsRidersInEvent } from '../../../assets/options';
import SimpleSelect from '../SimpleSelect/SimpleSelect';

function FilterPeriods({ form, setForm }) {
  return (
    <form>
      <SimpleSelect
        state={form}
        setState={setForm}
        property="period"
        options={optionsPeriodsRidersInEvent}
        closeEmptyOption={true}
      />
    </form>
  );
}

export default FilterPeriods;
