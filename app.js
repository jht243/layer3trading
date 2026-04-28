(function () {
  const defaultLang = "en";
  let currentLang = defaultLang;
  let currentFilter = "all";

  const translations = window.I18N || {};
  const equipment = window.EQUIPMENT || [];
  const equipGrid = document.getElementById("equipGrid");
  const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
  const filterButtons = Array.from(document.querySelectorAll(".chip"));

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) ||
      (translations[defaultLang] && translations[defaultLang][key]) ||
      key;
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
      ? "L3L Trading | Exportacion de Equipos Medicos"
      : "L3L Trading | Medical Equipment Export";
    document.title = title;
  }

  function setLanguage(lang) {
    currentLang = translations[lang] ? lang : defaultLang;
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

  document.getElementById("year").textContent = String(new Date().getFullYear());
  setLanguage(defaultLang);
  setFilter(currentFilter);
})();
