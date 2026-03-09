export class ModifyIncome {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    const data = this.openNewRoute.routerInstance.transferData;
    if (!data) return this.openNewRoute('/incomes-outcomes');
    this.incomeData = data;

    this.init();
  }

  init() {
    const typeSelect = document.getElementById('income-type');
    const categorySelect = document.getElementById('income');
    const amountInput = document.getElementById('income-sum');
    const dateInput = document.getElementById('income-date');

    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    if (typeSelect) typeSelect.value = capitalize(this.incomeData.type);
    if (categorySelect) categorySelect.value = capitalize(this.incomeData.category);
    if (amountInput) amountInput.value = this.incomeData.amount.trim();

    if (dateInput) dateInput.value = this.incomeData.date;
  }
}