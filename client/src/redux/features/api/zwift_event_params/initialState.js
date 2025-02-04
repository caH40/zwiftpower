import { accessExpressionsRegClosed } from '../../../../assets/zwift/accessExpression';

const dateStart = new Date().setHours(19, 0, 0, 0);
const eventStart = new Date(dateStart).toISOString();

/**
 * Начальные параметры Эвента при создании нового Эвента в Zwift
 */
export const getInitialMainParams = () => ({
  id: 0,
  name: 'Title Event',
  description: 'Description Event',
  eventStart,
  microserviceEventVisibility: 'SHAREABLE',
  // как изменять клуб в зависимости от создателя заезда
  sport: 'CYCLING',
  type: 'EVENT_TYPE_GROUP_RIDE',
  eventType: 'GROUP_RIDE',
  rulesId: null,
  microserviceName: 'clubs',
  cullingType: 'CULLING_EVENT_ONLY',
  categoryEnforcement: true,
  accessExpression: accessExpressionsRegClosed.value,
  accessExpressionObj: accessExpressionsRegClosed,
  timeTrialOptions: {
    timeGapBetweenRowsMs: 15000,
    maxRows: 50,
    maxRidersPerRow: 10,
  },
  tags: [],
});

/**
 * Начальные параметры подгрупп Эвента при создании нового Эвента в Zwift
 */
export const initialSubgroup = {
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
};

/**
 * Начальные правила Эвента при создании нового Эвента в Zwift
 */
export const initialRules = ['NO_POWERUPS', 'SHOW_RACE_RESULTS'];
