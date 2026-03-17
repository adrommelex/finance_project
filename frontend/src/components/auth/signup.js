import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";
import {ValidationUtils} from "../../utils/validation-utils";

export class Signup {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
      return this.openNewRoute('/');
    }

    this.findElements();
    this.validations = [
      { element: this.nameElement,
        errorElement: document.getElementById('name-error'),
        options: {pattern: /^[А-Я][а-яё\s]*$/}
      },
      { element: this.lastNameElement,
        errorElement: document.getElementById('last-name-error'),
        options: {pattern: /^[А-Я][а-яё\s]*$/}
      },
      {
        element: this.emailElement,
        errorElement: document.getElementById('email-error'),
        options: {pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}
      },
      {
        element: this.passwordElement,
        errorElement: document.getElementById('password-error'),
        options: {pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/}
      },
      {
        element: this.passwordRepeatElement,
        errorElement: document.getElementById('password-repeat-error'),
        options: {compareTo: null}
      },
    ];
    ValidationUtils.initInputHandlers(this.validations, this.commonErrorElement);

    document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
  }

  findElements() {
    this.nameElement = document.getElementById('name');
    this.lastNameElement = document.getElementById('last-name');
    this.emailElement = document.getElementById('email');
    this.passwordElement = document.getElementById('password');
    this.passwordRepeatElement = document.getElementById('password-repeat');
    this.commonErrorElement = document.getElementById('common-error');
  }

  async signUp() {
    this.commonErrorElement.style.display = 'none';

    for (let i = 0; i < this.validations.length; i++) {
      if (this.validations[i].element === this.passwordRepeatElement) {
        this.validations[i].options.compareTo = this.passwordElement.value;
      }
    }

    if (ValidationUtils.validateForm(this.validations)) {
      const signupData  = {
        name: this.nameElement.value,
        lastName: this.lastNameElement.value,
        email: this.emailElement.value,
        password: this.passwordElement.value,
        passwordRepeat: this.passwordRepeatElement.value
      };

      const signupResult = await AuthService.signUp(signupData);

      if (signupResult) {
        const loginResult = await AuthService.logIn({
          email: this.emailElement.value,
          password: this.passwordElement.value
        });

        if (loginResult) {
          AuthUtils.setAuthInfo(
            loginResult.tokens.accessToken,
            loginResult.tokens.refreshToken,
            { id: loginResult.user.id, name: loginResult.user.name }
          );
          return this.openNewRoute('/');
        }
      }

      this.commonErrorElement.style.display = 'block';
    }
  }
}