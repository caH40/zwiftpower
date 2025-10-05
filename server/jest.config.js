export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Искать тесты только в src и его подпапках
  roots: ['<rootDir>/src'],
  // Игнорировать build и node_modules
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  // Явно указать паттерн для тестовых файлов
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
};
