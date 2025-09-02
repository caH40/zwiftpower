/**
 * В TypeScript с Express расширение Request под свои поля делается через декларативное
 * объединение типов (declaration merging).
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      zwiftId: string;
      role: string;
    };
  }
}
