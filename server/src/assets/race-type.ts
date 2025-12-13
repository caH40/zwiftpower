import { TTypesRaceCustom } from '../types/types.interface';

export const raceTypes: { id: number; name: string; label: string; value: TTypesRaceCustom }[] =
  [
    { id: 1, value: 'catchUp', name: 'Догонялки', label: 'CU' },
    { id: 2, value: 'newbies', name: 'Для новичков', label: 'NE' },
    { id: 3, value: 'classicGroup', name: 'Классическая', label: 'CG' },
    { id: 4, value: 'classicCommon', name: 'Классическая без групп', label: 'CT' },
  ];
