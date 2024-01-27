const dateStart = new Date().setHours(19, 0, 0, 0);
const eventStart = new Date(dateStart).toISOString();

export const getInitialMainParams = () => ({
  id: 0,
  name: 'Title Event',
  description: 'Description Event',
  eventStart,
  microserviceEventVisibility: 'SHAREABLE',
  // как изменять клуб в зависимости от создателя заезда
  microserviceExternalResourceId: '38297d70-2684-4348-b921-1e200a1c6ad8',
  sport: 'CYCLING',
  type: 'EVENT_TYPE_GROUP_RIDE',
  rulesId: null,
  microserviceName: 'clubs',
});

export const getInitialSubgroup = () => ({
  index: 1,
  name: 'Title Event',
  description: 'Description Event',
  eventSubgroupStart: eventStart,
  invitedLeaders: [],
  invitedSweepers: [],
  label: 1,
  subgroupLabel: 'A',
  laps: 1,
  mapId: 1,
  routeId: 3395698268,
  jerseyHash: 0,
  durationInSeconds: 0,
  distanceInMeters: 0,
});
