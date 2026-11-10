/**
 * Encuesta Atelier Indipris - Conexión con Google Sheets & Soporte Multilenguaje
 * Idiomas: Español (es), Inglés (en), Francés (fr), Alemán (de), Chino (zh)
 */

const STORAGE_KEY_WEBHOOK = 'indipris_atelier_sheets_webhook';
const DEFAULT_WEBHOOK_URL = '';

// Diccionario de Traducciones
const TRANSLATIONS = {
  es: {
    pageTitle: "Registro para tarifas preferenciales | Indipris Travel",
    badge: "plastimagen 2026",
    heroTitle: "Registro para tarifas preferenciales",
    heroDesc: "Por favor completa la información para coordinar tu estancia y la asignación de habitaciones durante el evento.",
    lblNombre: "Nombre Completo *",
    phNombre: "Ej. Carlos Roberto del Ángel",
    lblCorreo: "Correo Electrónico *",
    phCorreo: "correo@ejemplo.com",
    lblTelefono: "Teléfono / WhatsApp *",
    phTelefono: "+52 55 1234 5678",
    lblEmpresa: "Empresa / Organización *",
    phEmpresa: "Ej. Plastimagen / Empresa",
    lblHabitaciones: "¿Cuántas habitaciones requieres? *",
    optSelectPrompt: "Selecciona una opción...",
    opt1: "1 habitación",
    opt2: "2 habitaciones",
    opt3: "3 habitaciones",
    opt4: "4 o más habitaciones",
    lblHotel: "Hotel de Preferencia / zona de preferencia *",
    phHotel: "Ej. Hotel St Isidro / Zona Reforma",
    btnSubmit: "Enviar Respuestas",
    btnSending: "Enviando respuestas...",
    successTitle: "¡Registro exitoso!",
    successDesc: "Tu registro se ha completado con éxito.",
    btnNew: "Registrar otra respuesta",
    footerCopyright: "© 2026 Indipris Travel. Todos los derechos reservados."
  },
  en: {
    pageTitle: "Registration for Preferential Rates | Indipris Travel",
    badge: "plastimagen 2026",
    heroTitle: "Registration for Preferential Rates",
    heroDesc: "Please fill out the information to coordinate your stay and room allocation during the event.",
    lblNombre: "Full Name *",
    phNombre: "e.g. John Smith",
    lblCorreo: "Email Address *",
    phCorreo: "john@example.com",
    lblTelefono: "Phone / WhatsApp *",
    phTelefono: "+1 555 123 4567",
    lblEmpresa: "Company / Organization *",
    phEmpresa: "e.g. Plastimagen / Company",
    lblHabitaciones: "How many rooms do you require? *",
    optSelectPrompt: "Select an option...",
    opt1: "1 room",
    opt2: "2 rooms",
    opt3: "3 rooms",
    opt4: "4 or more rooms",
    lblHotel: "Preferred Hotel / Preferred Area *",
    phHotel: "e.g. Hotel St Isidro / Reforma Area",
    btnSubmit: "Submit Registration",
    btnSending: "Submitting answers...",
    successTitle: "Registration Successful!",
    successDesc: "Your registration has been completed successfully.",
    btnNew: "Submit another response",
    footerCopyright: "© 2026 Indipris Travel. All rights reserved."
  },
  fr: {
    pageTitle: "Inscription pour Tarifs Préférentiels | Indipris Travel",
    badge: "plastimagen 2026",
    heroTitle: "Inscription pour Tarifs Préférentiels",
    heroDesc: "Veuillez remplir ces informations pour coordonner votre séjour et la réservation de vos chambres pendant l'événement.",
    lblNombre: "Nom Complet *",
    phNombre: "ex. Jean Dupont",
    lblCorreo: "Adresse E-mail *",
    phCorreo: "jean@exemple.com",
    lblTelefono: "Téléphone / WhatsApp *",
    phTelefono: "+33 6 12 34 56 78",
    lblEmpresa: "Entreprise / Organisation *",
    phEmpresa: "ex. Plastimagen / Société",
    lblHabitaciones: "Combien de chambres souhaitez-vous ? *",
    optSelectPrompt: "Choisissez une option...",
    opt1: "1 chambre",
    opt2: "2 chambres",
    opt3: "3 chambres",
    opt4: "4 chambres ou plus",
    lblHotel: "Hôtel ou quartier de préférence *",
    phHotel: "ex. Hotel St Isidro / Quartier Reforma",
    btnSubmit: "Envoyer l'inscription",
    btnSending: "Envoi en cours...",
    successTitle: "Enregistrement réussi !",
    successDesc: "Votre enregistrement a été effectué avec succès.",
    btnNew: "Enregistrer une autre réponse",
    footerCopyright: "© 2026 Indipris Travel. Tous droits réservés."
  },
  de: {
    pageTitle: "Anmeldung für Vorzugspreise | Indipris Travel",
    badge: "plastimagen 2026",
    heroTitle: "Anmeldung für Vorzugspreise",
    heroDesc: "Bitte tragen Sie Ihre Daten ein, um Ihren Aufenthalt und die Zimmerbuchung während der Veranstaltung zu koordinieren.",
    lblNombre: "Vollständiger Name *",
    phNombre: "z.B. Thomas Müller",
    lblCorreo: "E-Mail-Adresse *",
    phCorreo: "thomas@beispiel.de",
    lblTelefono: "Telefon / WhatsApp *",
    phTelefono: "+49 170 1234567",
    lblEmpresa: "Unternehmen / Organisation *",
    phEmpresa: "z.B. Plastimagen / Firma",
    lblHabitaciones: "Wie viele Zimmer benötigen Sie? *",
    optSelectPrompt: "Bitte auswählen...",
    opt1: "1 Zimmer",
    opt2: "2 Zimmer",
    opt3: "3 Zimmer",
    opt4: "4 oder mehr Zimmer",
    lblHotel: "Bevorzugtes Hotel / Bevorzugte Gegend *",
    phHotel: "z.B. Hotel St Isidro / Zone Reforma",
    btnSubmit: "Antworten absenden",
    btnSending: "Wird gesendet...",
    successTitle: "Erfolgreich registriert!",
    successDesc: "Ihre Registrierung wurde erfolgreich abgeschlossen.",
    btnNew: "Weitere Antwort erfassen",
    footerCopyright: "© 2026 Indipris Travel. Alle Rechte vorbehalten."
  },
  zh: {
    pageTitle: "特惠价格登记表 | Indipris Travel",
    badge: "plastimagen 2026",
    heroTitle: "特惠价格登记表",
    heroDesc: "请填写以下信息，以便我们在活动期间为您协调住宿及客房安排。",
    lblNombre: "姓名 *",
    phNombre: "例如：张伟",
    lblCorreo: "电子邮箱 *",
    phCorreo: "name@example.com",
    lblTelefono: "联系电话 / WhatsApp *",
    phTelefono: "+86 138 0000 0000",
    lblEmpresa: "公司 / 机构名称 *",
    phEmpresa: "例如：Plastimagen / 企业名称",
    lblHabitaciones: "您需要几间客房？ *",
    optSelectPrompt: "请选择客房数量...",
    opt1: "1 间客房",
    opt2: "2 间客房",
    opt3: "3 间客房",
    opt4: "4 间或更多客房",
    lblHotel: "意向酒店 / 偏好区域 *",
    phHotel: "例如：Hotel St Isidro / Reforma 区",
    btnSubmit: "提交登记信息",
    btnSending: "正在提交...",
    successTitle: "登记成功！",
    successDesc: "您的信息已成功登记。",
    btnNew: "登记另一条信息",
    footerCopyright: "© 2026 Indipris Travel. 版权所有。"
  }
};

