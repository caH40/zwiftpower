import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { worlds } from '../../../../assets/zwift/lib/esm/worlds';
import { routes } from '../../../../assets/zwift/lib/esm/routes';
import useBlockParameters from '../../../../hook/useBlockParameters';
import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';
import IconParamsDistance from '../../../icons/Params/IconParamsDistance';
import IconParamsAscent from '../../../icons/Params/IconParamsAscent';
import MyTooltip from '../../../../HOC/MyTooltip';

import styles from './FormEditEventGroup.module.css';

/**
 * Блок выбора маршрута и количества кругов (дистанции, времени заезда) для создания заезда
 */
function MapBlock({ subGroup, groupNumber, isCreating }) {
  const [isMount, setIsMount] = useState(true);
  const [descriptionId, setDescriptionId] = useState(0);
  const worldCurrent = worlds.find((world) => world.id === subGroup.mapId);
  const routeCurrent = routes.find((route) => route.id === subGroup.routeId) || {};
  const routeName = routeCurrent?.name || 'Маршрут не найден';

  // Стартовые карманы на карте.
  const eventPaddocks =
    routeCurrent?.eventPaddocks &&
    routeCurrent.eventPaddocks.split(',').map((elm) => ({
      id: elm,
      label: elm,
      name: elm,
      translate: elm,
    }));

  const dispatch = useDispatch();
  const { inputHandler } = useBlockParameters(groupNumber);

  const { distance, elevation, leadInDistance, leadInElevation, id: routeId } = routeCurrent;

  const distanceMap = Math.round(distance * 100) / 100;
  const distanceLeadIn = Math.round(leadInDistance * 100) / 100;

  const laps = subGroup.laps ?? 0;
  const distanceTotal = Math.round((distance * laps + leadInDistance) * 100) / 100;
  const elevationTotal = elevation * laps + leadInElevation;

  const descriptions = [
    { title: 'Total', distance: distanceTotal, elevation: elevationTotal },
    { title: 'Lap', distance: distanceMap, elevation },
    { title: 'LeadIn', distance: distanceLeadIn, elevation: leadInElevation },
  ];

  // При изменении карты выставляется маршрут с новой карты(world).
  useEffect(() => {
    if (isMount) {
      setIsMount(false);
      return;
    }

    // Поиск маршрута в списке новой карты.
    const routeInitId = routes.find((route) => route.world === worldCurrent?.slug) || {};

    dispatch(inputHandler({ routeId: routeInitId.id, index: groupNumber }));
  }, [worldCurrent?.id]);

  // При изменении маршрута изменять карманы.
  useEffect(() => {
    if (isMount) {
      setIsMount(false);
      return;
    }

    if (eventPaddocks?.[0]?.name) {
      dispatch(inputHandler({ startLocation: eventPaddocks[0]?.name, index: groupNumber }));
    }
  }, [routeId]);

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

      {/* скрывать блок если форма используется для создания Эвента */}
      {!eventPaddocks && (
        <div className={styles.error}>
          Внимание! Не определенны стартовые карманы для данного маршрута. Выберите другой
          маршрут!
        </div>
      )}
      {!isCreating && eventPaddocks && (
        <BoxParameter
          title={'Номер "кармана" на старте'}
          sample={true}
          pen={true}
          inputParams={{
            label: 'Номер "кармана" на старте',
            property: 'startLocation',
            type: 'select',
            typeValue: 'number',
            subgroupIndex: groupNumber,
            options: eventPaddocks,
            closeEmptyOption: true,
          }}
        >
          {subGroup.startLocation}
        </BoxParameter>
      )}
    </>
  );
}

export default MapBlock;
