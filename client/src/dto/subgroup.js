export class DtoSubgroup {
  mapId;
  routeId;
  eventSubgroupStart;
  name;
  description;
  startLocation;
  rulesId;

  constructor(groupEventParams) {
    this.mapId = groupEventParams.mapId;
    this.routeId = groupEventParams.routeId;
    this.laps = groupEventParams.laps;
    this.eventSubgroupStart = groupEventParams.eventSubgroupStart;
    this.name = groupEventParams.name;
    this.description = groupEventParams.description;
    this.jerseyHash = groupEventParams.jerseyHash;
    this.startLocation = groupEventParams.startLocation;
    this.rulesId = groupEventParams.rulesId;
  }
}
