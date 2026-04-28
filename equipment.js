// L3L Trading — equipment catalog
// 12 items from the procurement ranking + 10 additional commonly-exported devices.
window.EQUIPMENT = [
  // --- 12 from the ranking ---
  {
    id: 1, category: "diagnostic",
    name: { en: "Three-Channel Electrocardiograph", es: "Electrocardiógrafo de Tres Canales" },
    desc: {
      en: "Portable ECG for diagnostic cardiology in clinics, ambulances, and field hospitals.",
      es: "ECG portátil para cardiología diagnóstica en clínicas, ambulancias y hospitales de campaña."
    },
    hts: "9018.11", makers: "Baxter/Mortara ELI 380/280, GE MAC 5/2000",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 2, category: "critical",
    name: { en: "External Defibrillator with Paddles & Pacemaker Cable", es: "Desfibrilador Externo con Paletas y Cable de Marcapaso" },
    desc: {
      en: "Manual and AED-mode defibrillator with external pacing for emergency and ICU use.",
      es: "Desfibrilador manual y modo DEA con marcapaso externo para emergencias y UCI."
    },
    hts: "9018.90", makers: "ZOLL R/X Series, Stryker LIFEPAK 20e/15",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 3, category: "critical",
    name: { en: "Multiparameter Vital Signs Monitor with Capnograph", es: "Monitor Multiparamétrico de Signos Vitales con Capnógrafo" },
    desc: {
      en: "Continuous monitoring of ECG, SpO₂, NIBP, temperature, and end-tidal CO₂.",
      es: "Monitoreo continuo de ECG, SpO₂, PNI, temperatura y CO₂ espiratorio final."
    },
    hts: "9018.19", makers: "Welch Allyn Connex VSM 6000, Masimo Root, SpaceLabs Xprezzon",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 4, category: "lab",
    name: { en: "Blood Bank Agglutination Centrifuge", es: "Centrífuga de Aglutinación para Banco de Sangre" },
    desc: {
      en: "Specialized centrifuge for serological cross-matching and blood typing.",
      es: "Centrífuga especializada para pruebas serológicas cruzadas y tipificación sanguínea."
    },
    hts: "8421.19", makers: "Drucker Diagnostics 642E/HORIZON 6, LW Scientific USA",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 5, category: "critical",
    name: { en: "Adult Mechanical Ventilator", es: "Ventilador Mecánico para Adultos" },
    desc: {
      en: "ICU-grade mechanical ventilator for invasive and non-invasive respiratory support.",
      es: "Ventilador mecánico de UCI para soporte respiratorio invasivo y no invasivo."
    },
    hts: "9019.20.10", makers: "Hamilton T1/C1/H900, ZOLL Z Vent / EMV+",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 6, category: "diagnostic",
    name: { en: "Slit Lamp (Ophthalmic Biomicroscope)", es: "Lámpara de Hendidura (Biomicroscopio Oftálmico)" },
    desc: {
      en: "High-magnification examination of the anterior segment of the eye.",
      es: "Examen de alta magnificación del segmento anterior del ojo."
    },
    hts: "9018.50", makers: "Reichert Xcel 255/400/700, PSL Portable (AMETEK)",
    cert: "FDA 510(k) · CE · ISO 13485 · MDSAP"
  },
  {
    id: 7, category: "imaging",
    name: { en: "C-Arm with Image Intensifier", es: "Arco en C con Intensificador de Imagen" },
    desc: {
      en: "Mobile fluoroscopy C-arm for surgical, orthopedic, and pain management procedures.",
      es: "Arco en C móvil de fluoroscopía para procedimientos quirúrgicos, ortopédicos y de manejo del dolor."
    },
    hts: "9022.14", makers: "GE OEC 9900 Elite, OEC Elite II, OEC Brivo",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 8, category: "imaging",
    name: { en: "Mobile X-Ray with Built-In Image Digitizer", es: "Rayos X Móvil con Digitalizador de Imagen Integrado" },
    desc: {
      en: "Bedside digital radiography for ICU, emergency, and operating room imaging.",
      es: "Radiografía digital a pie de cama para imágenes en UCI, emergencias y quirófano."
    },
    hts: "9022.14", makers: "Carestream DRX-Revolution, GE AMX Navigate/240",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 9, category: "surgical",
    name: { en: "Digital Anesthesia Machine", es: "Máquina de Anestesia Digital" },
    desc: {
      en: "Integrated anesthesia delivery, ventilation, and patient monitoring workstation.",
      es: "Estación integrada de administración de anestesia, ventilación y monitoreo del paciente."
    },
    hts: "9018.90.60", makers: "GE Datex-Ohmeda Aisys CS²/Carestation 650/750, SpaceLabs ARKON",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 10, category: "surgical",
    name: { en: "Phacoemulsifier (Phaco Machine)", es: "Faco­emulsificador (Máquina de Facoemulsificación)" },
    desc: {
      en: "Cataract surgery system using ultrasound to emulsify and aspirate the lens.",
      es: "Sistema de cirugía de catarata por ultrasonido para emulsificar y aspirar el cristalino."
    },
    hts: "9018.50", makers: "Alcon Centurion, J&J VERITAS, Bausch+Lomb Stellaris Elite",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 11, category: "surgical",
    name: { en: "Sterilization Equipment for Heat-Sensitive Materials", es: "Equipo de Esterilización para Materiales Sensibles al Calor" },
    desc: {
      en: "Low-temperature H₂O₂ and EtO sterilization for endoscopes and delicate instruments.",
      es: "Esterilización a baja temperatura con H₂O₂ y EtO para endoscopios e instrumentos delicados."
    },
    hts: "8419.20", makers: "STERIS V-PRO maX 2/60 H2O2, Andersen EOGas 4PLUS EtO",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 12, category: "critical",
    name: { en: "Neonatal Volume Mechanical Ventilator", es: "Ventilador Mecánico de Volumen Neonatal" },
    desc: {
      en: "High-precision ventilator designed for neonatal and pediatric intensive care.",
      es: "Ventilador de alta precisión diseñado para cuidados intensivos neonatales y pediátricos."
    },
    hts: "9019.20.10", makers: "GE Carescape R860, Hamilton C1 neo, Bunnell Life Pulse 203",
    cert: "FDA 510(k)/PMA · CE · ISO 13485"
  },

  // --- 10 additional commonly-exported devices ---
  {
    id: 13, category: "imaging",
    name: { en: "Portable Ultrasound System", es: "Sistema de Ultrasonido Portátil" },
    desc: {
      en: "Color-Doppler ultrasound for OB/GYN, cardiology, and point-of-care use.",
      es: "Ultrasonido Doppler color para ginecobstetricia, cardiología y uso a pie de cama."
    },
    hts: "9018.12", makers: "GE Vscan Air, Butterfly iQ+, Sonosite Edge II (FUJIFILM)",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 14, category: "diagnostic",
    name: { en: "Pulse Oximeter (Tabletop & Handheld)", es: "Oxímetro de Pulso (Sobremesa y de Mano)" },
    desc: {
      en: "Continuous SpO₂ and pulse rate monitoring with motion-tolerant technology.",
      es: "Monitoreo continuo de SpO₂ y frecuencia de pulso con tecnología tolerante al movimiento."
    },
    hts: "9018.19", makers: "Masimo Rad-G, Nonin Onyx, Nellcor PM10N",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 15, category: "surgical",
    name: { en: "Electrosurgical Generator (ESU)", es: "Generador Electroquirúrgico (ESU)" },
    desc: {
      en: "Monopolar and bipolar electrosurgery for cutting and coagulation in the OR.",
      es: "Electrocirugía monopolar y bipolar para corte y coagulación en quirófano."
    },
    hts: "9018.90", makers: "Conmed System 5000, Bovie OR-PRO 300, Medtronic Valleylab FT10",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 16, category: "critical",
    name: { en: "Volumetric Infusion Pump", es: "Bomba de Infusión Volumétrica" },
    desc: {
      en: "Smart infusion pump with drug library and dose error reduction software.",
      es: "Bomba de infusión inteligente con biblioteca de fármacos y reducción de errores de dosis."
    },
    hts: "9018.39", makers: "ICU Medical Plum 360, Baxter Spectrum IQ, BD Alaris",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 17, category: "lab",
    name: { en: "Hematology Analyzer (5-Part Diff)", es: "Analizador de Hematología (5 Diferenciales)" },
    desc: {
      en: "Automated CBC analyzer with five-part white blood cell differential.",
      es: "Analizador automatizado de hemograma con diferencial leucocitario de cinco partes."
    },
    hts: "9027.80", makers: "Beckman Coulter DxH 690T, Abbott Alinity hq",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 18, category: "lab",
    name: { en: "Clinical Chemistry Analyzer", es: "Analizador de Química Clínica" },
    desc: {
      en: "High-throughput chemistry analyzer for routine and specialty testing.",
      es: "Analizador de química de alto rendimiento para pruebas rutinarias y especializadas."
    },
    hts: "9027.80", makers: "Beckman Coulter AU680, Abbott Architect c4000",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 19, category: "surgical",
    name: { en: "Surgical Operating Table (Electric)", es: "Mesa Quirúrgica Eléctrica" },
    desc: {
      en: "Multi-position electric OR table for general, orthopedic, and bariatric surgery.",
      es: "Mesa quirúrgica eléctrica multiposición para cirugía general, ortopédica y bariátrica."
    },
    hts: "9402.90", makers: "STERIS Cmax, Skytron Hercules 6500, Hill-Rom",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 20, category: "surgical",
    name: { en: "LED Surgical Light", es: "Lámpara Quirúrgica LED" },
    desc: {
      en: "Shadow-free LED operating lights with adjustable color temperature.",
      es: "Lámparas quirúrgicas LED sin sombras con temperatura de color ajustable."
    },
    hts: "9405.40", makers: "STERIS Harmony LED, Stryker Visum, Skytron Aurora",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 21, category: "critical",
    name: { en: "Hospital ICU Bed (Electric)", es: "Cama Eléctrica Hospitalaria de UCI" },
    desc: {
      en: "Fully electric ICU bed with CPR position, scale, and patient mobility features.",
      es: "Cama de UCI totalmente eléctrica con posición de RCP, báscula y funciones de movilidad."
    },
    hts: "9402.90", makers: "Hill-Rom Centrella, Stryker InTouch, Linet Multicare",
    cert: "FDA 510(k) · CE · ISO 13485"
  },
  {
    id: 22, category: "diagnostic",
    name: { en: "Automated External Defibrillator (AED)", es: "Desfibrilador Externo Automático (DEA)" },
    desc: {
      en: "Public-access AED with bilingual voice prompts for first-responder use.",
      es: "DEA de acceso público con guías de voz bilingües para primeros respondedores."
    },
    hts: "9018.90", makers: "ZOLL AED 3, Philips HeartStart FRx, Stryker LIFEPAK CR2",
    cert: "FDA 510(k) · CE · ISO 13485"
  }
];
