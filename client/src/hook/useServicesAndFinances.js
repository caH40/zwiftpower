import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchAllSiteServices,
  fetchPurchasableSiteServices,
} from '../redux/features/api/site_service/fetchSiteServices';
import { fetchPaymentTransactions } from '../redux/features/api/payment_notifications/fetchPaymentNotifications';
import {
  resetPurchasableSiteServices,
  resetSiteServices,
} from '../redux/features/api/site_service/siteServiceSlice';
import { resetPaymentTransactions } from '../redux/features/api/payment_notifications/paymentNotificationsSlice';

export function useServicesAndFinances(userId) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPurchasableSiteServices());
    dispatch(fetchAllSiteServices());
    dispatch(fetchPaymentTransactions({ userId }));

    return () => {
      dispatch(resetSiteServices());
      dispatch(resetPurchasableSiteServices());
      dispatch(resetPaymentTransactions());
    };
  }, []);
}
