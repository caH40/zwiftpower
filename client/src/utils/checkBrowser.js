/**
 * Проверка что браузер Safari
 * @returns boolean
 */
export function isSafari() {
  const ua = navigator.userAgent;

  return (
    ua.includes('Safari') &&
    !ua.includes('Chrome') &&
    !ua.includes('Chromium') &&
    !ua.includes('Android')
  );
}
