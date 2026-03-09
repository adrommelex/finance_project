import "./styles/styles.scss";
import {Router} from "./router";

class App {
  constructor() {
    this._fixBootstrapModals();
    new Router();
  }

  // Метод для устранения конфликта aria-hidden и фокуса
  _fixBootstrapModals() {
    window.addEventListener('hide.bs.modal', (event) => {
      event.target.setAttribute('inert', '');
    });

    window.addEventListener('show.bs.modal', (event) => {
      event.target.removeAttribute('inert');
    });
  }
}

(new App());