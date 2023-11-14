import styles from './Td.module.css';

function TdLogo({ srcPicture }) {
  return (
    <td>
      <div className={styles.rider__logo__block}>
        {srcPicture ? <img className={styles.rider__img} src={srcPicture} alt="Ph" /> : null}
      </div>
    </td>
  );
}

export default TdLogo;
