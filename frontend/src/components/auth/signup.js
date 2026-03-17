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
        options: {
          pattern: /^[А-Я][а-яё\s]*$/,
          patternError: 'Имя должно быть на русском языке и начинаться с большой буквы'
        }
      },
      { element: this.lastNameElement,
        errorElement: document.getElementById('last-name-error'),
        options: {
          pattern: /^[А-Я][а-яё\s]*$/,
          patternError: 'Фамилия должна быть на русском языке и начинаться с большой буквы'
        }
      },
      {
        element: this.emailElement,
        errorElement: document.getElementById('email-error'),
        options: {
          pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          patternError: 'Введите корректную электронную почту'
        }
      },
      {
        element: this.passwordElement,
        errorElement: document.getElementById('password-error'),
        options: {
          pattern: /^(?=.*\d)(?=.*[A-Z]).{8,}$/,
          patternError: 'Пароль должен содержать минимум 8 символов, заглавную букву и цифру'
        }
      },
      {
        element: this.passwordRepeatElement,
        errorElement: document.getElementById('password-repeat-error'),
        options: {
          compareTo: null,
          patternError: 'Пароли не совпадают'
        }
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
        name: this.nameElement.value.trim(),
        lastName: this.lastNameElement.value.trim(),
        email: this.emailElement.value.trim(),
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