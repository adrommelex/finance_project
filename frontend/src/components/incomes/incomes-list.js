export class IncomesList {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    this.cardIncomesElement = document.getElementById('incomes-cards-container');
    this.confirmDeleteBtn = document.getElementById('delete-category');
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    this.initEvents();
  }

  initEvents() {
    this.cardIncomesElement.addEventListener('click', (e) => {
      const card = e.target.closest('.card-wrapper');
      if (!card) return;

      const deleteBtn = e.target.closest('.btn-danger');
      const editBtn = e.target.closest('.btn-primary');

      if (deleteBtn) {
        this.categoryToDelete = card;
        this.deleteModal.show();
      }

      if (editBtn) {
        const title = card.querySelector('.card-title').textContent.trim();
        this.openNewRoute.routerInstance.transferData = { name: title };
        this.openNewRoute('/incomes-edit-category');
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
}