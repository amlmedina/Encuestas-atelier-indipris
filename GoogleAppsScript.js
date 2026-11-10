function doPost(e) {
  var sheetId = "1SGcaLCDOzNhKG6Fz8AYjGW966bZM3slejphykXfL6oo";
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheets()[0]; // Primera hoja (gid=0)
  
  // Si la hoja está vacía, crear los encabezados solicitados
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "ID",
      "Nombre",
      "Correo",
      "Empresa",
      "Telefono",
      "Cuantas recamaras",
      "Hotel",
      "Fecha de Registro"
    ]);
  }
  
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    // Generar un ID único si no viene provisto
    var idRegistro = data.id || "IND-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    var nombre = data.nombre || "";
    var correo = data.correo || "";
    var empresa = data.empresa || "";
    var telefono = data.telefono || "";
    var recamaras = data.recamaras || "";
    var hotel = data.hotel || "";
    var timestamp = new Date();
    
    sheet.appendRow([
      idRegistro,
      nombre,
      correo,
      empresa,
      telefono,
      recamaras,
      hotel,
      timestamp
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "id": idRegistro }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "online", "message": "Endpoint Google Apps Script activo para Encuestas Atelier Indipris" }))
    .setMimeType(ContentService.MimeType.JSON);
}

