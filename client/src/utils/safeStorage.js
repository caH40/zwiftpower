/**
 * Безопасный доступ к localStorage.
 *
 * Если в браузере отключены cookie/данные сайтов, включён приватный режим или
 * вебвью запрещает хранилище, обращение к `window.localStorage` бросает
 * SecurityError — из-за этого падала инициализация бандла (белый экран).
 *
 * При импорте модуль подменяет недоступное хранилище реализацией в памяти,
 * поэтому остальному коду менять ничего не нужно.
 */

const PROBE_KEY = '__zp_storage_probe__';

// Итог проверки доступности: null — ещё не проверяли.
let storageAvailable = null;

const memoryStore = new Map();

/** Копия API Storage поверх Map. */
const memoryStorage = {
  get length() {
    return memoryStore.size;
  },
  key: (index) => Array.from(memoryStore.keys())[index] ?? null,
  getItem: (key) => (memoryStore.has(String(key)) ? memoryStore.get(String(key)) : null),
  setItem: (key, value) => {
    memoryStore.set(String(key), String(value));
  },
  removeItem: (key) => {
    memoryStore.delete(String(key));
  },
  clear: () => {
    memoryStore.clear();
  },
};

/**
 * Проверяет, что localStorage доступен для чтения и записи. Результат кешируется.
 * @returns {boolean}
 */
export function isStorageAvailable() {
  if (storageAvailable !== null) {
    return storageAvailable;
  }

  try {
    window.localStorage.setItem(PROBE_KEY, PROBE_KEY);
    window.localStorage.removeItem(PROBE_KEY);
    storageAvailable = true;
  } catch (error) {
    storageAvailable = false;
  }

  return storageAvailable;
}

/** Чтение строки. Не бросает. */
export function getItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return memoryStorage.getItem(key);
  }
}

/** Запись строки. Не бросает. */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    memoryStorage.setItem(key, value);
  }
}

/** Удаление ключа. Не бросает. */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    memoryStorage.removeItem(key);
  }
}

/**
 * Чтение JSON. Битые данные в хранилище не роняют приложение.
 * @param {string} key
 * @param {*} [fallback=null]
 */
export function getJSON(key, fallback = null) {
  const raw = getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

/** Запись JSON. Не бросает. */
export function setJSON(key, value) {
  try {
    setItem(key, JSON.stringify(value));
  } catch (error) {
    // сериализация не удалась — молча пропускаем
  }
}

// Устанавливаем подмену сразу при импорте: до первых обращений в других модулях.
if (!isStorageAvailable()) {
  try {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get: () => memoryStorage,
    });
  } catch (error) {
    console.warn('Не удалось подменить localStorage', error); // eslint-disable-line no-console
  }
}
