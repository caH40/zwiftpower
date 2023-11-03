import { dsqValues } from '../../../assets/dsq';
import DSQBox from '../../DSQBox/DSQBox';
import IconCupRank from '../../icons/IconCupRank';

const TdRank = ({ value, isDsq, dsqType, dsqDescription }) => {
  // первые 3 места
  if ([1, 2, 3].includes(value)) {
    return <IconCupRank place={value} />;
  }

  // при ранке 0 должен быть дисквал(выставляется на сервере)
  const dsqObject = dsqValues.find((elm) => elm.type === dsqType);
  // для тех кто дисквалифицирован
  if (isDsq) {
    return (
      <>{dsqObject ? <DSQBox tooltip={dsqDescription}>{dsqObject.label}</DSQBox> : null}</>
    );
  }

  // значение без изменений
  return value;
};

export default TdRank;
