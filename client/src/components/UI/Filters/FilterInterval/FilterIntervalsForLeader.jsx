import { useSelector } from 'react-redux';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setIntervalsForLeaders } from '../../../../redux/features/filterIntervalsForLeaderSlice';
import { intervalsForLeader } from '../../../../assets/filters';
import { getButtonPositionClassName } from '../../../../utils/buttonClasses';

import styles from './FilterIntervalsForLeader.module.css';

/**
 * Выбор интервала на котором замеряются значения мощности
 */
function FilterIntervalsForLeader() {
  const intervalState = useSelector((state) => state.filterIntervalsForLeader.value);

  return (
    <nav className={styles.box}>
      {intervalsForLeader.map((intervalName, index) => {
        return (
          <ButtonForFilter
            key={intervalName.name}
            positionClassName={getButtonPositionClassName({
              index,
              quantityBtn: intervalsForLeader.length,
            })}
            active={intervalState.name === intervalName.name}
            reducer={setIntervalsForLeaders}
          >
            {intervalName.name}
          </ButtonForFilter>
        );
      })}
    </nav>
  );
}

export default FilterIntervalsForLeader;
