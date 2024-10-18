import { useSelector } from 'react-redux';

import { roundValue } from '../../../utils/round';

import HighlightValueMax from './HighlightValueMax';
// import DefineCategory from './DefineCategory';

function TdCpWatts({ cpBestEfforts = [], interval }) {
  const { column } = useSelector((state) => state.filterWatts.value);

  const dimension = column === 'watts' ? 'integer' : 'hundred';
  const dimensionValue = column === 'watts' ? 'вт' : 'вт/кг';
  const cp = cpBestEfforts.find((cp) => cp.duration === interval)?.[column] || null;
  const valueRaw = cp?.value;
  const valueAdditionCP = cp?.addition;

  // const { value: valueRaw, addition: valueAdditionCP } =
  //   cpBestEfforts.find((cp) => cp.duration === interval)?.[column] || null;

  const valueCPRounded = roundValue(valueAdditionCP, dimension);

  return (
    <td>
      {/* <DefineCategory cpBestEfforts={cpBestEfforts} interval={interval}> */}
      <HighlightValueMax
        valueCPRounded={valueCPRounded}
        dimensionValue={dimensionValue}
        valueRaw={valueRaw}
        interval={interval}
      />
      {/* </DefineCategory> */}
    </td>
  );
}

export default TdCpWatts;
