# INFO498 Textbook Notes Website

This repository contains the source code for the INFO498 textbook notes website. It is a static site built with [11ty (Eleventy)](https://www.11ty.dev/) that serves as a reading companion for the course.

## 🚀 Quick Start for TAs

If you need to make changes to the content (fixing typos, updating links, etc.), follow these steps:

### 1. Prerequisites
- **Node.js**: You need Node.js installed. This project requires Node.js v18 or higher.
- **Text Editor**: VS Code is recommended.

### 2. Setup
Open your terminal in this project folder and run:
```bash
npm install
```

### 3. Run Locally
To preview the site on your computer:
```bash
npm start
```
This will start a local server (usually at `http://localhost:8080`). Changes you make to files will automatically refresh the page.

---

## 📝 Common Tasks

### How to Fix a Typo
Content is stored in **Markdown** files inside the `src/` directory.
1.  Navigate to `src/[book-name]/`.
2.  Open the relevant chapter file (e.g., `ch01.md`).
3.  Make your text changes.
4.  Save the file. The local server will update immediately.

### How to Update Book Metadata
Book titles, authors, Amazon links, and descriptions are stored in a central data file.
-   **File:** `src/_data/books.json`
-   **Format:** JSON

### How to Add a New Book
If a new textbook is adopted for the course:

1.  **Add Metadata:** Add a new entry to `src/_data/books.json`.
    *   **Important:** The `slug` you choose (e.g., `new-book-title`) MUST be unique and will be used for the folder name.
2.  **Create Folder:** Create a new folder in `src/` with the exact same name as your slug (e.g., `src/new-book-title/`).
3.  **Add Chapters:** Add Markdown files to that folder (e.g., `ch01.md`).
    *   Required Front Matter at the top of each markdown file:
        ```yaml
        ---
        chapter: 1
        title: "Chapter 1 Title"
        visible: true
        ---
        ```

---

## 🛠️ Deployment

This site is likely deployed via a service like GitHub Pages or Netlify that watches the `main` branch.
*   **To Publish Changes:** Simply commit your changes and push them to the `main` branch on GitHub.
*   **Manual Build:** If you need to generate the static files manually, run `npm run build`. The output will be in the `_site/` folder.

## 📁 Project Structure

*   `src/`: All source code and content.
    *   `_data/`: Global data files (books list, site metadata).
    *   `_includes/`: HTML templates (Nunjucks `.njk` files).
    *   `[book-slug]/`: Folders containing markdown files for each book's chapters.
*   `.eleventy.js`: Configuration file for the site generator.
*   `package.json`: Project settings and dependencies.