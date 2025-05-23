import path from 'path';
import fs from 'fs';

import { getMetaTags } from './handler.js';
import { handleAndLogError } from '../errors/error.js';

const __dirname = path.resolve();

/**
 * Добавление в index.html meta tags для соответствующих страниц
 * url - url после доменного имени
 * возвращает html файл в ut8 кодировке
 */
export const setMetaTags = async (url: string): Promise<string> => {
  try {
    const { title, canonical, description, image, recommendationsTag } = await getMetaTags(url);

    // путь до index.html в Билде
    const filePath = path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html');

    // получение файла в переменную htmlContent
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    htmlContent = htmlContent.replace(
      /<meta charset="utf-8">/,
      `<meta charset="utf-8">
  <title>${title}</title>
  <meta name="description" content="${description}" data-rh="true" >
  <link rel="canonical" href="${canonical}" data-rh="true" >
  <meta property="og:title" content="${title}" data-rh="true" >
  <meta property="og:description" content="${description}" data-rh="true" >
  <meta property="og:url" content="${canonical}" data-rh="true" >
  <meta property="og:image" content="${image}" data-rh="true" >
  <meta property="yandex_recommendations_tag" content="${recommendationsTag}" data-rh="true" >`
    );

    return htmlContent;
  } catch (error) {
    handleAndLogError(error);
    return htmlError(error, url);
  }
};

// При ошибке возвращается html с описанием ошибки.
function htmlError(error: unknown, url: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Error</title>
  </head>
<body>
  <div id="root"><p>${JSON.stringify(error, null, 2)}</p><p>Запрашиваемый url: ${url}</p></div>
</body>
</html>
`;
}
