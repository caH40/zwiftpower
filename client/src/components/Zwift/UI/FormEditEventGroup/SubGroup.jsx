import React from 'react';

import { jerseys, routes, worlds } from '../../../../asset/zwift/lib/esm/zwift-lib';
import RTextarea from '../../../UI/ReduxUI/RTextarea/RTextarea';
import RSelectObject from '../../../UI/ReduxUI/RSelectObject/RSelectObject';

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

          <RTextarea
            label={'Описание для группы'}
            value={subGroup.description}
            property={'description'}
            type={'text'}
          />
        </div>
      ) : undefined}
    </>
  );
}

export default SubGroup;
