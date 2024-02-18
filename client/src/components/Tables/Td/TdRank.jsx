import { dsqValues } from '../../../assets/dsq';
import DSQBox from '../../DSQBox/DSQBox';
import IconCupRank from '../../icons/IconCupRank';

import styles from './Td.module.css';

const TdRank = ({ value, isDsq, dsqType, dsqDescription }) => {
  // первые 3 места
  if ([1, 2, 3].includes(value) && !isDsq) {
    return (
      <div className={styles.rank}>
        <IconCupRank place={value} />
      </div>
    );
  }

  // при ранке 0 должен быть дисквал(выставляется на сервере)
  const dsqObject = dsqValues.find((elm) => elm.type === dsqType);
  // для тех кто дисквалифицирован
  if (isDsq) {
    return (
      <>
        {dsqObject ? (
          <div className={styles.rank}>
            <DSQBox tooltip={dsqDescription}>{dsqObject.label}</DSQBox>
          </div>
        ) : null}
      </>
    );
  }

  // значение без изменений
  return value;
};

export default TdRank;
