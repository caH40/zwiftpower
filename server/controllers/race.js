import { getEventService } from '../service/race/events.js';
import { getEventsService } from '../service/race/events.js';

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
export async function getEvents(req, res) {
  try {
    const { finished } = req.query;
    const events = await getEventsService(finished);
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
