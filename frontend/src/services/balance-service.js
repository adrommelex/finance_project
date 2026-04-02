import {HttpUtils} from "../utils/http-utils";

export class BalanceService {
  static async getBalance() {
    const result = await HttpUtils.request('/balance');
    if (result.error || !result.response || result.response.error) {
      return null;
    }
    return result.response.balance;
  }

  static async updateBalance(newBalance) {
    const result = await HttpUtils.request('/balance', 'PUT', true, {
      newBalance: Number(newBalance)
    });

    if (result.error || result.response.error) {
      return null;
    }
    return result.response.balance;
  }
}