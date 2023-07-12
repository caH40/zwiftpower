import { InfoDevelopment } from '../../Model/InfoDevelopment.js';

export async function postDevelopmentService(releaseData, userId) {
  try {
    const body = {
      release: releaseData.release,
      version: releaseData.version,
      post: Date.now(),
      text: releaseData.text,
      isFromGitHubActions: releaseData.isFromGitHubActions,
      userPost: userId,
    };
    await InfoDevelopment.create(body);

    return { message: 'Данные релиза сохранены в БД' };
  } catch (error) {
    throw error;
  }
}
