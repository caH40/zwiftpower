import { getHeightStr, getWeightStr } from '../../../utils/event';
import { roundValue } from '../../../utils/round';
import styles from '../Table.module.css';

export function tdRider(name, imageSrc) {
  return (
    <div className={styles.rider}>
      <div className={styles.rider__logo}>
        {imageSrc ? (
          <img className={styles.rider__img} src={imageSrc} alt="Ph" />
        ) : (
          <div className={styles.rider__img__empty}>{name.slice(0, 3)}</div>
        )}
      </div>

      <span>{name}</span>
    </div>
  );
}

export function tdLinkZP(zwiftRiderId) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://zwiftpower.com/profile.php?z=${zwiftRiderId}`}
      style={{ color: 'inherit', textDecoration: 'inherit' }}
    >
      профиль
    </a>
  );
}

export function tdCategory(result) {
  let newCategory = result.category;
  if (result.category.includes('WA') || result.category.includes('WB'))
    newCategory = result.category.slice(1);
  return (
    <div className={styles.categoryBox}>
      <div className={`${styles.category} ${styles[result.category]}`}>{newCategory}</div>
      {result.isUnderChecking ? <div className={styles.underChecking}>❗</div> : ''}
    </div>
  );
}

export function tdTime(time) {
  if (time === 'DQ') return <div className={styles.dq}>DQ</div>;
  if (time === 'DNF') return <div className={styles.dq}>DNF</div>;
  return String(time).includes('.') ? (
    <>
      {time.split('.')[0]}
      <span className={styles.text__additional} key={Date.now()}>
        .{time.split('.')[1]}
      </span>
    </>
  ) : (
    time
  );
}

export function highlightValueMax(value, dimension) {
  if (+value === 0 || value === '0max') return null;
  const data = String(value).includes('max') ? (
    <span className={styles.max}>
      {value.replace('max', '')}
      <span className={styles.small}>{dimension}</span>
    </span>
  ) : (
    <span>
      {value}
      <span className={styles.small}>{dimension}</span>
    </span>
  );

  return value ? data : '';
}

export function tdWatts(value) {
  return highlightValueMax(value, 'Вт');
}

export function tdCPWattsPerKg(value, interval) {
  let valueCP = value.find((cp) => cp.duration === interval)?.wattsKg.addition;
  valueCP = roundValue(valueCP, 'ten');
  return highlightValueMax(valueCP, 'вт/кг');
}
export function tdHeartRate(value) {
  return highlightValueMax(value, 'уд/м');
}
export function tdWeight(value) {
  return highlightValueMax(getWeightStr(value), 'кг');
}
export function tdHeight(value) {
  return highlightValueMax(getHeightStr(value, 'cm'), 'см');
}
