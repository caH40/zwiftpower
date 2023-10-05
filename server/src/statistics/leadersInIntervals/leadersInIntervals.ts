import { PowerCurve } from '../../Model/PowerCurve.js';
import { getRiderWithMaxPowerInInterval } from './power.js';

// types
import { PowerCurveSchema } from '../../types/model.interface.js';
import { RiderMaxWatt, RiderMaxWattsPerKg } from '../../types/types.interface.js';
import { getRiderWithMaxWattsPerKgInInterval } from './powerPerKg.js';
import { addProfile } from './profile.js';
import { ZwiftProfile } from '../../Model/ZwiftProfile.js';

// интервалы для которых ищутся максимальные данные ваттов и удельных ваттов
const intervals = [15, 60, 300, 1200];

export const getLeadersInIntervalsService = async (isMale: boolean) => {
  const zwiftProfilesDB: { id: number }[] = await ZwiftProfile.find(
    { male: isMale },
    { id: true, _id: false }
  ).lean();

  const zwiftIds = zwiftProfilesDB.map((profile) => profile.id);

  // получение powerCurve всех райдеров
  const powerCurveDB: PowerCurveSchema[] = await PowerCurve.find({ zwiftId: zwiftIds }).lean();

  // инициализация массивов
  const maxWatts: RiderMaxWatt[] = [];
  const maxWattsPerKg: RiderMaxWattsPerKg[] = [];

  for (const interval of intervals) {
    const riderMaxWatt = getRiderWithMaxPowerInInterval(powerCurveDB, interval);
    const riderMaxWattsPerKg = getRiderWithMaxWattsPerKgInInterval(powerCurveDB, interval);
    maxWatts.push(...riderMaxWatt);
    maxWattsPerKg.push(...riderMaxWattsPerKg);
  }

  // добавление данных профиля
  const { maxWattsWithProfile, maxWattsPerKgWithProfile } = await addProfile(
    maxWatts,
    maxWattsPerKg
  );

  return { maxWattsWithProfile, maxWattsPerKgWithProfile };
};
