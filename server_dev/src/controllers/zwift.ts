import { Request, Response } from 'express';
import { getZwiftEventResultsService } from '../service/zwift/download.js';
import { getEventZwiftService, putEventZwiftService } from '../service/zwift/events.js';
import { getZwiftRiderService } from '../service/zwift/rider.js';

export async function getEvent(req: Request, res: Response) {
  try {
    const { eventId, userId } = req.params;
    const event = await getEventZwiftService(eventId, userId);
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export async function putEvent(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { event } = req.body;
    const eventChanged = await putEventZwiftService(event, userId);
    res.status(200).json(eventChanged);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export async function getZwiftRider(req: Request, res: Response) {
  try {
    const { zwiftId } = req.params;
    const rider = await getZwiftRiderService(zwiftId);
    res.status(200).json(rider);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export async function getZwiftEventResults(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const { results } = await getZwiftEventResultsService(eventId);

    res.send(results);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
}
