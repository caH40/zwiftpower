import {
  getDevelopmentService,
  postDevelopmentService,
  deleteDevelopmentService,
  putDevelopmentService,
} from '../service/information/development.js';

export async function getDevelopment(req, res) {
  try {
    const informationDev = await getDevelopmentService();
    res.status(200).json(informationDev);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function postDevelopment(req, res) {
  try {
    const { releaseData } = req.body;
    const { userId } = req.params;

    const response = await postDevelopmentService(releaseData, userId);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function putDevelopment(req, res) {
  try {
    const { releaseData } = req.body;
    const { userId } = req.params;
    const response = await putDevelopmentService(releaseData, userId);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function deleteDevelopment(req, res) {
  try {
    const { id } = req.body;
    const response = await deleteDevelopmentService(id);
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
