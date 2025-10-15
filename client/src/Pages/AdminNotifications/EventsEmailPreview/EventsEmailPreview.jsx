import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postEventsEmailPreview } from '../../../redux/features/api/notifications/sendNotification';
import {
  fetchGetEventsForMailing,
  removeEventFromEmailPreview,
  resetEventsEmailPreview,
} from '../../../redux/features/api/eventPreviewSlice';
import { getAlert } from '../../../redux/features/alertMessageSlice';
import FormEventsEmailPreview from '../../../components/UI/FormEventsEmailPreview/FormEventsEmailPreview';
import Button from '../../../components/UI/Button/Button';

import EmailPreview from './EmailPreview/EmailPreview';
import styles from './EventsEmailPreview.module.css';

/**
 *
 */
export default function EventsEmailPreviewPage() {
  const { eventsEmailPreview } = useSelector((state) => state.fetchEventPreview);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(
    //   fetchGetEventsForMailing({ startDate: new Date(), endDate: new Date('2025-09-21') })
    // );
    return () => {
      dispatch(resetEventsEmailPreview());
    };
  }, [dispatch]);

  const onRemoveEvent = (id) => {
    dispatch(removeEventFromEmailPreview({ id }));
  };

  const sendEmail = async () => {
    try {
      const res = await dispatch(postEventsEmailPreview({ eventsEmailPreview })).unwrap();

      dispatch(resetEventsEmailPreview());
      dispatch(getAlert({ message: res.message, type: 'success', isOpened: true }));
    } catch (error) {
      dispatch(getAlert({ message: error, type: 'error', isOpened: true }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__block}>
        <FormEventsEmailPreview />
      </div>

      <EmailPreview eventsEmailPreview={eventsEmailPreview} onRemoveEvent={onRemoveEvent} />

      <div className={styles.btnContainer}>
        <Button getClick={sendEmail}>Отправить письмо пользователям</Button>
      </div>
    </div>
  );
}
