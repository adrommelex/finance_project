export class ModifyExpense {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    const data = this.openNewRoute.routerInstance.transferData;
    if (!data) return this.openNewRoute('/incomes-expenses');
    this.incomeData = data;

    this.init();
  }

  init() {
    const typeSelect = document.getElementById('expense-type');
    const categorySelect = document.getElementById('expense');
    const amountInput = document.getElementById('expense-sum');
    const dateInput = document.getElementById('expense-date');

    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    if (typeSelect) typeSelect.value = capitalize(this.incomeData.type);
    if (categorySelect) categorySelect.value = capitalize(this.incomeData.category);
    if (amountInput) amountInput.value = this.incomeData.amount.trim();

    if (dateInput) dateInput.value = this.incomeData.date;

  }
}