import { postDevelopmentService } from '../service/information/development.js';

export async function getDevelopment() {
  try {
    const x = await getDevelopmentService();
    res.status(200).json(x);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function postDevelopment() {
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
export async function putDevelopment() {
  try {
    const x = await putDevelopmentService();
    res.status(200).json(x);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
export async function deleteDevelopment() {
  try {
    const x = await deleteDevelopmentService();
    res.status(200).json(x);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(error.response ? { message: error.response?.data } : { message: error.message });
  }
}
