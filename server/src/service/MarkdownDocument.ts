import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// types
import { TDocumentationTypes } from '../types/types.interface';

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

  /**
   * Получение документа.
   */
  async get({
    type,
    fileName,
  }: {
    type: TDocumentationTypes;
    fileName: string;
  }): Promise<{ data: { fileName: string; content: string }; message: string }> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Корень проекта — на два уровня выше build/service
    const projectRoot = path.resolve(__dirname, '../../..');

    const fileDir = path.join(projectRoot, 'doc', type, fileName);

    await this.fileAccess(fileDir, fileName);

    const content = await fs.readFile(fileDir, 'utf-8');

    return {
      data: { fileName, content },
      message: `Содержание файла ${fileName}`,
    };
  }

  /**
   * Проверка существования (доступности) файла.
   */
  private async fileAccess(filePath: string, fileName: string) {
    try {
      await fs.access(filePath);
    } catch (error) {
      throw new Error(`Файл не найден: ${fileName}!`);
    }
  }
}
