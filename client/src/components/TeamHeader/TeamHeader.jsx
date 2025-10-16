import { useState } from 'react';
import { Transition } from 'react-transition-group';
import cn from 'classnames/bind';

import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';

import { useResize } from '../../hook/use-resize';
import { createHtml } from '../../utils/html';
import OpenBoxArrow from '../UI/OpenBoxArrow/OpenBoxArrow';
import ButtonUrl from '../UI/ButtonUrl/ButtonUrl';
import IconTelegram from '../icons/IconTelegram';
import IconWebsite from '../icons/IconWebsite';
import IconVk from '../icons/IconVk';
import IconZwift from '../icons/IconZwift';

import styles from './TeamHeader.module.css';

const cx = cn.bind(styles);

/**
 * Блок-шапка Команды с описанием и ссылками на внешние ресурсы.
 */
export default function TeamHeader({
  team: {
    posterUrls,
    logoUrls,
    name,
    telegram,
    zwiftClubId,
    website,
    socialLinks,
    mission,
    description,
  },
}) {
  const [isOpenDescription, setIsOpenDescription] = useState(false);

  const { isScreenMd } = useResize();

  const zwiftClubJoinUrl = `https://www.zwift.com/eu/clubs/${zwiftClubId}/join`;

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
            pulse={'bluePulseStroke'}
          />
        </div>

        {/* Блок с контентом */}
        <div className={styles.content}>
          {/* Блок с лого и названием Организатора */}
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

          <div className={styles.content__bottom}>
            <div className={styles.buttons__block}>
              {/* Кнопка на переход в клуб звифта */}
              {zwiftClubId && (
                <ButtonUrl
                  name={'Клуб'}
                  Icon={IconZwift}
                  href={zwiftClubJoinUrl}
                  isZwiftCompanionLink={true}
                />
              )}

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

            {mission && (
              <div className={styles.mission__box}>
                <p className={styles.mission}>{mission}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Открывающийся блок с описанием организатора */}
      {description && (
        <Transition in={isOpenDescription} timeout={100}>
          {(state) => (
            <div className={cx('description', state)}>
              {/* Цель организатора отображается при разрешении Б 768px */}
              <div className={styles.mission__content}>
                {mission && !isScreenMd && (
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
