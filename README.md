# Discendi — IT Courses Platform

Web Development Lab Project. A multi-page website implemented using Server Side Rendering (SSR) technologies and a professional SCSS architecture.

## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Templating:** EJS (Embedded JavaScript templates)
* **Styling:** SCSS (Sass), BEM (Block Element Modifier) methodology
* **Tools:** Nodemon (dev server), Sass compiler

---

## 📂 Project Architecture

The project implements the **7-1 Pattern for SCSS**, ensuring scalability and easy style maintenance:

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

## ✨ Implemented Features (SCSS & Layout)

### 1. Custom Grid System (Bonus 🏆)
Instead of using ready-made libraries (like Bootstrap), a custom grid system was built using SCSS mixins and `sass:math` functions.
* **Mixins:** `row`, `col($size)`, `container`.
* **Logic:** Percentage-based width calculation, support for "gutters" via padding and negative margins.
* **Responsiveness:** Changing the number of columns for Mobile/Tablet/Desktop.

### 2. SCSS Functions & Mixins
* **`rem($pixels)`**: A function to automatically convert pixels to relative `rem` units.
* **`text-style(...)`**: A universal mixin for typography (size, weight, color, font-family, line-height).
* **`mobile`, `tablet`**: Mixins for media queries (Desktop First approach).
* **`tint()`, `shade()`**: Functions to generate color shades (lighter/darker) for hover effects.

### 3. Responsive Design
The website is fully adapted for mobile devices, tablets, and desktops.
* **Desktop First:** Base styles are written for large screens (1440px+).
* **Mobile Version:**
    * Implemented burger menu in the header.
    * Card grid transformation (3 per row -> 1 per row).
    * Adaptation of Hero banners (hiding decorative images, centering text).

### 4. Dynamic Rendering (EJS)
* **Routing:**
    * `/` — Home Page.
    * `/courses` — Courses Catalog (list generation via `forEach` loop).
    * `/course/:id` — Course Details Page (data pulled from an object array by ID).
    * `/enroll/:id` — Enrollment Page (passing course ID into a hidden form field).
* **Components:** Reusable parts (Header, Footer) are extracted into `partials`.

---

## 🚀 How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install

2. **Start the server (development mode):**
   ```bash
   npm run dev
The server will start at http://localhost:3000

3. **Start the SCSS compiler (in a separate terminal):**
   ```bash
    npm run scss