import { finishProtocolConfigsDto } from '../../dto/finish-protocol.js';
import { FinishProtocolConfigModel } from '../../Model/FinishProtocolConfig.js';
import { Organizer } from '../../Model/Organizer.js';

// types
import { TFinishProtocolConfigDto } from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import {
  TFinishProtocolParamsPost,
  TFinishProtocolParamsPut,
} from '../../types/types.interface.js';
import { TFinishProtocolConfigResponseDB } from '../../types/mongodb-response.types.js';

/**
 * Класс работы с именами (объектами) конфигураций финишного протокола.
 */
export class FinishProtocolService {
  constructor() {}

  /**
   * Получение всех конфигурации.
   */
  public getAll = async (): Promise<TResponseService<TFinishProtocolConfigDto[]>> => {
    const configsFPDB = await FinishProtocolConfigModel.find()
      .populate({ path: 'organizer', select: ['name'] })
      .lean<TFinishProtocolConfigResponseDB[]>();

    const collator = new Intl.Collator('en', { sensitivity: 'base' });

    const configsFPAfterDto = finishProtocolConfigsDto(configsFPDB).sort((a, b) =>
      collator.compare(a.organizerName, b.organizerName)
    );

    return {
      data: configsFPAfterDto,
      message: 'Все конфигурации финишных протоколов.',
    };
  };

  /**
   * Создание конфигурации.
   */
  public post = async ({
    organizer,
    name,
    displayName,
    description,
    isDefault,
  }: TFinishProtocolParamsPost): Promise<TResponseService<null>> => {
    // Проверка на существование Организатора с _id: organizer.
    const { organizerName } = await this.checkExistenceOrganizer(organizer);

    // Проверка на дублирование пары Организатор-Название конфига.
    await this.checkDuplicateName({ organizer, name });

    await FinishProtocolConfigModel.create({
      organizer,
      name,
      displayName,
      description,
      isDefault,
    });

    return {
      data: null,
      message: `Создано имя (объект) конфигурации финишного протокола для организатора "${organizerName}"`,
    };
  };

  /**
   * Обновление конфигурации.
   */
  public put = async ({
    configFPId,
    organizer,
    name,
    displayName,
    description,
    isDefault,
  }: TFinishProtocolParamsPut): Promise<TResponseService<null>> => {
    // Проверка на существование Организатора с _id: organizer.
    const { organizerName } = await this.checkExistenceOrganizer(organizer);

    const finishProtocol = await FinishProtocolConfigModel.findOneAndUpdate(
      { _id: configFPId },
      {
        organizer,
        name,
        displayName,
        description,
        isDefault,
      }
    );

    if (!finishProtocol) {
      throw new Error(
        `Не найдена обновляемая конфигурация финишного протокола с _id: "${configFPId}"`
      );
    }

    return {
      data: null,
      message: `Обновлены данные конфигурации финишного протокола с названием: "${name}" для организатора "${organizerName}"`,
    };
  };

  /**
   * Удаление конфигурации.
   */
  public delete = async (configFPId: string): Promise<TResponseService<null>> => {
    const finishProtocol = await FinishProtocolConfigModel.findOneAndDelete(
      {
        _id: configFPId,
      },
      { _id: false, name: true }
    )
      .populate({ path: 'organizer', select: ['name', '-_id'] })
      .lean<{ name: string; organizer: { name: string } }>();

    if (!finishProtocol) {
      throw new Error(
        `Не найдена удаляемая конфигурация финишного протокола с _id: "${configFPId}"`
      );
    }

    return {
      data: null,
      message: `Удалена конфигурация финишного протокола с названием: "${finishProtocol.name}" организатора "${finishProtocol.organizer.name}"`,
    };
  };

  /**
   * Проверка на дублирование пары Организатор-Название конфига.
   */
  private checkDuplicateName = async ({
    name,
    organizer,
  }: {
    name: string;
    organizer: string;
  }): Promise<void> => {
    // Проверка на дублирование пары Организатор-Название конфига.
    const checkedName = await FinishProtocolConfigModel.findOne(
      { organizer, name },
      { _id: true }
    ).lean();

    if (checkedName) {
      throw new Error(
        `У данного организатора с _id: "${organizer}" уже есть конфигурация с названием: "${name}"`
      );
    }
  };

  /**
   * Проверка на дублирование пары Организатор-Название конфига.
   */
  private checkExistenceOrganizer = async (
    organizer: string
  ): Promise<{ organizerName: string }> => {
    const organizerDB = await Organizer.findOne(
      { _id: organizer },
      { name: true, _id: false }
    ).lean<{ name: string }>();

    if (!organizerDB) {
      throw new Error(
        `Не найден Организатор с _id: "${organizer}" для которого создается Имя конфигурации финишного протокола!`
      );
    }

    return { organizerName: organizerDB.name };
  };
}
