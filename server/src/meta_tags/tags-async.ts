import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { raceTypes } from '../assets/race-type.js';
import { serverFront } from '../config/environment.js';
import { MetaTags } from '../types/types.interface.js';
import { getTimerLocal } from '../utils/date-local.js';
import { getMetaOtherPages } from './tags.js';

/**
 * Формирование Мета тегов для страницы "Зарегистрированные участники"
 */
export const getSignedRidersMeta = async (url: string): Promise<MetaTags> => {
  try {
    const eventId = +url.replace('/race/schedule/', '');

    const zwiftEventDB = await ZwiftEvent.findOne(
      { id: eventId },
      {
        imageUrl: true,
        name: true,
        eventStart: true,
        organizer: true,
        typeRaceCustom: true,
      }
    ).lean();

    // если не найден Эвент, то возвращать стандартные Мета Тэги для "прочих" страниц
    if (!zwiftEventDB) {
      return getMetaOtherPages(url);
    }

    const { imageUrl, name, eventStart, organizer, typeRaceCustom } = zwiftEventDB;

    // подготовка данных
    const eventStartLocal = getTimerLocal(eventStart, 'DDMMYYHm');
    const type = raceTypes.find((race) => race.value === typeRaceCustom)?.name;

    const titleRaw = `Заезд '${name}', ${eventStartLocal}. RideOn`;
    // запрещены двойные кавычки в мета тегах
    const title = titleRaw.replace(/"/g, '');
    const canonical = serverFront + url;
    const descriptionRaw = `Описание заезда '${name}'. Зарегистрированные участники. Организатор команда '${organizer}' в Zwift. Тип заезда '${
      type ? type : 'Классический без групп'
    }'.`;
    // запрещены двойные кавычки в мета тегах
    const description = descriptionRaw.replace(/"/g, '');
    const image = imageUrl;

    return { title, canonical, description, image };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};
/**
 * Формирование Мета тегов для страницы "Результаты заезда"
 */
export const getRaceResultsMeta = async (url: string): Promise<MetaTags> => {
  try {
    const eventId = +url.replace('/race/results/', '');

    const zwiftEventDB = await ZwiftEvent.findOne(
      { id: eventId },
      { imageUrl: true, name: true, eventStart: true, organizer: true, typeRaceCustom: true }
    ).lean();

    // если не найден Эвент, то возвращать стандартные Мета Тэги для "прочих" страниц
    if (!zwiftEventDB) {
      return getMetaOtherPages(url);
    }

    const { imageUrl, name, eventStart, organizer, typeRaceCustom } = zwiftEventDB;

    // подготовка данных
    const eventStartLocal = getTimerLocal(eventStart, 'DDMMYY');
    const type = raceTypes.find((race) => race.value === typeRaceCustom)?.name;

    const titleRaw = `Результаты заезда '${name}'`;
    // запрещены двойные кавычки в мета тегах
    const title = titleRaw.replace(/"/g, '');
    const canonical = serverFront + url;
    const descriptionRaw = `Результаты заезда '${name}' от ${eventStartLocal}, организованного командой '${organizer}' в виртуальном мире Zwift (Звифт). Тип заезда '${
      type ? type : 'Классический без групп'
    }'.`;
    // запрещены двойные кавычки в мета тегах
    const description = descriptionRaw.replace(/"/g, '');
    const image = imageUrl;

    return { title, canonical, description, image };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

// /**
//  * Формирование Мета тегов для страницы "Результаты заезда"
//  */
// export const getCatchupMeta = async (url: string): Promise<MetaTags> => {

//   const title = ``;
//   const canonical = serverFront + url;
//   const description = ``;
//   const image = '';

//   return { title, canonical, description, image };
// };

// /**
//  * Формирование Мета тегов для страницы "Результаты заезда"
//  */
// export const getCatchupMeta = async (url: string): Promise<MetaTags> => {

//   const title = ``;
//   const canonical = serverFront + url;
//   const description = ``;
//   const image = '';

//   return { title, canonical, description, image };
// };
