import path from 'path';
import fs from 'fs';

import { getMetaTags } from './handler.js';

const __dirname = path.resolve();

/**
 * Добавление в index.html meta tags для соответствующих страниц
 * url - url после доменного имени
 * возвращает html файл в ut8 кодировке
 */
export const setMetaTags = (url: string): string => {
  const { title, canonical, description, image } = getMetaTags(url);

  // путь до index.html в Билде
  const filePath = path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html');

  // получение файла в переменную htmlContent
  let htmlContent = fs.readFileSync(filePath, 'utf8');

  htmlContent = htmlContent.replace(
    /<head>/,
    `<head>
    <title>${title}</title>
    <meta name="description" content="${description}" >
    <link rel="canonical" href="${canonical}" >
    <meta property="og:title" content="${title}" >
    <meta property="og:description" content="${description}" >
    <meta property="og:url" content="${canonical}" >
    <meta property="og:image" content="${image}" >`
  );

  return htmlContent;
};

// если есть соответствующие метатеги в index.html то снять комментарий
// htmlContent = htmlContent.replace(/<title>.*/, '');
// htmlContent = htmlContent.replace(/<meta\s+name="description".*/, '');
// htmlContent = htmlContent.replace(/<link\s+rel="canonical".*/, '');
// htmlContent = htmlContent.replace(/<meta\s+property="og:title".*/, '');
// htmlContent = htmlContent.replace(/<meta\s+property="og:description".*/, '');
// htmlContent = htmlContent.replace(/<meta\s+property="og:url".*/, '');
// htmlContent = htmlContent.replace(/<meta\s+property="og:image".*/, '');
