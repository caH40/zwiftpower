import styles from './EmailPreview.module.css';

const EmailPreview = ({ events, onRemoveEvent }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  };

  const getMapName = (mapId) => {
    const maps = {
      1: 'Watopia',
      2: 'Richmond',
      3: 'London',
      4: 'New York',
      5: 'Innsbruck',
      6: 'Bologna',
      7: 'Yorkshire',
      8: 'Crit City',
      9: 'Makuri Islands',
      10: 'France',
      11: 'Paris',
    };
    return maps[mapId] || `Map ${mapId}`;
  };

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
              onClick={() => handleRemove(event._id || index)}
              title="Удалить событие"
            >
              ×
            </button>

            <div className={styles.eventHeader}>
              <img
                src={event.seriesId?.posterUrls?.original}
                alt={event.seriesId?.name}
                className={styles.eventPoster}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className={styles.eventInfo}>
                <h2 className={styles.eventTitle}>{event.name}</h2>
                <p className={styles.eventSeries}>{event.seriesId?.name}</p>
                <p className={styles.eventDate}>📅 {formatDate(event.eventStart)}</p>
                {event.organizerId && (
                  <div className={styles.organizer}>
                    <img
                      src={event.organizerId.logoUrls?.original}
                      alt={event.organizerId.name}
                      className={styles.organizerLogo}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span>Организатор: {event.organizerId.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.eventDetails}>
              <h3>Группы заезда:</h3>
              <div className={styles.subgroups}>
                {event.eventSubgroups?.map((subgroup, idx) => (
                  <span key={idx} className={styles.subgroupBadge}>
                    {subgroup.subgroupLabel}
                  </span>
                ))}
              </div>

              {event.eventSubgroups && event.eventSubgroups.length > 0 && (
                <div className={styles.routeInfo}>
                  <p>
                    <strong>Карта:</strong> {getMapName(event.eventSubgroups[0]?.mapId)}
                  </p>
                  <p>
                    <strong>Маршрут:</strong> ID {event.eventSubgroups[0]?.routeId}
                  </p>
                </div>
              )}
            </div>

            <div className={styles.eventActions}>
              <a
                href={`https://zwiftpower.com/events.php?zid=${event.id}`}
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
};

export default EmailPreview;
