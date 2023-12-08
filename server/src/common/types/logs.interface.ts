import { LogsErrorSchema } from '../../types/model.interface.js';

/**
 * Логи по действиям админов(модераторов)
 */
export interface LogsFetch {
  logs: {
    userId: { username: string };
    date: number;
    description: string;
    event: {
      id: number;
      name: string;
      start: number;
    };
  }[];
  quantityPages: number;
  page: number;
  message: string;
}
/**
 * Логи по Ошибкам на сервере
 */
export interface LogsErrorFetch {
  logs: LogsErrorSchema[];
  quantityPages: number;
  page: number;
  message: string;
}
