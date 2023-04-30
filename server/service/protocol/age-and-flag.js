import { ZwiftSingedRiders } from '../../Model/ZwiftSingedRiders.js';

export async function addAgeAndFlag(event, results) {
  try {
    const singedRiders = [];
    for (const subgroup of event.eventSubgroups) {
      const singedRidersDB = await ZwiftSingedRiders.find({ subgroup: subgroup._id });
      singedRiders.push(...singedRidersDB);
    }

    const newResults = results.map((result) => {
      const { age, countryAlpha3 } = singedRiders.find(
        (rider) => rider.id === result.profileId
      );
      result.profileData.age = age;
      result.profileData.countryAlpha3 = countryAlpha3;
      return result;
    });

    return newResults;
  } catch (error) {
    throw error;
  }
}
