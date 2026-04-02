import { CategoriesService } from "../../services/categories-service";
import { ValidationUtils } from "../../utils/validation-utils";

export class IncomesCreateCategory {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    this.init();
  }

  init() {
    this.formElement = document.querySelector('.create-category-form');
    this.inputElement = document.getElementById('category-name');
    this.errorElement = document.getElementById('category-error');
    this.cancelBtn = document.getElementById('cancel-button');

    this.validations = [
      { element: this.inputElement, errorElement: this.errorElement }
    ];

    ValidationUtils.initInputHandlers(this.validations);

    this.initEvents();
  }

  initEvents() {

    if (this.formElement) {
      this.formElement.onsubmit = async (e) => {
        e.preventDefault();

        if (!ValidationUtils.validateForm(this.validations)) {
          return;
        }

        const title = this.inputElement.value.trim();
        const response = await CategoriesService.createCategory('income', title);

        if (response.error) {
          if (response.redirect) return this.openNewRoute(response.redirect);

          this.errorElement.innerText = response.error;
          this.inputElement.classList.add('is-invalid');
          return;
        }

        this.openNewRoute('/incomes');
      };
    }

    if (this.cancelBtn) {
      this.cancelBtn.onclick = () => {
        this.openNewRoute('/incomes');
      };
    }
  }
}