import { dsqValues } from '../../../assets/dsq';
import DSQBox from '../../DSQBox/DSQBox';
import IconCupRank from '../../icons/IconCupRank';

import styles from './Td.module.css';

const TdRank = ({ value, disqualification }) => {
  // первые 3 места
  if ([1, 2, 3].includes(value) && !disqualification) {
    return (
      <div className={styles.rank}>
        <IconCupRank place={value} />
      </div>
    );
  }

  // при ранке 0 должен быть дисквал(выставляется на сервере)
  // const dsqObject = dsqValues.find((elm) => elm.type === dsqType);
  // для тех кто дисквалифицирован
  if (disqualification) {
    return (
      <>
        {disqualification ? (
          <div className={styles.rank}>
            <DSQBox tooltip={`Дисквалификация: ${disqualification.reason}`}>
              {disqualification.label}
            </DSQBox>
          </div>
        ) : null}
      </>
    );
  }

  // значение без изменений
  return value;
};

export default TdRank;
