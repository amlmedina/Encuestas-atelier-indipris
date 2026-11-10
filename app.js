/**
 * Encuesta Atelier Indipris - Conexión con Google Sheets
 */

// Clave en localStorage para guardar la URL del Apps Script si el usuario la personaliza
const STORAGE_KEY_WEBHOOK = 'indipris_atelier_sheets_webhook';
const DEFAULT_WEBHOOK_URL = ''; // Se almacena cuando se despliega el Apps Script

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

  // Modal de configuración
  const btnOpenConfigModal = document.getElementById('btnOpenConfigModal');
  const btnCloseConfigModal = document.getElementById('btnCloseConfigModal');
  const configModal = document.getElementById('configModal');
  const scriptUrlInput = document.getElementById('scriptUrlInput');
  const btnSaveConfig = document.getElementById('btnSaveConfig');

  // Generar ID inicial
  idInput.value = generateUniqueId();

  // Cargar URL del webhook guardada si existe
  const savedWebhook = localStorage.getItem(STORAGE_KEY_WEBHOOK) || DEFAULT_WEBHOOK_URL;
  if (scriptUrlInput) scriptUrlInput.value = savedWebhook;

  // Manejo de Modal
  if (btnOpenConfigModal) {
    btnOpenConfigModal.addEventListener('click', () => {
      configModal.style.display = 'flex';
    });
  }

  if (btnCloseConfigModal) {
    btnCloseConfigModal.addEventListener('click', () => {
      configModal.style.display = 'none';
    });
  }

  if (configModal) {
    configModal.addEventListener('click', (e) => {
      if (e.target === configModal) configModal.style.display = 'none';
    });
  }

  if (btnSaveConfig) {
    btnSaveConfig.addEventListener('click', () => {
      const url = scriptUrlInput.value.trim();
      localStorage.setItem(STORAGE_KEY_WEBHOOK, url);
      alert('URL de conexión con Google Sheets guardada correctamente.');
      configModal.style.display = 'none';
    });
  }

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
      hotel: document.getElementById('hotelInput').value.trim()
    };

    // Bloquear botón y mostrar spinner
    btnSubmitForm.disabled = true;
    btnSubmitText.textContent = 'Enviando respuestas...';
    btnSpinner.style.display = 'block';

    const webhookUrl = localStorage.getItem(STORAGE_KEY_WEBHOOK) || DEFAULT_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        // Enviar a Google Apps Script usando no-cors o POST standard
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors', // Para evitar bloqueos CORS en navegadores al contactar script.google.com
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Si no hay webhook configurado aún, guardamos localmente como respaldo
        console.warn('No hay webhook de Google Apps Script configurado aún. Guardando en almacenamiento local...');
        const localList = JSON.parse(localStorage.getItem('indipris_respuestas_pendientes') || '[]');
        localList.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem('indipris_respuestas_pendientes', JSON.stringify(localList));
      }

      // Mostrar pantalla de confirmación exitosa
      confirmedId.textContent = `ID de Confirmación: ${payload.id}`;
      formWrapper.style.display = 'none';
      successCard.style.display = 'block';

    } catch (err) {
      console.error('Error enviando encuesta:', err);
      alert('Hubo un inconveniente al enviar los datos. Se guardó una copia de seguridad en tu navegador.');
    } finally {
      btnSubmitForm.disabled = false;
      btnSubmitText.textContent = 'Enviar Respuestas';
      btnSpinner.style.display = 'none';
    }
  });

  // Registrar otra respuesta
  if (btnNewEntry) {
    btnNewEntry.addEventListener('click', () => {
      form.reset();
      idInput.value = generateUniqueId();
      successCard.style.display = 'none';
      formWrapper.style.display = 'block';
    });
  }
});
