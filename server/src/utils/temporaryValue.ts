import crypto from 'crypto';

/**
 * Генерация временного username, пароля и email.
 */
export function generateTemporaryValue(prefix: string): string {
  return `${prefix}_${crypto.randomBytes(8).toString('hex')}`; // vk_3b1f29d9c7f2
}
