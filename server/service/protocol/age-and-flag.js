import { ZwiftSignedRiders } from '../../Model/ZwiftSignedRiders.js';

export async function addAgeAndFlag(event, results) {
  try {
    const signedRiders = [];
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
  } catch (error) {
    throw error;
  }
}
