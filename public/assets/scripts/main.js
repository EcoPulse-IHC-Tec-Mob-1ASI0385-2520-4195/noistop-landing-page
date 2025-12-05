document.addEventListener("DOMContentLoaded", () => {
  /* ======================= NAVBAR & SCROLL-SPY ======================= */

  const desktopNavLinks = document.querySelectorAll(
    ".topbar .nav__link[href^='#']"
  );
  const mobileNavLinks = document.querySelectorAll(
    "#mobile-nav .nav__link[href^='#']"
  );
  const allNavLinks = [...desktopNavLinks, ...mobileNavLinks];

  const sectionsIds = ["inicio", "beneficios", "testimonios", "faq", "planes", "contacto"];
  const sections = sectionsIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActiveNavLink(targetId) {
    allNavLinks.forEach((link) => {
      const hrefId = link.getAttribute("href").slice(1);
      if (hrefId === targetId) {
        link.classList.add("nav__link--active");
      } else {
        link.classList.remove("nav__link--active");
      }
    });
  }

  // Smooth scroll + click active
  allNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;

      const targetId = hash.slice(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveNavLink(targetId);

      // Cerrar menú móvil si está abierto
      if (!mobileNav.hidden) {
        mobileNav.hidden = true;
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Scroll spy con IntersectionObserver
  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sectionsIds.includes(id)) {
              setActiveNavLink(id);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Estado inicial si hay hash en la URL
  if (location.hash) {
    const initialId = location.hash.slice(1);
    if (sectionsIds.includes(initialId)) {
      setActiveNavLink(initialId);
    }
  }

  /* ======================= NAV MÓVIL TOGGLE ======================= */

  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = !mobileNav.hidden;
      mobileNav.hidden = isOpen;
      navToggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  /* ======================= FAQ ACCORDION ======================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-item__header");
    const panel = item.querySelector(".faq-item__panel");
    if (!header || !panel) return;

    header.addEventListener("click", () => {
      const isOpen = header.getAttribute("aria-expanded") === "true";

      // Cerrar todos
      faqItems.forEach((otherItem) => {
        const otherHeader = otherItem.querySelector(".faq-item__header");
        const otherPanel = otherItem.querySelector(".faq-item__panel");
        if (!otherHeader || !otherPanel) return;
        otherHeader.setAttribute("aria-expanded", "false");
        otherPanel.hidden = true;
      });

      // Abrir el actual si estaba cerrado
      if (!isOpen) {
        header.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });

  /* ======================= TESTIMONIOS CARRUSEL ======================= */

  const track = document.querySelector(".testimonials-track");
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.querySelector(".testimonial-nav--prev");
  const nextBtn = document.querySelector(".testimonial-nav--next");
  const dots = document.querySelectorAll("[data-testimonial-dot]");

  let currentTestimonialIndex = 0;

  function updateTestimonialSlider(newIndex) {
    if (!track || slides.length === 0) return;

    const maxIndex = slides.length - 1;
    currentTestimonialIndex = Math.max(0, Math.min(newIndex, maxIndex));

    track.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle("dot--active", idx === currentTestimonialIndex);
    });
  }

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener("click", () => {
      updateTestimonialSlider(currentTestimonialIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      updateTestimonialSlider(currentTestimonialIndex + 1);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.dataset.testimonialDot || 0);
      updateTestimonialSlider(idx);
    });
  });

  // Swipe simple en desktop/móvil
  let startX = null;

  if (track) {
    track.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
    });

    track.addEventListener("pointerup", (event) => {
      if (startX === null) return;
      const diff = event.clientX - startX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          updateTestimonialSlider(currentTestimonialIndex + 1);
        } else {
          updateTestimonialSlider(currentTestimonialIndex - 1);
        }
      }
      startX = null;
    });

    track.addEventListener("pointerleave", () => {
      startX = null;
    });
  }

  // Estado inicial
  updateTestimonialSlider(0);


  /* ======================= MODAL DESCARGA ======================= */

  const modal = document.getElementById("download-modal");
  const openModalButtons = document.querySelectorAll("[data-open-download-modal]");
  const closeModalElements = document.querySelectorAll("[data-close-modal]");

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  openModalButtons.forEach((btn) =>
    btn.addEventListener("click", openModal)
  );

  closeModalElements.forEach((el) =>
    el.addEventListener("click", closeModal)
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  /* ======================= FORMULARIO CONTACTO ======================= */

  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (contactSuccess) {
        contactSuccess.hidden = false;
      }
      contactForm.reset();
    });
  }

  /* ======================= I18N: IDIOMAS ES / EN ======================= */

  const translations = {
    ES: {
      "nav.home": "Inicio",
      "nav.benefits": "Beneficios",
      "nav.testimonials": "Testimonios",
      "nav.faq": "Preguntas frecuentes",
      "nav.plans": "Planes",
      "nav.contact": "Contacto",
      "nav.login": "Iniciar sesión",

      "hero.titleLine1": "Monitorea el ruido de tu entorno",
      "hero.titleLine2": "y protege tu bienestar",
      "hero.text":
        "EcoPulse te permite medir, visualizar y reportar niveles de ruido en tiempo real.",
      "hero.cta": "Descargar App",

      "about.title": "¿Qué es EcoPulse?",
      "about.subtitle":
        "La app que convierte el ruido urbano en información útil para tu bienestar.",
      "about.card1":
        "EcoPulse es una plataforma ciudadana que permite medir, visualizar y reportar la contaminación sonora en tiempo real. Utiliza el micrófono de tu smartphone para registrar los niveles de ruido en tu entorno y transforma esos datos en mapas de calor colaborativos.",
      "about.card2":
        "Nuestro objetivo es empoderar a las personas para mejorar la calidad acústica de las ciudades, promoviendo decisiones informadas y entornos más saludables.",
      "about.cta": "Conoce más sobre cómo funciona EcoPulse",

      "benefits.title": "Beneficios de usar EcoPulse",
      "benefits.card1.title": "Mide el ruido en tiempo real",
      "benefits.card1.text":
        "Usa el micrófono de tu smartphone para conocer al instante los niveles de ruido en tu entorno y tomar decisiones informadas sobre tu exposición sonora.",
      "benefits.card2.title": "Visualiza mapas sonoros colaborativos",
      "benefits.card2.text":
        "Explora un mapa interactivo que muestra las zonas más tranquilas o ruidosas de tu ciudad, construido con los reportes de la comunidad.",
      "benefits.card3.title":
        "Reporta focos de contaminación acústica",
      "benefits.card3.text":
        "Envía alertas sobre fuentes de ruido molestas, como tráfico u obras, y contribuye con las autoridades y vecinos a mejorar el entorno urbano.",
      "benefits.card4.title":
        "Protege tu bienestar y salud auditiva",
      "benefits.card4.text":
        "Reduce tu exposición a ruidos dañinos, mejora tu descanso y ayuda a construir ciudades más saludables y sostenibles.",
      "benefits.cta": "Descargar App",

      "testimonials.title": "Lo que opinan nuestros usuarios",
      "testimonials.1.text":
        "“Con EcoPulse entendí cuánto afecta el ruido a mi descanso. Ahora elijo rutas y horarios más tranquilos.”",
      "testimonials.1.author": "Liliana V. – Surco",
      "testimonials.2.text":
        "“Por fin tengo una forma de demostrar el exceso de ruido en mi barrio. Me hace sentir parte del cambio.”",
      "testimonials.2.author": "Alex S. – La Victoria",
      "testimonials.3.text":
        "“Uso los mapas de EcoPulse para recomendar hospedajes más silenciosos a mis clientes.”",
      "testimonials.3.author": "Giancarlo R. – La Molina",
      "testimonials.cta": "Descarga EcoPulse y mejora tu entorno",

      "faq.title": "Preguntas frecuentes",
      "faq.q1": "¿Qué es EcoPulse?",
      "faq.a1":
        "Es una aplicación ciudadana que mide y reporta la contaminación sonora en tiempo real para promover entornos más saludables.",
      "faq.q2": "¿Cómo mide el ruido mi teléfono?",
      "faq.a2":
        "La app utiliza el micrófono del dispositivo para registrar los niveles de sonido y los transforma en datos de decibelios (dB).",
      "faq.q3": "¿Qué hago con los reportes que genero?",
      "faq.a3":
        "Puedes compartirlos con tu comunidad o con las autoridades locales para mejorar la gestión del ruido urbano.",
      "faq.q4": "¿La aplicación es gratuita?",
      "faq.a4":
        "Sí, EcoPulse ofrece una versión gratuita para ciudadanos y una versión profesional con reportes avanzados para instituciones.",
      "faq.cta": "¿Aún tienes dudas? Contáctanos aquí",

      "plans.title": "Planes que se adaptan a tu necesidad",
      "plans.subtitle":
        "Empieza gratis o elige una versión profesional para tu organización.",
      "plans.citizen.title": "Plan ciudadano (Gratis)",
      "plans.citizen.item1": "Acceso gratuito a la app móvil",
      "plans.citizen.item2": "Medición de ruido en tiempo real",
      "plans.citizen.item3": "Mapa de calor comunitario",
      "plans.citizen.item4": "Alertas personalizadas",
      "plans.citizen.item5": "Disponible para todos los usuarios",
      "plans.citizen.cta": "Descargar App",
      "plans.corporate.title": "Plan corporativo (Premium)",
      "plans.corporate.item1": "Panel de control institucional",
      "plans.corporate.item2": "Reportes avanzados y dashboards",
      "plans.corporate.item3": "Exportación de datos y análisis",
      "plans.corporate.item4": "Soporte y asesoría técnica",
      "plans.corporate.item5":
        "Disponible para entidades organizacionales",
      "plans.corporate.cta": "Solicitar demo",

      "contact.form.title": "Contáctanos",
      "contact.form.name.label": "Nombre",
      "contact.form.email.label": "Correo electrónico",
      "contact.form.reason.label": "Motivo",
      "contact.form.reason.placeholder": "Selecciona una opción",
      "contact.form.reason.option1": "Consulta",
      "contact.form.reason.option2": "Sugerencia",
      "contact.form.reason.option3": "Alianza",
      "contact.form.message.label": "Mensaje",
      "contact.form.message.placeholder":
        "Cuéntanos brevemente cómo podemos ayudarte",
      "contact.form.name.placeholder": "Tu nombre completo",
      "contact.form.email.placeholder": "tucorreo@ejemplo.com",
      "contact.form.submit": "Enviar",
      "contact.form.success": "Mensaje enviado ✓",

      "contact.info.title": "Datos de contacto",

      "footer.links.terms": "Términos y Condiciones",
      "footer.links.privacy": "Políticas de privacidad",

      "modal.title": "Descargar EcoPulse ⬇",
      "modal.apple": "Descargar en App Store",
      "modal.google": "Descargar en Play Store",
      "modal.qrText": "O escanea el código QR",
      "modal.qrCaption":
        "Escanea desde tu celular para descargar la app",
    },

    EN: {
      "nav.home": "Home",
      "nav.benefits": "Benefits",
      "nav.testimonials": "Testimonials",
      "nav.faq": "FAQ",
      "nav.plans": "Plans",
      "nav.contact": "Contact",
      "nav.login": "Log in",

      "hero.titleLine1": "Monitor the noise around you",
      "hero.titleLine2": "and protect your well-being",
      "hero.text":
        "EcoPulse lets you measure, visualize and report noise levels in real time.",
      "hero.cta": "Download app",

      "about.title": "What is EcoPulse?",
      "about.subtitle":
        "The app that turns urban noise into useful insights for your well-being.",
      "about.card1":
        "EcoPulse is a citizen platform that allows you to measure, visualize and report noise pollution in real time. It uses your smartphone microphone to capture noise levels around you and turns them into collaborative heat maps.",
      "about.card2":
        "Our goal is to empower people to improve the acoustic quality of cities, promoting informed decisions and healthier environments.",
      "about.cta": "Learn more about how EcoPulse works",

      "benefits.title": "Benefits of using EcoPulse",
      "benefits.card1.title": "Measure noise in real time",
      "benefits.card1.text":
        "Use your smartphone microphone to instantly know noise levels around you and make informed decisions about your exposure.",
      "benefits.card2.title": "View collaborative sound maps",
      "benefits.card2.text":
        "Explore an interactive map that highlights the quietest and noisiest areas in your city, built from community reports.",
      "benefits.card3.title": "Report noise pollution hotspots",
      "benefits.card3.text":
        "Send alerts about annoying noise sources, such as traffic or construction, and help authorities and neighbors improve the urban environment.",
      "benefits.card4.title": "Protect your hearing and well-being",
      "benefits.card4.text":
        "Reduce your exposure to harmful noise, sleep better and help build healthier, more sustainable cities.",
      "benefits.cta": "Download app",

      "testimonials.title": "What our users say",
      "testimonials.1.text":
        "“With EcoPulse I understood how much noise affects my rest. Now I choose quieter routes and schedules.”",
      "testimonials.1.author": "Liliana V. – Surco",
      "testimonials.2.text":
        "“At last I have a way to show the excess noise in my neighborhood. It makes me feel part of the change.”",
      "testimonials.2.author": "Alex S. – La Victoria",
      "testimonials.3.text":
        "“I use EcoPulse maps to recommend quieter accommodations to my clients.”",
      "testimonials.3.author": "Giancarlo R. – La Molina",
      "testimonials.cta": "Download EcoPulse and improve your environment",

      "faq.title": "Frequently asked questions",
      "faq.q1": "What is EcoPulse?",
      "faq.a1":
        "It is a citizen app that measures and reports noise pollution in real time to promote healthier environments.",
      "faq.q2": "How does my phone measure noise?",
      "faq.a2":
        "The app uses the device microphone to capture sound levels and converts them into decibel (dB) data.",
      "faq.q3": "What can I do with the reports I create?",
      "faq.a3":
        "You can share them with your community or local authorities to improve urban noise management.",
      "faq.q4": "Is the app free?",
      "faq.a4":
        "Yes, EcoPulse offers a free version for citizens and a professional version with advanced reports for institutions.",
      "faq.cta": "Still have questions? Contact us",

      "plans.title": "Plans that adapt to your needs",
      "plans.subtitle":
        "Start for free or choose a professional plan for your organization.",
      "plans.citizen.title": "Citizen plan (Free)",
      "plans.citizen.item1": "Free access to the mobile app",
      "plans.citizen.item2": "Real-time noise measurement",
      "plans.citizen.item3": "Community heat map",
      "plans.citizen.item4": "Personalized alerts",
      "plans.citizen.item5": "Available for all users",
      "plans.citizen.cta": "Download app",
      "plans.corporate.title": "Corporate plan (Premium)",
      "plans.corporate.item1": "Institutional control panel",
      "plans.corporate.item2": "Advanced reports and dashboards",
      "plans.corporate.item3": "Data export and analytics",
      "plans.corporate.item4": "Support and technical advisory",
      "plans.corporate.item5":
        "Available for organizations and institutions",
      "plans.corporate.cta": "Request demo",

      "contact.form.title": "Contact us",
      "contact.form.name.label": "Name",
      "contact.form.email.label": "Email",
      "contact.form.reason.label": "Reason",
      "contact.form.reason.placeholder": "Select an option",
      "contact.form.reason.option1": "Inquiry",
      "contact.form.reason.option2": "Suggestion",
      "contact.form.reason.option3": "Partnership",
      "contact.form.message.label": "Message",
      "contact.form.message.placeholder":
        "Tell us briefly how we can help you",
      "contact.form.name.placeholder": "Your full name",
      "contact.form.email.placeholder": "you@example.com",
      "contact.form.submit": "Send",
      "contact.form.success": "Message sent ✓",

      "contact.info.title": "Contact details",

      "footer.links.terms": "Terms & Conditions",
      "footer.links.privacy": "Privacy policy",

      "modal.title": "Download EcoPulse ⬇",
      "modal.apple": "Download on the App Store",
      "modal.google": "Download on Google Play",
      "modal.qrText": "Or scan the QR code",
      "modal.qrCaption":
        "Scan from your phone to download the app",
    },
  };

  const i18nTextElements = document.querySelectorAll("[data-i18n]");
  const i18nPlaceholderElements = document.querySelectorAll(
    "[data-i18n-placeholder]"
  );

  const langButton = document.querySelector("[data-toggle-lang]");
  const langDropdown = document.getElementById("lang-dropdown");
  const langLabel = document.querySelector("[data-lang-label]");
  const langRadios = langDropdown
    ? langDropdown.querySelectorAll("input[name='lang-choice']")
    : [];

  function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    i18nTextElements.forEach((el) => {
      const key = el.dataset.i18n;
      if (key && dict[key]) {
        el.textContent = dict[key];
      }
    });

    i18nPlaceholderElements.forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (key && dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    document.documentElement.lang = lang === "EN" ? "en" : "es";
  }

  function setLanguage(lang) {
    const normalized = lang === "EN" ? "EN" : "ES";
    localStorage.setItem("ecopulse-lang", normalized);
    if (langLabel) langLabel.textContent = normalized;
    applyTranslations(normalized);

    // Marcar radio correspondiente
    langRadios.forEach((radio) => {
      radio.checked = radio.value === normalized;
    });
  }

  // Inicialización idioma
  const savedLang = localStorage.getItem("ecopulse-lang") || "ES";
  setLanguage(savedLang);

  // Toggle dropdown idiomas
  if (langButton && langDropdown) {
    langButton.addEventListener("click", () => {
      const isHidden = langDropdown.hidden;
      langDropdown.hidden = !isHidden;
      langButton.setAttribute("aria-expanded", String(isHidden));
    });

    document.addEventListener("click", (event) => {
      if (
        !langDropdown.hidden &&
        !langDropdown.contains(event.target) &&
        !langButton.contains(event.target)
      ) {
        langDropdown.hidden = true;
        langButton.setAttribute("aria-expanded", "false");
      }
    });

    langRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.checked) {
          setLanguage(radio.value);
          langDropdown.hidden = true;
          langButton.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
});
