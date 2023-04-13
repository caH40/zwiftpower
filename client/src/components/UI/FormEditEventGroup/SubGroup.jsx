import React from 'react';

import { jerseys, routes, worlds } from '../../../asset/zwift/lib/esm/zwift-lib';
import SelectObject from '../SelectObject/SelectObject';
import SimpleInput from '../SimpleInput/SimpleInput';
import TextArea from '../TextArea/TextArea';

import styles from './FormEditEventGroup.module.css';

function SubGroup({ subGroup, setSubGroup }) {
  return (
    <>
      {subGroup?.subgroupLabel ? (
        <div className={styles.group}>
          <p className={styles.title}>Группа {subGroup.subgroupLabel}</p>
          <SelectObject
            name="Мир"
            state={subGroup}
            setState={setSubGroup}
            property="mapId"
            options={worlds.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
            )}
          />
          <SelectObject
            name="Маршрут"
            state={subGroup}
            setState={setSubGroup}
            property="routeId"
            options={routes
              .filter(
                (route) =>
                  route.world === worlds.find((world) => world.id === subGroup.mapId)?.slug
              )
              .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en'))}
          />
          <SimpleInput
            name="Количество кругов"
            state={subGroup}
            setState={setSubGroup}
            property="laps"
            type="text"
          />
          <SimpleInput
            name="Время старта (московское время -3ч)"
            state={subGroup}
            setState={setSubGroup}
            property="eventSubgroupStart"
            type="text"
          />
          <SimpleInput
            name="Название для группы"
            state={subGroup}
            setState={setSubGroup}
            property="name"
            type="text"
          />
          <TextArea
            name="Описание для группы"
            state={subGroup}
            setState={setSubGroup}
            property="description"
            type="text"
          />
          <SelectObject
            name="Джерси заезда"
            state={subGroup}
            setState={setSubGroup}
            property="jerseyHash"
            options={jerseys.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'en')
            )}
          />
          <SimpleInput
            name="Номер места старта"
            state={subGroup}
            setState={setSubGroup}
            property="startLocation"
            type="number"
          />
          <SimpleInput
            name="Номер пакета правил"
            state={subGroup}
            setState={setSubGroup}
            property="rulesId"
            type="number"
            disabled={true}
          />
        </div>
      ) : undefined}
    </>
  );
}

export default SubGroup;