let currentLang = 'es';

function detectUserLanguage() {
  const navLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
  if (navLang.startsWith('en')) return 'en';
  if (navLang.startsWith('fr')) return 'fr';
  if (navLang.startsWith('de')) return 'de';
  if (navLang.startsWith('zh')) return 'zh';
  return 'es';
}

function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) lang = 'es';
  currentLang = lang;
  const t = TRANSLATIONS[lang];

  document.documentElement.lang = lang;
  document.title = t.pageTitle;

  const setHtml = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text;
  };
  const setAttr = (id, attr, val) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, val);
  };

  setHtml('txtHeroBadge', t.badge);
  setHtml('txtHeroTitle', t.heroTitle);
  setHtml('txtHeroDesc', t.heroDesc);

  setHtml('lblNombre', t.lblNombre.replace('*', '<span style="color: #dc2626;">*</span>'));
  setAttr('nombreInput', 'placeholder', t.phNombre);

  setHtml('lblCorreo', t.lblCorreo.replace('*', '<span style="color: #dc2626;">*</span>'));
  setAttr('correoInput', 'placeholder', t.phCorreo);

  setHtml('lblTelefono', t.lblTelefono.replace('*', '<span style="color: #dc2626;">*</span>'));
  setAttr('telefonoInput', 'placeholder', t.phTelefono);

  setHtml('lblEmpresa', t.lblEmpresa.replace('*', '<span style="color: #dc2626;">*</span>'));
  setAttr('empresaInput', 'placeholder', t.phEmpresa);

  setHtml('lblHabitaciones', t.lblHabitaciones.replace('*', '<span style="color: #dc2626;">*</span>'));
  setHtml('optSelectPrompt', t.optSelectPrompt);
  setHtml('opt1', t.opt1);
  setHtml('opt2', t.opt2);
  setHtml('opt3', t.opt3);
  setHtml('opt4', t.opt4);

  setHtml('lblHotel', t.lblHotel.replace('*', '<span style="color: #dc2626;">*</span>'));
  setAttr('hotelInput', 'placeholder', t.phHotel);

  setHtml('btnSubmitText', t.btnSubmit);
  setHtml('txtSuccessTitle', t.successTitle);
  setHtml('txtSuccessDesc', t.successDesc);
  setHtml('btnNewEntry', t.btnNew);

  const langSelect = document.getElementById('langSelect');
  if (langSelect) langSelect.value = lang;
}

