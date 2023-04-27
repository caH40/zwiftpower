import { Result } from '../../Model/Result.js';
import { Series } from '../../Model/Series.js';
import { Stage } from '../../Model/Stage.js';
import { prepareResult } from '../preparation/result.js';

export async function postResultsService(results) {
  try {
    const seriesName = results.fileAttributes.name.split('_')[0];
    const stageNumber = results.fileAttributes.name.split('_Stage-')[1].split('.')[0];

    const seriesDB = await Series.findOne({ name: seriesName });
    if (!seriesDB._id) throw { message: wrongName };

    const stageDB = await Stage.findOne({ seriesId: seriesDB._id, number: stageNumber });
    if (!stageDB._id) throw { message: wrongName };
    if (stageDB.hasResults) throw { message: existsResults };

    for (let result of results.results) {
      result = await prepareResult(result, stageDB, seriesDB);
      const resultsDB = await Result.create({ stageId: stageDB._id, ...result }).catch(
        (error) => {
          throw { message: fault };
        }
      );
    }

    await Stage.findOneAndUpdate(
      { seriesId: seriesDB._id, number: stageNumber },
      { $set: { hasResults: true } }
    );

    return {
      message: 'Протокол с результатами сохранён!',
      ids: { stageId: stageDB._id, seriesId: seriesDB._id },
    };
  } catch (error) {
    throw error;
  }
}

//сообщения о ошибках
const wrongName = 'Не найдена Series, проверьте правильность наименования файла!';
const existsResults = 'Результаты данного этапа уже есть на сервере!';
const fault = 'Ошибка при сохранении некоторых результатов.';
