import { ZwiftEvent } from '../Model/ZwiftEvent.js';
import { raceTypes } from '../assets/race-type.js';
import { serverWoWWW } from '../config/environment.js';
import { getTimerLocal } from '../utils/date-local.js';
import { getMetaOtherPages } from './tags.js';
import { createUrlsToFileCloud } from '../utils/url.js';
import { NSeriesModel } from '../Model/NSeries.js';
import { millisecondsInWeekDays } from '../assets/date.js';
import { Rider } from '../Model/Rider.js';
import { Organizer } from '../Model/Organizer.js';
import { TeamModel } from '../Model/Team.js';

// types
import { MetaTags } from '../types/types.interface.js';
import { TFileMetadataForCloud } from '../types/model.interface.js';
import { TSeriesForMetaTagsResponseDB } from '../types/mongodb-response.types.js';

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
    const urlSlug = parts.at(-2);
    const pageType = (parts.at(-1) as 'series' | 'schedule') || 'series';

    if (typeof urlSlug !== 'string') {
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
    const baseTitle = `${organizerDB.name} в Zwift 🚴`;
    const baseDescription = `${organizerDB.name} организует виртуальные гонки в Zwift: одиночные заезды, командные гонки, TT, коферайды и туры. Присоединяйтесь к заездам и улучшайте результаты!`;
    const pageTextMap = {
      schedule: 'Расписание заездов',
      series: 'Серии и туры',
    } as const;

    const descriptionRaw = `${baseDescription} 📅 ${pageTextMap[pageType]} доступны на этой странице.`;
    const titleRaw = `${pageTextMap[pageType]} от ${baseTitle}`;

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

/**
 * Формирование Мета тегов для страницы "Расписание этапов Серии заездов"
 */
export const getSeriesScheduleMeta = async (url: string): Promise<MetaTags> => {
  try {
    const { seriesDB, posterUrls, dateStart, dateEnd, organizerName } = await handleSeriesData(
      url
    );

    // Формирование описания. По умолчанию описание главной страницы профиля с результатами заездов.
    const descriptionRaw = seriesDB.mission
      ? `${seriesDB.mission} Следите за результатами!`
      : `Следите за этапами "${seriesDB.name}" (${dateStart}-${dateEnd}). Организатор: ${organizerName}. Присоединяйтесь к соревнованиям и следите за результатами!`;
    const titleRaw = `Расписание этапов: ${seriesDB.name} с ${dateStart} по ${dateEnd}, проводимых в Звифте. Организатор: ${organizerName}`;

    // Запрещены двойные кавычки в мета тегах.
    const description = descriptionRaw.replace(/"/g, '');
    const title = titleRaw.replace(/"/g, '');

    const canonical = serverWoWWW + url;
    const image =
      posterUrls?.medium ||
      posterUrls?.original ||
      'https://zwiftpower.ru/images/open_graph/series.webp';
    const recommendationsTag = 'series';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

/**
 * Формирование Мета тегов для страницы "Регламент Серии заездов"
 */
export const getSeriesRegulationsMeta = async (url: string): Promise<MetaTags> => {
  try {
    const { seriesDB, posterUrls, dateStart, dateEnd, organizerName } = await handleSeriesData(
      url
    );

    // Формирование описания. По умолчанию описание главной страницы профиля с результатами заездов.
    const descriptionRaw = seriesDB.mission
      ? `${seriesDB.mission} Узнайте правила, призы и другую важную информацию!`
      : `Ознакомьтесь с регламентом "${seriesDB.name}" (${dateStart}-${dateEnd}). Организатор: ${organizerName}. Узнайте правила, призы и другую важную информацию!`;
    const titleRaw = `Регламент: ${seriesDB.name} с ${dateStart} по ${dateEnd}, проводимых в Звифте. Организатор: ${organizerName}`;

    // Запрещены двойные кавычки в мета тегах.
    const description = descriptionRaw.replace(/"/g, '');
    const title = titleRaw.replace(/"/g, '');

    const canonical = serverWoWWW + url;
    const image =
      posterUrls?.medium ||
      posterUrls?.original ||
      'https://zwiftpower.ru/images/open_graph/series.webp';
    const recommendationsTag = 'series';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

/**
 * Формирование Мета тегов для страницы "Результаты Серии заездов"
 */
export const getSeriesResultsMeta = async (url: string): Promise<MetaTags> => {
  try {
    const { seriesDB, posterUrls, dateStart, dateEnd, organizerName } = await handleSeriesData(
      url
    );

    // Формирование описания. По умолчанию описание главной страницы профиля с результатами заездов.
    const descriptionRaw = seriesDB.mission
      ? `${seriesDB.mission} Итоговые таблицы серии`
      : `Следите за итоговыми результатами "${seriesDB.name}" (${dateStart}-${dateEnd}). Организатор: ${organizerName}. Присоединяйтесь к соревнованиям!`;
    const titleRaw = `Результаты и генеральные зачеты: ${seriesDB.name} с ${dateStart} по ${dateEnd}, Звифт. Организатор: ${organizerName}`;

    // Запрещены двойные кавычки в мета тегах.
    const description = descriptionRaw.replace(/"/g, '');
    const title = titleRaw.replace(/"/g, '');

    const canonical = serverWoWWW + url;
    const image =
      posterUrls?.medium ||
      posterUrls?.original ||
      'https://zwiftpower.ru/images/open_graph/series.webp';
    const recommendationsTag = 'series';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

/**
 * Формирование Мета тегов для страницы "Результаты участников команды"
 */
export const getTeamRiderResultsMeta = async (url: string): Promise<MetaTags> => {
  try {
    const urlSlug = url.split('/')?.at(-2);

    if (!urlSlug) {
      return getMetaOtherPages(url);
    }

    const team = await TeamModel.findOne(
      { urlSlug },
      { name: true, logoFileInfo: true, posterFileInfo: true }
    ).lean();

    if (!team) {
      return getMetaOtherPages(url);
    }

    const descriptionRaw = `История выступлений и результаты команды ${team.name} на Zwiftpower.ru. Итоги последних гонок, серий и туров, очки команды (ZP points) и позиция в рейтинге. 🏆📈`;
    const titleRaw = `Результаты команды ${team.name} | История выступлений в заездах | Zwiftpower.ru`;

    // Запрещены двойные кавычки в мета тегах.
    const description = descriptionRaw.replace(/"/g, '');
    const title = titleRaw.replace(/"/g, '');

    const posterUrls = createUrlsToFileCloud(team.posterFileInfo);
    const logoUrls = createUrlsToFileCloud(team.logoFileInfo);

    const canonical = serverWoWWW + url;
    const image =
      logoUrls?.original ||
      posterUrls?.medium ||
      posterUrls?.original ||
      'https://zwiftpower.ru/images/open_graph/teams.png';
    const recommendationsTag = 'team';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

/**
 * Формирование Мета тегов для страницы "Состав команды"
 */
export const getTeamMembersMeta = async (url: string): Promise<MetaTags> => {
  try {
    const urlSlug = url.split('/')?.at(-2);

    if (!urlSlug) {
      return getMetaOtherPages(url);
    }

    const team = await TeamModel.findOne(
      { urlSlug },
      { name: true, logoFileInfo: true, posterFileInfo: true }
    ).lean();

    if (!team) {
      return getMetaOtherPages(url);
    }

    const descriptionRaw = `Посмотрите полный состав команды ${team.name} на Zwiftpower.ru. Список всех гонщиков, их категории, активность и статистика выступлений. Найдите своих товарищей! 🚴‍♂️👥`;
    const titleRaw = `Состав команды ${team.name} | Участники и статистика | Zwiftpower.ru`;

    // Запрещены двойные кавычки в мета тегах.
    const description = descriptionRaw.replace(/"/g, '');
    const title = titleRaw.replace(/"/g, '');

    const posterUrls = createUrlsToFileCloud(team.posterFileInfo);
    const logoUrls = createUrlsToFileCloud(team.logoFileInfo);

    const canonical = serverWoWWW + url;
    const image =
      logoUrls?.original ||
      posterUrls?.medium ||
      posterUrls?.original ||
      'https://zwiftpower.ru/images/open_graph/teams.png';
    const recommendationsTag = 'team';

    return { title, canonical, description, image, recommendationsTag };
  } catch (error) {
    return getMetaOtherPages(url);
  }
};

async function handleSeriesData(url: string) {
  const parts = url.split('/');
  const urlSlug = parts.at(-2);

  if (typeof urlSlug !== 'string') {
    throw new Error('Нет url');
  }

  const seriesDB = await NSeriesModel.findOne(
    { urlSlug },
    {
      name: true,
      dateStart: true,
      dateEnd: true,
      organizer: true,
      mission: true,
      posterFileInfo: true,
      _id: false,
    }
  )
    .populate({ path: 'organizer', select: ['name'] })
    .lean<TSeriesForMetaTagsResponseDB>();

  // Если не найдена Серия заездов.
  if (!seriesDB) {
    throw new Error('Нет url');
  }

  const posterUrls = createUrlsToFileCloud(seriesDB.posterFileInfo);

  const dateStart = getTimerLocal(seriesDB.dateStart.toISOString(), 'DDMMYY');
  const dateEnd = getTimerLocal(seriesDB.dateEnd.toISOString(), 'DDMMYY');
  const organizerName = seriesDB.organizer.name;

  return { seriesDB, posterUrls, dateStart, dateEnd, organizerName };
}
