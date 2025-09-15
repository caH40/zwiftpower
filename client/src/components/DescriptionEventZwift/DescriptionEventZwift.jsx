import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { gapStart } from '../../utils/event';
import { getTimerLocal } from '../../utils/date-local';
import IconEdit from '../icons/IconEdit';
import IconModify from '../icons/IconModify';

import ParamsEvent from '../ParamsEvent/ParamsEvent';
import CategoryBoxDescription from '../CategoryBoxDescription/CategoryBoxDescription';
import RaceBoxDescription from '../RaceBoxDescription/RaceBoxDescription';
import OpenBoxArrow from '../UI/OpenBoxArrow/OpenBoxArrow';
import PrivateEvent from '../PrivateEvent/PrivateEvent';
import LinksRoute from '../LinksRoute/LinksRoute';
import RouteProfileAndMap from '../RouteProfileAndMap/RouteProfileAndMap';
import AccessExpression from '../AccessExpression/AccessExpression';
import { createHtml } from '../../utils/html';
import { createDescription } from '../../Pages/ZwiftEditEvent/utils/description';

import styles from './DescriptionEventZwift.module.css';

function DescriptionEventZwift({ event, forSchedule, eventId }) {
  const [isOpened, setIsOpened] = useState(false);
  const { moderator } = useSelector((state) => state.checkAuth.value.user);

  // Проверка что текущий Эвент создан в клубе, который может модерировать пользователь.
  const isAllowedModerate = moderator?.clubs.includes(event?.microserviceExternalResourceId);

  const navigate = useNavigate();

  const openDetailed = () => {
    setIsOpened((prev) => !prev);
  };

  const modifyResultsEvent = () => {
    navigate(`/results/edit/${eventId}`);
  };

  const gaps = gapStart(event);

  // Для отображения параметров заезда берутся данные из первой группы в массиве групп Эвента.
  // Поэтому если в других группах будет другой маршрут, то это можно увидеть в открывающемся блоке описания Эвента.
  // eslint-disable-next-line prefer-destructuring
  const { mapId, routeId, durationInSeconds, distanceInMeters, laps, distanceSummary } =
    event?.eventSubgroups?.[0] || [];

  return (
    <section className={styles.wrapper}>
      <div
        className={cn(styles.block__main, { [styles.block__mainClosed]: !isOpened })}
        style={{ backgroundImage: `url(${event?.imageUrl})` }}
      >
        <div className={styles.box__open}>
          <OpenBoxArrow
            getClick={openDetailed}
            isOpened={isOpened}
            tooltip={'Открыть подробное описание заезда'}
            pulse={'orangePulseStroke'}
          />
        </div>

        {/* показывать только для страницы результатов */}
        {!forSchedule && isAllowedModerate && (
          <div className={styles.box__modify}>
            <IconModify getClick={modifyResultsEvent} bgColor={'#ff7c00'} />
          </div>
        )}
        <div
          className={cn(styles.main__inner, {
            [styles.main__innerClosed]: !isOpened,
          })}
        >
          <div className={styles.box__left}>
            <div className={styles.box__title}>
              <h2 className={styles.title}>{event?.name}</h2>
              {forSchedule && isAllowedModerate && (
                <Link to={`/zwift/event/edit/${event?.id}`}>
                  <IconEdit
                    tooltip={'Редактирование параметров заезда в Звифте'}
                    squareSize={20}
                  />
                </Link>
              )}
            </div>
            <PrivateEvent event={event} />
            <h3 className={styles.subtitle}>
              {getTimerLocal(event?.eventStart, 'DDMMYYHm', true)}
            </h3>
          </div>

          {isOpened && (
            <div className={styles.box__right}>
              <RaceBoxDescription event={event} />
              <div className={styles.wrapper__categories}>
                {event?.eventSubgroups?.map((subgroup) => (
                  <CategoryBoxDescription key={subgroup.id} subgroup={subgroup} gaps={gaps} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Подвал карточки */}
        <div className={styles.box__params}>
          <ParamsEvent
            mapId={mapId}
            routeId={routeId}
            durationInSeconds={durationInSeconds}
            distanceInMeters={distanceInMeters}
            laps={laps}
            distanceSummary={distanceSummary}
          />
        </div>
      </div>

      {isOpened && (
        <div className={styles.block__text}>
          <RouteProfileAndMap routeId={event?.eventSubgroups[0].routeId} />
          <LinksRoute routeId={event?.eventSubgroups[0].routeId} />
          <hr className={styles.hr} />
          <p
            className={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: createHtml.description(event?.description) }}
          ></p>

          {/* Описание Строгой категоризации */}
          {event?.accessExpressionObj && (
            <>
              <hr className={styles.hr} />
              <AccessExpression description={event?.accessExpressionObj?.description} />
            </>
          )}

          <hr className={styles.hr} />
          <p
            className={styles.paragraph}
            dangerouslySetInnerHTML={{
              __html: createHtml.description(createDescription(event)),
            }}
          ></p>
          <hr className={styles.hr} />
        </div>
      )}
    </section>
  );
}

export default DescriptionEventZwift;
