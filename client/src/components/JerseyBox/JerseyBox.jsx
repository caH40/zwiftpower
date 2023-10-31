import { jerseys } from '../../assets/zwift/raw/jerseys';

function JerseyBox({ jerseyId }) {
  const jersey = jerseys.find((jersey) => jersey.id === jerseyId) || {};
  return <div>{jersey.name ?? 'не выбрано'}</div>;
}

export default JerseyBox;
