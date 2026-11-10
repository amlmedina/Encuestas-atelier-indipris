# Encuestas Atelier Indipris

Formulario de registro y recopilación de respuestas para el evento **Atelier Indipris**, diseñado con la identidad visual oficial de **Indipris Travel** ([indipris.com](https://indipris.com)) para alojar las respuestas directamente en Google Sheets.

## 📋 Estructura de Datos en Google Sheets

La hoja oficial del proyecto está vinculada aquí:
🔗 **[Google Sheets: Respuestas Atelier](https://docs.google.com/spreadsheets/d/1SGcaLCDOzNhKG6Fz8AYjGW966bZM3slejphykXfL6oo/edit?gid=0#gid=0)**

Las columnas generadas automáticamente en la hoja son:
1. `ID` (Código identificador único, ej. `ATL-8KJ2X`)
2. `Nombre`
3. `Correo`
4. `Empresa`
5. `Telefono`
6. `Cuantas recamaras`
7. `Hotel`
8. `Fecha de Registro`

---

## ⚡ Conexión con Google Sheets (Google Apps Script)

Para conectar el formulario web a tu hoja de cálculo en 2 minutos:

1. Abre tu hoja de Google Sheets: [https://docs.google.com/spreadsheets/d/1SGcaLCDOzNhKG6Fz8AYjGW966bZM3slejphykXfL6oo/edit#gid=0](https://docs.google.com/spreadsheets/d/1SGcaLCDOzNhKG6Fz8AYjGW966bZM3slejphykXfL6oo/edit#gid=0)
2. En el menú superior haz clic en: **Extensiones** ➡️ **Apps Script**.
3. Borra cualquier código que aparezca y pega el contenido del archivo `GoogleAppsScript.js` incluido en este repositorio.
4. Haz clic en el botón azul superior **Implementar (Deploy)** ➡️ **Nueva implementación (New deployment)**.
5. Selecciona el tipo de engrane: **Aplicación web (Web app)**:
   - **Ejecutar como:** `Yo (tu cuenta de Google)`
   - **Quién tiene acceso:** `Cualquier usuario (Anyone)`
6. Haz clic en **Implementar**, autoriza los permisos y copia la **URL de la aplicación web** generada (termina en `/exec`).
7. En el formulario web haz clic en el botón superior **⚙️ Google Sheets** y pega esa URL. ¡Listo! Todas las respuestas se guardarán en tiempo real en tu hoja.

---

## 🚀 Publicación en GitHub Pages

Para alojar el formulario gratis en GitHub:
1. Sube este repositorio a GitHub con el nombre `Encuestas-atelier-indipris`.
2. Ve a **Settings ➡️ Pages** en tu repositorio de GitHub.
3. En **Source** selecciona `Deploy from a branch` y elige la rama `main` (carpeta `/root`).
4. Haz clic en **Save** y tu formulario quedará disponible públicamente en una URL tipo:
   `https://tu-usuario.github.io/Encuestas-atelier-indipris/`
