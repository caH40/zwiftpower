import React from 'react';

import { jerseys, routes, worlds } from '../../../asset/zwift/lib/esm/zwift-lib';
import SelectObject from '../SelectObject/SelectObject';

function SubGroup({ subGroup, setSubGroup }) {
  return (
    <>
      {subGroup?.subgroupLabel ? (
        <div>
          <p>Группа {subGroup.subgroupLabel}</p>
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
        </div>
      ) : undefined}
    </>
  );
}

export default SubGroup;
