import {HttpUtils} from "../utils/http-utils";

export class CategoriesService {

  static getTypeName(type) {
    return type === 'income' ? 'доходов' : 'расходов';
  }

  static async getCategories(type) {
    const returnObject = { error: false, redirect: null, categories: null };
    const result = await HttpUtils.request(`/categories/${type}`);

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = `Возникла ошибка при запросе категорий ${this.getTypeName(type)}.`;
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.categories = result.response;
    return returnObject;
  }

  static async getCategory(type, id) {
    const returnObject = { error: false, redirect: null, category: null };
    const result = await HttpUtils.request(`/categories/${type}/${id}`);

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при запросе категории.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.category = result.response;
    return returnObject;
  }

  static async createCategory(type, title) {
    const returnObject = { error: false, redirect: null, id: null };
    const result = await HttpUtils.request(`/categories/${type}`, 'POST', true, { title });

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = `Возникла ошибка при создании категории ${this.getTypeName(type)}.`;
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    returnObject.id = result.response.id;
    return returnObject;
  }

  static async updateCategory(type, id, title) {
    const returnObject = { error: false, redirect: null };
    const result = await HttpUtils.request(`/categories/${type}/${id}`, 'PUT', true, { title });

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при редактировании категории.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    return returnObject;
  }

  static async deleteCategory(type, id) {
    const returnObject = { error: false, redirect: null };
    const result = await HttpUtils.request(`/categories/${type}/${id}`, 'DELETE', true);

    if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
      returnObject.error = 'Возникла ошибка при удалении категории.';
      if (result.redirect) returnObject.redirect = result.redirect;
      return returnObject;
    }

    return returnObject;
  }
}