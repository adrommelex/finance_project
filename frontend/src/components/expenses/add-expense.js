import { OperationsService } from "../../services/operations-service";
import { CategoriesService } from "../../services/categories-service";
import { ValidationUtils } from "../../utils/validation-utils";
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";

export class AddExpense {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    this.fp = null;

    this.init().then();
  }

  async init() {
    this.categorySelect = document.getElementById('expense-category-select');
    this.amountInput = document.getElementById('expense-sum');
    this.dateInput = document.getElementById('expense-date');
    this.commentInput = document.getElementById('expense-comment');
    this.saveBtn = document.getElementById('create-expense-button');
    this.cancelBtn = document.getElementById('dismiss-expense-button');

    this.fp = flatpickr(this.dateInput, {
      locale: Russian,
      dateFormat: "Y-m-d",
      disableMobile: "true",
    });

    const categoriesResponse = await CategoriesService.getCategories('expense');
    if (categoriesResponse.categories) {
      this.categorySelect.innerHTML = '<option value="" selected disabled>Категория...</option>';
      categoriesResponse.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.innerText = category.title;
        this.categorySelect.appendChild(option);
      });
    }

    this.validations = [
      { element: this.categorySelect, errorElement: document.getElementById('category-error'), options: { message: 'Выберите категорию' }},
      { element: this.amountInput, errorElement: document.getElementById('amount-error'), options: { message: 'Введите сумму' }},
      { element: this.dateInput, errorElement: document.getElementById('date-error'), options: { message: 'Выберите дату' }},
      { element: this.commentInput, errorElement: document.getElementById('comment-error'), options: { message: 'Заполните комментарий' }}
    ];

    ValidationUtils.initInputHandlers(this.validations);

    this.initEvents();
  }

  initEvents() {
    this.saveBtn.onclick = async (e) => {
      e.preventDefault();

      if (!ValidationUtils.validateForm(this.validations)) {
        return;
      }

      const createData = {
        type: 'expense',
        amount: parseInt(this.amountInput.value),
        date: this.dateInput.value,
        comment: this.commentInput.value,
        category_id: parseInt(this.categorySelect.value)
      };

      const result = await OperationsService.createOperation(createData);

      if (result.error) {
        if (result.redirect) return this.openNewRoute(result.redirect);
        alert(result.error);
      } else {
        this.openNewRoute('/incomes-expenses');
      }
    }

    this.cancelBtn.onclick = () => {
      this.openNewRoute('/incomes-expenses');
    };
  }

  destroy() {
    if (this.fp) {
      this.fp.destroy();
    }
  }
}