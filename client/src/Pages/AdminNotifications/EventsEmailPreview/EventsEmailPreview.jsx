import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchGetEventsForMailing,
  resetEventsEmailPreview,
} from '../../../redux/features/api/eventPreviewSlice';

import styles from './EventsEmailPreview.module.css';

/**
 *
 */
export default function EventsEmailPreviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetEventsForMailing());

    return () => {
      dispatch(resetEventsEmailPreview());
    };
  }, []);

  return <div className={styles.wrapper}>EventsEmailPreviewPage</div>;
}
