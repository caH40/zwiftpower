import { InfoDevelopment } from '../../Model/InfoDevelopment.js';

export async function postDevelopmentService(releaseData, userId) {
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
    throw error;
  }
}
export async function getDevelopmentService() {
  try {
    const informationDev = await InfoDevelopment.find();
    informationDev.sort((a, b) => b.releaseDate - a.releaseDate);
    return { informationDev };
  } catch (error) {
    throw error;
  }
}
export async function deleteDevelopmentService(id) {
  try {
    const informationDev = await InfoDevelopment.findOneAndDelete({ _id: id });
    return { message: `Релиз "${informationDev.text}" удалён!` };
  } catch (error) {
    throw error;
  }
}
export async function putDevelopmentService(releaseData, userId) {
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
    throw error;
  }
}
