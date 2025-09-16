import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetEventsEmailPreview } from '../../../redux/features/api/eventPreviewSlice';
import FormEventsEmailPreview from '../../../components/UI/FormEventsEmailPreview/FormEventsEmailPreview';

import styles from './EventsEmailPreview.module.css';
import EmailPreview from './EmailPreview';

/**
 *
 */
export default function EventsEmailPreviewPage() {
  const { eventsEmailPreview } = useSelector((state) => state.fetchEventPreview);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetEventsEmailPreview());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <FormEventsEmailPreview />

      <EmailPreview events={eventsEmailPreview} />
    </div>
  );
}
