import avatar from '../../../images/avatar.svg';
import { secondesToTime } from '../../../utils/date-convert';
import { getHeightStr, getWeightStr } from '../../../utils/event';
import styles from '../Table.module.css';

export function tdRider(name, imageSrc) {
  const riderLogo = imageSrc ? imageSrc : avatar;
  return (
    <div className={styles.rider}>
      <img className={styles.logo} src={riderLogo} alt="Ph" /> <span>{name}</span>
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

export function tdGap(gap) {
  const gapTime = secondesToTime(gap);
  return <div className={styles.gap}>{gapTime ? <>{`+${gapTime}`}</> : ''}</div>;
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
  const data = String(value).includes('max') ? (
    <span className={styles.max}>
      {value.replace('max', '')}
      <small>{dimension}</small>
    </span>
  ) : (
    <span>
      {value}
      <small>{dimension}</small>
    </span>
  );

  return value ? data : '';
}

export function tdWatts(value) {
  return highlightValueMax(value, 'Вт');
}
export function tdWattsPerKg(value) {
  return highlightValueMax(value, 'Вт/кг');
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
