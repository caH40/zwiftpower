import { dsqValues } from '../../../asset/dsq';
import DSQBox from '../../DSQBox/DSQBox';
import IconCupRank from '../../icons/IconCupRank';

const TdRank = ({ value, dsq }) => {
  // первые 3 места
  if ([1, 2, 3].includes(value)) {
    return <IconCupRank place={value} />;
  }

  // при ранке 0
  const dsqValue = dsqValues.find((elm) => elm.value === dsq);
  // для тех кто дисквалифицирован
  if (value === 0) {
    return <>{dsq ? <DSQBox tooltip={dsqValue.description}>{dsqValue.label}</DSQBox> : null}</>;
  }

  // значение без изменений
  return value;
};

export default TdRank;
