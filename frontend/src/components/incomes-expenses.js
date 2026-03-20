import Flatpickr from 'flatpickr';
import {Russian} from "flatpickr/dist/l10n/ru.js";
import {OperationsService} from "../services/operations-service";

export class IncomesExpenses {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    this.addIncomeBtn = document.getElementById('add-income');
    this.addExpenseBtn = document.getElementById('add-expense');
    this.periodButtons = document.querySelectorAll('.period-btn');
    this.dateFromElement = document.getElementById('date-from');
    this.dateToElement = document.getElementById('date-to');

    this.tableBody = document.getElementById('operations-table-body');
    this.confirmDeleteBtn = document.getElementById('delete-category');
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    this.activePeriod = 'today';
    this.idToDelete = null;

    this.init().then();
  }

  async init() {
    this.initDatePicker();
    this.initEvents();
    await this.getOperations();
  }

  async getOperations() {
    const dateFrom = this.fpFrom.selectedDates.length > 0
      ? this.fpFrom.formatDate(this.fpFrom.selectedDates[0], "Y-m-d") : null;
    const dateTo = this.fpTo.selectedDates.length > 0
      ? this.fpTo.formatDate(this.fpTo.selectedDates[0], "Y-m-d") : null;

    const response = await OperationsService.getOperations(this.activePeriod, dateFrom, dateTo);

    if (response.error) {
      if (response.redirect) return this.openNewRoute(response.redirect);
      return alert(response.error);
    }

    this.renderTable(response.operations);
  }

  renderTable(operations) {
    this.tableBody.innerHTML = '';

    operations.forEach((item, index) => {
      const row = document.createElement('tr');
      row.className = 'table-raw';

      const typeClass = item.type === 'income' ? 'text-success' : 'text-danger';
      const typeLabel = item.type === 'income' ? 'доход' : 'расход';

      const editRoute = item.type === 'income' ? '/modify-income' : '/modify-expense';

      const displayDate = item.date.split('-').reverse().join('.');

      row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td class="${typeClass}">${typeLabel}</td>
                <td>${item.category || 'Без категории'}</td>
                <td>${item.amount}$</td>
                <td>${displayDate}</td>
                <td>${item.comment || ''}</td>
                <td class="text-end">
                    <button class="btn btn-link link-dark p-0 me-2 delete-btn" data-id="${item.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-link link-dark p-0 edit-btn" data-id="${item.id}" data-route="${editRoute}">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            `;
      this.tableBody.appendChild(row);
    });
  }

  initEvents() {
    this.periodButtons.forEach(btn => {
      btn.onclick = async () => {
        this.activePeriod = btn.getAttribute('data-period');

        this.updateFilterButtons(btn);

        if (this.activePeriod !== 'interval') {
          this.fpFrom.clear();
          this.fpTo.clear();
          this.dateFromElement.innerText = 'Дата';
          this.dateToElement.innerText = 'Дата';
        }

        await this.getOperations();
      };
    });

    this.addIncomeBtn.onclick = () => this.openNewRoute('/add-income');
    this.addExpenseBtn.onclick = () => this.openNewRoute('/add-expense');

    this.tableBody.onclick = (e) => {
      const target = e.target.closest('button');
      if (!target) return;

      const id = target.getAttribute('data-id');

      if (target.classList.contains('delete-btn')) {
        this.idToDelete = id;
        this.deleteModal.show();
      }

      if (target.classList.contains('edit-btn')) {
        const route = target.getAttribute('data-route');
        this.openNewRoute.routerInstance.transferData = { id: id };
        this.openNewRoute(route);
      }
    };

    this.confirmDeleteBtn.onclick = async () => {
      const result = await OperationsService.deleteOperation(this.idToDelete);
      if (!result.error) {
        this.deleteModal.hide();
        await this.getOperations();
      } else {
        alert(result.error);
      }
    };
  }

  updateFilterButtons(activeBtn) {
    this.periodButtons.forEach(btn => {
      btn.classList.remove('btn-secondary', 'active');
      btn.classList.add('btn-outline-secondary');
    });
    activeBtn.classList.replace('btn-outline-secondary', 'btn-secondary');
    activeBtn.classList.add('active');
  }

  initDatePicker() {
    const config = {
      locale: Russian,
      dateFormat: "d.m.Y",
      disableMobile: "true",
      onChange: async (selectedDates, dateStr, instance) => {
        instance.element.innerText = dateStr;

        if (this.fpFrom.selectedDates.length > 0 && this.fpTo.selectedDates.length > 0) {
          this.activePeriod = 'interval';
          const intervalBtn = Array.from(this.periodButtons).find(b => b.getAttribute('data-period') === 'interval');
          if (intervalBtn) this.updateFilterButtons(intervalBtn);
          await this.getOperations();
        }
      }
    };

    this.fpFrom = Flatpickr(this.dateFromElement, config);
    this.fpTo = Flatpickr(this.dateToElement, config);
  }

  destroy() {
    if (this.fpFrom) this.fpFrom.destroy();
    if (this.fpTo) this.fpTo.destroy();
  }
}