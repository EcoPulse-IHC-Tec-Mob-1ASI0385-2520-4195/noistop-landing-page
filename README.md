# 🌐 NoisTop Landing Page

This repository contains the **NoisTop Landing Page**, a responsive website that presents the **EcoPulse** startup and its digital product focused on noise pollution awareness and monitoring in urban environments.  
It is developed as part of the **SI385 – HCI and Mobile Technologies** course at **Universidad Peruana de Ciencias Aplicadas (UPC)**.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage & Content](#-usage--content)
- [Branching Model](#-branching-model)
- [License](#-license)
- [Authors](#-authors--ecopulse-startup-team)

---

## 💡 Overview

**NoisTop** is a digital product by **EcoPulse** designed to help people understand and manage the impact of **environmental noise** in their daily lives.  
The **landing page** acts as the main public entry point to:

- Explain the **problem** of noise pollution.
- Present the **value proposition** and **business model** of EcoPulse.
- Introduce the **web and mobile applications** (iOS / Android) that complement the experience.
- Centralize access to **videos**, **prototypes**, and **validation evidence** required by the course.

---

## 🧱 Tech Stack

The landing page is implemented with a **lightweight, framework-free** stack:

- 🧾 **HTML5** – Semantic structure and accessible markup.
- 🎨 **CSS3** – Responsive layout using Flexbox and/or Grid, plus custom styling.
- ⚙️ **JavaScript (ES6+)** – Progressive enhancement for interactions (navigation, smooth scroll, simple toggles, etc.).

---

## 📁 Project Structure

```bash
noistop-landing-page/
├─ assets/                 # Static assets used by the landing page
│  ├─ img/                 # Logos, illustrations, UI mockups, icons
│  └─ video/               # Thumbnails or local video files (if needed)
│
├─ css/                    # Stylesheets for layout, components and responsiveness
│  └─ styles.css           # Main CSS file for the NoisTop landing page
│
├─ docs/                   # Additional documentation related to the project
│  ├─ screenshots/         # Screenshots for reports (desktop/tablet/mobile views)
│  └─ about-the-product.md # Info and link for the About-the-Product video
│
├─ js/                     # JavaScript files for basic interactions
│  └─ main.js              # Main script (navigation, toggles, simple UI behavior)
│
├─ .gitignore              # Git ignore rules (node_modules, OS files, editor configs, etc.)
├─ CONTRIBUTING.md         # Collaboration guidelines (branches, commits, workflow)
├─ index.html              # Main entry HTML file for the NoisTop landing page
├─ LICENSE                 # Project license (MIT or similar)
└─ README.md               # Main project overview and usage instructions
```

---

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/<org-or-user>/noistop-landing-page.git
cd noistop-landing-page
```

### 2. Open the landing page

**Option A – Directly in the browser**

1. Go to the `src` folder.  
2. Open `index.html` with your browser.

**Option B – Using a local server (recommended)**

If you use **VS Code** with the *Live Server* extension:

1. Open the project folder in VS Code.  
2. Right-click `src/index.html`.  
3. Select **“Open with Live Server”**.  
4. The landing page will open at `http://localhost:<port>`.

---

## 🌍 Deployment (GitHub Pages)

The landing page is designed to be deployed using **GitHub Pages**.

1. Push the `main` branch to GitHub.  
2. In your repository, go to **Settings → Pages**.  
3. Under **Source**, choose:
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. Save and wait a few minutes.

The site will be available at:

```text
https://<org-or-user>.github.io/noistop-landing-page/
```

This public URL can be referenced in the course report and in the **About-the-Product** video.

---

## 🌿 Branching Model

This repository follows a simplified **GitFlow-inspired** model:

| Branch      | Description                                |
|:------------|:-------------------------------------------|
| `main`      | Stable, production-ready landing page.     |
| `develop`   | Integration branch for active development. |
| `feature/*` | One branch per feature/section. |

Detailed rules for feature, release, and hotfix branches are documented in **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

---

## 🧠 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## 👥 Authors — EcoPulse Startup Team

| Name | ID |
|:--|:--|
| Ever Giusephi Carlos Lavado | u202224867 |
| Luis Angel Montañez Moreno | u202223811 |
| Rodrigo Mendoza Hidalgo | u202514194 |
| Leguer Alvaro Silva Zamora | u20221c546 |
| Ronaldo Torres Lizana | u20241e381 |
