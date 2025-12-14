# Discendi — IT Courses Platform

**Discendi** is a Web Development Lab project — a multi-page website transformed into a **Single Page Application (SPA)**.  
The project demonstrates clean architecture, modular JavaScript, professional SCSS structure, and dynamic data handling.

---

## 🛠 Tech Stack

### Frontend
- JavaScript
- Axios

### Backend
- Node.js
- Express.js
- JSON Server (REST API)

### Templating
- HTML5
- EJS (used as initial templates, later converted to JS views)

### Styling
- SCSS (Sass)
- 7-1 methodology


### Tools
- Nodemon
- Sass Compiler
- Concurrently

---

## 📂 Project Architecture

The project follows a **clean separation of concerns** and a **modular MVC-like architecture**.

### 🎨 SCSS Structure (7–1 Pattern)
```text
public/scss/
├── abstracts/   # Variables, mixins, functions (do not generate CSS)
├── base/        # Base styles (Reset), typography
├── components/  # Individual UI elements (buttons, cards, forms, hero)
├── layout/      # Global blocks (header, footer, grid system)
├── pages/       # Page-specific styles
├── themes/      # (Reserved for themes)
├── vendors/     # Third-party libraries
└── main.scss    # Main file that gathers all modules (@use)
```
---

### 🧠 JavaScript Structure (MVC-like)
```text
public/js/
├── api/
│ ├── http.js # Base Axios wrapper
│ └── items-service.js # API service for courses & enrollments
├── lib/
│ └── Router.js # Custom Hash Router logic
├── views/
│ ├── HomeView.js # Home page rendering
│ ├── CatalogView.js # Catalog page (filters, search, sorting)
│ ├── DetailsView.js # Course details page
│ ├── EnrollmentView.js # Enrollment form logic
│ ├── ListView.js # Course cards rendering component
│ └── PaginationView.js # Pagination component
└── app.js # Application entry point
```
---

## Implemented Features

### 1. Single Page Application (SPA) 🚀

- **Custom Hash Router**
  - Navigation without page reloads:
    - `#/`
    - `#/courses`
    - `#/course/:id`
    - `#/enroll/:id`

- **Dynamic Rendering**
  - Pages are rendered client-side using JavaScript classes and template literals

---

### 2. Advanced Catalog Logic 🔍

- **API Integration**
  - Data fetched from JSON Server using Axios

- **Live Search**
  - Real-time search by course title

- **Filters**
  - Category
  - Difficulty level
  - Duration

- **Sorting**
  - Price
  - Rating
  - Newest courses

- **Pagination**
  - Server-side pagination (`_page`, `_limit`)

---

### 3. Forms & Data Handling 📝


- **POST Requests**
  - Enrollment data submission to `/enrollments`

- **Success Feedback**
  - UI updates after successful submission without page reload

---

### 4. Styles & Layout (SCSS) 🎨

- **Custom Grid System**
  - 12-column grid implemented via SCSS mixins (`row`, `col`)

- **Responsive Design**
  - Fully adaptive for Desktop, Tablet, and Mobile

- **Theming**
  - Centralized variables for colors, fonts, and spacing

- **Utilities**
  - Custom SCSS functions for:
    - `rem()` conversion
    - Color manipulation

---

## 🚀 How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install

2. **Start the server (development mode):**
   ```bash
   npm run dev
This command runs simultaneously:
- Express Server — http://localhost:3000
- JSON Server API — http://localhost:3004
- SCSS Compiler — watch mode

3. **Open the application:**
   ```bash
    http://localhost:3000
