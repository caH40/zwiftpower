import { getEventService, postEventService, putEventService } from '../service/zwift/events.js';

export async function getEvent(req, res) {
  try {
    const { eventId } = req.params;
    const event = await getEventService(eventId);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
export async function putEvent(req, res) {
  try {
    const { event } = req.body;
    const eventChanged = await putEventService(event);
    res.status(200).json(eventChanged);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
export async function postEvent(req, res) {
  try {
    const { event } = req.body;
    const eventSaved = await postEventService(event);
    res.status(200).json(eventSaved);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
