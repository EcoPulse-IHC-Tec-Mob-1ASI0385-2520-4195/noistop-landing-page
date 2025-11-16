# 🤝 Contributing Guidelines – NoisTop Landing Page

Internal collaboration guide for the **EcoPulse Startup** working on the  
**NoisTop Landing Page** as part of the **SI385 – HCI and Mobile Technologies** course.

This document defines standards for **version control, branching, commits, workflow, and code style**.

---

## 🌿 Branching Model — GitFlow

We use a **GitFlow-inspired** model with semantic versions and course milestones.

### Main Branches

| Branch   | Purpose |
|:--------|:--------|
| **main** | Stable and production-ready landing page (deployed version). |
| **develop** | Integration branch for active development and approved features. |

### Supporting Branches

| Branch pattern      | Purpose |
|:--------------------|:--------|
| **feature/**        | One per feature or section of the landing page. |
| **release/**        | Temporary branches to prepare deliverables (TP1, TB1, TB2, TF1). |
| **hotfix/**         | Emergency fixes for `main` after a release. |

#### Naming examples

- Features (sections / improvements)
  - `feature/hero-section-layout`
  - `feature/mobile-navbar`
  - `feature/about-product-video`
  - `feature/accessibility-a11y`

- Releases (course deliverables)
  - `release/tp1`
  - `release/tb1`
  - `release/tb2`
  - `release/tf1`

- Hotfixes
  - `hotfix/fix-broken-video-embed`
  - `hotfix/update-contact-link`

---

## 💬 Commit Convention – Conventional Commits

We follow **Conventional Commits** to keep history clean and readable.

### Allowed types

| Type      | Description |
|:----------|:------------|
| `feat:`   | Add a new feature or section to the landing page. |
| `fix:`    | Fix a bug, layout problem, or broken link. |
| `style:`  | Pure visual/CSS changes (spacing, colors, typography). |
| `refactor:` | Code or structure changes without altering behavior. |
| `chore:`  | Repository maintenance (config, tooling, assets renaming). |
| `docs:`   | Changes to README, CONTRIBUTING, or inline comments. |

### Examples

```bash
feat: add responsive hero section
fix: correct navigation anchor links
style: improve typography scale for mobile
refactor: reorganize css folder structure
chore: add favicon and social preview image
docs: update readme with deployment steps
```

**Rules**

- Messages in **English**.
- Use present tense and be concise.
- One logical change per commit when possible.

---

## 🔄 Workflow for Contributions

1. **Sync the latest version**

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create your feature branch**

   ```bash
   git checkout -b feature/<section-or-feature-name>
   git push -u origin feature/<section-or-feature-name>
   ```

3. **Develop locally**

   - Edit `index.html`, `css/styles.css`, `js/main.js`, and assets.
   - Test layout on **mobile and desktop** resolutions.
   - Validate contrast and basic accessibility (semantic tags, `alt` attributes, ARIA where needed).

4. **Commit your changes**

   - Use the **Conventional Commits** format.
   - Make sure changes are consistent with the visual and UX guidelines.

5. **Push and open a Pull Request**

   ```bash
   git push
   # Then open a PR from your feature branch into `develop` on GitHub
   ```

6. **Review & merge**

   - At least **one teammate** reviews the PR (naming, structure, responsiveness, content).
   - After approval, merge into `develop`.
   - `develop` is merged into `main` only for stable releases (TP1, TB1, TB2, TF1).

---

## 🧪 Testing & Validation Checklist

Before requesting a merge:

- ✅ Page loads correctly from `index.html`.
- ✅ Navigation anchors work and scroll to correct sections.
- ✅ Layout is responsive for:
  - Small screens (~360–414px width).
  - Tablet (~768px width).
  - Desktop (≥1024px width).
- ✅ Images have **descriptive** `alt` attributes.
- ✅ Links to external content (Figma, videos, docs) are valid.
- ✅ Embedded **About-the-Product** video plays correctly (if already integrated).

---

## 🧹 Code & Style Standards

To align with course requirements and UX best practices:

### General

- Use **English** for:
  - File names
  - CSS classes
  - IDs
  - Git branches
  - Commit messages
- Prefer **semantic HTML**:
  - `header`, `nav`, `main`, `section`, `article`, `footer`, etc.
- Keep consistent indentation (2 or 4 spaces, but always the same across files).

### HTML

- Follow basic conventions inspired by:
  - *HTML Style Guide and Coding Conventions*
  - *Google HTML/CSS Style Guide*
- Keep structure clear and grouped logically by sections.
- Avoid deeply nested elements when not necessary.

### CSS

- Organize CSS from **global to specific**:
  - Reset / base
  - Typography
  - Layout
  - Components / sections
- Use **responsive units** (`rem`, `%`, `vh`, `vw`) when possible.
- Group related styles and add comments for major sections:
  - `/* Hero Section */`
  - `/* Features Section */`
  - `/* Footer */`

### JavaScript

- Use modern ES6+ features:
  - `const`, `let`
  - Arrow functions where appropriate
- Keep scripts in `js/main.js`:
  - Navigation toggles
  - Smooth scrolling
  - Simple DOM interactions
- Avoid heavy libraries unless strictly necessary.

---

## 🧩 Versioning

We use **Semantic Versioning (SemVer)**:

`MAJOR.MINOR.PATCH` → `vX.Y.Z`

| Version  | Deliverable | Description |
|:---------|:------------|:------------|
| `v0.1.0` | TP1         | First public iteration of the landing page (basic sections + responsive layout). |
| `v0.2.0` | TB1         | Improved content, refined structure, initial accessibility and video placeholders. |
| `v0.3.0` | TB2         | Final UX refinements, better IA, and polished responsive behavior. |
| `v1.0.0` | TF1         | Final landing page with embedded videos and post-validation adjustments. |

Update the version tag in Git (and optionally in the footer of the landing page) for each official release.

---

## 📬 Team Contact

**EcoPulse Startup – NoisTop Product**  
Course: *SI385 – HCI and Mobile Technologies*  
University: *Universidad Peruana de Ciencias Aplicadas (UPC)*  

For questions about contributions, open an **Issue** or contact the **Team Leader** through the official course communication channels.
