import styles from './LogoRider.module.css';

function LogoRider({ source, firstName, lastName }) {
  const name = (firstName?.slice(0, 1) || '') + (lastName?.slice(0, 1) || '');

  return (
    <>
      {source ? (
        <img className={styles.img} src={source} alt="Ph" />
      ) : (
        <div className={styles.empty}>{name}</div>
      )}
    </>
  );
}

export default LogoRider;
