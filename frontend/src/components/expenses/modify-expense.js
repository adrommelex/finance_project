import { OperationsService } from "../../services/operations-service";
import { CategoriesService } from "../../services/categories-service";
import { ValidationUtils } from "../../utils/validation-utils";
import Flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";

export class ModifyExpense {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    const data = this.openNewRoute.routerInstance.transferData;
    if (!data || !data.id) return this.openNewRoute('/incomes-expenses');
    this.operationId = data.id;

    this.init();
  }

  async init() {
    this.typeSelect = document.getElementById('expense-type');
    this.categorySelect = document.getElementById('expense-category-select');
    this.amountInput = document.getElementById('expense-sum');
    this.dateInput = document.getElementById('expense-date');
    this.commentInput = document.getElementById('expense-comment');
    this.saveBtn = document.getElementById('save-expense-button');
    this.cancelBtn = document.getElementById('dismiss-expense-button');

    this.fp = Flatpickr(this.dateInput, {
      locale: Russian,
      dateFormat: "Y-m-d",
    });

    const categoriesResponse = await CategoriesService.getCategories('expense');
    if (categoriesResponse.categories) {
      this.categorySelect.innerHTML = '<option value="">Категория...</option>';
      categoriesResponse.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.innerText = category.title;
        this.categorySelect.appendChild(option);
      });
    }

    const operationResponse = await OperationsService.getOperation(this.operationId);
    if (operationResponse.operation) {
      const op = operationResponse.operation;

      if (this.typeSelect) this.typeSelect.value = op.type;
      if (this.amountInput) this.amountInput.value = op.amount;
      if (this.commentInput) this.commentInput.value = op.comment || '';

      if (this.fp) this.fp.setDate(op.date);

      const currentCategory = Array.from(this.categorySelect.options)
        .find(opt => opt.innerText === op.category);
      if (currentCategory) {
        this.categorySelect.value = currentCategory.value;
      }
    }

    this.validations = [
      { element: this.categorySelect, errorElement: document.getElementById('category-error') },
      { element: this.amountInput, errorElement: document.getElementById('amount-error') },
      { element: this.dateInput, errorElement: document.getElementById('date-error') },
      { element: this.commentInput, errorElement: document.getElementById('comment-error') }
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

      const updateData = {
        type: 'expense',
        amount: parseInt(this.amountInput.value),
        date: this.dateInput.value,
        comment: this.commentInput.value,
        category_id: parseInt(this.categorySelect.value)
      };

      const result = await OperationsService.updateOperation(this.operationId, updateData);

      if (result.error) {
        if (result.redirect) return this.openNewRoute(result.redirect);
        alert(result.error);
      } else {
        this.openNewRoute('/incomes-expenses');
      }
    };

    this.cancelBtn.onclick = () => {
      this.openNewRoute('/incomes-expenses');
    };
  }
}