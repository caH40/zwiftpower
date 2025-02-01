import { useState } from 'react';
import { Transition } from 'react-transition-group';
import cn from 'classnames/bind';

import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';
import { createHtml } from '../../utils/html';
import { useResize } from '../../hook/use-resize';
import OpenBoxArrow from '../UI/OpenBoxArrow/OpenBoxArrow';
import ButtonUrl from '../UI/ButtonUrl/ButtonUrl';
import IconTelegram from '../icons/IconTelegram';
import IconWebsite from '../icons/IconWebsite';
import IconZwift from '../icons/IconZwift';
import IconVk from '../icons/IconVk';

import styles from './OrganizerHeader.module.css';

const cx = cn.bind(styles);

/**
 * Блок-шапка Организатора с описанием и ссылками на внешние ресурсы.
 */
export default function OrganizerHeader({
  organizer: {
    posterUrls,
    logoUrls,
    name,
    clubMain,
    telegram,
    website,
    socialLinks,
    mission,
    description,
  },
}) {
  const [isOpenDescription, setIsOpenDescription] = useState(false);

  const { isScreenMd } = useResize();

  return (
    <section className={styles.wrapper}>
      <div className={styles.poster}>
        <div className={styles.poster__placeholder}></div>
        <AdaptiveImage sources={posterUrls} className={styles.poster__img} height={300} />

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
            {logoUrls?.original && (
              <img
                src={logoUrls?.original}
                alt={`Логотип Организатора ${name}`}
                className={styles.logo}
                width={60}
                height={60}
              />
            )}
            <h3 className={styles.title}>{name}</h3>
          </div>

          <div className={styles.content__bottom}>
            <div className={styles.buttons__block}>
              <ButtonUrl
                name={'Клуб в Zwift'}
                Icon={IconZwift}
                href={clubMain}
                isZwiftCompanionLink={true}
              />

              {/* Кнопка на переход в группу телеграм */}
              {telegram?.group && (
                <ButtonUrl name={'Группа'} Icon={IconTelegram} href={telegram.group} />
              )}

              {/* Кнопка на переход в канал телеграм */}
              {telegram?.channel && (
                <ButtonUrl name={'Канал'} Icon={IconTelegram} href={telegram?.channel} />
              )}

              {/* Кнопка на переход на вебсайт */}
              {website && <ButtonUrl name={'Вебсайт'} Icon={IconWebsite} href={website} />}

              {/* Кнопка на переход на вебсайт */}
              {socialLinks?.vk && (
                <ButtonUrl name={'ВКонтакте'} Icon={IconVk} href={socialLinks.vk} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Открывающийся блок с описанием организатора */}
      {mission && (
        <Transition in={isOpenDescription} timeout={100}>
          {(state) => (
            <div className={cx('description', state)}>
              {/* Цель организатора отображается при разрешении Б 768px */}
              <div className={styles.mission__content}>
                {!isScreenMd && (
                  <div
                    className={styles.mission__inDescription}
                    dangerouslySetInnerHTML={{
                      __html: createHtml.description(mission),
                    }}
                  />
                )}

                <div
                  dangerouslySetInnerHTML={{
                    __html: createHtml.description(description),
                  }}
                />
              </div>
            </div>
          )}
        </Transition>
      )}
    </section>
  );
}
