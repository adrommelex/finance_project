import {HttpUtils} from "../utils/http-utils";

export class IncomesService {

  static async getCategories() {
    const returnObject = { error: false, redirect: null, categories: null };
    const result = await HttpUtils.request('/categories/income');

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при запросе категорий доходов.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.categories = result.response;
    return returnObject;
  }

  static async getCategory(id) {
    const returnObject = { error: false, redirect: null, category: null };
    const result = await HttpUtils.request('/categories/income/' + id);

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при запросе категории.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.category = result.response;
    return returnObject;
  }

  static async createCategory(title) {
    const returnObject = { error: false, redirect: null, id: null };
    const result = await HttpUtils.request('/categories/income', 'POST', true, { title });

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при создании категории.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.id = result.response.id;
    return returnObject;
  }

  static async updateCategory(id, title) {
    const returnObject = { error: false, redirect: null };
    const result = await HttpUtils.request('/categories/income/' + id, 'PUT', true, { title });

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при редактировании категории.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    return returnObject;
  }

  static async deleteCategory(id) {
    const returnObject = { error: false, redirect: null };
    const result = await HttpUtils.request('/categories/income/' + id, 'DELETE', true);

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при удалении категории.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    return returnObject;
  }
}