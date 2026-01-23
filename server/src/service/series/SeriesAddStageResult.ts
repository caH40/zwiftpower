import { EventRepository } from '../../repositories/Event.js';
import { SeriesRepository } from '../../repositories/Series.js';
import { ProfileDataInResult, TStageResult } from '../../types/model.interface.js';
import { getOrThrow } from '../../utils/getOrThrow.js';
import { MongooseUtils } from '../../utils/MongooseUtils.js';

// types
import { TRaceSeriesCategories, TZwiftCategory } from '../../types/types.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { StageResultModel } from '../../Model/StageResult.js';
import { StageResultRepository } from '../../repositories/StageResult.js';
import { SeriesStageProtocolManager } from './SeriesStageProtocolManager.js';
import { TourGCManager } from './tour/TourGCManager.js';
import { TeamRepository } from '../../repositories/Team.js';

type TRawData = {
  durationInMilliseconds: number;
  stageOrder: number;
  profileId: number;
  seriesId: string;
  moderatorId: string;
  avgWatts: number;
  heartRateData: number;
  category: TRaceSeriesCategories;
  subgroupLabel: TZwiftCategory;
} & ProfileDataInResult;

export class SeriesAddStageResult {
  private seriesRepository = new SeriesRepository();
  private eventRepository = new EventRepository();
  private stageResultRepository = new StageResultRepository();

  /**
   * Проблема: сырой результат нельзя сохранить в БД, так как отсутствуют расчетные обязательные поля.
   * 1. Проверь есть ли у даного райдера profileId результат в данном этапе
   * 1. Если несколько заездов на этапе, определить какой эвент главный, а какие перезаезды. Использовать _id главного эвента на этапе.
   *
   * 2.
   */
  async add(data: TRawData): Promise<TResponseService<null>> {
    const { stages, name: seriesName } = await getOrThrow(
      this.seriesRepository.getById(data.seriesId),
      `Серия с _id: ${data.seriesId} не найдена в базе данных.`
    );

    // Проверка наличия результата у райдера profileId в текущем этапе stageOrder.
    const existedResult = await this.stageResultRepository.exists(
      data.seriesId,
      data.stageOrder,
      data.profileId
    );

    if (existedResult) {
      throw new Error(
        `Результат райдера "${data.lastName} ${data.firstName}" с zwiftId: "${data.profileId}"  уже есть в протоколе этапа №${data.stageOrder} серии "${seriesName}"`
      );
    }

    // для каждого эвента получить totalFinishedCount, у кого больше, тот главный эвент.
    const eventIdsInStage = stages
      .filter((s) => s.order === data.stageOrder)
      .map((s) => s.event);

    const events = await Promise.all(
      eventIdsInStage.map((e) => this.eventRepository.getEventById(e.toString()))
    );

    // Получение _id главного эвента на этапе, если есть повторные.
    const mainEvent = events.reduce<{ id: number | null; totalFinishedCount: number }>(
      (acc, cur) => {
        // Если этап не найден в БД
        if (!cur) {
          return acc;
        }

        const totalFinishedCount = cur.totalFinishedCount ?? 0;

        if (totalFinishedCount > acc.totalFinishedCount) {
          acc.totalFinishedCount = totalFinishedCount;
          acc.id = cur.id || null;
        }

        return acc;
      },
      { id: null, totalFinishedCount: 0 }
    );

    if (!mainEvent.id) {
      throw new Error(
        `Не найден ни один eventId в этапе №${data.stageOrder} seriesId: ${data.seriesId}`
      );
    }

    const result = this.createStageResultEntity({ ...data, eventId: mainEvent.id });

    await this.addTeam(result);

    await StageResultModel.create({ ...result, addedByModerator: true });

    const seriesStageProtocolManager = new SeriesStageProtocolManager(data.seriesId);
    await seriesStageProtocolManager.recalculateStageProtocol(data.seriesId);

    // Изменение  hasResults и resultsUpdatedAt даты обновления результатов в данных этапа серии.
    await seriesStageProtocolManager.setResultsUpdateDateInSeries(data.stageOrder, true);

    // Обновление генеральной классификации серии.
    const tourGC = new TourGCManager(data.seriesId);
    await tourGC.update();
    return {
      data: null,
      message: `Результат для райдера ${data.lastName} ${data.firstName} добавлен в этап №${data.stageOrder} серии ${seriesName}`,
    };
  }

  /**
   * Добавление команды райдера.
   */
  async addTeam(result: TStageResult): Promise<TStageResult> {
    const teamRepository = new TeamRepository();

    const team = await teamRepository.getByTeamMemberZwiftId(result.profileId);

    if (!team) {
      return result;
    }

    result.profileData.team = {
      name: team.name,
      shortName: team.shortName,
      urlSlug: team.urlSlug,
    };

    return result;
  }

  /**
   * Формирование структуры объекта результата на основе данных с клиента
   */
  private createStageResultEntity(data: TRawData & { eventId: number }): TStageResult {
    const mongooseUtils = new MongooseUtils();

    const profileData: ProfileDataInResult = {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      weightInGrams: data.weightInGrams,
      heightInCentimeters: data.heightInCentimeters,
      imageSrc: data.imageSrc,
      countryAlpha3: data.countryAlpha3,
      age: data.age,
    };

    const sensorData = {
      avgWatts: data.avgWatts,
      heartRateData: {
        avgHeartRate: data.heartRateData,
        heartRateMonitor: data.heartRateData > 0,
      },
    };

    const activityData = {
      durationInMilliseconds: data.durationInMilliseconds,
      subgroupLabel: data.subgroupLabel,
      segmentDistanceInCentimeters: 0,
      segmentDistanceInMeters: 0,
      elevationInMeters: 0,
      calories: 0,
      endDate: 'ручное добавление результата',
    };

    const newResult = {
      series: mongooseUtils.convertToObjectId(data.seriesId)!, // seriesId проверялся тип в zod.
      order: data.stageOrder,
      profileId: data.profileId,
      eventId: data.eventId,
      profileData,
      sensorData: sensorData,
      cpBestEfforts: [],
      rank: {
        category: 0,
        absolute: 0,
      },
      activityData,
      category: data.category,
      categoryInRace: data.category,
      points: null,
      disqualification: null,
      timePenalty: null,
      teamSquadAtRace: null,
      finishTimeClassification: null,
      finishTimeLimit: { isOutside: false, exceededMilliseconds: 0 },
      gapsInCategories: {
        category: null,
        absolute: null,
      },
      finishersCount: {
        category: 0,
        absolute: 0,
      },
      finalDurationInMilliseconds: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as TStageResult;

    return newResult;
  }
}
