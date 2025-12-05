document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".view");
  const navItems = document.querySelectorAll(".nav-item");
  const settingsButton = document.getElementById("settingsButton");
  const settingsBackButton = document.getElementById("settingsBackButton");
  const logoutRow = document.getElementById("logoutRow");
  const logoutModal = document.getElementById("logoutModal");
  const confirmLogoutButton = document.getElementById("confirmLogoutButton");
  const cancelLogoutButton = document.getElementById("cancelLogoutButton");

  let currentViewId = "view-home";
  let previousViewId = "view-home";

  // Helper to show view ------------------------------------------------------

  function showView(viewId, { fromNav = false } = {}) {
    if (!viewId) return;

    views.forEach((v) => {
      v.classList.toggle("active", v.id === viewId);
    });

    if (!fromNav && viewId !== "view-settings") {
      // keep nav highlight when going into internals like detail / profile photo, etc.
      // nothing extra
    }

    currentViewId = viewId;
  }

  function setNavActiveByView(viewId) {
    navItems.forEach((btn) => {
      const target = btn.dataset.view;
      btn.classList.toggle("active", target === viewId);
    });
  }

  // Navigation from sidebar --------------------------------------------------

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetView = btn.dataset.view;
      previousViewId = targetView;
      setNavActiveByView(targetView);
      showView(targetView, { fromNav: true });
    });
  });

  // Back buttons (simple ones that point to a specific view) -----------------

  document.querySelectorAll(".back-button[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.back;
      if (!target) return;
      showView(target);
      // also re-sync nav for root-level views
      setNavActiveByView(target);
    });
  });

  // Home -> Report detail ----------------------------------------------------

  const homeReportCard = document.getElementById("homeReportCard");
  if (homeReportCard) {
    homeReportCard.addEventListener("click", () => {
      previousViewId = "view-home";
      showView("view-report-detail");
    });
  }

  // Report detail -> Comment form -------------------------------------------

  const addCommentButton = document.getElementById("addCommentButton");
  if (addCommentButton) {
    addCommentButton.addEventListener("click", () => {
      showView("view-comment-form");
    });
  }

  // Comment form submit ------------------------------------------------------

  const commentForm = document.getElementById("commentForm");
  if (commentForm) {
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Simulado: solo mostramos pantalla de éxito.
      showView("view-comment-success");
    });
  }

  // Comment success buttons reuse back-button handler via data-back ---------

  document
    .querySelectorAll("#view-comment-success .secondary-button[data-back]")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.back;
        showView(target);
        setNavActiveByView("view-home");
      });
    });

  // Settings gear -----------------------------------------------------------

  settingsButton.addEventListener("click", () => {
    previousViewId = currentViewId;
    showView("view-settings");
    // no nav item active while en ajustes
    navItems.forEach((n) => n.classList.remove("active"));
  });

  settingsBackButton.addEventListener("click", () => {
    showView(previousViewId);
    setNavActiveByView(previousViewId);
  });

  // Settings: go to Audio / Noise screens -----------------------------------

  const settingsAudioButton = document.getElementById("settingsAudioButton");
  const settingsNoiseButton = document.getElementById("settingsNoiseButton");

  if (settingsAudioButton) {
    settingsAudioButton.addEventListener("click", () => {
      showView("view-audio-settings");
    });
  }

  if (settingsNoiseButton) {
    settingsNoiseButton.addEventListener("click", () => {
      showView("view-noise-settings");
    });
  }

  // Logout modal -------------------------------------------------------------

  logoutRow.addEventListener("click", () => {
    logoutModal.classList.remove("hidden");
  });

  cancelLogoutButton.addEventListener("click", () => {
    logoutModal.classList.add("hidden");
  });

  confirmLogoutButton.addEventListener("click", () => {
    // Simulación de cierre de sesión: redirige al login.
    window.location.href = "login.html";
  });

  // CREATE REPORT ------------------------------------------------------------

  const createReportForm = document.getElementById("createReportForm");
  const uploadMediaButton = document.getElementById("uploadMediaButton");
  const reportMediaInput = document.getElementById("reportMediaInput");
  const mediaPreview = document.getElementById("mediaPreview");

  if (uploadMediaButton && reportMediaInput) {
    uploadMediaButton.addEventListener("click", () => {
      reportMediaInput.click();
    });
  }

  if (reportMediaInput && mediaPreview) {
    reportMediaInput.addEventListener("change", () => {
      mediaPreview.innerHTML = "";
      Array.from(reportMediaInput.files).forEach((file) => {
        const tag = document.createElement("span");
        tag.className = "media-tag";
        tag.textContent = file.name;
        mediaPreview.appendChild(tag);
      });
    });
  }

  if (createReportForm) {
    createReportForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Simulación: no se guardan datos reales.
      createReportForm.reset();
      if (mediaPreview) mediaPreview.innerHTML = "";
      showView("view-report-success");
    });
  }

  // REPORTE PUBLICADO - botones ---------------------------------------------

  document
    .querySelectorAll("#view-report-success .secondary-button[data-back]")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.back;
        showView(target);
        if (target === "view-home") {
          setNavActiveByView("view-home");
        }
      });
    });

  // NOISE MEASUREMENT --------------------------------------------------------

  const measureButton = document.getElementById("measureButton");
  const decibelDisplay = document.getElementById("decibelDisplay");
  const environmentText = document.getElementById("environmentText");
  const noiseWave = document.getElementById("noiseWave");

  if (measureButton && decibelDisplay && environmentText && noiseWave) {
    measureButton.addEventListener("click", () => {
      startNoiseMeasurement();
    });
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function describeEnvironment(db) {
    if (db <= 20) return "Ambiente silencioso";
    if (db <= 60) return "Ambiente poco ruidoso";
    if (db <= 100) return "Ambiente ruidoso";
    return "Ambiente insoportable";
  }

  function startNoiseMeasurement() {
    measureButton.disabled = true;
    measureButton.textContent = "Midiendo...";
    noiseWave.classList.add("active");

    let elapsed = 0;
    let finalValue = 0;

    const interval = setInterval(() => {
      elapsed += 200;
      const value = randomInt(0, 150);
      decibelDisplay.textContent = value + " db";
      finalValue = value;

      if (elapsed >= 2000) {
        clearInterval(interval);
        noiseWave.classList.remove("active");
        measureButton.disabled = false;
        measureButton.textContent = "Medir";
        environmentText.textContent = describeEnvironment(finalValue);
      }
    }, 200);
  }

  // AUDIO TEST ---------------------------------------------------------------

  const audioTestButton = document.getElementById("audioTestButton");
  const testDecibelDisplay = document.getElementById("testDecibelDisplay");
  const audioWave = document.getElementById("audioWave");
  const audioStatusText = document.getElementById("audioStatusText");

  if (audioTestButton && testDecibelDisplay && audioWave && audioStatusText) {
    audioTestButton.addEventListener("click", () => {
      audioWave.classList.add("active");
      audioStatusText.textContent = "Sonido detectado";
      let elapsed = 0;
      const interval = setInterval(() => {
        elapsed += 200;
        const value = randomInt(30, 80);
        testDecibelDisplay.textContent = value + " db";
        if (elapsed >= 1600) {
          clearInterval(interval);
          audioWave.classList.remove("active");
        }
      }, 200);
    });
  }

  // NOISE SETTINGS TOGGLES (simulados) --------------------------------------

  const noiseLimitToggle = document.getElementById("noiseLimitToggle");
  const noiseHourlyToggle = document.getElementById("noiseHourlyToggle");
  const noiseCategorySelect = document.getElementById("noiseCategorySelect");

  [noiseLimitToggle, noiseHourlyToggle, noiseCategorySelect].forEach(
    (el) => {
      if (!el) return;
      el.addEventListener("change", () => {
        // Solo simulación: podrías guardar en localStorage si quisieras.
      });
    }
  );

  // MAPA ---------------------------------------------------------------------

  const mapCategorySelect = document.getElementById("mapCategory");
  const mapZones = document.querySelectorAll(".map-zone");

  if (mapCategorySelect && mapZones.length) {
    function updateMap() {
      const value = mapCategorySelect.value;
      mapZones.forEach((zone) => {
        const category = zone.dataset.category;
        zone.classList.remove("highlight", "dimmed");

        if (value === "all") {
          // todas visibles
          zone.classList.remove("dimmed");
        } else if (category === value) {
          zone.classList.add("highlight");
        } else {
          zone.classList.add("dimmed");
        }
      });
    }

    mapCategorySelect.addEventListener("change", updateMap);
    updateMap();
  }

  // PERFIL -------------------------------------------------------------------

  const profileForm = document.getElementById("profileForm");
  const profileNameInput = document.getElementById("profileName");
  const profileEmailInput = document.getElementById("profileEmail");
  const profilePasswordInput = document.getElementById("profilePassword");
  const togglePasswordButton = document.getElementById("togglePassword");
  const profileSaveMessage = document.getElementById("profileSaveMessage");
  const profilePhoto = document.getElementById("profilePhoto");
  const profilePhotoContainer = document.getElementById(
    "profilePhotoContainer"
  );
  const editPhotoButton = document.getElementById("editPhotoButton");
  const photoMenuOverlay = document.getElementById("photoMenuOverlay");
  const btnUpdatePhoto = document.getElementById("btnUpdatePhoto");
  const btnTakePhoto = document.getElementById("btnTakePhoto");
  const btnDeletePhoto = document.getElementById("btnDeletePhoto");
  const btnClosePhotoMenu = document.getElementById("btnClosePhotoMenu");
  const uploadPhotoInput = document.getElementById("uploadPhotoInput");
  const capturePhotoInput = document.getElementById("capturePhotoInput");

  const PROFILE_STORAGE_KEY = "ecoPulseProfile";

  function loadProfileFromStorage() {
    const defaultProfile = {
      name: "Leguer Silva",
      email: "leguersilva@gmail.com",
      password: "****************",
      photo: null,
    };

    let data = defaultProfile;
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        data = Object.assign({}, defaultProfile, parsed);
      } catch (err) {
        // ignore
      }
    }

    if (profileNameInput) profileNameInput.value = data.name;
    if (profileEmailInput) profileEmailInput.value = data.email;
    if (profilePasswordInput) profilePasswordInput.value = data.password;

    if (profilePhoto) {
      if (data.photo) {
        profilePhoto.src = data.photo;
        profilePhoto.dataset.photoData = data.photo;
        profilePhoto.style.display = "block";
      } else {
        // si no hay foto guardada, se deja la que venga por defecto del HTML
      }
    }
  }

  function saveProfileToStorage() {
    if (!profileNameInput || !profileEmailInput || !profilePasswordInput) {
      return;
    }

    const data = {
      name: profileNameInput.value.trim(),
      email: profileEmailInput.value.trim(),
      password: profilePasswordInput.value,
      photo: profilePhoto ? profilePhoto.dataset.photoData || null : null,
    };

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      // si falla (p.e. por tamaño) simplemente ignoramos
    }
  }

  loadProfileFromStorage();

  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      saveProfileToStorage();
      if (profileSaveMessage) {
        profileSaveMessage.classList.remove("hidden");
        setTimeout(() => {
          profileSaveMessage.classList.add("hidden");
        }, 2000);
      }
    });
  }

  if (togglePasswordButton && profilePasswordInput) {
    togglePasswordButton.addEventListener("click", () => {
      const isPassword = profilePasswordInput.type === "password";
      profilePasswordInput.type = isPassword ? "text" : "password";
    });
  }

  function openPhotoMenu() {
    if (photoMenuOverlay) {
      photoMenuOverlay.classList.remove("hidden");
    }
  }

  function closePhotoMenu() {
    if (photoMenuOverlay) {
      photoMenuOverlay.classList.add("hidden");
    }
  }

  if (profilePhotoContainer) {
    profilePhotoContainer.addEventListener("click", openPhotoMenu);
    profilePhotoContainer.addEventListener("keypress", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        openPhotoMenu();
      }
    });
  }

  if (editPhotoButton) {
    editPhotoButton.addEventListener("click", openPhotoMenu);
  }

  if (btnClosePhotoMenu) {
    btnClosePhotoMenu.addEventListener("click", closePhotoMenu);
  }

  function handlePhotoFileInput(input) {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (profilePhoto) {
        profilePhoto.src = reader.result;
        profilePhoto.dataset.photoData = reader.result;
        profilePhoto.style.display = "block";
      }
      saveProfileToStorage();
      closePhotoMenu();
      input.value = "";
    };
    reader.readAsDataURL(file);
  }

  if (btnUpdatePhoto && uploadPhotoInput) {
    btnUpdatePhoto.addEventListener("click", () => {
      uploadPhotoInput.click();
    });

    uploadPhotoInput.addEventListener("change", () => {
      handlePhotoFileInput(uploadPhotoInput);
    });
  }

  if (btnTakePhoto && capturePhotoInput) {
    btnTakePhoto.addEventListener("click", () => {
      capturePhotoInput.click();
    });

    capturePhotoInput.addEventListener("change", () => {
      handlePhotoFileInput(capturePhotoInput);
    });
  }

  if (btnDeletePhoto && profilePhoto) {
    btnDeletePhoto.addEventListener("click", () => {
      profilePhoto.src = "assets/images/profile-default.png";
      profilePhoto.dataset.photoData = "";
      saveProfileToStorage();
      closePhotoMenu();
    });
  }

  // LANGUAGE SIMULATION ------------------------------------------------------

  const languageSelect = document.getElementById("languageSelect");
  const translations = {
    es: {
      settingsTitle: "Ajustes",
      settingsAudio: "Audio",
      settingsLanguage: "Idioma",
      settingsNoise: "Ruido",
      settingsLogout: "Cerrar sesión",
      navHome: "Inicio",
      navMap: "Mapa",
      navCreate: "Crear Reporte",
      navNoise: "Medición de ruido",
      navProfile: "Perfil",
      homeTitle: "Reportes de la comunidad",
      mapTitle: "Mapa de ruido de Lima",
      createTitle: "Reportar medición de ruido",
    },
    en: {
      settingsTitle: "Settings",
      settingsAudio: "Audio",
      settingsLanguage: "Language",
      settingsNoise: "Noise",
      settingsLogout: "Log Out",
      navHome: "Home",
      navMap: "Map",
      navCreate: "Create report",
      navNoise: "Noise measure",
      navProfile: "Profile",
      homeTitle: "Community reports",
      mapTitle: "Lima noise map",
      createTitle: "Report noise measurement",
    },
  };

  function applyLanguage(lang) {
    const t = translations[lang] || translations.es;

    const get = (selector) => document.querySelector(selector);

    const settingsTitle = document.querySelector(
      '[data-i18n-key="settingsTitle"]'
    );
    const settingsAudio = document.querySelector(
      '[data-i18n-key="settingsAudio"]'
    );
    const settingsLanguage = document.querySelector(
      '[data-i18n-key="settingsLanguage"]'
    );
    const settingsNoise = document.querySelector(
      '[data-i18n-key="settingsNoise"]'
    );
    const settingsLogout = document.querySelector(
      '[data-i18n-key="settingsLogout"]'
    );
    const homeTitle = document.querySelector('[data-i18n-key="homeTitle"]');
    const mapTitle = document.querySelector('[data-i18n-key="mapTitle"]');
    const createTitle = document.querySelector('[data-i18n-key="createTitle"]');

    if (settingsTitle) settingsTitle.textContent = t.settingsTitle;
    if (settingsAudio) settingsAudio.textContent = t.settingsAudio;
    if (settingsLanguage) settingsLanguage.textContent = t.settingsLanguage;
    if (settingsNoise) settingsNoise.textContent = t.settingsNoise;
    if (settingsLogout) settingsLogout.textContent = t.settingsLogout;
    if (homeTitle) homeTitle.textContent = t.homeTitle;
    if (mapTitle) mapTitle.textContent = t.mapTitle;
    if (createTitle) createTitle.textContent = t.createTitle;

    // nav labels
    const navHome = document.querySelector('[data-nav="home"] .nav-label');
    const navMap = document.querySelector('[data-nav="map"] .nav-label');
    const navCreate = document.querySelector('[data-nav="create"] .nav-label');
    const navNoise = document.querySelector('[data-nav="noise"] .nav-label');
    const navProfile = document.querySelector(
      '[data-nav="profile"] .nav-label'
    );

    if (navHome) navHome.textContent = t.navHome;
    if (navMap) navMap.textContent = t.navMap;
    if (navCreate) navCreate.textContent = t.navCreate;
    if (navNoise) navNoise.textContent = t.navNoise;
    if (navProfile) navProfile.textContent = t.navProfile;

    document.documentElement.lang = lang;
    localStorage.setItem("ecoPulseLanguage", lang);
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      applyLanguage(languageSelect.value);
    });

    const storedLang = localStorage.getItem("ecoPulseLanguage") || "es";
    languageSelect.value = storedLang;
    applyLanguage(storedLang);
  }
});
