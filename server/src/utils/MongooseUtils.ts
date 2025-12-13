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

  /**
   * Преобразует объект Date в строку формата MongoDB для поля eventStart.
   *
   * MongoDB у тебя хранит даты как строки вида "YYYY-MM-DDTHH:mm:ss.sss+0000".
   * Этот метод:
   *  - Берет объект Date
   *  - Преобразует его в ISO-строку
   *  - Заменяет суффикс 'Z' на '+0000', чтобы соответствовать формату в базе
   *
   * @param date Объект Date для преобразования
   * @returns Строка в формате "YYYY-MM-DDTHH:mm:ss.sss+0000"
   */
  toMongoEventString(date: Date) {
    return date.toISOString().replace('Z', '+0000');
  }
}
