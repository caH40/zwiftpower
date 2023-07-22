import React from 'react';

import cn from 'classnames';

import { jerseys, routes, worlds } from '../../../../asset/zwift/lib/esm/zwift-lib';
import { getTimerLocal } from '../../../../utils/date-local';
import BoxParameter from '../../../UI/ReduxUI/BoxParameter/BoxParameter';

import styles from './FormEditEventGroup.module.css';

function SubGroup({ subGroup, index }) {
  return (
    <>
      {subGroup?.subgroupLabel ? (
        <div className={cn(styles.group, styles[subGroup.subgroupLabel])}>
          <h4 className={styles.title}>Группа {subGroup.subgroupLabel}</h4>
          <div className={styles.form__group}>
            <div className={styles.box__inputs}>
              <BoxParameter
                title={'Дата и время старта'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Дата и время старта',
                  property: 'eventSubgroupStart',
                  typeValue: 'dateAndTime',
                  type: 'inputTime',
                  value: subGroup.eventSubgroupStart,
                  subgroupIndex: index,
                }}
              >
                {getTimerLocal(subGroup.eventSubgroupStart, 'YMDHM', true)}
              </BoxParameter>

              <BoxParameter
                title={'Название для группы'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Название для группы',
                  property: 'name',
                  typeValue: 'text',
                  type: 'input',
                  subgroupIndex: index,
                }}
              >
                {subGroup.name}
              </BoxParameter>

              <BoxParameter
                title={'Описание для группы'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Описание для группы',
                  property: 'description',
                  type: 'textarea',
                  subgroupIndex: index,
                }}
              >
                {subGroup.description}
              </BoxParameter>

              <BoxParameter
                title={'Джерси для группы'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Джерси для группы',
                  property: 'jerseyHash',
                  type: 'selectId',
                  subgroupIndex: index,
                  options: [...jerseys].sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
                  ),
                }}
              >
                {jerseys.find((jersey) => jersey.id === subGroup.jerseyHash)?.name ||
                  'Джерси не найдена или не задана'}
              </BoxParameter>

              {/* <BoxParameter title={'Номер пакета правил'}>{subGroup.rulesId}</BoxParameter> */}
            </div>

            <div className={styles.box__inputs}>
              <BoxParameter
                title={'Карта'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Карта',
                  property: 'mapId',
                  type: 'selectId',
                  subgroupIndex: index,
                  options: [...worlds].sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
                  ),
                }}
              >
                {worlds.find((world) => world.id === subGroup.mapId)?.name ||
                  'Карта не найдена'}
              </BoxParameter>

              <BoxParameter
                title={'Маршрут'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Маршрут',
                  property: 'routeId',
                  type: 'selectId',
                  subgroupIndex: index,
                  options: routes
                    .filter(
                      (route) =>
                        route.world ===
                        worlds.find((world) => world.id === subGroup.mapId)?.slug
                    )
                    .sort((a, b) =>
                      a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
                    ),
                }}
              >
                {routes.find((route) => route.id === subGroup.routeId)?.name ||
                  'Маршрут не найден'}
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
                  subgroupIndex: index,
                }}
              >
                {subGroup.laps}
              </BoxParameter>

              <BoxParameter
                title={'Номер "кармана" на старте'}
                sample={true}
                pen={true}
                inputParams={{
                  label: 'Номер "кармана" на старте',
                  property: 'startLocation',
                  type: 'input',
                  typeValue: 'number',
                  subgroupIndex: index,
                }}
              >
                {subGroup.startLocation}
              </BoxParameter>
            </div>
          </div>
        </div>
      ) : undefined}
    </>
  );
}

export default SubGroup;
