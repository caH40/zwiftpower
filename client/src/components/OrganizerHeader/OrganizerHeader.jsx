import { useState } from 'react';
import { Transition } from 'react-transition-group';
import cn from 'classnames/bind';

import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';
import { createHtml } from '../../utils/html';
import OpenBoxArrow from '../UI/OpenBoxArrow/OpenBoxArrow';
import ButtonUrl from '../UI/ButtonUrl/ButtonUrl';
import IconTelegram from '../icons/IconTelegram';
import IconWebsite from '../icons/IconWebsite';
import IconZwift from '../icons/IconZwift';
import { useResize } from '../../hook/use-resize';

import styles from './OrganizerHeader.module.css';

const cx = cn.bind(styles);

/**
 * Блок-шапка Организатора с описанием и ссылками на внешние ресурсы.
 */
export default function OrganizerHeader({ organizer }) {
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { isScreenMd } = useResize();
  return (
    <section className={styles.wrapper}>
      <div className={styles.poster}>
        <AdaptiveImage
          sources={organizer.posterUrls}
          className={styles.poster__img}
          height={300}
        />

        {/* Кнопка открытия/закрытия описания */}
        <div className={styles.description__control}>
          <OpenBoxArrow
            getClick={() => setIsOpenDescription((prev) => !prev)}
            isOpened={isOpenDescription}
            tooltip={'Открыть подробное описание Организатора'}
            color="#0f4fa8"
          />
        </div>

        {/* Блок с контентом */}
        <div className={styles.content}>
          {/* Блок с лого и названием Организатора */}
          <div className={styles.title__box}>
            <img
              src={organizer.logoUrls?.original}
              alt={`Логотип Организатора ${organizer.name}`}
              className={styles.logo}
              width={60}
              height={60}
            />
            <h3 className={styles.title}>{organizer.name}</h3>
          </div>

          <div className={styles.content__bottom}>
            <div className={styles.buttons__block}>
              <ButtonUrl name={'Клуб в Zwift'} Icon={IconZwift} href={organizer.clubMain} />

              {/* Кнопка на переход в группу телеграм */}
              {organizer.telegram?.group && (
                <ButtonUrl
                  name={'Группа'}
                  Icon={IconTelegram}
                  href={organizer.telegram.group}
                />
              )}

              {/* Кнопка на переход в канал телеграм */}
              {organizer.telegram?.channel && (
                <ButtonUrl
                  name={'Канал'}
                  Icon={IconTelegram}
                  href={organizer.telegram?.channel}
                />
              )}

              {/* Кнопка на переход на вебсайт */}
              {organizer.website && (
                <ButtonUrl name={'Вебсайт'} Icon={IconWebsite} href={organizer.website} />
              )}
            </div>

            {/* Цель организатора */}
            {organizer.mission && isScreenMd && (
              <div className={styles.mission__box}>
                <span className={styles.mission}>{organizer.mission}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Открывающийся блок с описанием организатора */}
      {organizer.mission && (
        <Transition in={isOpenDescription} timeout={100}>
          {(state) => (
            <div className={cx('description', state)}>
              {/* Цель организатора отображается при разрешении Б 768px */}
              {!isScreenMd && (
                <div className={styles.mission__inDescription}>{organizer.mission}</div>
              )}

              <div
                dangerouslySetInnerHTML={{
                  __html: createHtml.description(organizer.description),
                }}
              />
            </div>
          )}
        </Transition>
      )}
    </section>
  );
}
