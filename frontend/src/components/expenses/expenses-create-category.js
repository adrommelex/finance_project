import { CategoriesService } from "../../services/categories-service";
import { ValidationUtils } from "../../utils/validation-utils";

export class ExpensesCreateCategory {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    this.init();
  }

  init() {
    this.inputElement = document.getElementById('category-name');
    this.errorElement = document.getElementById('category-error');
    this.createBtn = document.getElementById('create-button');
    this.cancelBtn = document.getElementById('cancel-button');

    this.validations = [
      { element: this.inputElement, errorElement: this.errorElement }
    ];

    ValidationUtils.initInputHandlers(this.validations);

    this.initEvents();
  }

  initEvents() {

    if (this.createBtn) {
      this.createBtn.onclick = async (e) => {
        e.preventDefault();

        if (!ValidationUtils.validateForm(this.validations)) {
          return;
        }

        const title = this.inputElement.value.trim();

        const response = await CategoriesService.createCategory('expense', title);

        if (response.error) {
          if (response.redirect) return this.openNewRoute(response.redirect);

          this.errorElement.innerText = response.error;
          this.inputElement.classList.add('is-invalid');
          return;
        }

        this.openNewRoute('/expenses');
      };
    }

    if (this.cancelBtn) {
      this.cancelBtn.onclick = () => {
        this.openNewRoute('/expenses');
      };
    }
  }
}