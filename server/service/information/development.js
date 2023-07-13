import { InfoDevelopment } from '../../Model/InfoDevelopment.js';

export async function postDevelopmentService(releaseData, userId) {
  try {
    const body = {
      releaseDate: releaseData.releaseDate,
      version: releaseData.version,
      postDate: Date.now(),
      text: releaseData.description,
      isFromGitHubActions: releaseData.isFromGitHubActions,
      userPost: userId,
    };
    await InfoDevelopment.create(body);

    return { message: 'Данные релиза сохранены в БД' };
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
