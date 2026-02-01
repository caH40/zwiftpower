/**
 * Проверка что браузер Safari
 * @returns boolean
 */
export function isSafari() {
  const ua = navigator.userAgent;
  console.log(ua);

  return (
    ua.includes('Safari') &&
    !ua.includes('Chrome') &&
    !ua.includes('Chromium') &&
    !ua.includes('Android')
  );
}
