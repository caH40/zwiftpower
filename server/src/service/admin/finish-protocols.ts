import { finishProtocolConfigsDto } from '../../dto/finish-protocol.js';
import { FinishProtocolConfigModel } from '../../Model/FinishProtocolConfig.js';
import { Organizer } from '../../Model/Organizer.js';

// types
import { TFinishProtocolConfigDto } from '../../types/dto.interface.js';
import { TResponseService } from '../../types/http.interface.js';
import { TFinishProtocolConfig } from '../../types/model.interface.js';
import {
  TFinishProtocolParamsPost,
  TFinishProtocolParamsPut,
} from '../../types/types.interface.js';

/**
 * Класс работы с именами (объектами) конфигураций финишного протокола.
 */
export class FinishProtocol {
  constructor() {}

  /**
   * Получение всех конфигурации.
   */
  public getAll = async (): Promise<TResponseService<TFinishProtocolConfigDto[]>> => {
    const configsFPDB = await FinishProtocolConfigModel.find().lean<TFinishProtocolConfig[]>();

    const configsFPAfterDto = finishProtocolConfigsDto(configsFPDB);

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
    protocolId,
    organizer,
    name,
    displayName,
    description,
    isDefault,
  }: TFinishProtocolParamsPut): Promise<TResponseService<null>> => {
    // Проверка на существование Организатора с _id: organizer.
    const { organizerName } = await this.checkExistenceOrganizer(organizer);

    // Проверка на дублирование пары Организатор-Название конфига.
    await this.checkDuplicateName({ organizer, name });

    const finishProtocol = await FinishProtocolConfigModel.findOneAndUpdate(
      { _id: protocolId },
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
        `Не найден обновляемая конфигурация финишного протокола с _id: "${protocolId}"`
      );
    }

    return {
      data: null,
      message: `Создано имя (объект) конфигурации финишного протокола для организатора "${organizerName}"`,
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
