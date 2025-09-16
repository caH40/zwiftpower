import { ZwiftEvent } from '../../../Model/ZwiftEvent.js';

export async function getEventsForMailingPreviewService(period: 'week' | 'month') {
  const eventsDB = await ZwiftEvent.find().lean();

  console.log(eventsDB[0]);
}
