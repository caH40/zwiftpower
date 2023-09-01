import { Result } from '../Model/Result.js';

async function changeSprints(stageId, quantitySprintsNew, quantitySprintsOld) {
  let difference = quantitySprintsNew - quantitySprintsOld;
  //увеличение количества спринтов
  if (difference > 0) {
    const sprints = [];
    for (
      let sprintNumber = quantitySprintsOld + 1;
      sprintNumber <= quantitySprintsNew;
      sprintNumber++
    ) {
      sprints.push({
        sprint: sprintNumber,
        place: 'none',
      });
    }
    await Result.updateMany(
      { stageId },
      {
        $push: {
          pointsSprint: { $each: sprints },
        },
      }
    );
  }
  //уменьшение количества спринтов
  if (difference < 0 && quantitySprintsNew != 0) {
    await Result.updateMany(
      { stageId },
      {
        $push: {
          pointsSprint: { $each: [], $slice: quantitySprintsNew },
        },
      }
    );
  }
  //полная очистка спринтов
  if (difference !== 0 && quantitySprintsNew == 0) {
    await Result.updateMany(
      { stageId },
      {
        pointsSprint: [],
      }
    );
  }
}

async function changeMountains(stageId, quantityMountainsNew, quantityMountainsOld) {
  let difference = quantityMountainsNew - quantityMountainsOld;
  //увеличение количества спринтов
  if (difference > 0) {
    const mountains = [];
    for (
      let mountainNumber = quantityMountainsOld + 1;
      mountainNumber <= quantityMountainsNew;
      mountainNumber++
    ) {
      mountains.push({
        mountain: mountainNumber,
        place: 'none',
      });
    }
    await Result.updateMany(
      { stageId },
      {
        $push: {
          pointsMountain: { $each: mountains },
        },
      }
    );
  }
  //уменьшение количества спринтов
  if (difference < 0 && quantityMountainsNew != 0) {
    await Result.updateMany(
      { stageId },
      {
        $push: {
          pointsMountain: { $each: [], $slice: quantityMountainsNew },
        },
      }
    );
  }
  //полная очистка спринтов
  if (difference !== 0 && quantityMountainsNew == 0) {
    await Result.updateMany(
      { stageId },
      {
        pointsMountain: [],
      }
    );
  }
}
