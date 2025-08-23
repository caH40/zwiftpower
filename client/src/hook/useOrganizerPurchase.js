import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { fetchPurchaseSiteService } from '../redux/features/api/payment/fetchPayment';

import { getAlert } from '../redux/features/alertMessageSlice';

/**
 * Хук покупки сервиса Организатора.
 */
export function useOrganizerPurchase({
  userId,
  returnUrl,
  payloadData: { currency, unitPrice, customer },
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClickPurchase = async () => {
    // Исключение случайного второго клика по кнопке.
    if (isLoading) {
      return;
    }

    const description =
      'Покупка подписки на сервис Организатор сроком на 1 месяц (31 день) на сайте zwiftpower.ru';

    // Чтобы сформировать чек, создайте платеж  и передайте в запросе объект receipt с данными
    // для чека: объект customer с электронной почтой пользователя или его номером телефона и массив
    // items с данными о товарах или услугах (максимум 6 товаров).

    // Какие данные необходимо передать для каждого товара:
    // параметр description с названием товара или услуги;
    // параметр amount с суммой за единицу товара;
    // параметр quantity с указанием количества товара (только целые числа, например 1);
    // параметр vat_code с фиксированным значением 1 (стоимость без НДС).
    const receipt = {
      customer,
      items: [
        {
          description: 'Подписка на сервис Организатор сроком на 1 месяц (31 день)',
          amount: { value: String(unitPrice), currency },
          quantity: 1, // Один месяц.
          vat_code: 1,
        },
      ],
    };

    const createPayload = {
      amount: {
        value: String(unitPrice),
        currency,
      },
      receipt,
      capture: true,
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },

      metadata: {
        userId,
        quantity: 1, // Один месяц.
        entityName: 'organizer',
      },

      description,
    };

    try {
      setIsLoading(true);
      const data = await dispatch(fetchPurchaseSiteService({ createPayload })).unwrap();

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
