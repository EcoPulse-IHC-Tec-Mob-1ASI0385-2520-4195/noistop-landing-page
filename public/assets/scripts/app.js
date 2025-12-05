document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const sidebarButtons = document.querySelectorAll(".sidebar__item");
  const main = document.querySelector(".main");

  const mainViewByNav = {
    home: "view-home",
    map: "view-map",
    report: "view-create-report",
    noise: "view-noise-measure",
    profile: "view-profile-main",
  };

  function activateNav(navKey) {
    if (!navKey) return;
    sidebarButtons.forEach((btn) => {
      btn.classList.toggle(
        "is-active",
        btn.dataset.viewTarget === navKey
      );
    });
  }

  function showView(viewId, navKey) {
    views.forEach((view) => {
      view.classList.toggle("view--active", view.id === viewId);
    });
    if (navKey) activateNav(navKey);
    if (main) main.scrollTop = 0;
  }

  /* ---- Navegación principal (sidebar) ---- */

  sidebarButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.viewTarget;
      const viewId = mainViewByNav[key];
      if (viewId) showView(viewId, key);
    });
  });

  /* ---- Botones de "volver" ---- */

  document.querySelectorAll("[data-back-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const viewId = btn.dataset.backView;
      const navKey = btn.dataset.backNav || null;
      if (viewId) showView(viewId, navKey);
    });
  });

  /* ---- Home -> Detalle de reporte ---- */

  const reportCard = document.querySelector("[data-open-report]");
  if (reportCard) {
    reportCard.addEventListener("click", () => {
      showView("view-report-detail", "home");
    });
  }

  /* ---- Crear reporte -> Éxito ---- */

  const reportForm = document.getElementById("report-form");
  if (reportForm) {
    reportForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showView("view-report-success", "report");
    });
  }

  /* Botones desde pantallas de éxito (report / comment) */

  document.querySelectorAll("[data-go-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const viewId = btn.dataset.goView;
      const navKey = btn.dataset.goNav || null;
      if (viewId) showView(viewId, navKey);
    });
  });

  /* ---- Detalle de reporte -> Formulario de comentario ---- */

  const addCommentBtn = document.querySelector("[data-open-comment]");
  if (addCommentBtn) {
    addCommentBtn.addEventListener("click", () => {
      showView("view-comment-form", "home");
    });
  }

  /* ---- Formulario de comentario -> Éxito ---- */

  const commentForm = document.getElementById("comment-form-element");
  if (commentForm) {
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      showView("view-comment-success", "home");
    });
  }

  /* ---- Medición de ruido: simulación sencilla ---- */

  const btnMeasureNoise = document.getElementById("btn-measure-noise");
  const noiseValue = document.getElementById("noise-value");
  const noiseLabel = document.getElementById("noise-label");

  if (btnMeasureNoise && noiseValue && noiseLabel) {
    btnMeasureNoise.addEventListener("click", () => {
      const value = Math.floor(Math.random() * 141); // 0 - 140 db
      noiseValue.textContent = `${value} db`;

      let label = "Ambiente silencioso";
      if (value >= 25 && value < 60) {
        label = "Ambiente poco ruidoso";
      } else if (value >= 60 && value < 90) {
        label = "Ambiente ruidoso";
      } else if (value >= 90) {
        label = "Ambiente insoportable";
      }
      noiseLabel.textContent = label;
    });
  }

  /* ---- Audio: simulación sencilla ---- */

  const btnAudioTest = document.getElementById("btn-audio-test");
  const audioStatus = document.getElementById("audio-status");

  if (btnAudioTest && audioStatus) {
    btnAudioTest.addEventListener("click", () => {
      if (btnAudioTest.dataset.active === "1") {
        btnAudioTest.dataset.active = "0";
        audioStatus.textContent = "Sonido detectado";
      } else {
        btnAudioTest.dataset.active = "1";
        audioStatus.textContent = "Probando micrófono...";
      }
    });
  }

  /* ---- Perfil: abrir ajustes y acciones de foto ---- */

