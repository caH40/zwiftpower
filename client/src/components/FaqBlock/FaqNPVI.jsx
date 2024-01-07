import { viParams } from '../../assets/constants';
import NPandVIBox from '../NPandVIBox/NPandVIBox';

import styles from './FaqBlock.module.css';

const { z1, z2, z3, z4 } = viParams;

const viData = [
  { id: 1, color: z1.color, description: `Показатель из диапазона 1-${z1.value}` },
  { id: 2, color: z2.color, description: `Показатель из диапазона ${z1.value}-${z2.value}` },
  { id: 3, color: z3.color, description: `Показатель из диапазона ${z2.value}-${z3.value}` },
  { id: 4, color: z4.color, description: `Показатель из диапазона больше ${z3.value}` },
];

function FaqNPVI() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Normalized Power и Variability Index</h2>
      <div className={styles.box__question}>
        <p className={`${styles.text} ${styles.text__answer}`}>
          Нормализованная мощность (NP) - это оценка мощности, которую вы могли бы поддерживать
          при тех же физиологических "затратах" с точки зрения использования гликогена,
          выработки лактата, уровня гормонов стресса и нервно-мышечной усталости, которые были
          бы при данном усилии или поездке, если бы ваша выходная мощность была абсолютно
          постоянной, а не переменной.
        </p>
        <NPandVIBox variabilityIndex={1.15} normalizedPower={280} />
      </div>
      <div className={styles.box__question}>
        <p className={`${styles.text} ${styles.text__answer}`}>
          Индекс вариабельности (VI) - отношение нормализованной к средней мощности. Показывает
          насколько плавной или "рваной" была ваша выходная мощность во время езды. Устойчивая и
          равномерная мощность, как во время триатлона, должна иметь значение VI 1,05 или
          меньше. Во время критериум-гонки ваш показатель VI может достигать 1,2 или более.
        </p>
        {viData.map((data) => (
          <div className={styles.flex__start} key={data.id}>
            <div className={styles.box__color} style={{ backgroundColor: data.color }} />
            <span>{data.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqNPVI;
