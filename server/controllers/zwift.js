import { getEventZwiftService, putEventZwiftService } from '../service/zwift/events.js';
import { getZwiftRiderService } from '../service/zwift/rider.js';

export async function getEvent(req, res) {
  try {
    const { eventId, userId } = req.params;
    const event = await getEventZwiftService(eventId, userId);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function putEvent(req, res) {
  try {
    const { userId } = req.params;
    const { event } = req.body;
    const eventChanged = await putEventZwiftService(event, userId);
    res.status(200).json(eventChanged);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function getZwiftRider(req, res) {
  try {
    const { zwiftId } = req.params;
    const rider = await getZwiftRiderService(zwiftId);
    res.status(200).json(rider);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
