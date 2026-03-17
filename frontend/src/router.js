import {Dashboard} from "./components/dashboard";
import {FileUtils} from "./utils/file-utils";
import {Login} from "./components/auth/login";
import {Signup} from "./components/auth/signup";
import {IncomesOutcomes} from "./components/incomes-outcomes";
import {IncomesList} from "./components/incomes/incomes-list";
import {OutcomesList} from "./components/outcomes/outcomes-list";
import {IncomesCreateCategory} from "./components/incomes/incomes-create-category";
import {OutcomesCreateCategory} from "./components/outcomes/outcomes-create-category";
import {IncomesEditCategory} from "./components/incomes/incomes-edit-category";
import {OutcomesEditCategory} from "./components/outcomes/outcomes-edit-category";
import {AddIncome} from "./components/incomes/add-income";
import {AddOutcome} from "./components/outcomes/add-outcome";
import {ModifyOutcome} from "./components/outcomes/modify-outcome";
import {ModifyIncome} from "./components/incomes/modify-income";
import {AuthUtils} from "./utils/auth-utils";
import {Logout} from "./components/auth/logout";

export class Router {
  constructor() {
    this.transferData = null;
    this.openNewRouteBinded = this.openNewRoute.bind(this);
    this.openNewRouteBinded.routerInstance = this;

    this.dashboardInstance = null;
    this.incomesOutcomesInstance = null;
    this.titlePageElement = document.getElementById('title');
    this.contentPageElement = document.getElementById('content');
    this.bootstrapStyleElement = document.getElementById('bootstrap_style');

    this.userName = null;

    this.initEvents();

    this.routes = [
      {
        route: '/',
        title: 'Дашборд',
        filePathTemplate: '/templates/pages/dashboard.html',
        useLayout: '/templates/layout.html',
        load: () => {
          this.dashboardInstance = new Dashboard(this.openNewRouteBinded);
        },
        unload: () => {
          if (this.dashboardInstance && typeof this.dashboardInstance.destroy === 'function') {
            this.dashboardInstance.destroy();
            this.dashboardInstance = null;
          }
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
        route: '/404',
        title: 'Страница не найдена',
        filePathTemplate: '/templates/pages/404.html',
        useLayout: false
      },
      {
        route: '/login',
        title: 'Авторизация',
        filePathTemplate: '/templates/pages/auth/login.html',
        useLayout: false,
        load: () => {
          document.body.classList.add('login-page');
          new Login(this.openNewRouteBinded);
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
          new Signup(this.openNewRouteBinded);
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
          new Logout(this.openNewRouteBinded);
        }
      },
      {
        route: '/incomes-outcomes',
        title: 'Доходы и расходы',
        filePathTemplate: '/templates/pages/incomes-outcomes.html',
        useLayout: '/templates/layout.html',
        load: () => {
          this.incomesOutcomesInstance = new IncomesOutcomes(this.openNewRouteBinded);
        },
        unload: () => {
          if (this.incomesOutcomesInstance && typeof this.incomesOutcomesInstance.destroy === 'function') {
            this.incomesOutcomesInstance.destroy();
            this.incomesOutcomesInstance = null;
          }
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
          new IncomesList(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/outcomes',
        title: 'Доходы и расходы',
        filePathTemplate: '/templates/pages/outcomes/list.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new OutcomesList(this.openNewRouteBinded);
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
          new IncomesCreateCategory(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/outcomes-create-category',
        title: 'Создание категории расходов',
        filePathTemplate: '/templates/pages/outcomes/create-category.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new OutcomesCreateCategory(this.openNewRouteBinded);
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
          new IncomesEditCategory(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/outcomes-edit-category',
        title: 'Создание категории расходов',
        filePathTemplate: '/templates/pages/outcomes/edit-category.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new OutcomesEditCategory(this.openNewRouteBinded);
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
          new AddIncome(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/add-outcome',
        title: 'Создание расхода',
        filePathTemplate: '/templates/pages/outcomes/add-outcome.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new AddOutcome(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/modify-outcome',
        title: 'Редактирование расхода',
        filePathTemplate: '/templates/pages/outcomes/modify-outcome.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new ModifyOutcome(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
      },
      {
        route: '/modify-income',
        title: 'Редактирование дохода',
        filePathTemplate: '/templates/pages/incomes/modify-income.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new ModifyIncome(this.openNewRouteBinded);
        },
        scripts: [
          'sidebars.js'
        ],
        styles: [
          'sidebars.css'
        ],
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
        if (currentRoute.styles && currentRoute.styles.length > 0) {
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

    const newRoute = this.routes.find((item) => item.route === urlRoute);

    if (newRoute) {

      if (newRoute.title) {
        this.titlePageElement.innerText = newRoute.title;
      }

      if (newRoute.styles && newRoute.styles.length > 0) {
        newRoute.styles.forEach(style => {
          FileUtils.loadPageStyle('/css/' + style, this.bootstrapStyleElement);
        });
      }

      if (newRoute.filePathTemplate) {
        let contentBlock = this.contentPageElement;

        if (newRoute.useLayout) {
          this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(res => res.text());
          contentBlock = document.getElementById('content-layout');

          document.body.classList.add('sidebar-mini', 'layout-fixed');
          this.profileNameElement = document.getElementById('profile-name');

          if (!this.userName) {
            let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
            if (userInfo) {
              userInfo = JSON.parse(userInfo);
              if (userInfo.name) {
                this.userName = userInfo.name;
              }
            }
          }
          this.profileNameElement.innerText = this.userName;
          this.activateMenuItem(newRoute);
        } else {
          document.body.classList.remove('sidebar-mini', 'layout-fixed');
        }

        contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(res => res.text());
      }

      if (newRoute.scripts && newRoute.scripts.length > 0) {
        for (const script of newRoute.scripts) {
          await FileUtils.loadPageScript('/js/' + script);
        }
      }

      if (newRoute.load && typeof newRoute.load === 'function') {
        newRoute.load();
        this.transferData = null;
      }
    } else {
      console.error('Маршрут не найден:', urlRoute);
      await this.openNewRoute('/404');
    }
  }

  activateMenuItem(route) {
    document.querySelectorAll('.sidebar .nav-link').forEach(item => {
      const href = item.getAttribute('href');
      if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
}