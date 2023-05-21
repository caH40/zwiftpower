import { getEventService, putEventService } from '../service/zwift/events.js';

export async function getEvent(req, res) {
  try {
    const { eventId } = req.params;
    const event = await getEventService(eventId);
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
    const eventChanged = await putEventService(event, userId);
    res.status(200).json(eventChanged);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
