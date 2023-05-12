import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchEvents } from '../../redux/features/api/eventsSlice';
import useTitle from '../../hook/useTitle';
import useBackground from '../../hook/useBackground';
import CardRacePreview from '../../components/CardRacePreview/CardRacePreview';

import styles from './MainPage.module.css';

function MainPage() {
  const events = useSelector((state) => state.fetchEvents.eventsPreview);
  const dispatch = useDispatch();
  useTitle('Анонсы заездов, новости');
  useBackground(false);

  useEffect(() => {
    dispatch(fetchEvents(false));
  }, [dispatch]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__preview}>
        {events.map((event) => (
          <CardRacePreview event={event} key={event.id} />
        ))}
      </div>
      <div className={styles.wrapper__info}>y</div>
    </section>
  );
}

export default MainPage;
