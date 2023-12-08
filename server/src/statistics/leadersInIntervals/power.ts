//types
import { PowerCurveSchema } from '../../types/model.interface.js';
import {
  PowerCurvesCurrentInterval,
  RiderMaxWatt,
  UsersWithAdditionalProfiles,
} from '../../types/types.interface.js';

const pointsWattsEmpty = {
  isVirtualPower: false,
  duration: 0,
  value: 0,
  date: 0,
  name: '',
  isDisqualification: false,
};

/**
 * Поиск райдера с максимальным значением мощности на интервале (interval)
 */
export const getRiderWithMaxPowerInInterval = (
  powerCurvesDB: PowerCurveSchema[],
  interval: number,
  usersWithAdditionalProfiles: UsersWithAdditionalProfiles[]
) => {
  // выборка кривой мощности всех райдеров для текущего интервала (interval)
  const powerCurveDBCurrentInterval: PowerCurvesCurrentInterval[] = powerCurvesDB
    .map((elm) => ({
      zwiftId: elm.zwiftId,
      pointsWatts:
        elm.pointsWatts?.find((power) => power.duration === interval) || pointsWattsEmpty,
    }))
    .filter(
      (power) => !power.pointsWatts?.isVirtualPower || !power.pointsWatts?.isDisqualification
    );

  // количество мест (лучших результатов) для поиска, первые places будут лидерами мощности
  const places = 10;

  // множитель, учитывающий что каждый райдер в places имеет один дополнительный профиль Звифт
  const k = 2;

  // получение k*place лучших результатов, но для правильного исключения дубликатов в Map
  // произведена реверсная сортировка. Так как Map оставляет в коллекции последний добавленный дубликат
  const powerCurvesSorted = powerCurveDBCurrentInterval
    .sort((a, b) => (a.pointsWatts?.value || 0) - (b.pointsWatts?.value || 0))
    .slice(-k * places);

  // подмена дополнительных профилей на основной и последующее исключение дубликатов
  const powerCurvesUni = new Map<number, PowerCurvesCurrentInterval>();
  for (const powerCurve of powerCurvesSorted) {
    for (const user of usersWithAdditionalProfiles) {
      // если райдер с zwiftId (pc.zwiftId) является дополнительным профилем
      if (user.zwiftIdAdditional.includes(powerCurve.zwiftId)) {
        powerCurve.zwiftId = user.zwiftId;
        powerCurvesUni.set(powerCurve.zwiftId, powerCurve);
      }
    }
    // если zwiftId был дополнительным профилем, значит была мутация powerCurve
    // и в powerCurve.zwiftId id основного профиля. Данная запись уже есть в коллекции Map
    // и последующее добавление в коллекцию произведет замену дубля этой записи
    powerCurvesUni.set(powerCurve.zwiftId, powerCurve);
  }

  // сортировка от максимального к минимальному
  const powerCurvesFiltered = [...powerCurvesUni.values()].sort(
    (a, b) => (b.pointsWatts?.value || 0) - (a.pointsWatts?.value || 0)
  );

  const wattsInInterval = [] as RiderMaxWatt[];
  for (let i = 0; i < places; i++) {
    const riderMaxWatt: RiderMaxWatt = {
      id: 0,
      zwiftId: 0,
      interval: 0,
      watts: 0,
      eventStart: 0,
      eventName: '',
    };

    if (!powerCurvesFiltered[i]) {
      continue;
    }

    riderMaxWatt.zwiftId = powerCurvesFiltered[i].zwiftId;
    riderMaxWatt.interval = interval;
    riderMaxWatt.watts = powerCurvesFiltered[i].pointsWatts?.value || 0;
    riderMaxWatt.eventStart = powerCurvesFiltered[i].pointsWatts?.date || 0;
    riderMaxWatt.eventName = powerCurvesFiltered[i].pointsWatts?.name || '';
    wattsInInterval.push(riderMaxWatt);
  }
  return wattsInInterval;
};
