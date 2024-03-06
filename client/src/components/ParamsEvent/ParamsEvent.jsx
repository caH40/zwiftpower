import cn from 'classnames';

import { addClasses as cns } from '../../utils/additional-classes';
import IconParamsWorld from '../icons/Params/IconParamsWorld';
import IconParamsRoute from '../icons/Params/IconParamsRoute';
import IconParamsDistance from '../icons/Params/IconParamsDistance';
import IconParamsAscent from '../icons/Params/IconParamsAscent';
import IconParamsDuration from '../icons/Params/IconParamsDuration';
import IconParamsLap from '../icons/Params/IconParamsLap';
import { distanceObject, map, routeName } from '../../utils/event';

import styles from './ParamsEvent.module.css';

// отображение блока основных параметров Эвента
function ParamsEvent({ event, addCls, bgColor }) {
  const [subgroup] = event.eventSubgroups || [];

  return (
    <div className={cn(styles.block, cns(styles, addCls), styles[bgColor])}>
      {subgroup?.mapId && (
        <div className={styles.box}>
          <IconParamsWorld squareSize={30} bgColor={bgColor} />
          <div className={styles.description}>
            <h4 className={styles.title}>{map(subgroup.mapId)}</h4>
            <p className={styles.title__sub}>КАРТА</p>
          </div>
        </div>
      )}
      {subgroup?.routeId && (
        <div className={styles.box}>
          <IconParamsRoute squareSize={30} bgColor={bgColor} />
          <div className={styles.description}>
            <h4 className={styles.title}>{routeName(subgroup.routeId)}</h4>
            <p className={styles.title__sub}>МАРШРУТ</p>
          </div>
        </div>
      )}
      {subgroup?.durationInSeconds === 0 && (
        <div className={styles.box}>
          <IconParamsDistance squareSize={30} bgColor={bgColor} />
          <div className={styles.description}>
            <h4 className={styles.title}>
              {distanceObject(subgroup)?.distanceStr ||
                distanceObject(subgroup)?.distanceEstimated}
            </h4>
            <p className={styles.title__sub}>РАССТОЯНИЕ</p>
          </div>
        </div>
      )}
      {subgroup?.durationInSeconds === 0 && (
        <div className={styles.box}>
          <IconParamsAscent squareSize={30} bgColor={bgColor} />
          <div className={styles.description}>
            <h4 className={styles.title}>{distanceObject(subgroup)?.elevationStr}</h4>
            <p className={styles.title__sub}>НАБОР ВЫСОТЫ</p>
          </div>
        </div>
      )}
      {subgroup?.durationInSeconds === 0 && (
        <div className={styles.box}>
          <IconParamsLap squareSize={30} bgColor={bgColor} />
          <div className={styles.description}>
            <h4 className={styles.title}>{distanceObject(subgroup)?.lapsStr}</h4>
            <p className={styles.title__sub}>КРУГИ</p>
          </div>
        </div>
      )}
      {subgroup?.durationInSeconds !== 0 && (
        <div className={styles.box}>
          <IconParamsDuration squareSize={30} bgColor={bgColor} />
          <div className={styles.description}>
            <h4 className={styles.title}>{distanceObject(subgroup)?.durationStr}</h4>
            <p className={styles.title__sub}>ДЛИТЕЛЬНОСТЬ</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParamsEvent;
