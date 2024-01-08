import { racesDescription } from '../../assets/faq';
import RaceRuleBox from '../RaceRuleBox/RaceRuleBox';

import styles from './FaqBlock.module.css';
import Abbreviation from './Abbreviation';

function FaqTypesRace() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Типы заездов</h2>

      {racesDescription.map((race) => (
        <Abbreviation
          key={race.id}
          Icon={<RaceRuleBox label={race.label} showLabel={race.showLabel} />}
        >
          {race.text}
        </Abbreviation>
      ))}
    </div>
  );
}

export default FaqTypesRace;
