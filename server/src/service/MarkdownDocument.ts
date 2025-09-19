import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Класс работы с файлами документов markdown.
 */
export class MarkdownDocumentsService {
  /**
   * Список названий файлов и заголовков.
   */
  async getList(
    type: 'development' | 'public' | 'organizer'
  ): Promise<{ data: { fileName: string; title: string }[]; message: string }> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Корень проекта — на два уровня выше build/service
    const projectRoot = path.resolve(__dirname, '../../..');

    const docsDir = path.join(projectRoot, 'doc', type);

    const files = await fs.readdir(docsDir);

    const result = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(docsDir, file), 'utf-8');
        const title = content.match(/^#\s+(.*)/m)?.[1] || file;
        return { fileName: file, title };
      })
    );

    return {
      data: result,
      message: `Список документов для ${type}`,
    };
  }
}
