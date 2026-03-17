export class ValidationUtils {

  static validateForm(validations) {
    let isValid = true;

    for (let i = 0; i < validations.length; i++) {
      if (!ValidationUtils.validateField(validations[i].element, validations[i].options, validations[i].errorElement)) {
        isValid = false;
      }
    }

    return isValid;
  }

  static validateField(element, options, errorElement) {
    const parentContainer = element.closest('.input-group-custom');
    let isValid = true;
    let errorMessage = '';

    if (!element.value) {
      isValid = false;
      errorMessage = 'Заполните поле';
    }

    else if (options) {
      if (options.pattern && !element.value.match(options.pattern)) {
        isValid = false;
        errorMessage = options.patternError || 'Некорректный формат';
      } else if (options.compareTo && element.value !== options.compareTo) {
        isValid = false;
        errorMessage = 'Пароли не совпадают';
      }
    }

    if (isValid) {
      if (errorElement) errorElement.classList.remove('d-block');
      element.classList.remove('is-invalid');
      if (parentContainer) parentContainer.classList.remove('error');
      return true;
    } else {
      if (errorElement) {
        errorElement.innerText = errorMessage;
        errorElement.classList.add('d-block');
      }
      element.classList.add('is-invalid');
      if (parentContainer) parentContainer.classList.add('error');
      return false;
    }
  }

  static initInputHandlers(validations, commonErrorElement = null) {
    validations.forEach(item => {
      item.element.addEventListener('input', () => {
        item.element.classList.remove('is-invalid');

        const parent = item.element.closest('.input-group-custom');
        if (parent) parent.classList.remove('error');

        if (item.errorElement) {
          item.errorElement.classList.remove('d-block');
        }

        if (commonErrorElement) {
          commonErrorElement.style.display = 'none';
        }
      });
    });
  }
}