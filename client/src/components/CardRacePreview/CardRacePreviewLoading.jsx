import classNames from 'classnames/bind';

import { useResize } from '../../hook/use-resize';

import styles from './CardRacePreview.module.css';

const cx = classNames.bind(styles);

function CardRacePreviewLoading() {
  const { isScreenSm: sm } = useResize();
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.loading__string}></h3>
      <div className={styles.card}>
        <div className={styles.card__top}>
          <div className={styles.description}>
            <div>
              <h2 className={styles.loading__string}></h2>
            </div>
            <dl className={styles.list}>
              <div className={styles.box__term}>
                <dt className={styles.loading__string}></dt>
                <dd className={styles.loading__string}></dd>
              </div>
              {sm && (
                <>
                  <div className={styles.box__term}>
                    <dt className={styles.loading__string}></dt>
                    <dd className={styles.loading__string}></dd>
                  </div>
                </>
              )}
            </dl>
          </div>
          <div className={cx('poster', 'loading')}></div>
        </div>
        <div className={cx('card__bottom', 'loading')}></div>
      </div>
    </div>
  );
}

export default CardRacePreviewLoading;
