import MyTooltip from '../../HOC/MyTooltip';
import { jerseys } from '../../assets/zwift/raw/jerseys';

import styles from './JerseyBox.module.css';

const jerseyImageUrlStandard =
  'https://cdn.zwift.com/static/zc/JERSEYS/ZwiftStandardOrange_thumb.png';

function JerseyBox({ jerseyId }) {
  const jersey = jerseys.find((jersey) => jersey.id === jerseyId);

  const jerseyImageUrl = jersey?.imageUrl || jerseyImageUrlStandard;
  const jerseyName = jersey?.name || 'не выбрана';

  return (
    <div>
      <MyTooltip tooltip={jerseyName}>
        <img className={styles.image} src={jerseyImageUrl} />
      </MyTooltip>
    </div>
  );
}

export default JerseyBox;
