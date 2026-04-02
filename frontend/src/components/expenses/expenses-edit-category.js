import { CategoriesService } from "../../services/categories-service";
import { ValidationUtils } from "../../utils/validation-utils";

export class ExpensesEditCategory {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    const data = this.openNewRoute.routerInstance.transferData;
    if (!data || !data.id) {
      this.openNewRoute('/expenses');
      return;
    }

    this.categoryId = data.id;
    this.initialTitle = data.title;

    this.init();
  }

  init() {
    this.inputElement = document.getElementById('expenses-category-name');
    this.errorElement = document.getElementById('category-error');
    this.cancelBtn = document.getElementById('cancel-button');

    if (this.inputElement) {
      this.inputElement.value = this.initialTitle;
    }

    this.validations = [
      { element: this.inputElement, errorElement: this.errorElement }
    ];

    ValidationUtils.initInputHandlers(this.validations);

    this.initEvents();
  }

  initEvents() {
    this.formElement = document.querySelector('.create-category-form');

    if (this.formElement) {
      this.formElement.onsubmit = async (e) => {
        e.preventDefault();

        if (!ValidationUtils.validateForm(this.validations)) {
          return;
        }

        const newTitle = this.inputElement.value.trim();

        if (newTitle === this.initialTitle) {
          return this.openNewRoute('/expenses');
        }

        const response = await CategoriesService.updateCategory('expense', this.categoryId, newTitle);

        if (response.error) {
          if (response.redirect) return this.openNewRoute(response.redirect);
          ValidationUtils.validateField(this.inputElement, null, this.errorElement);
          this.errorElement.innerText = response.error;
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