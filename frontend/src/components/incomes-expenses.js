import Flatpickr from 'flatpickr';
import {Russian} from "flatpickr/dist/l10n/ru.js";

export class IncomesExpenses {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    this.tableElement = document.getElementById('table');
    this.confirmDeleteBtn = document.getElementById('delete-category');
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.modalText = document.getElementById('modal-text');
    this.addIncome = document.getElementById('add-income');
    this.addExpense = document.getElementById('add-expense');

    this.initEvents();
    this.initDatePicker();
  }

  initEvents() {
    this.addIncome.addEventListener('click', event => {
      this.openNewRoute('/add-income');
    });

    this.addExpense.addEventListener('click', event => {
      this.openNewRoute('/add-expense');
    });

    this.tableElement.addEventListener('click', (e) => {
      const tableRaw = e.target.closest('.table-raw');

      const deleteBtn = e.target.closest('.bi-trash');
      const editBtn = e.target.closest('.bi-pencil');

      if (deleteBtn) {
        this.categoryToDelete = tableRaw;
        this.modalText.innerText = 'Вы действительно хотите удалить операцию?';
        this.deleteModal.show();
      }

      if (editBtn) {
        const cells = tableRaw.querySelectorAll('td');

        const rowData = {
          type: cells[0].textContent.trim(),
          category: cells[1].textContent.trim(),
          amount: cells[2].textContent.trim(),
          date: cells[3].textContent.trim(),
        };

        const targetRoute = rowData.type === 'доход' ? '/modify-income' : '/modify-expense';
        this.openNewRoute.routerInstance.transferData = rowData;
        this.openNewRoute(targetRoute);
      }
    });

    this.confirmDeleteBtn.addEventListener('click', () => {
      this.deleteCategory();
    });
  }

  deleteCategory() {
    if (this.categoryToDelete) {
      this.categoryToDelete.remove();

      this.deleteModal.hide();
      this.categoryToDelete = null;
    }
  }

  initDatePicker() {
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');

    if (dateFromInput && dateToInput) {
      const config = {
        locale: Russian,
        dateFormat: "d.m.Y",
        disableMobile: "true",
      };

      this.fpFrom = Flatpickr(dateFromInput, {
        ...config,
        onChange: (selectedDates) => {
          this.fpTo.set('minDate', selectedDates[0]);
        }
      });

      this.fpTo = Flatpickr(dateToInput, {
        ...config,
        onChange: (selectedDates) => {
          this.fpFrom.set('maxDate', selectedDates[0]);
        }
      });

      const intervalBtn = document.getElementById('interval-btn');
      if (intervalBtn) {
        intervalBtn.addEventListener('click', () => this.fpFrom.open());
      }
    }
  }

  destroy() {
    if (this.fpFrom) this.fpFrom.destroy();
    if (this.fpTo) this.fpTo.destroy();
  }

}