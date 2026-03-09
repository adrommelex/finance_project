export class OutcomesEditCategory {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    const data = this.openNewRoute.routerInstance.transferData;
    if (!data) return this.openNewRoute('/outcomes');
    this.categoryName = data.name;

    this.init();
  }

  init() {
    const inputName = document.getElementById('outcomes-category-name');

    if (inputName) inputName.value = this.categoryName;
  }
}