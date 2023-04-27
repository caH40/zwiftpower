import { deleteEventService } from '../service/race/events-delete.js';
import { postEventService } from '../service/race/events-post.js';
import { putEventService } from '../service/race/events-put.js';
import { getEventService } from '../service/race/events.js';
import { getEventsService } from '../service/race/events.js';
import { putResultsService } from '../service/race/results-put.js';

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
// получение данных заезда (started=false для расписания, started:true для результатов)
export async function getEvents(req, res) {
  try {
    const { started } = req.query;
    const events = await getEventsService(started);
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
export async function postEvent(req, res) {
  try {
    const { event } = req.body;
    const eventSaved = await postEventService(event);
    res.status(201).json(eventSaved);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
export async function putEvent(req, res) {
  try {
    const { eventId } = req.body;
    const eventUpdated = await putEventService(eventId);
    res.status(201).json(eventUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
export async function deleteEvent(req, res) {
  try {
    const { eventId } = req.body;
    const eventDeleted = await deleteEventService(eventId);
    res.status(200).json(eventDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
export async function putResults(req, res) {
  try {
    const { eventId } = req.body;
    const resultsUpdated = await putResultsService(eventId);
    res.status(201).json(resultsUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.response ? { message: error.response?.data } : error);
  }
}
