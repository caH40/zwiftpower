import IconParamsWorld from '../icons/Params/IconParamsWorld';
import IconParamsRoute from '../icons/Params/IconParamsRoute';
import IconParamsDistance from '../icons/Params/IconParamsDistance';
import IconParamsAscent from '../icons/Params/IconParamsAscent';
import IconParamsDuration from '../icons/Params/IconParamsDuration';
import IconParamsLap from '../icons/Params/IconParamsLap';
import { distanceObject, getMapName, getRouteName } from '../../utils/event';

import styles from './ParamsEvent.module.css';

/**
 * Компонент для отображения основных параметров события.
 *
 * @param {Object} props - Пропсы компонента.
 * @param {string} props.mapId - Идентификатор карты.
 * @param {string} props.routeId - Идентификатор маршрута.
 * @param {number} props.durationInSeconds - Длительность события в секундах.
 * @param {number} props.distanceInMeters - Расстояние события в метрах.
 * @param {number} props.laps - Количество кругов.
 * @param {Object} props.distanceSummary - Суммарное расстояние.
 * @param {number} props.distanceSummary.distanceInKilometers - Расстояние в километрах.
 * @param {number} props.distanceSummary.elevationGainInMeters - Набор высоты в метрах.
 * @returns {JSX.Element} Компонент блока параметров события.
 */
function ParamsEvent({
  mapId,
  routeId,
  durationInSeconds,
  distanceInMeters,
  laps,
  distanceSummary,
}) {
  // Получаем данные о расстоянии, наборе высоты, кругах и длительности
  const distanceData = distanceObject({
    durationInSeconds,
    distanceInMeters,
    laps,
    distanceSummary,
  });

  return (
    <div className={styles.block}>
      {/* Блок карты */}
      {mapId && (
        <div className={styles.box}>
          <IconParamsWorld squareSize={30} />
          <div className={styles.description}>
            <h4 className={styles.title}>{getMapName(mapId)}</h4>
            <p className={styles.title__sub}>КАРТА</p>
          </div>
        </div>
      )}

      {/* Блок маршрута */}
      {routeId && (
        <div className={styles.box}>
          <IconParamsRoute squareSize={30} />
          <div className={styles.description}>
            <h4 className={styles.title}>{getRouteName(routeId)}</h4>
            <p className={styles.title__sub}>МАРШРУТ</p>
          </div>
        </div>
      )}

      {/* Блок расстояния (отображается, если длительность равна 0) */}
      {durationInSeconds === 0 && (
        <div className={styles.box}>
          <IconParamsDistance squareSize={30} />
          <div className={styles.description}>
            <h4 className={styles.title}>
              {distanceData.distanceStr || distanceData.distanceEstimated}
            </h4>
            <p className={styles.title__sub}>РАССТОЯНИЕ</p>
          </div>
        </div>
      )}

      {/* Блок набора высоты (отображается, если длительность равна 0) */}
      {durationInSeconds === 0 && distanceData.elevationStr && (
        <div className={styles.box}>
          <IconParamsAscent squareSize={30} />
          <div className={styles.description}>
            <h4 className={styles.title}>{distanceData.elevationStr}</h4>
            <p className={styles.title__sub}>НАБОР ВЫСОТЫ</p>
          </div>
        </div>
      )}

      {/* Блок кругов (отображается, если длительность равна 0) */}
      {durationInSeconds === 0 && distanceData.lapsStr && (
        <div className={styles.box}>
          <IconParamsLap squareSize={30} />
          <div className={styles.description}>
            <h4 className={styles.title}>{distanceData.lapsStr}</h4>
            <p className={styles.title__sub}>КРУГИ</p>
          </div>
        </div>
      )}

      {/* Блок длительности (отображается, если длительность не равна 0) */}
      {durationInSeconds !== 0 && (
        <div className={styles.box}>
          <IconParamsDuration squareSize={30} />
          <div className={styles.description}>
            <h4 className={styles.title}>{distanceData.durationStr}</h4>
            <p className={styles.title__sub}>ДЛИТЕЛЬНОСТЬ</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParamsEvent;
