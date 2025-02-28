import { FinishProtocolConfigModel } from '../../Model/FinishProtocolConfig.js';
import { Organizer } from '../../Model/Organizer.js';
import { TResponseService } from '../../types/http.interface.js';

/**
 * Класс работы с именами (объектами) конфигураций финишного протокола.
 */
export class FinishProtocol {
  constructor() {}

  public post = async ({
    organizer,
    name,
    displayName,
    description,
    isDefault,
  }: {
    organizer: string;
    name: string;
    displayName: string;
    description: string;
    isDefault: boolean;
  }): Promise<TResponseService<null>> => {
    const organizerDB = await Organizer.findOne(
      { _id: organizer },
      { name: true, _id: false }
    ).lean<{ name: string }>();

    if (!organizerDB) {
      throw new Error(
        `Не найден Организатор с _id: "${organizer}" для которого создается Имя конфигурации финишного протокола!`
      );
    }

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

    await FinishProtocolConfigModel.create({
      organizer,
      name,
      displayName,
      description,
      isDefault,
    });

    return {
      data: null,
      message: `Создано имя (объект) конфигурации финишного протокола для организатора "${organizerDB.name}"`,
    };
  };
}
