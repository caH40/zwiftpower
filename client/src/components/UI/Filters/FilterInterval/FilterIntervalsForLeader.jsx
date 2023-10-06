import { useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setIntervalsForLeaders } from '../../../../redux/features/filterIntervalsForLeaderSlice';
import { getIntervalName } from '../../../../utils/intervals';

import styles from './FilterIntervalsForLeader.module.css';

function FilterIntervalsForLeader({ intervals }) {
  const intervalState = useSelector((state) => state.filterIntervalsForLeader.value);

  const buttonsInterval = intervals.map((interval) => getIntervalName(interval));

  const quantityButtonsInterval = buttonsInterval.length;
  return (
    <nav className={styles.box}>
      {buttonsInterval.map((intervalName, index) => {
        return (
          <ButtonForFilter
            key={intervalName}
            position={cn({
              left: index === 0,
              center:
                index !== 0 &&
                quantityButtonsInterval > 2 &&
                index + 1 !== quantityButtonsInterval,
              right: index !== 0 && index + 1 === quantityButtonsInterval,
            })}
            active={intervalState.name === intervalName}
            reducer={setIntervalsForLeaders}
          >
            {intervalName}
          </ButtonForFilter>
        );
      })}
    </nav>
  );
}

export default FilterIntervalsForLeader;
