import {
  StageResultDto,
  StageResultsDto,
  TOrganizerSeriesAllDto,
  TOrganizerSeriesOneDto,
  TSeriesAllPublicDto,
  TSeriesOnePublicDto,
  TStagesPublicDto,
} from '../types/dto.interface.js';
import { TFileMetadataForCloud } from '../types/model.interface.js';
import {
  TOrganizerSeriesAllResponseDB,
  TOrganizerSeriesOneResponseDB,
  TSeriesOnePublicResponseDB,
  TSeriesAllPublicResponseDB,
  TStagesPublicResponseDB,
  GetStageResultDB,
} from '../types/mongodb-response.types.js';
import { createUrlsToFileCloud } from '../utils/url.js';

/**
 * DTO получения всех серий организатора для клиента.
 */
export function organizerSeriesAllDto(
  series: TOrganizerSeriesAllResponseDB[]
): TOrganizerSeriesAllDto[] {
  return series.map((elm) => {
    const _id = String(elm._id);
    const dateStart = elm.dateStart.toISOString();
    const dateEnd = elm.dateEnd.toISOString();

    const stages = elm.stages
      .filter((stage) => stage.event)
      .map((stage) => ({
        eventStart: stage.event.eventStart,
        _id: String(stage.event._id),
        name: stage.event.name,
        order: stage.order,
      }));

    // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
    const logoUrls = createUrlsToFileCloud(elm.logoFileInfo);
    const posterUrls = createUrlsToFileCloud(elm.posterFileInfo);

    return { ...elm, stages, _id, dateStart, dateEnd, logoUrls, posterUrls };
  });
}

/**
 * DTO получения серии заездов для редактирования организатором.
 */
export function organizerSeriesOneDto(
  series: TOrganizerSeriesOneResponseDB
): TOrganizerSeriesOneDto {
  const _id = String(series._id);
  const dateStart = series.dateStart.toISOString();
  const dateEnd = series.dateEnd.toISOString();

  const stages = series.stages
    .filter((elm) => elm.event)
    .map((stage) => ({
      eventStart: stage.event.eventStart,
      _id: String(stage.event._id),
      name: stage.event.name,
      order: stage.order,
      disableTimeGapRule: stage.disableTimeGapRule,
      label: stage.label,
      includeResults: stage.includeResults,
    }));
  const description = series.description;

  // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
  const logoUrls = createUrlsToFileCloud(series.logoFileInfo);
  const posterUrls = createUrlsToFileCloud(series.posterFileInfo);

  return { ...series, description, _id, dateStart, dateEnd, stages, logoUrls, posterUrls };
}

/**
 * DTO получения всех серий для пользователей сайта.
 */
export function seriesAllPublicDto(
  series: TSeriesAllPublicResponseDB[]
): TSeriesAllPublicDto[] {
  return series.map((elm) => {
    const _id = String(elm._id);
    const dateStart = elm.dateStart.toISOString();
    const dateEnd = elm.dateEnd.toISOString();

    const stages = elm.stages
      .filter((elm) => elm.event)
      .map((stage) => ({
        eventStart: stage.event.eventStart,
        id: stage.event.id,
        _id: String(stage.event._id),
        name: stage.event.name,
        order: stage.order,
      }));

    // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
    const logoUrls = createUrlsToFileCloud(elm.logoFileInfo);
    const posterUrls = createUrlsToFileCloud(elm.posterFileInfo);

    return { ...elm, stages, _id, dateStart, dateEnd, logoUrls, posterUrls };
  });
}

/**
 * DTO получения данных запрашиваемой Серии для публичного доступа пользователей сайта.
 */
export function seriesOnePublicDto(
  series: TSeriesOnePublicResponseDB,
  seriesResults: unknown
): TSeriesOnePublicDto {
  const _id = String(series._id);

  // Лого Организатора заездов.
  const logoFileInfoOrganizer = createUrlsToFileCloud(series.organizer.logoFileInfo);

  const organizer = {
    _id: String(series.organizer._id),
    name: series.organizer.name,
    shortName: series.organizer.shortName,
    logoFileInfo: logoFileInfoOrganizer,
  };

  // Может быть несколько этапов с одинаковым номером (order), но разными eventStart.
  // На клиенте необходимо выбирать наименьший eventStart в этапах с одним номером (order).
  const stages = series.stages.map((stage) => ({
    id: stage.event.id,
    _id: String(stage.event._id),
    order: stage.order,
    name: stage.label,
    eventStart: new Date(stage.event.eventStart).toISOString(),
  }));

  const dateStart = series.dateStart.toISOString();
  const dateEnd = series.dateEnd.toISOString();

  // Создание ссылки для всех доступных размеров файла на основе предоставленных метаданных.
  const logoUrls = createUrlsToFileCloud(series.logoFileInfo);
  const posterUrls = createUrlsToFileCloud(series.posterFileInfo);

  const orderedStages = stages.map((stage) => stage.order);

  return {
    ...series,
    organizer,
    stages,
    _id,
    dateStart,
    dateEnd,
    logoUrls,
    posterUrls,
    seriesResults,
    orderedStages,
  };
}

/**
 * DTO получения данных этапов запрашиваемой Серии для публичного доступа пользователей сайта.
 */
export function stagesPublicDto(
  filteredStages: TStagesPublicResponseDB['stages'],
  logoFileInfo?: TFileMetadataForCloud
): TStagesPublicDto[] {
  // Лого Организатора заездов.
  const logoFileInfoOrganizer = logoFileInfo && createUrlsToFileCloud(logoFileInfo);

  const stages = filteredStages.map((stage) => ({
    eventStart: stage.event.eventStart,
    cullingType: stage.event.cullingType,
    categoryEnforcement: stage.event.categoryEnforcement,
    id: stage.event.id,
    _id: String(stage.event._id),
    name: stage.event.name,
    imageUrl: stage.event.imageUrl,
    typeRaceCustom: stage.event.typeRaceCustom,
    eventType: stage.event.eventType,
    rulesSet: stage.event.rulesSet,
    started: stage.event.started,
    tags: stage.event.tags,
    logoFileInfo: logoFileInfoOrganizer,
    order: stage.order,
    eventSubgroups: stage.event.eventSubgroups,
  }));

  return stages;
}

/**
 * DTO получения результатов этапа серии.
 */
export function stageResultDto({
  updatedAt: _u,
  createdAt: _c,
  ...result
}: GetStageResultDB): StageResultDto {
  // Удельная мощность за весь заезд.
  const wattsPerKg = result.sensorData.avgWatts / (result.profileData.weightInGrams / 1000);

  return {
    ...result,
    _id: String(result._id),
    series: String(result.series),
    teamSquadAtRace: result.teamSquadAtRace && String(result._id),
    wattsPerKg,
  };
}

/**
 * DTO получения результатов этапа серии.
 */
export function stageResultsDto(
  results: GetStageResultDB[],
  resultsUpdatedAt?: Date
): StageResultsDto {
  const resultsAfterDto = results.map((r) => stageResultDto(r));

  return {
    results: resultsAfterDto,
    resultsUpdatedAt: resultsUpdatedAt?.toISOString(),
  };
}
