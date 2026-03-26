import { CategoriesService } from "../../services/categories-service";

export class IncomesList {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    this.categoryIdToDelete = null;
    this.categoryElementToDelete = null;
    this.deleteModal = null;

    this.init().then();
  }

  async init() {
    this.container = document.getElementById('incomes-cards-container');
    this.addCardWrapper = document.getElementById('add-category-wrapper');

    this.initEvents();

    await this.getCategories();
  }

  async getCategories() {
    const response = await CategoriesService.getCategories('income');

    if (response.error) {
      if (response.redirect) return this.openNewRoute(response.redirect);
      return alert(response.error);
    }

    this.renderCards(response.categories);
  }

  renderCards(categories) {
    if (!categories || !this.addCardWrapper) return;

    categories.forEach(category => {
      const cardHtml = `
                <div class="card-wrapper col-12 col-lg-6 col-xxl-4" data-id="${category.id}">
                  <div class="card border rounded-3 p-3 shadow-sm h-100">
                    <div class="card-body p-0">
                      <h3 class="card-title mb-3">${category.title}</h3>
                      <div class="d-flex gap-2">
                        <button class="btn btn-primary edit-btn">Редактировать</button>
                        <button class="btn btn-danger delete-btn">Удалить</button>
                      </div>
                    </div>
                  </div>
                </div>`;
      this.addCardWrapper.insertAdjacentHTML('beforebegin', cardHtml);
    });
  }

  initEvents() {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      this.deleteModal = new bootstrap.Modal(modalElement);
    }

    const confirmBtn = document.getElementById('confirm-delete-button');
    if (confirmBtn) {
      confirmBtn.onclick = async () => {
        await this.deleteCategory();
      };
    }

    if (this.container) {
      this.container.onclick = (e) => {
        const card = e.target.closest('.card-wrapper');
        if (!card || card.id === 'add-category-wrapper') return;

        const id = card.getAttribute('data-id');
        const title = card.querySelector('.card-title').textContent.trim();

        if (e.target.closest('.edit-btn')) {
          if (this.openNewRoute.routerInstance) {
            this.openNewRoute.routerInstance.transferData = { id: id, title: title };
          }
          this.openNewRoute('/incomes-edit-category');
        }

        if (e.target.closest('.delete-btn')) {
          this.categoryIdToDelete = id;
          this.categoryElementToDelete = card;
          if (this.deleteModal) {
            this.deleteModal.show();
          }
        }
      };
    }
  }

  async deleteCategory() {
    if (!this.categoryIdToDelete) return;

    const response = await CategoriesService.deleteCategory('income', this.categoryIdToDelete);

    if (response.error) {
      if (response.redirect) return this.openNewRoute(response.redirect);
      alert(response.error);
    } else {
      if (this.categoryElementToDelete) {
        this.categoryElementToDelete.remove();
      }
    }

    if (this.deleteModal) {
      this.deleteModal.hide();
    }

    this.categoryIdToDelete = null;
    this.categoryElementToDelete = null;
  }
}