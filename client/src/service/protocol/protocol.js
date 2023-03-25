import { uploadFile } from '../upload-file';

import { getResults } from './results';

export async function uploadProtocol(file) {
  try {
    const { resultJson, fileAttributes } = await uploadFile(file);
    const results = getResults(resultJson);
    return { results, fileAttributes };
  } catch (error) {
    console.log(error); // eslint-disable-line
    throw error;
  }
}
