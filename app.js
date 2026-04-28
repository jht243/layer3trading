(function () {
  const fallbackLang = "en";
  const languageStorageKey = "l3l-medical-trading-lang";
  let currentLang = fallbackLang;
  let currentFilter = "all";

  const translations = window.I18N || {};
  const equipment = window.EQUIPMENT || [];
  const equipGrid = document.getElementById("equipGrid");
  const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
  const filterButtons = Array.from(document.querySelectorAll(".chip"));
  const leadForm = document.getElementById("leadForm");
  const leadFormStatus = document.getElementById("leadFormStatus");
  const leadFormSubmit = document.getElementById("leadFormSubmit");

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) ||
      (translations[fallbackLang] && translations[fallbackLang][key]) ||
      key;
  }

  function getPreferredLanguage() {
    const savedLang = window.localStorage.getItem(languageStorageKey);
    if (savedLang && translations[savedLang]) {
      return savedLang;
    }

    const browserLanguages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || fallbackLang];

    const preferred = browserLanguages.find((language) => {
      if (!language) {
        return false;
      }

      const shortCode = String(language).toLowerCase().split("-")[0];
      return Boolean(translations[shortCode]);
    });

    if (!preferred) {
      return fallbackLang;
    }

    return String(preferred).toLowerCase().split("-")[0];
  }

  function prettifyCategory(category) {
    const map = {
      diagnostic: { en: "Diagnostic", es: "Diagnostico" },
      surgical: { en: "Surgical", es: "Quirurgico" },
      critical: { en: "Critical Care", es: "Cuidados Criticos" },
      imaging: { en: "Imaging", es: "Imagenologia" },
      lab: { en: "Laboratory", es: "Laboratorio" }
    };

    return (map[category] && map[category][currentLang]) || category;
  }

  function renderEquipment() {
    if (!equipGrid) {
      return;
    }

    const items = currentFilter === "all"
      ? equipment
      : equipment.filter((item) => item.category === currentFilter);

    if (!items.length) {
      equipGrid.innerHTML = '<p>' + t("equipment.none") + "</p>";
      return;
    }

    equipGrid.innerHTML = items.map((item) => {
      const itemName = item.name[currentLang] || item.name.en;
      const itemDesc = item.desc[currentLang] || item.desc.en;

      return `
        <article class="equip-card">
          <div class="equip-cat">${prettifyCategory(item.category)}</div>
          <h3 class="equip-name">${itemName}</h3>
          <p class="equip-desc">${itemDesc}</p>
          <div class="equip-tags">
            <span>${t("equipment.certified")}</span>
          </div>
          <div class="equip-meta">
            <div>
              <strong>${t("equipment.hts")}</strong>
              <span>${item.hts}</span>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
      const key = node.dataset.i18nAttr;
      if (node.tagName === "META") {
        node.setAttribute("content", t(key));
      } else {
        node.setAttribute(key, t(key));
      }
    });

    const title = currentLang === "es"
      ? "L3L Medical Trading | Exportacion de Equipos Medicos"
      : "L3L Medical Trading | Medical Equipment Export";
    document.title = title;
  }

  function setLanguage(lang) {
    currentLang = translations[lang] ? lang : fallbackLang;
    window.localStorage.setItem(languageStorageKey, currentLang);
    window.__t = t;
    applyTranslations();
    renderEquipment();

    langButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === currentLang);
    });
  }

  function setFilter(filter) {
    currentFilter = filter;
    renderEquipment();

    filterButtons.forEach((button) => {
      button.classList.toggle("chip-active", button.dataset.filter === currentFilter);
    });
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.lang);
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setFilter(button.dataset.filter);
    });
  });

  if (leadForm) {
    leadForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(leadForm);
      const payload = Object.fromEntries(formData.entries());

      leadFormStatus.textContent = t("contact.sending");
      leadFormStatus.className = "form-status";
      leadFormSubmit.disabled = true;

      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error("Lead submission failed");
        }

        leadForm.reset();
        leadFormStatus.textContent = t("contact.saved");
        leadFormStatus.className = "form-status success";
      } catch (error) {
        leadFormStatus.textContent = t("contact.error");
        leadFormStatus.className = "form-status error";
      } finally {
        leadFormSubmit.disabled = false;
      }
    });
  }

  document.getElementById("year").textContent = String(new Date().getFullYear());
  setLanguage(getPreferredLanguage());
  setFilter(currentFilter);
})();
