import {
  deleteEventAndResultsService,
  deleteEventService,
} from '../service/race/events-delete.js';
import { postEventService } from '../service/race/events-post.js';
import { putEventService } from '../service/race/events-put.js';
import { getEventService } from '../service/race/events.js';
import { getEventsService } from '../service/race/events.js';
import { putResultsService } from '../service/race/results-put.js';
import { getUserResultsService } from '../service/race/rider/rider-profile.js';
import { getResultsService } from '../service/race/results.js';
import { getSeriesService } from '../service/race/series.js';

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
// получение данных заезда (started=false для расписания, started:true для результатов)
export async function getEvents(req, res) {
  try {
    const { started, target, page, docsOnPage } = req.query;
    const events = await getEventsService(
      started === 'true' ? true : false,
      target,
      page,
      docsOnPage
    );
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function postEvent(req, res) {
  try {
    const { userId } = req.params;
    const { event } = req.body;

    const eventSaved = await postEventService(event, userId);
    res.status(201).json(eventSaved);
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
    const { eventId } = req.body;

    const eventUpdated = await putEventService(eventId, userId);
    res.status(201).json(eventUpdated);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function deleteEvent(req, res) {
  try {
    const { userId } = req.params;
    const { eventId } = req.body;
    const eventDeleted = await deleteEventAndResultsService(eventId, userId);
    res.status(200).json(eventDeleted);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function putResults(req, res) {
  try {
    const { userId } = req.params;
    const { eventId } = req.body;
    const resultsUpdated = await putResultsService(eventId, userId);
    res.status(201).json(resultsUpdated);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function deleteEventAndResults(req, res) {
  try {
    const { userId } = req.params;
    const { eventId } = req.body;
    const eventDeleted = await deleteEventAndResultsService(eventId, userId);
    res.status(200).json(eventDeleted);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function getResults(req, res) {
  try {
    const { eventId } = req.params;
    const eventResults = await getResultsService(eventId);
    res.status(200).json(eventResults);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
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
export async function getSeries(req, res) {
  try {
    const series = await getSeriesService();
    res.status(200).json(series);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
