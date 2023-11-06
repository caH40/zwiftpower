//types
import { PowerCurveSchema } from '../../types/model.interface.js';
import {
  PowerPerKgCurvesCurrentInterval,
  RiderMaxWattsPerKg,
  UsersWithAdditionalProfiles,
} from '../../types/types.interface.js';

const pointsWattsPerKgEmpty = {
  isVirtualPower: false,
  duration: 0,
  value: 0,
  date: 0,
  name: '',
  isDisqualification: false,
};

/**
 * Поиск райдеров с максимальным значением удельной мощности на интервале (interval)
 */
export const getRiderWithMaxWattsPerKgInInterval = (
  powerCurvesDB: PowerCurveSchema[],
  interval: number,
  usersWithAdditionalProfiles: UsersWithAdditionalProfiles[]
) => {
  // выборка кривой мощности всех райдеров для текущего интервала (interval)
  const powerCurveDBCurrentInterval: PowerPerKgCurvesCurrentInterval[] = powerCurvesDB
    .map((elm) => ({
      zwiftId: elm.zwiftId,
      pointsWattsPerKg:
        elm.pointsWattsPerKg.find((power) => power.duration === interval) ||
        pointsWattsPerKgEmpty,
    }))
    .filter(
      (power) =>
        !power.pointsWattsPerKg?.isVirtualPower || !power.pointsWattsPerKg?.isDisqualification
    );

  // количество мест (лучших результатов) для поиска, первые places будут лидерами мощности
  const places = 10;

  // множитель, учитывающий что каждый райдер в places имеет один дополнительный профиль Звифт
  const k = 2;

  // получение k*place лучших результатов, но для правильного исключения дубликатов в Map
  // произведена реверсная сортировка. Так как Map оставляет в коллекции последний добавленный дубликат
  const powerCurvesSorted = powerCurveDBCurrentInterval
    .sort((a, b) => (a.pointsWattsPerKg?.value || 0) - (b.pointsWattsPerKg?.value || 0))
    .slice(-k * places);

  // подмена дополнительных профилей на основной и последующее исключение дубликатов
  const powerCurvesUni = new Map<number, PowerPerKgCurvesCurrentInterval>();
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
    (a, b) => (b.pointsWattsPerKg?.value || 0) - (a.pointsWattsPerKg?.value || 0)
  );

  const wattsPerKgInInterval = [] as RiderMaxWattsPerKg[];
  for (let i = 0; i < places; i++) {
    const riderMaxWattsPerKgt: RiderMaxWattsPerKg = {
      id: 0,
      zwiftId: 0,
      interval: 0,
      wattsPerKg: 0,
      eventStart: 0,
      eventName: '',
    };

    if (!powerCurvesFiltered[i]) {
      continue;
    }

    riderMaxWattsPerKgt.zwiftId = powerCurvesFiltered[i].zwiftId;
    riderMaxWattsPerKgt.interval = interval;
    riderMaxWattsPerKgt.wattsPerKg = powerCurvesFiltered[i].pointsWattsPerKg?.value || 0;
    riderMaxWattsPerKgt.eventStart = powerCurvesFiltered[i].pointsWattsPerKg?.date || 0;
    riderMaxWattsPerKgt.eventName = powerCurvesFiltered[i].pointsWattsPerKg?.name || '';
    wattsPerKgInInterval.push(riderMaxWattsPerKgt);
  }
  return wattsPerKgInInterval;
};
