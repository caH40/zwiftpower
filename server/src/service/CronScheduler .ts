import cron, { ScheduledTask } from 'node-cron';

/**
 * Класс запуска задач по расписанию.
 */

type TTask = {
  name: string;
  cronTime: string; // Строка cron расписания.
  job: () => Promise<void> | void;
  options?: { timezone?: string };
};

export class CronScheduler {
  private tasks: Map<string, ScheduledTask> = new Map();

  add({ name, cronTime, job, options }: TTask): void {
    if (this.tasks.has(name)) {
      throw new Error(`Задача "${name}" уже существует!`);
    }

    try {
      const task = cron.schedule(
        cronTime,
        async () => {
          try {
            console.log(`Запуск задачи: ${name}`); // eslint-disable-line
            await job();
          } catch (error) {
            console.error(`Ошибка в задаче ${name}:`, error); // eslint-disable-line
          }
        },
        {
          timezone: 'Europe/Moscow',
          ...options,
        }
      );

      this.tasks.set(name, task);
    } catch (error) {
      console.error(`Ошибка для задачи "${name}":`, error);
    }
  }

  start(name: string): void {
    const task = this.tasks.get(name);
    if (!task) {
      throw new Error(`Не найдена задача "${name}"!`);
    }
    task.start();
  }

  stop(name: string): void {
    const task = this.tasks.get(name);
    if (!task) {
      throw new Error(`Не найдена задача "${name}"!`);
    }
    task.stop();
  }

  destroy(name: string): void {
    const task = this.tasks.get(name);
    if (!task) {
      throw new Error(`Не найдена задача "${name}"!`);
    }
    task.destroy();
    this.tasks.delete(name);
  }

  stopAll(): void {
    for (const task of this.tasks.values()) {
      task.stop();
    }
  }

  destroyAll(): void {
    for (const [name, task] of this.tasks.entries()) {
      task.destroy();
      this.tasks.delete(name);
    }
  }

  getTaskNames(): string[] {
    return Array.from(this.tasks.keys());
  }
}

/**
 * cron schedule
 * ┌────────────── second (optional)
 * │ ┌──────────── minute
 * │ │ ┌────────── hour
 * │ │ │ ┌──────── day of month
 * │ │ │ │ ┌────── month
 * │ │ │ │ │ ┌──── day of week
 * │ │ │ │ │ │
 * │ │ │ │ │ │
 * * * * * * *
 *
 * field	value
 * second	0-59
 * minute	0-59
 * hour	0-23
 * day of month	1-31
 * month	1-12 (or names)
 * day of week	0-7 (or names, 0 or 7 are sunda
 * Using Multiple Values, Runs at minutes 1, 2, 4, and 5 of every hour, '1,2,4,5 * * * *'
 * Using Ranges, '1-5 * * * *' , Runs every minute from minute 1 to minute 5 (inclusive) of every hour
 *  Using Step Values, '*n/2 * * * *' , Runs every 2 minutes (even minutes: 0, 2, 4, ...), Steps are defined using a slash (/) after a range or a wildcard
 */
