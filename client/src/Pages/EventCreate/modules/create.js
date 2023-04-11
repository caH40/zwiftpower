export const eventData = {
  eventData: {
    description: 'A casual ride with your club members on a flat route. 2',
    eventStart: '2023-04-11T11:00:00Z',
    jerseyHash: 3162864971,
    eventSubgroups: [
      {
        eventSubgroupStart: '2023-04-11T10:00:00Z',
        invitedLeaders: [],
        invitedSweepers: [],
        label: 1,
        laps: 1,
        mapId: 1,
        routeId: 3395698268,
        jerseyHash: 3162864971,
      },
      {
        eventSubgroupStart: '2023-04-11T10:03:00Z',
        invitedLeaders: [],
        invitedSweepers: [],
        label: 2,
        laps: 1,
        mapId: 1,
        routeId: 3395698268,
        jerseyHash: 3162864971,
      },
    ],
    id: 0,
    microserviceEventVisibility: 'DEFINED_BY_RESOURCE_ID',
    microserviceExternalResourceId: '53fb86b7-1702-42f1-8b42-a37a7007ce72',
    imageUrl: 'https://bike-caucasus.ru/images/news/06.03.2023-Ð¡Ð½Ð¸Ð¼Ð¾Ðº.JPG',
    name: 'Testing manual',
    accessExpression: `(subgroup.label == 1 && powerCurves.category == 0) 
    || (powerCurves.category != 5 && powerCurves.category >= subgroup.label) 
    || (powerCurves.category == 5 && subgroup.label == 5)`,
    tags: ['powerups=false', 'kiwicrew', 'timestamp=1680247765446'],
    rulesId: 64,
    sport: 'CYCLING',
    categoryEnforcement: true,
    type: 'EVENT_TYPE_RACE',
  },
  eventTemplateId: 101,
};

// type: 'EVENT_TYPE_RACE',
// type: 'EVENT_TYPE_GROUP_RIDE',
