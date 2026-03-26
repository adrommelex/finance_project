import {AuthUtils} from "./auth-utils";
import config from "../config/config";

export class HttpUtils {
  static refreshPromise = null;

  static async request(url, method = "GET", useAuth = true, body = null) {

    const result = {
      error: false,
      response: null
    };

    const params = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    };
    let token = useAuth ? AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) : null;
    if (token) {
      params.headers['x-auth-token'] = token;
    }

    if (body) {
      params.body = JSON.stringify(body);
    }

    try {
      let response = await fetch(config.api + url, params);

      if (response.status === 401 && useAuth) {
        if (!token) {
          return { error: true, redirect: '/login' };
        }

        if (!this.refreshPromise) {
          this.refreshPromise = AuthUtils.updateRefreshToken();
        }

        const updateTokenResult = await this.refreshPromise;

        this.refreshPromise = null;

        if (updateTokenResult) {
          return await this.request(url, method, useAuth, body);
        } else {
          return { error: true, redirect: '/login' };
        }
      }

      if (response.status < 200 || response.status >= 300) {
        result.error = true;
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        result.response = await response.json();
      }

    } catch (e) {
      result.error = true;
      return result;
    }

    return result;
  }
}