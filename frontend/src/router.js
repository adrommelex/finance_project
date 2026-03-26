import {Dashboard} from "./components/dashboard";
import {FileUtils} from "./utils/file-utils";
import {Login} from "./components/auth/login";
import {Signup} from "./components/auth/signup";
import {IncomesExpenses} from "./components/incomes-expenses";
import {IncomesList} from "./components/incomes/incomes-list";
import {ExpensesList} from "./components/expenses/expenses-list";
import {IncomesCreateCategory} from "./components/incomes/incomes-create-category";
import {ExpensesCreateCategory} from "./components/expenses/expenses-create-category";
import {IncomesEditCategory} from "./components/incomes/incomes-edit-category";
import {ExpensesEditCategory} from "./components/expenses/expenses-edit-category";
import {AddIncome} from "./components/incomes/add-income";
import {AddExpense} from "./components/expenses/add-expense";
import {ModifyExpense} from "./components/expenses/modify-expense";
import {ModifyIncome} from "./components/incomes/modify-income";
import {AuthUtils} from "./utils/auth-utils";
import {Logout} from "./components/auth/logout";
import {BalanceService} from "./services/balance-service";

export class Router {
  constructor() {
    this.transferData = null;
    this.openNewRouteBinded = this.openNewRoute.bind(this);
    this.openNewRouteBinded.routerInstance = this;

    this.titlePageElement = document.getElementById('title');
    this.contentPageElement = document.getElementById('content');
    this.bootstrapStyleElement = document.getElementById('bootstrap_style');
    this.activeRouteComponent = null;

    this.userName = null;

    this.initEvents();

    this.routes = [
      {
        route: '/',
        title: 'Дашборд',
        filePathTemplate: '/templates/pages/dashboard.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new Dashboard(this.openNewRouteBinded);
        },
        styles: [
          'sidebars.css',
          'flatpickr.min.css'
        ],
        scripts: [
          'sidebars.js'
        ],
      },
      {
        route: '/login',
        title: 'Авторизация',
        filePathTemplate: '/templates/pages/auth/login.html',
        useLayout: false,
        load: () => {
          document.body.classList.add('login-page');
          return new Login(this.openNewRouteBinded);
        },
        unload: () => {
          document.body.classList.remove('login-page');
        },
        styles: [
          'sign-in.css'
        ]
      },
      {
        route: '/signup',
        title: 'Регистрация',
        filePathTemplate: '/templates/pages/auth/signup.html',
        useLayout: false,
        load: () => {
          document.body.classList.add('register-page');
          return new Signup(this.openNewRouteBinded);
        },
        unload: () => {
          document.body.classList.remove('register-page');
        },
        styles: [
          'sign-in.css'
        ]
      },
      {
        route: '/logout',
        load: () => {
          return new Logout(this.openNewRouteBinded);
        }
      },
      {
        route: '/incomes-expenses',
        title: 'Доходы и расходы',
        filePathTemplate: '/templates/pages/incomes-expenses.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new IncomesExpenses(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css',
          'flatpickr.min.css'
        ],
      },
      {
        route: '/incomes',
        title: 'Доходы и расходы',
        filePathTemplate: '/templates/pages/incomes/list.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new IncomesList(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/expenses',
        title: 'Доходы и расходы',
        filePathTemplate: '/templates/pages/expenses/list.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new ExpensesList(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/incomes-create-category',
        title: 'Создание категории доходов',
        filePathTemplate: '/templates/pages/incomes/create-category.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new IncomesCreateCategory(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/expenses-create-category',
        title: 'Создание категории расходов',
        filePathTemplate: '/templates/pages/expenses/create-category.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new ExpensesCreateCategory(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/incomes-edit-category',
        title: 'Создание категории расходов',
        filePathTemplate: '/templates/pages/incomes/edit-category.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new IncomesEditCategory(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/expenses-edit-category',
        title: 'Создание категории расходов',
        filePathTemplate: '/templates/pages/expenses/edit-category.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new ExpensesEditCategory(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/add-income',
        title: 'Создание дохода',
        filePathTemplate: '/templates/pages/incomes/add-income.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new AddIncome(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css',
          'flatpickr.min.css'
        ],
      },
      {
        route: '/add-expense',
        title: 'Создание расхода',
        filePathTemplate: '/templates/pages/expenses/add-expense.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new AddExpense(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css',
          'flatpickr.min.css'
        ],
      },
      {
        route: '/modify-expense',
        title: 'Редактирование расхода',
        filePathTemplate: '/templates/pages/expenses/modify-expense.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new ModifyExpense(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css',
          'flatpickr.min.css'
        ],
      },
      {
        route: '/modify-income',
        title: 'Редактирование дохода',
        filePathTemplate: '/templates/pages/incomes/modify-income.html',
        useLayout: '/templates/layout.html',
        load: () => {
          return new ModifyIncome(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css',
          'flatpickr.min.css'
        ],
      },
      {
        route: '*',
        title: 'Страница не найдена',
        filePathTemplate: '/templates/pages/404.html',
        useLayout: false
      },
    ]
  }

  initEvents() {
    window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
    window.addEventListener('popstate', this.activateRoute.bind(this));
    document.addEventListener('click', this.clickHandler.bind(this));
  }

  async openNewRoute(url) {
    const currentRoute = window.location.pathname;
    history.pushState({}, '', url);
    await this.activateRoute(null, currentRoute);
  }

  async clickHandler(e) {
    let element = null;

    if (e.target.nodeName === 'A') {
      element = e.target;
    } else if (e.target.parentNode.nodeName === 'A') {
      element = e.target.parentNode;
    }

    if (element) {
      e.preventDefault();

      const currentRoute = window.location.pathname;

      const url = element.href.replace(window.location.origin, '');

      if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
        return;
      }

      await this.openNewRoute(url);
    }
  }

  async activateRoute(e, oldRoute = null) {

    if (this.activeRouteComponent && typeof this.activeRouteComponent.destroy === 'function') {
      this.activeRouteComponent.destroy();
      this.activeRouteComponent = null;
    }

    const urlRoute = window.location.pathname;
    const publicRoutes = ['/login', '/signup'];
    const accessToken = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey);

    if (!accessToken && !publicRoutes.includes(urlRoute)) {
      console.warn('Пожалуйста, авторизуйтесь для доступа!');
      await this.openNewRoute('/login');
      return;
    }


    if (oldRoute) {
      const currentRoute = this.routes.find((item) => item.route === oldRoute);

      if (currentRoute) {
        if (currentRoute.styles) {
          currentRoute.styles.forEach(style => {
            const element = document.querySelector(`link[href='/css/${style}']`);
            if (element) element.remove();
          });
        }
        if (currentRoute.scripts && currentRoute.scripts.length > 0) {
          currentRoute.scripts.forEach(script => {
            const element = document.querySelector(`script[src='/js/${script}']`);
            if (element) element.remove();
          });
        }

        if (currentRoute.unload && typeof currentRoute.unload === 'function') {
          currentRoute.unload();
        }
      }
    }

    let newRoute = this.routes.find((item) => item.route === urlRoute);

    if (!newRoute) {
      newRoute = this.routes.find((item) => item.route === '*');
    }

    if (newRoute) {
      if (newRoute.title) {
        this.titlePageElement.innerText = newRoute.title;
      }

      if (newRoute.styles) {
        newRoute.styles.forEach(style => {
          FileUtils.loadPageStyle('/css/' + style, this.bootstrapStyleElement);
        });
      }

      if (newRoute.filePathTemplate) {
        let contentBlock = this.contentPageElement;

        if (newRoute.useLayout) {
          let layoutContentBlock = document.getElementById('content-layout');

          if (!layoutContentBlock) {
            this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(res => res.text());
            layoutContentBlock = document.getElementById('content-layout');
            document.body.classList.add('sidebar-mini', 'layout-fixed');
          }

          contentBlock = layoutContentBlock;

          this.profileNameElement = document.getElementById('profile-name');

          let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
          if (userInfo) {
            userInfo = JSON.parse(userInfo);
            if (userInfo.name) {
              this.userName = userInfo.name;
            }
          }

          if (this.profileNameElement) {
            this.profileNameElement.innerText = this.userName || 'Аноним';
          }

          const balanceElement = document.getElementById('balance-value');
          if (balanceElement) {
            BalanceService.getBalance().then(balance => {
              if (balance !== null && balance !== undefined) {
                balanceElement.innerText = `${balance}$`;
              }
            });
          }

          this.activateMenuItem(newRoute);
        } else {
          document.body.classList.remove('sidebar-mini', 'layout-fixed');
        }

        contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(res => res.text());
      }

      if (newRoute.scripts) {
        for (const script of newRoute.scripts) {
          await FileUtils.loadPageScript('/js/' + script);
        }
      }

      if (newRoute.load && typeof newRoute.load === 'function') {
        this.activeRouteComponent = newRoute.load();
        this.transferData = null;
      }
    }
  }

  activateMenuItem(route) {
    const currentPath = window.location.pathname;

    document.querySelectorAll('.sidebar-link').forEach(item => {
      const href = item.getAttribute('href');
      const isActive = (href === currentPath) ||
        (href !== '/' && currentPath.startsWith(href) && currentPath.length > href.length && currentPath[href.length] === '/');

      if (isActive) {
        item.classList.add('active', 'bg-primary', 'text-white');
        item.classList.remove('link-dark');
      } else {
        item.classList.remove('active', 'bg-primary', 'text-white');
        item.classList.add('link-dark');
        item.blur();
      }
    });

    const categoriesBtn = document.querySelector('[data-bs-target="#home-collapse"]');
    const isCategoryChild = (currentPath.startsWith('/incomes') || currentPath.startsWith('/expenses'))
      && currentPath !== '/incomes-expenses';

    if (categoriesBtn) {
      if (isCategoryChild) {
        categoriesBtn.classList.add('active', 'bg-primary', 'text-white');
        categoriesBtn.classList.remove('link-dark');

        const collapse = document.getElementById('home-collapse');
        if (collapse) collapse.classList.add('show');
      } else {
        categoriesBtn.classList.remove('active', 'bg-primary', 'text-white');
        categoriesBtn.classList.add('link-dark');
      }
    }
  }
}