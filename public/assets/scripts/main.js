// ========== Menú móvil ==========

const navToggle = document.querySelector(".nav-toggle");
const mobileNav = document.querySelector("#mobile-nav");

if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isHidden = mobileNav.hasAttribute("hidden");
    if (isHidden) {
      mobileNav.removeAttribute("hidden");
    } else {
      mobileNav.setAttribute("hidden", "true");
    }
    navToggle.setAttribute("aria-expanded", String(isHidden));
  });

  mobileNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".nav__link")) {
      mobileNav.setAttribute("hidden", "true");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ========== Selector de idioma (solo UI) ==========

const langButton = document.querySelector("[data-toggle-lang]");
const langDropdown = document.querySelector("#lang-dropdown");
const langLabel = document.querySelector("[data-lang-label]");

if (langButton && langDropdown) {
  langButton.addEventListener("click", () => {
    const isHidden = langDropdown.hasAttribute("hidden");
    if (isHidden) {
      langDropdown.removeAttribute("hidden");
    } else {
      langDropdown.setAttribute("hidden", "true");
    }
    langButton.setAttribute("aria-expanded", String(isHidden));
  });

  document.addEventListener("click", (event) => {
    if (
      !langDropdown.contains(event.target) &&
      !langButton.contains(event.target)
    ) {
      langDropdown.setAttribute("hidden", "true");
      langButton.setAttribute("aria-expanded", "false");
    }
  });

  langDropdown.addEventListener("change", (event) => {
    const selected = event.target;
    if (selected.name === "lang-choice" && langLabel) {
      langLabel.textContent = selected.value;
    }
  });
}

// ========== Modal de descarga ==========

const downloadModal = document.querySelector("#download-modal");

function openDownloadModal() {
  if (!downloadModal) return;
  downloadModal.removeAttribute("hidden");
}

function closeDownloadModal() {
  if (!downloadModal) return;
  downloadModal.setAttribute("hidden", "true");
}

document
  .querySelectorAll("[data-open-download-modal]")
  .forEach((button) => {
    button.addEventListener("click", openDownloadModal);
  });

if (downloadModal) {
  downloadModal.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target.matches("[data-close-modal]") ||
      target.classList.contains("modal")
    ) {
      closeDownloadModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDownloadModal();
    }
  });
}

// ========== FAQ acordeón ==========

document.querySelectorAll(".faq-item").forEach((item) => {
  const header = item.querySelector(".faq-item__header");
  const panel = item.querySelector(".faq-item__panel");
  if (!header || !panel) return;

  header.addEventListener("click", () => {
    const isExpanded = header.getAttribute("aria-expanded") === "true";

    header.setAttribute("aria-expanded", String(!isExpanded));
    panel.hidden = isExpanded;
  });
});

// ========== Formulario de contacto (mensaje enviado) ==========

const contactForm = document.querySelector("#contact-form");
const contactSuccess = document.querySelector("#contact-success");

if (contactForm && contactSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#name").value.trim();
    const email = contactForm.querySelector("#email").value.trim();
    const reason = contactForm.querySelector("#reason").value;
    const message = contactForm.querySelector("#message").value.trim();

    if (!name || !email || !reason || !message) {
      alert("Por favor completa todos los campos antes de enviar.");
      return;
    }

    // Solo simulamos el envío
    contactSuccess.hidden = false;
    contactForm.reset();

    setTimeout(() => {
      contactSuccess.hidden = true;
    }, 4000);
  });
}

// ========== Año en footer (si lo quisieras) ==========
// Podrías añadir un span con id year en el footer si lo necesitas.
// Dejé el footer con @EcoPulse2025 fijo para seguir tu mockup.
