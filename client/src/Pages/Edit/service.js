export const stageClear = {
  _id: 'none',
  number: '',
  dateStart: '2023-01-01',
  route: '',
  routeLink: '',
  link: '',
  world: '',
  laps: '',
  distance: '',
  ascent: '',
  type: '',
  quantitySprints: '',
  quantityMountains: '',
  needCount: true,
  hasResults: false,
};

export const isValid = (stageNew) => {
  if (
    stageNew.number === '' ||
    stageNew.dateStart === '2023-01-01' ||
    stageNew.route === '' ||
    stageNew.routeLink === '' ||
    stageNew.world === '' ||
    stageNew.laps === '' ||
    stageNew.distance === '' ||
    stageNew.ascent === '' ||
    stageNew.type === '' ||
    stageNew.quantitySprints === '' ||
    stageNew.quantityMountains === ''
  )
    return false;

  return true;
};

export const seriesClear = {
  name: '',
  dateStart: '2023-01-01',
  type: '',
  organizer: '',
  description: '',
  descriptionShort: '',
  hasGeneral: false,
  hasTeams: false,
  isFinished: false,
};

export const isValidSeries = (seriesNew) => {
  if (
    seriesNew.name === '' ||
    seriesNew.dateStart === '2023-01-01' ||
    seriesNew.type === '' ||
    seriesNew.organizer === ''
  )
    return false;

  return true;
};
