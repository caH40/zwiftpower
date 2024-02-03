import styles from './CardRecommendation.module.css';

/**
 * Рекомендательная карточка, рекламирующая другие страницы сайта
 * для удержания пользователя на сайте
 * @param {{ogData:{id:number, title:string, description:string,
 *  url:string, urlImage:string}}} ogData данные OpenGraph рекламируемой страницы
 */
function CardRecommendation({ ogPage }) {
  return (
    <div className={styles.block}>
      <img className={styles.img} src={ogPage.urlImage} />
      <div className={styles.block__info}>
        <div>
          <h4 className={styles.title}>{ogPage.title}</h4>
          <p className={styles.description}>{ogPage.description}</p>
        </div>
        <a className={styles.link} href={ogPage.url}>
          zwiftpower.ru
        </a>
      </div>
    </div>
  );
}

export default CardRecommendation;
