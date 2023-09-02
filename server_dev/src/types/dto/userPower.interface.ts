import { Types } from 'mongoose';

import { PowerCurveSchema } from '../model.interface.js';

export interface PowerFromEvents {
  _id: Types.ObjectId;
  cpBestEfforts: {
    watts: number;
    wattsKg: number;
    cpLabel: string;
    duration: number;
  }[];
  eventName: string;
  eventStart: number;
}
//
//
export interface UserPowerDtoArg {
  powerCurve: PowerCurveSchema | null;
  powerFromEvents: PowerFromEvents[];
}
