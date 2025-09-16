import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchGetEventsForMailing,
  removeEventFromEmailPreview,
  resetEventsEmailPreview,
} from '../../../redux/features/api/eventPreviewSlice';
import FormEventsEmailPreview from '../../../components/UI/FormEventsEmailPreview/FormEventsEmailPreview';

import EmailPreview from './EmailPreview/EmailPreview';
import styles from './EventsEmailPreview.module.css';

/**
 *
 */
export default function EventsEmailPreviewPage() {
  const { eventsEmailPreview } = useSelector((state) => state.fetchEventPreview);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchGetEventsForMailing({ startDate: new Date(), endDate: new Date('2025-09-21') })
    );
    return () => {
      dispatch(resetEventsEmailPreview());
    };
  }, []);

  const onRemoveEvent = (id) => {
    dispatch(removeEventFromEmailPreview({ id }));
  };

  return (
    <div className={styles.wrapper}>
      <FormEventsEmailPreview />

      <EmailPreview events={eventsEmailPreview} onRemoveEvent={onRemoveEvent} />
    </div>
  );
}
