import { getSeriesActualService } from '../service/series.js';
import { getLogsAdminsService } from '../service/log.js';
import { updateZwiftIdService } from '../service/user.js';

export async function getSeriesActual(req, res) {
  try {
    const series = await getSeriesActualService();
    return res.status(200).json(series);
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
//
// запрос логов по действиям админов(модераторов)
export async function getLogsAdmins(req, res) {
  try {
    const query = req.query;

    const logs = await getLogsAdminsService(query);

    return res.status(200).json(logs);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
//
// обновление zwiftId у пользователя
export async function putUserZwiftId(req, res) {
  try {
    const { userId } = req.params;
    const { zwiftId } = req.body;
    const user = await updateZwiftIdService(userId, zwiftId);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
