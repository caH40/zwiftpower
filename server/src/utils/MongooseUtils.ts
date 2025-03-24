import mongoose from 'mongoose';

/**
 * Утилиты работы с данными MongoDB через библиотеку mongoose.
 */
export class MongooseUtils {
  constructor() {}

  /**
   * Проверка, что строка является валидной для преобразования в ObjectId.
   */
  checkValidObjectId(str: string): boolean {
    return mongoose.isValidObjectId(str);
  }

  /**
   * Изменение типа входного параметра со строки на ObjectId.
   */
  convertToObjectId(str: string): mongoose.Types.ObjectId | void {
    if (!this.checkValidObjectId(str)) {
      throw new Error(`Переменная: ${str} не является валидным типом ObjectId!`);
    }

    return new mongoose.Types.ObjectId(str);
  }
}
