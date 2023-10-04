import TdRider from '../Td/TdRider';
import { getTimerLocal } from '../../../utils/date-local';

function TrBlock({ result, index, type }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{result[type]} ватт</td>
      <TdRider profileId={result.zwiftId} profile={result.profileData} />
      <td>{result.eventName}</td>
      <td>{getTimerLocal(result.eventStart, 'DDMMYY')}</td>
    </tr>
  );
}

export default TrBlock;
