import {
  getUserResultsService,
  getUserPowerService,
} from '../service/race/rider/rider-profile.js';

export async function getUserResults(req, res) {
  try {
    const { zwiftId } = req.params;
    const userResults = await getUserResultsService(zwiftId);
    res.status(200).json(userResults);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}

export async function getUserPower(req, res) {
  try {
    const { zwiftId } = req.params;
    const userPower = await getUserPowerService(zwiftId);
    res.status(200).json(userPower);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
