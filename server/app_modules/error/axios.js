export function errorAxios(error, functionName = '') {
  if (error.response) {
    // Запрос был сделан, и сервер ответил кодом состояния, который
    // выходит за пределы 2xx
    console.log(new Date().toLocaleString());
    console.log(error.response.data);
    console.log({ status: error.response.status });
    // console.log(error.response.headers);
  } else if (error.request) {
    // Запрос был сделан, но ответ не получен
    // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр
    // http.ClientRequest в node.js
    console.log(error.request);
  } else {
    // Произошло что-то при настройке запроса, вызвавшее ошибку
    console.log('Error', error.message);
  }
  throw { message: error.response.data.message, functionName };
}
