import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { raceTypes } from '../assets/race-type.js';
import { serverWoWWW } from '../config/environment.js';
import { getTimerLocal } from '../utils/date-local.js';
import { getMetaOtherPages } from './tags.js';

// types
import { MetaTags } from '../types/types.interface.js';
import { millisecondsInWeekDays } from '../assets/date.js';
import { Rider } from '../Model/Rider.js';
import { Organizer } from '../Model/Organizer.js';
import { TFileMetadataForCloud } from '../types/model.interface.js';
import { createUrlsToFileCloud } from '../utils/url.js';

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
    const canonical = serverWoWWW + url;
    const descriptionRaw = `Описание заезда '${name}'. Зарегистрированные участники. Организатор команда '${organizer}' в Zwift. Тип заезда '${
      type ? type : 'Классический без групп'
    }'.`;
    // запрещены двойные кавычки в мета тегах
    const description = descriptionRaw.replace(/"/g, '');
    const image = imageUrl;

    // показывать не начавшиеся заезды в расписании
    const today = Date.now();
    const actualPage = new Date(eventStart).getTime() > today;
    const recommendationsTag = actualPage ? 'need_show' : 'ban';

    return { title, canonical, description, image, recommendationsTag };
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
    const canonical = serverWoWWW + url;
    const descriptionRaw = `Результаты заезда '${name}' от ${eventStartLocal}, организованного командой '${organizer}' в виртуальном мире Zwift (Звифт). Тип заезда '${
      type ? type : 'Классический без групп'
    }'.`;
    // запрещены двойные кавычки в мета тегах
    const description = descriptionRaw.replace(/"/g, '');
    const image = imageUrl;

    // показывать результаты, которые не старше недели
    const today = Date.now();
    const actualPage = new Date(eventStart).getTime() > today - millisecondsInWeekDays;

    const recommendationsTag = actualPage ? 'need_show' : 'ban';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

/**
 * Формирование Мета тегов для страницы "Профиль пользователя"
 */
export const getProfileResultsMeta = async (url: string): Promise<MetaTags> => {
  try {
    // Парсинг url.
    const parts = url.split('/');
    const zwiftId = Number(parts[2]);
    const page = parts.at(-1);

    if (
      isNaN(zwiftId) ||
      !page ||
      !['results', 'power', 'racing-score', 'weight-and-height'].includes(page)
    ) {
      return getMetaOtherPages(url);
    }

    const riderDB = await Rider.findOne(
      { zwiftId },
      {
        firstName: true,
        lastName: true,
        imageSrc: true,
      }
    ).lean();

    // если не найден Эвент, то возвращать стандартные Мета Тэги для "прочих" страниц
    if (!riderDB) {
      return getMetaOtherPages(url);
    }

    const { firstName, lastName, imageSrc } = riderDB;

    const rider = `${firstName} ${lastName}`;

    // Формирование описания. По умолчанию описание главной страницы профиля с результатами заездов.
    let descriptionRaw = `Профиль райдера ${rider}. Результаты заездов в Zwift (Звифт).`;
    let titleRaw = `Результаты заездов ${rider}`;

    switch (page) {
      case 'power':
        descriptionRaw = `Кривая мощности за 90 дней ${rider} в Zwift (Звифт). Сравнение кривых мощности за разные заезды.`;

        titleRaw = `Диаграмма мощности ${rider}`;
        break;

      case 'racing-score':
        descriptionRaw = `Диаграмма изменения гоночного рейтинга (Racing Score) райдера ${rider} в Zwift (Звифт).`;

        titleRaw = `Диаграмма изменения Racing Score для райдера ${rider}`;
        break;

      case 'weight-and-height':
        descriptionRaw = `График изменения веса райдера ${rider} в Zwift (Звифт). График контроля изменения роста.`;

        titleRaw = `Диаграмма изменения веса райдера ${rider}`;
        break;
    }

    // Запрещены двойные кавычки в мета тегах.
    const description = descriptionRaw.replace(/"/g, '');
    const title = titleRaw.replace(/"/g, '');

    const canonical = serverWoWWW + url;
    const image = imageSrc;
    const recommendationsTag = 'profile';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

/**
 * Формирование Мета тегов для страницы "Организатор заездов"
 */
export const getOrganizerPublicMeta = async (url: string): Promise<MetaTags> => {
  try {
    // Парсинг url.
    const parts = url.split('/');
    const urlSlug = parts.at(-1);

    if (!urlSlug) {
      return getMetaOtherPages(url);
    }

    const organizerDB = await Organizer.findOne(
      { urlSlug, isPublished: true },
      {
        name: true,
        posterFileInfo: true,
        _id: false,
      }
    ).lean<{ name: string; posterFileInfo?: TFileMetadataForCloud }>();

    // если не найден Организатор, или Организатор закрыл страницу для просмотра.
    if (!organizerDB) {
      return getMetaOtherPages(url);
    }

    const posterUrls = createUrlsToFileCloud(organizerDB.posterFileInfo);

    // Формирование описания. По умолчанию описание главной страницы профиля с результатами заездов.
    const descriptionRaw = `${organizerDB.name} организует виртуальные гонки в Zwift: одиночные заезды, командные гонки, TT, коферайды и туры. Присоединяйтесь к заездам и улучшайте результаты!`;
    const titleRaw = `${organizerDB.name} – Гонки и серии заездов Zwift 🚴`;

    // Запрещены двойные кавычки в мета тегах.
    const description = descriptionRaw.replace(/"/g, '');
    const title = titleRaw.replace(/"/g, '');

    const canonical = serverWoWWW + url;
    const image =
      posterUrls?.medium ||
      posterUrls?.original ||
      'https://zwiftpower.ru/images/open_graph/organizers.webp';
    const recommendationsTag = 'organizer';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};
