import { useState } from 'react';

import { worlds } from '../../../../assets/zwift/lib/esm/worlds';
import { routes } from '../../../../assets/zwift/lib/esm/routes';
import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';
import IconParamsDistance from '../../../icons/Params/IconParamsDistance';
import IconParamsAscent from '../../../icons/Params/IconParamsAscent';
import MyTooltip from '../../../../HOC/MyTooltip';

import styles from './FormEditEventGroup.module.css';

/**
 * Блок выбора маршрута и количества кругов (дистанции, времени заезда) для создания заезда
 */
function MapBlock({ subGroup, groupNumber }) {
  const [descriptionId, setDescriptionId] = useState(0);
  const worldCurrent = worlds.find((world) => world.id === subGroup.mapId);
  const routeCurrent = routes.find((route) => route.id === subGroup.routeId);
  const routeName = routeCurrent?.name || 'Маршрут не найден';

  const { distance, elevation, leadInDistance, leadInElevation } = routeCurrent;

  const distanceMap = Math.round(distance * 100) / 100;
  const distanceLeadIn = Math.round(leadInDistance * 100) / 100;

  const laps = subGroup.laps ?? 0;
  const distanceTotal = (Math.round((distance + leadInDistance) * 100) / 100) * laps;
  const elevationTotal = (elevation + leadInElevation) * laps;

  const descriptions = [
    { title: 'Total', distance: distanceTotal, elevation: elevationTotal },
    { title: 'Map', distance: distanceMap, elevation },
    { title: 'LeadIn', distance: distanceLeadIn, elevation: leadInElevation },
  ];

  const changeDescription = () => {
    setDescriptionId(descriptionId === 2 ? 0 : descriptionId + 1);
  };

  return (
    <>
      <div className={styles.block__map}>
        <img
          className={styles.img__map}
          src={routeCurrent.imageUrl}
          alt={`Карта маршрута ${routeCurrent.name}`}
        />
        <h4 className={styles.img__title}>{routeName}</h4>
        <div className={styles.gradient} />
        <MyTooltip tooltip={'Нажмите для изменения описания'} placement={'top'}>
          <div className={styles.img__description} onClick={changeDescription}>
            <span>{descriptions[descriptionId].title}:</span>
            <IconParamsDistance squareSize={24} bgColor={'#ffffff90'} />
            <span>{descriptions[descriptionId].distance}km</span>
            <IconParamsAscent squareSize={24} bgColor={'#ffffff90'} />
            <span>{descriptions[descriptionId].elevation}m</span>
          </div>
        </MyTooltip>
      </div>
      <BoxParameter
        title={'Карта'}
        sample={true}
        pen={true}
        inputParams={{
          label: 'Карта',
          property: 'mapId',
          type: 'selectId',
          subgroupIndex: groupNumber,
          options: [...worlds].sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
          ),
        }}
      >
        {worldCurrent?.name || 'Карта не найдена'}
      </BoxParameter>

      <BoxParameter
        title={'Маршрут'}
        sample={true}
        pen={true}
        inputParams={{
          label: 'Маршрут',
          property: 'routeId',
          type: 'selectId',
          subgroupIndex: groupNumber,
          options: routes
            .filter((route) => route.world.toLowerCase() === worldCurrent?.slug.toLowerCase())
            .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')),
        }}
      >
        {routeName}
      </BoxParameter>

      <BoxParameter
        title={'Количество кругов'}
        sample={true}
        pen={true}
        inputParams={{
          label: 'Количество кругов',
          property: 'laps',
          type: 'input',
          typeValue: 'number',
          subgroupIndex: groupNumber,
        }}
        description="При установке кругов обнуляется дистанция и продолжительность заезда"
      >
        {subGroup.laps}
      </BoxParameter>

      <BoxParameter
        title={'Дистанция, метры'}
        sample={true}
        pen={true}
        inputParams={{
          label: 'Дистанция, метры',
          property: 'distanceInMeters',
          type: 'input',
          typeValue: 'number',
          subgroupIndex: groupNumber,
        }}
        description="При установке дистанции обнуляются круги и продолжительность заезда"
      >
        {subGroup.distanceInMeters}
      </BoxParameter>

      <BoxParameter
        title={'Продолжительность заезда, секунды'}
        sample={true}
        pen={true}
        inputParams={{
          label: 'Время заезда, секунды',
          property: 'durationInSeconds',
          type: 'input',
          typeValue: 'number',
          subgroupIndex: groupNumber,
        }}
        description="При установке продолжительности заезда обнуляется дистанция и круги"
      >
        {subGroup.durationInSeconds}
      </BoxParameter>
    </>
  );
}

export default MapBlock;
