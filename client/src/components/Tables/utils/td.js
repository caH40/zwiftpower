import avatar from '../../../images/avatar.svg';
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
  return <div className={styles.gap}>{gap ? ['+', gap] : ''}</div>;
}
