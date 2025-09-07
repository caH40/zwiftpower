import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  fetchOrganizerPaymentPayload,
  fetchPurchaseSiteService,
} from '../redux/features/api/payment/fetchPayment';
import { getAlert } from '../redux/features/alertMessageSlice';
import { serverFront } from '../config/environment';
import { resetOrganizerPaymentPayload } from '../redux/features/api/payment/paymentsSlice';

/**
 * Хук покупки сервиса Организатора.
 */
export function useOrganizerPurchase({ planId }) {
  const [isLoading, setIsLoading] = useState(false);
  const { organizerPaymentPayload } = useSelector((state) => state.payment);
  const location = useLocation();

  const dispatch = useDispatch();

  // Запрос на получение данных для платежа (payload.)
  useEffect(() => {
    dispatch(
      fetchOrganizerPaymentPayload({ returnUrl: `${serverFront}${location.pathname}`, planId })
    );

    dispatch(resetOrganizerPaymentPayload());
  }, [planId]);

  const handleClickPurchase = async () => {
    // Исключение случайного второго клика по кнопке.
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const data = await dispatch(
        fetchPurchaseSiteService({ createPayload: organizerPaymentPayload })
      ).unwrap();

      if (data && data.paymentResponse.confirmation_url) {
        window.location.href = data.paymentResponse.confirmation_url;
      } else {
        throw new Error('Не получены данные с сервера!');
      }
    } catch (e) {
      dispatch(
        getAlert({ message: e || 'Ошибка при создании платежа', type: 'error', isOpened: true })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { handleClickPurchase, isLoading };
}
