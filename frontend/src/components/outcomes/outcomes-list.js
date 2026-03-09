export class OutcomesList {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    this.cardOutcomesElement = document.getElementById('outcomes-cards-container');
    this.confirmDeleteBtn = document.getElementById('delete-category');
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.modalText = document.getElementById('modal-text');

    this.initEvents();
  }

  initEvents() {
    this.cardOutcomesElement.addEventListener('click', (e) => {
      const card = e.target.closest('.card-wrapper');
      if (!card) return;

      const deleteBtn = e.target.closest('.btn-danger');
      const editBtn = e.target.closest('.btn-primary');

      if (deleteBtn) {
        this.categoryToDelete = card;
        this.modalText.innerText = 'Вы действительно хотите удалить категорию?';
        this.deleteModal.show();
      }

      if (editBtn) {
        const title = card.querySelector('.card-title').textContent.trim();
        this.openNewRoute.routerInstance.transferData = { name: title };
        this.openNewRoute('/outcomes-edit-category');
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