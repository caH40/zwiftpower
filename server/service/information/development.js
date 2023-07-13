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
