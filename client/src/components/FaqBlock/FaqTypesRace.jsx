import React from 'react';

import RaceRuleBox from '../RaceRuleBox/RaceRuleBox';

import styles from './FaqBlock.module.css';
import Abbreviation from './Abbreviation';

function FaqTypesRace() {
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Типы заездов</h3>
      <Abbreviation Icon={<RaceRuleBox label={'CT'} showLabel={true} />}>
        Классическая гонка без групп
      </Abbreviation>
      <Abbreviation Icon={<RaceRuleBox label={'CG'} showLabel={true} />}>
        Классическая гонка с разделением по группам
      </Abbreviation>
      <Abbreviation Icon={<RaceRuleBox label={'CU'} showLabel={true} />}>
        Догонялки
      </Abbreviation>
      <Abbreviation Icon={<RaceRuleBox label={'NE'} showLabel={true} />}>
        Заезд для новичков, для групп "C", "D"
      </Abbreviation>
      <Abbreviation Icon={<RaceRuleBox label={'TT'} showLabel={true} />}>
        Заезд с раздельным стартом
      </Abbreviation>
      <Abbreviation Icon={<RaceRuleBox label={'CR'} showLabel={true} />}>
        Критериум
      </Abbreviation>
      <Abbreviation Icon={<RaceRuleBox label={'CU'} showLabel={true} />}>
        Заезд на длинную дистанцию (объем)
      </Abbreviation>
    </div>
  );
}

export default FaqTypesRace;
