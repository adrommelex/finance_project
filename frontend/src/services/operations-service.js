import {HttpUtils} from "../utils/http-utils";

export class OperationsService {
   // 1. Получение операций

  static async getOperations(period, dateFrom = null, dateTo = null) {
    let url = `/operations?period=${period}`;
    if (period === 'interval' && dateFrom && dateTo) {
      url += `&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    }

    const result = await HttpUtils.request(url);
    const returnObject = { error: false, redirect: null, operations: null };

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при запросе операций.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.operations = result.response;
    return returnObject;
  }

   // 2. Получение одной операции

  static async getOperation(id) {
    const result = await HttpUtils.request('/operations/' + id);
    const returnObject = { error: false, redirect: null, operation: null };

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при запросе данных операции.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.operation = result.response;
    return returnObject;
  }

   // 3. Создание операции

  static async createOperation(data) {
    const result = await HttpUtils.request('/operations', 'POST', true, data);
    const returnObject = { error: false, redirect: null, operation: null };

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при создании операции.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.operation = result.response;
    return returnObject;
  }


  // 4. Обновление операции

  static async updateOperation(id, data) {
    const result = await HttpUtils.request('/operations/' + id, 'PUT', true, data);
    const returnObject = { error: false, redirect: null };

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при обновлении операции.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    return returnObject;
  }

  // 5. Удаление операции

  static async deleteOperation(id) {
    const result = await HttpUtils.request('/operations/' + id, 'DELETE');
    const returnObject = { error: false, redirect: null };

    if (result.redirect || result.error || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при удалении операции.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    return returnObject;
  }
}