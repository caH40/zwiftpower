import { currency, purchaseUnits } from '../assets/constants.js';

// types
import { TCurrency, TPurchaseUnit } from '../types/payment.types.js';

// Получает символ единицы измерения или возвращает исходный ключ.
export const getUnitData = (unit: TPurchaseUnit) => purchaseUnits.get(unit)?.symbol || unit;

// Получает символ валюты или возвращает исходный код.
export const getCurrencySymbol = (currencyCode: TCurrency) =>
  currency.get(currencyCode)?.symbol || currencyCode;
