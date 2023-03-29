export function checkFilename(filename) {
  if (filename.includes('_Stage-') && filename.includes('.')) return true;
  return false;
}
