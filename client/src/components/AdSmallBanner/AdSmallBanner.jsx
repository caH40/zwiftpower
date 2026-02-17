import { useState } from 'react';
import cn from 'classnames/bind';

import styles from './AdSmallBanner.module.css';

const cx = cn.bind(styles);

/**
 * Небольшой горизонтальный рекламный баннер.
 *
 * @param {object} props
 * @param {string} props.imgSrc - URL изображения баннера.
 *
 * @param {{name: string, inn?: string, erid:string, site?: string}} props.advertiserData
 *  - Данные рекламодателя (ФИО/ИП/ООО, erid, ИНН по необходимости, сайт по желанию)
 *
 * @param {{name: string, inn?: string, ogrn?: string, site?: string}} props.distributorData
 *  - Данные рекламораспространителя (твоя информация – закон требует!)
 *
 * @param {string} props.link - Ссылка на рекламируемый продукт.
 *
 * @param {'0+'|'6+'|'12+'|'16+'|'18+'} [props.ageRestriction='0+']
 *  - Возрастная маркировка по ФЗ.
 *
 * @param {{title: string, text: string}} [props.content]
 *  - Заголовок и текст рекламы (опционально).
 *
 * @param {number} [props.width]
 * @param {number} [props.height]
 */
export default function AdSmallBanner({
  imgSrc,
  content,
  advertiserData = {},
  distributorData = {},
  link,
  ageRestriction = '0+',
  width,
  height,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.wrapper} style={{ width, height }}>
      <img
        src={imgSrc}
        className={cx(!content ? 'fullImg' : 'halfImage')}
        alt={`Рекламный баннер ${advertiserData.name}`}
        width={318}
        height={159}
      />

      <div className={styles.rightContainer}>
        {/* Верхняя плашка */}
        <div className={styles.header}>
          <div className={styles.adLabel}>Реклама · {ageRestriction}</div>

          <div className={styles.dotsBtn} onClick={() => setShowMenu((prev) => !prev)}>
            <div className={cn(styles.dot, styles.first)} />
            <div className={cn(styles.dot, styles.second)} />
            <div className={cn(styles.dot, styles.third)} />
          </div>
        </div>

        <div className={styles.contentContainer}>
          {content && <h5 className={styles.title}>{content.title}</h5>}

          {/* Кнопка перехода */}
          <div className={styles.linkContainer}>
            <a href={link} className={styles.link} target="_blank" rel="noreferrer">
              Перейти
            </a>
          </div>
        </div>
      </div>

      {/* Полные данные (рекламодатель + распространитель) */}
      {showMenu && (
        <div className={styles.menu}>
          <h5 className={styles.menuTitle}>Рекламное объявление</h5>

          {/* Рекламодатель */}
          <p className={styles.menuP}>Рекламодатель: {advertiserData.name}</p>

          {advertiserData.inn && <p className={styles.menuP}>ИНН: {advertiserData.inn}</p>}

          {advertiserData.erid && <p className={styles.menuP}>erid: {advertiserData.erid}</p>}

          {advertiserData.site && (
            <a
              className={styles.advertiserDataLink}
              href={advertiserData.site}
              target="_blank"
              rel="noreferrer"
            >
              {advertiserData.site}
            </a>
          )}

          <hr style={{ opacity: 0.3, margin: '10px 0' }} />

          {/* Рекламораспространитель (обязателен) */}
          <p className={styles.menuP}>Рекламораспространитель: {distributorData.name}</p>

          {distributorData.inn && <p className={styles.menuP}>ИНН: {distributorData.inn}</p>}

          {distributorData.ogrn && <p className={styles.menuP}>ОГРН: {distributorData.ogrn}</p>}

          {distributorData.site && (
            <a
              className={styles.advertiserDataLink}
              href={distributorData.site}
              target="_blank"
              rel="noreferrer"
            >
              {distributorData.site}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
