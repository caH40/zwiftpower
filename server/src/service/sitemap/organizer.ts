import { Organizer } from '../../Model/Organizer.js';
import { handleAndLogError } from '../../errors/error.js';

/**
 * Создание url для страницы профайла райдера с Racing Score.
 */
export async function getUrlsOrganizerPublic(): Promise<string | null> {
  try {
    const organizersDB = await Organizer.find(
      { isPublished: true },
      {
        urlSlug: true,
        _id: false,
      }
    ).lean<{ urlSlug: string }[]>();

    const urlsResults = organizersDB.map(({ urlSlug }) => {
      return `
<url>
  <loc>https://zwiftpower.ru/organizers/${urlSlug}</loc>
  <priority>0.5</priority>
  <changefreq>monthly</changefreq>
</url>`;
    });

    return urlsResults.join('');
  } catch (error) {
    handleAndLogError(error);
    return null;
  }
}
