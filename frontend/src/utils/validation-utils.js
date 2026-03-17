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
    let condition = element.value;
    const parentContainer = element.closest('.input-group-custom');

    if (options) {
      if (options.hasOwnProperty('pattern')) {
        condition = element.value && element.value.match(options.pattern);
      } else if (options.hasOwnProperty('compareTo')) {
        condition = element.value && element.value === options.compareTo;
      } else if (options.hasOwnProperty('checkProperty')) {
        condition = options.checkProperty;
      } else if (options.hasOwnProperty('checked')) {
        condition = element.checked;
      }
    }

    if (condition) {
      if (errorElement) errorElement.classList.remove('d-block');
      element.classList.remove('is-invalid');
      if (parentContainer) parentContainer.classList.remove('error');
      return true;
    } else {
      if (errorElement) errorElement.classList.add('d-block');
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