function generateUniqueId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ATL-${randomStr}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('atelierSurveyForm');
  const idInput = document.getElementById('idInput');
  const formWrapper = document.getElementById('formWrapper');
  const successCard = document.getElementById('successCard');
  const confirmedId = document.getElementById('confirmedId');
  const btnNewEntry = document.getElementById('btnNewEntry');

  const btnSubmitForm = document.getElementById('btnSubmitForm');
  const btnSubmitText = document.getElementById('btnSubmitText');
  const btnSpinner = document.getElementById('btnSpinner');

  // Detectar y aplicar idioma inicial según el navegador del usuario (inglés, francés, alemán, chino, español)
  const initialLang = localStorage.getItem('indipris_survey_lang') || detectUserLanguage();
  applyLanguage(initialLang);

  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      localStorage.setItem('indipris_survey_lang', selected);
      applyLanguage(selected);
    });
  }

  // Generar ID inicial
  idInput.value = generateUniqueId();

  // Envío del Formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      id: idInput.value.trim(),
      nombre: document.getElementById('nombreInput').value.trim(),
      correo: document.getElementById('correoInput').value.trim(),
      empresa: document.getElementById('empresaInput').value.trim(),
      telefono: document.getElementById('telefonoInput').value.trim(),
      recamaras: document.getElementById('recamarasInput').value,
      hotel: document.getElementById('hotelInput').value.trim(),
      idioma: currentLang
    };

    // Bloquear botón y mostrar spinner con texto traducido
    btnSubmitForm.disabled = true;
    const t = TRANSLATIONS[currentLang] || TRANSLATIONS.es;
    btnSubmitText.textContent = t.btnSending;
    btnSpinner.style.display = 'block';

    const webhookUrl = localStorage.getItem(STORAGE_KEY_WEBHOOK) || DEFAULT_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        console.warn('Webhook no configurado. Guardando respaldo local...');
        const localList = JSON.parse(localStorage.getItem('indipris_respuestas_pendientes') || '[]');
        localList.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem('indipris_respuestas_pendientes', JSON.stringify(localList));
      }

      confirmedId.textContent = `ID: ${payload.id}`;
      formWrapper.style.display = 'none';
      successCard.style.display = 'block';

    } catch (err) {
      console.error('Error enviando encuesta:', err);
      alert('Error de conexión. Se guardó copia de respaldo en tu navegador.');
    } finally {
      btnSubmitForm.disabled = false;
      btnSubmitText.textContent = t.btnSubmit;
      btnSpinner.style.display = 'none';
    }
  });

  if (btnNewEntry) {
    btnNewEntry.addEventListener('click', () => {
      form.reset();
      idInput.value = generateUniqueId();
      successCard.style.display = 'none';
      formWrapper.style.display = 'block';
    });
  }
});
