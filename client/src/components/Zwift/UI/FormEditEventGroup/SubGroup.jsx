import React from 'react';

import { jerseys, routes, worlds } from '../../../../asset/zwift/lib/esm/zwift-lib';
import RTextarea from '../../../UI/ReduxUI/RTextarea/RTextarea';
import RSelectObject from '../../../UI/ReduxUI/RSelectObject/RSelectObject';
import RInputArray from '../../../UI/ReduxUI/RInputArray/RInputArray';

import styles from './FormEditEventGroup.module.css';

function SubGroup({ subGroup, index }) {
  return (
    <>
      {subGroup?.subgroupLabel ? (
        <div className={styles.group}>
          <p className={styles.title}>Группа {subGroup.subgroupLabel}</p>
          <RSelectObject
            label={'Карта'}
            value={subGroup.mapId}
            property={'mapId'}
            options={worlds.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
            )}
            indexArray={index}
          />
          <RSelectObject
            label={'Маршрут'}
            value={subGroup.routeId}
            property={'routeId'}
            options={routes
              .filter(
                (route) =>
                  route.world === worlds.find((world) => world.id === subGroup.mapId)?.slug
              )
              .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en'))}
            indexArray={index}
          />
          <RInputArray
            label={'Количество кругов'}
            value={subGroup.laps}
            property={'laps'}
            type={'number'}
            indexArray={index}
          />
          <RInputArray
            label={'Время старта (московское время -3ч)'}
            value={subGroup.eventSubgroupStart}
            property={'eventSubgroupStart'}
            type={'text'}
            indexArray={index}
          />
          <RInputArray
            label={'Название для группы'}
            value={subGroup.name}
            property={'name'}
            type={'text'}
            indexArray={index}
          />
          <RTextarea
            label={'Описание для группы'}
            value={subGroup.description}
            property={'description'}
            type={'text'}
            indexArray={index}
          />
          <RSelectObject
            label={'Джерси заезда'}
            value={subGroup.jerseyHash}
            property={'jerseyHash'}
            options={jerseys.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
            )}
            indexArray={index}
          />
          <RInputArray
            label={'Номер места старта'}
            value={subGroup.startLocation}
            property={'startLocation'}
            type={'number'}
            indexArray={index}
          />
          <RInputArray
            label={'Номер пакета правил'}
            value={subGroup.rulesId}
            property={'rulesId'}
            type={'number'}
            indexArray={index}
            disabled={true}
          />
        </div>
      ) : undefined}
    </>
  );
}

export default SubGroup;
