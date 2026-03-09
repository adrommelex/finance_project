export class IncomesEditCategory {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    const data = this.openNewRoute.routerInstance.transferData;
    if (!data) return this.openNewRoute('/incomes');
    this.categoryName = data.name;

    this.init();
  }

  init() {
    const inputName = document.getElementById('incomes-category-name');

    if (inputName) inputName.value = this.categoryName;
  }
}