import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { gapStart, replaceWithBr } from '../../utils/event';
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

import styles from './DescriptionEventZwiftNew.module.css';

function DescriptionEventZwiftNew({ event, forSchedule, eventId }) {
  const [isOpened, setIsOpened] = useState(false);
  const { role } = useSelector((state) => state.checkAuth.value.user);
  const isModerator = ['admin', 'moderator'].includes(role);
  const navigate = useNavigate();

  const openDetailed = () => {
    setIsOpened((prev) => !prev);
  };

  const modifyResultsEvent = () => {
    navigate(`/admin/results/edit/${eventId}`);
  };

  const gaps = gapStart(event);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.block__main, { [styles.block__mainClosed]: !isOpened })}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className={styles.box__open}>
          <OpenBoxArrow getClick={openDetailed} isOpened={isOpened} />
        </div>

        {/* показывать только для страницы результатов */}
        {!forSchedule && isModerator && (
          <div className={styles.box__modify}>
            <IconModify getClick={modifyResultsEvent} bgColor={'white'} />
          </div>
        )}
        <div
          className={cn(styles.main__inner, {
            [styles.main__innerClosed]: !isOpened,
          })}
        >
          <div className={styles.box__left}>
            <div className={styles.box__title}>
              <h2 className={styles.title}>{event.name}</h2>
              {isModerator && forSchedule && (
                <Link to={`/zwift/event/edit/${event.id}`}>
                  <IconEdit tooltip={'Редактирование параметров заезда в Звифте'} />
                </Link>
              )}
            </div>
            <PrivateEvent event={event} />
            <h3 className={styles.subtitle}>
              {getTimerLocal(event.eventStart, 'DDMMYYHm', true)}
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
        {isOpened && (
          <div className={styles.box__params}>
            <ParamsEvent event={event} />
          </div>
        )}
      </div>

      {isOpened && (
        <div className={styles.block__text}>
          <RouteProfileAndMap routeId={event.eventSubgroups[0].routeId} />
          <LinksRoute routeId={event?.eventSubgroups[0].routeId} />
          <p
            className={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: replaceWithBr(event.description) }}
          ></p>
        </div>
      )}
    </div>
  );
}

export default DescriptionEventZwiftNew;