/* ========= LÓGICA DE PERFIL ========= */
(function () {
  const profileView = document.querySelector(".view--profile");
  if (!profileView) return; // si no estamos en la vista de perfil, no hacemos nada

  const photoMenu = document.getElementById("profile-photo-menu");
  const avatarTrigger = document.getElementById("profile-avatar-trigger");
  const avatarImg = document.getElementById("profile-avatar-img");
  const avatarFileInput = document.getElementById("file-avatar");
  const passwordInput = document.getElementById("profile-password");
  const togglePasswordBtn = document.getElementById("btn-toggle-password");
  const profileForm = document.getElementById("profile-form");

  const PLACEHOLDER_SRC = "assets/img/profile-placeholder.png"; // ajusta si es otra ruta

  // --- Menú de foto de perfil ---
  function togglePhotoMenu() {
    if (!photoMenu) return;
    photoMenu.hidden = !photoMenu.hidden;
  }

  if (avatarTrigger) {
    avatarTrigger.addEventListener("click", togglePhotoMenu);
  }

  if (photoMenu) {
    photoMenu.addEventListener("click", (event) => {
      const button = event.target.closest("[data-photo-action]");
      if (!button) return;

      const action = button.dataset.photoAction;

      if (action === "update") {
        // Elegir foto desde archivos
        if (avatarFileInput) {
          avatarFileInput.removeAttribute("capture");
          avatarFileInput.click();
        }
      } else if (action === "take") {
        // Tomar foto con cámara (en móviles)
        if (avatarFileInput) {
          avatarFileInput.setAttribute("capture", "user");
          avatarFileInput.click();
        }
      } else if (action === "remove") {
        if (avatarImg) {
          avatarImg.src = PLACEHOLDER_SRC;
        }
        photoMenu.hidden = true;
      }
    });
  }

  // Cuando el usuario selecciona una imagen
  if (avatarFileInput) {
    avatarFileInput.addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file || !avatarImg) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        avatarImg.src = e.target.result;
        if (photoMenu) photoMenu.hidden = true;
      };
      reader.readAsDataURL(file);
    });
  }

  // --- Mostrar / ocultar contraseña ---
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePasswordBtn.setAttribute("aria-pressed", String(isPassword));
    });
  }

  // --- Guardar cambios (solo front) ---
  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Aquí luego podrás enviar los datos a tu backend.
      alert("Cambios de perfil guardados correctamente.");
    });
  }

  // Cerrar menú de foto al hacer clic fuera
  document.addEventListener("click", (event) => {
    if (!photoMenu || photoMenu.hidden) return;
    const isInside =
      photoMenu.contains(event.target) ||
      (avatarTrigger && avatarTrigger.contains(event.target));
    if (!isInside) {
      photoMenu.hidden = true;
    }
  });
})();


  /* ---- Ajustes: audio / ruido / cerrar sesión / categorías ---- */

  const audioFromSettings = document.querySelector(
    "[data-open-audio-from-settings]"
  );
  if (audioFromSettings) {
    audioFromSettings.addEventListener("click", () => {
      // Lo tratamos como parte del módulo de ruido
      showView("view-audio-test", "noise");
    });
  }

  const noiseSettingsBtn = document.querySelector("[data-open-noise-settings]");
  if (noiseSettingsBtn) {
    noiseSettingsBtn.addEventListener("click", () => {
      showView("view-settings-noise", "profile");
    });
  }

  const categoriesBtn = document.querySelector("[data-open-categories]");
  if (categoriesBtn) {
    categoriesBtn.addEventListener("click", () => {
      showView("view-settings-categories", "profile");
    });
  }

  const logoutBtn = document.querySelector("[data-logout]");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const ok = window.confirm(
        "¿Estás seguro de que quieres Cerrar Sesión?"
      );
      if (ok) {
        // Aquí conectas con tu flujo real de cierre de sesión
        window.location.href = "login.html";
      }
    });
  }

  /* ---- Toggle visual (on/off) ---- */

  document.querySelectorAll(".toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("toggle--on");
      const pressed = toggle.classList.contains("toggle--on");
      toggle.setAttribute("aria-pressed", pressed ? "true" : "false");
    });
  });
});
