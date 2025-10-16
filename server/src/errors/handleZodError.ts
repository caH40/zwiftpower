import { SafeParseReturnType } from 'zod';

export function handleZodError<T>(
  parsedResult: SafeParseReturnType<unknown, T>
): string | null {
  if (!parsedResult.success) {
    const errorMessages = parsedResult.error.issues
      .map((issue) => {
        const field = issue.path[0];
        return `Поле "${field}": ${issue.message}`;
      })
      .join('\n');

    return errorMessages;
  }

  return null;
}
