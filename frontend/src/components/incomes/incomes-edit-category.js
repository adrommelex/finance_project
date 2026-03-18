import { IncomesService } from "../../services/incomes-service";
import { ValidationUtils } from "../../utils/validation-utils";

export class IncomesEditCategory {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    const data = this.openNewRoute.routerInstance.transferData;
    if (!data || !data.id) {
      this.openNewRoute('/incomes');
      return;
    }

    this.categoryId = data.id;
    this.initialTitle = data.title;

    this.init();
  }

  init() {
    this.inputElement = document.getElementById('incomes-category-name');
    this.errorElement = document.getElementById('category-error');
    this.saveBtn = document.getElementById('create-button');
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
    if (this.saveBtn) {
      this.saveBtn.onclick = async (e) => {
        e.preventDefault();

        if (!ValidationUtils.validateForm(this.validations)) {
          return;
        }

        const newTitle = this.inputElement.value.trim();

        if (newTitle === this.initialTitle) {
          return this.openNewRoute('/incomes');
        }

        const response = await IncomesService.updateCategory(this.categoryId, newTitle);

        if (response.error) {
          if (response.redirect) return this.openNewRoute(response.redirect);
          ValidationUtils.validateField(this.inputElement, null, this.errorElement);
          this.errorElement.innerText = response.error;
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