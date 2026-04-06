# Finance Control System (SPA)

A modern Single Page Application (SPA) for managing personal finances, built with vanilla JavaScript and a component-based architecture.

## 🚀 Key Features
* **Transaction Management:** Full CRUD (Create, Read, Update, Delete) operations for incomes and expenses.
* **Category System:** Flexible management of financial categories with custom icons and visual states.
* **Interactive Dashboard:** Data visualization using charts to track financial health at a glance.
* **Authentication & Security:** JWT-based authentication system with protected routes (Auth Guards).
* **Dynamic UI:** Responsive design built with Bootstrap 5, featuring dynamic style loading for specific pages.

## 🛠 Tech Stack
* **Core:** JavaScript (ES6+ Classes), HTML5, CSS3.
* **Architecture:** Component-based SPA with custom lifecycle methods (`load`, `destroy`).
* **Router:** Custom History API Router (Clean URLs without hashes).
* **Build Tools:** Webpack, Babel.
* **Styling:** Bootstrap 5, Bootstrap Icons.

## ⚙️ Project Structure
The project follows a modular structure for better maintainability:
* `/src/components` — UI components and page logic.
* `/src/utils` — Helper functions, validation logic, and API wrappers.
* `/src/services` — Data fetching and state management.
* `/templates` — HTML templates for pages and layouts.

💻 Local Setup & Installation
1. Clone the repository
git clone https://github.com/adrommelex/finance_project.git
cd finance_project

2. Install dependencies
npm install

3. Run the application
The project uses Webpack Dev Server for local development.

npm run serve

The application will be available at http://localhost:9002.

📝 Note on Routing
This project utilizes the History API for clean navigation. When running locally via Webpack Dev Server, all requests are automatically redirected to index.html. If you plan to deploy this on a static server, ensure proper configuration to handle fallback routing.

Developed as a practice project to master Vanilla JS and SPA architecture.
