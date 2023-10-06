import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setIntervalsForLeaders } from '../../../../redux/features/filterIntervalsForLeaderSlice';
import { intervalsForLeader } from '../../../../assets/filters';

import styles from './FilterIntervalsForLeader.module.css';

/**
 * Выбор интервала на котором замеряются значения мощности
 */
function FilterIntervalsForLeader() {
  const intervalState = useSelector((state) => state.filterIntervalsForLeader.value);

  const quantityButtonsInterval = intervalsForLeader.length;
  return (
    <nav className={styles.box}>
      {intervalsForLeader.map((intervalName, index) => {
        return (
          <ButtonForFilter
            key={intervalName.name}
            position={cn({
              left: index === 0,
              center:
                index !== 0 &&
                quantityButtonsInterval > 2 &&
                index + 1 !== quantityButtonsInterval,
              right: index !== 0 && index + 1 === quantityButtonsInterval,
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
