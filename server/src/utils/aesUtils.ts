import crypto from 'crypto';

import { aesSecretKey } from '../config/environment.js';

const algorithm = 'aes-256-cbc';
const ivLength = 16; // Длина IV (Initialization Vector)

// Генерация случайного IV.
function generateIv(): Buffer {
  return crypto.randomBytes(ivLength);
}

// Функция шифрования
export function encrypt(text: string): { encryptedData: string; iv: string } {
  const iv = generateIv();
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(aesSecretKey), iv);

  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'), // Сохраняем IV отдельно
  };
}

// Функция дешифрования
export function decrypt(encryptedData: string, iv: string): string {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(aesSecretKey),
    Buffer.from(iv, 'hex')
  );

  let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}
