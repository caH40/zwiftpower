import React from 'react';
import { useDispatch } from 'react-redux';

import { jerseys, routes, worlds } from '../../../../asset/zwift/lib/esm/zwift-lib';
import RSelectInArray from '../../../UI/ReduxUI/RSelectInArray/RSelectInArray';
import RInputInArray from '../../../UI/ReduxUI/RInputInArray/RInputInArray';
import RTextareaInArray from '../../../UI/ReduxUI/RTextareaInArray/RTextareaInArray';
import Button from '../../../UI/Button/Button';
import { getAlert } from '../../../../redux/features/alertMessageSlice';
import { setSameParams } from '../../../../redux/features/eventParamsSlice';

import styles from './FormEditEventGroup.module.css';

function SubGroup({ subGroup, index }) {
  const dispatch = useDispatch();
  const setSameParamsClick = () => {
    dispatch(setSameParams(subGroup));
    dispatch(
      getAlert({
        message: 'Установленные текущие настройки для всех групп!',
        type: 'success',
        isOpened: true,
      })
    );
  };
  return (
    <>
      {subGroup?.subgroupLabel ? (
        <div className={styles.group}>
          <div className={styles.title__box}>
            <h4 className={styles.title}>Группа {subGroup.subgroupLabel}</h4>
            <Button
              addCls={'td back'}
              tooltip={'Установить всем группам текущие параметры'}
              getClick={setSameParamsClick}
            >
              Установить
            </Button>
          </div>
          <RSelectInArray
            label={'Карта'}
            value={subGroup.mapId}
            property={'mapId'}
            options={worlds.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
            )}
            indexArray={index}
          />
          <RSelectInArray
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
          <RInputInArray
            label={'Количество кругов'}
            value={subGroup.laps}
            property={'laps'}
            type={'number'}
            indexArray={index}
          />
          <RInputInArray
            label={'Время старта (московское время -3ч)'}
            value={subGroup.eventSubgroupStart}
            property={'eventSubgroupStart'}
            type={'text'}
            indexArray={index}
          />
          <RInputInArray
            label={'Название для группы'}
            value={subGroup.name}
            property={'name'}
            type={'text'}
            indexArray={index}
          />
          <RTextareaInArray
            label={'Описание для группы'}
            value={subGroup.description}
            property={'description'}
            type={'text'}
            indexArray={index}
          />
          <RSelectInArray
            label={'Джерси заезда'}
            value={subGroup.jerseyHash}
            property={'jerseyHash'}
            options={jerseys.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
            )}
            indexArray={index}
          />
          <RInputInArray
            label={'Номер места старта'}
            value={subGroup.startLocation}
            property={'startLocation'}
            type={'number'}
            indexArray={index}
          />
          <RInputInArray
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
