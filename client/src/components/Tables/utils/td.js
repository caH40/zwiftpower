import { secondesToTime } from '../../../utils/date-convert';
import { getHeightStr, getWeightStr } from '../../../utils/event';
import Flag from '../../Flag/Flag';
import IconCupRank from '../../icons/IconCupRank';
import styles from '../Table.module.css';

export function tdRider(firstName, lastName, imageSrc, flag, showIcons) {
  return (
    <div className={styles.rider}>
      {flag ? (
        <div className={styles.box__flag}>
          <Flag name={flag} />
        </div>
      ) : (
        <div className={styles.box__flag} />
      )}
      {showIcons && (
        <div className={styles.rider__logo}>
          {imageSrc ? (
            <img className={styles.rider__img} src={imageSrc} alt="Ph" />
          ) : (
            <div className={styles.rider__img__empty}>
              {firstName.slice(0, 1) + lastName.slice(0, 1)}
            </div>
          )}
        </div>
      )}
      <span>{`${firstName} ${lastName}`}</span>
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
export function tdWattsPerKg(value) {
  const valueRounded = roundValueToTenths(value);
  return highlightValueMax(valueRounded, 'вт/кг');
}
export function tdCPWattsPerKg(value, interval) {
  let valueCP = value.find((cp) => cp.duration === interval)?.wattsKg.addition;
  valueCP = roundValueToTenths(valueCP);
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
export function tdRank(value) {
  if ([1, 2, 3].includes(value)) return <IconCupRank place={value} />;
  return value;
}

export function roundValueToTenths(value) {
  if (String(value).includes('max')) {
    return (Math.round(value.split('max')[0] * 10) / 10).toFixed(1) + 'max';
  } else {
    return (Math.round(value * 10) / 10).toFixed(1);
  }
}
