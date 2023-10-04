import { PowerCurve } from '../../Model/PowerCurve.js';
import { getRiderWithMaxPowerInInterval } from './power.js';

// types
import { PowerCurveSchema } from '../../types/model.interface.js';
import { RiderMaxWatt, RiderMaxWattsPerKg } from '../../types/types.interface.js';
import { getRiderWithMaxWattsPerKgInInterval } from './powerPerKg.js';
import { addProfile } from './profile.js';

export const getLeadersInIntervalsService = async () => {
  // получение powerCurve всех райдеров
  const powerCurveDB: PowerCurveSchema[] = await PowerCurve.find().lean();

  // инициализация массивов
  const maxWatts: RiderMaxWatt[] = [];
  const maxWattsPerKg: RiderMaxWattsPerKg[] = [];

  // интервалы для которых ищутся максимальные данные ваттов и удельных ваттов
  const intervals = [15, 60, 300, 1200];

  // итерация по интервалам для которых ищутся максимальные значения
  for (const interval of intervals) {
    const riderMaxWatt: RiderMaxWatt = {
      zwiftId: 0,
      interval: 0,
      watts: 0,
      date: 0,
      name: '',
    };

    const riderMaxWattsPerKgt: RiderMaxWattsPerKg = {
      zwiftId: 0,
      interval: 0,
      wattsPerKg: 0,
      date: 0,
      name: '',
    };

    // powerCurve кривая мощности райдера
    for (const powerCurve of powerCurveDB) {
      // происходит мутация riderMaxWatt в пределах одного цикла interval
      getRiderWithMaxPowerInInterval(riderMaxWatt, powerCurve, interval);
      getRiderWithMaxWattsPerKgInInterval(riderMaxWattsPerKgt, powerCurve, interval);
    }
    maxWatts.push(riderMaxWatt);
    maxWattsPerKg.push(riderMaxWattsPerKgt);
  }

  // добавление данных профиля
  const { maxWattsWithProfile, maxWattsPerKgWithProfile } = await addProfile(
    maxWatts,
    maxWattsPerKg
  );

  return { maxWattsWithProfile, maxWattsPerKgWithProfile };
};
