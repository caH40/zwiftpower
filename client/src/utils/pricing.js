import { currency, purchaseUnits } from '../assets/constants';

// Получает символ единицы измерения или возвращает исходный ключ.
export const getUnitData = (unit) => purchaseUnits.get(unit)?.symbol || unit;

// Получает символ валюты или возвращает исходный код.
export const getCurrencySymbol = (currencyCode) =>
  currency.get(currencyCode)?.symbol || currencyCode;
