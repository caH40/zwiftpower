import { ZwiftSignedRiders } from '../Model/ZwiftSignedRiders.js';

// types
import { SignedRidersSchema, ZwiftEventSubgroupSchema } from '../types/model.interface.js';

/**
 *  Получение зарегистрированных райдеров в Эвент
 */
export const getSignedRiders = async (eventSubgroups: ZwiftEventSubgroupSchema[]) => {
  const signedRiders = [] as SignedRidersSchema[];
  for (const subgroup of eventSubgroups) {
    const signedRidersDB = await ZwiftSignedRiders.find({ subgroup: subgroup._id });
    signedRiders.push(...signedRidersDB);
  }

  return signedRiders;
};
