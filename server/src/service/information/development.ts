import { InfoDevelopment } from '../../Model/InfoDevelopment.js';
import { errorHandler } from '../../errors/error.js';

// types
import { PostDevelopment } from '../../types/http.interface.js';
import { InfoDevelopmentSchema } from '../../types/model.interface.js';

export async function postDevelopmentService(releaseData: PostDevelopment, userId: string) {
  try {
    const body = {
      releaseDate: releaseData.releaseDate,
      version: releaseData.version,
      postDate: Date.now(),
      text: releaseData.text,
      isFromGitHubActions: releaseData.isFromGitHubActions,
      userPost: userId,
    };
    const infoDevelopmentDB = await InfoDevelopment.create(body);

    return {
      infoDevelopment: infoDevelopmentDB,
      message: 'Информация о релизе сохранена в БД',
    };
  } catch (error) {
    errorHandler(error);
  }
}
//
//
export async function getDevelopmentService() {
  try {
    const informationDev = await InfoDevelopment.find();
    informationDev.sort((a, b) => b.releaseDate - a.releaseDate);
    return { informationDev };
  } catch (error) {
    errorHandler(error);
  }
}
//
//
export async function deleteDevelopmentService(id: string) {
  try {
    const informationDev = await InfoDevelopment.findOneAndDelete({ _id: id });
    if (!informationDev) {
      throw new Error('Релиз не найден в БД');
    }
    return { message: `Релиз "${informationDev.text}" удалён!` };
  } catch (error) {
    errorHandler(error);
  }
}
//
//
export async function putDevelopmentService(
  releaseData: InfoDevelopmentSchema,
  userId: string
) {
  try {
    const body = {
      releaseDate: releaseData.releaseDate,
      version: releaseData.version,
      updateDate: Date.now(),
      text: releaseData.text,
      userEdit: userId,
    };

    const infoDevelopmentDB = await InfoDevelopment.findOneAndUpdate(
      { _id: releaseData._id },
      body
    );
    if (!infoDevelopmentDB) throw { message: 'Релиз не найден' };

    return { message: 'Изменение информации о релизе сохранены в БД' };
  } catch (error) {
    errorHandler(error);
  }
}
