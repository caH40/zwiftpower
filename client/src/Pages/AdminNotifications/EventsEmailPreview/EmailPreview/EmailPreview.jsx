import CategoryBox from '../../../../components/CategoryBox/CategoryBox';
import { getTimerLocal } from '../../../../utils/date-local';
import { getMapName, getRouteName } from '../../../../utils/event';

import styles from './EmailPreview.module.css';

export default function EmailPreview({ events, onRemoveEvent }) {
  const handleRemove = (eventId) => {
    if (onRemoveEvent) {
      onRemoveEvent(eventId);
    }
  };

  if (!events || events.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2>Нет событий для отображения</h2>
          <p>Добавьте события для создания превью письма</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Предстоящие заезды Zwift</h1>
        <p className={styles.subtitle}>Не пропустите эти захватывающие события!</p>
      </div>

      <div className={styles.eventsList}>
        {events.map((event, index) => (
          <div key={event._id || index} className={styles.eventCard}>
            <button
              className={styles.removeButton}
              onClick={() => handleRemove(event.id || index)}
              title="Удалить событие"
            >
              ×
            </button>

            <div className={styles.eventHeader}>
              {event.seriesId && (
                <img
                  src={event.seriesId?.posterUrls?.original}
                  alt={event.seriesId?.name}
                  className={styles.eventPoster}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}

              <div className={styles.eventInfo}>
                <h2 className={styles.eventTitle}>{event.name}</h2>
                <p className={styles.eventDate}>
                  📅 {getTimerLocal(event.eventStart, 'DDMMYYHm', 'long')}
                </p>

                {event.seriesId && (
                  <p>
                    <span>
                      Серия:{' '}
                      <a
                        href={`https://zwiftpower.ru/series/${event.seriesId?.name}/schedule`}
                        className={'link'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {event.seriesId?.name}
                      </a>
                    </span>
                  </p>
                )}

                {event.organizerId && (
                  <div className={styles.organizer}>
                    <span>Организатор: </span>
                    {event.organizerId.logoUrls?.original ? (
                      <img
                        src={event.organizerId.logoUrls?.original}
                        alt={event.organizerId.name}
                        className={styles.organizerLogo}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      event.organizerId.name
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.eventDetails}>
              <h3>Группы заезда:</h3>
              <div className={styles.subgroups}>
                {event.eventSubgroups?.map((subgroup, idx) => (
                  <CategoryBox
                    label={subgroup.subgroupLabel}
                    showLabel={true}
                    circle={true}
                    key={idx}
                  />
                ))}
              </div>

              {event.eventSubgroups && event.eventSubgroups.length > 0 && (
                <div className={styles.routeInfo}>
                  <p>
                    <strong>Карта: </strong>
                    {getMapName(event.eventSubgroups[0]?.mapId)}
                  </p>
                  <p>
                    <strong>Маршрут: </strong>
                    {getRouteName(event.eventSubgroups[0]?.routeId)}
                  </p>
                  <p>
                    <strong>Круги: </strong>
                    {event.eventSubgroups[0]?.laps}
                  </p>

                  {event.eventSubgroups[0]?.distanceSummary?.distanceInKilometers && (
                    <p>
                      <strong>Расстояние: </strong>
                      {Math.round(
                        event.eventSubgroups[0]?.distanceSummary?.distanceInKilometers
                      )}{' '}
                      км
                    </p>
                  )}

                  {event.eventSubgroups[0]?.distanceSummary?.elevationGainInMeters && (
                    <p>
                      <strong>Набор высоты: </strong>
                      {Math.round(
                        event.eventSubgroups[0]?.distanceSummary?.elevationGainInMeters
                      )}{' '}
                      м
                    </p>
                  )}
                  <div className={styles.noteContainer}>
                    <span className={styles.note}>
                      * Данные для группы "{event.eventSubgroups[0]?.subgroupLabel}"
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.eventActions}>
              <a
                href={`https://zwiftpower.ru/race/schedule/${event.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButton}
              >
                Присоединиться к заезду
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.</p>
        <p>© 2025 ZwiftPower. Все права защищены.</p>
      </div>
    </div>
  );
}
