import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';
import { SignedRidersSchema } from '../../types/model.interface.js';

// types
import { EventWithSubgroup, ResultEventAdditional } from '../../types/types.interface.js';

export async function addAgeAndFlag(
  event: EventWithSubgroup,
  results: ResultEventAdditional[]
) {
  const signedRiders: SignedRidersSchema[] = [];

  for (const subgroup of event.eventSubgroups) {
    const signedRidersDB = await ZwiftSignedRiders.find({ subgroup: subgroup._id });
    signedRiders.push(...signedRidersDB);
  }

  const newResults = results.map((result) => {
    const { age, countryAlpha3 } =
      signedRiders.find((rider) => rider.id === result.profileId) || {};
    result.profileData.age = age;
    result.profileData.countryAlpha3 = countryAlpha3;
    return result;
  });

  return newResults;
}
