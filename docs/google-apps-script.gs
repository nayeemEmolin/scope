/*
 * SCOPE MEAL Training registration -> Google Sheets
 * Setup:
 * 1. Create a new Google Sheet named SCOPE_MEAL_Training_Registrations.
 * 2. Extensions > Apps Script; paste this file.
 * 3. Run setupSheet() once and authorize.
 * 4. Deploy as Web app, Execute as: Me. Set access as appropriate for a public registration form.
 * 5. Copy deployment URL to assets/js/config.js.
 *
 * This simple endpoint is suitable as a starter, not a full anti-abuse solution.
 * Public forms can be spammed. Add CAPTCHA / rate-limiting or a trusted form service before production.
 */
const SHEET_NAME = 'Registrations';
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp','Full name','Mobile','Email','Role','Organization','Experience','Motivation','Consent','Status']);
    sheet.setFrozenRows(1);
    sheet.getRange(1,1,1,10).setFontWeight('bold').setBackground('#102A43').setFontColor('#FFFFFF');
    sheet.autoResizeColumns(1,10);
  }
  return 'Sheet ready';
}
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const p = (e && e.parameter) || {};
    if (p.website) return output({ok:false,message:'Rejected'});
    const name = clean(p.fullName,120);
    const phone = clean(p.phone,30);
    const email = clean(p.email,160);
    const role = clean(p.profession,100);
    if (!name || !phone || !email || !role || p.consent !== 'yes') {
      return output({ok:false,message:'Missing required fields'});
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) { setupSheet(); sheet = ss.getSheetByName(SHEET_NAME); }
    sheet.appendRow([
      new Date(), safeCell(name), safeCell(phone), safeCell(email), safeCell(role),
      safeCell(clean(p.organization,160)), safeCell(clean(p.experience,80)),
      safeCell(clean(p.motivation,700)), 'yes', 'New'
    ]);
    return output({ok:true,message:'Received'});
  } catch (err) {
    return output({ok:false,message:'Submission error'});
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}
function clean(value, max) {
  return String(value || '').replace(/[<>]/g,'').trim().slice(0,max);
}
// Prevent spreadsheet formula injection for values beginning with formula characters.
function safeCell(value) {
  const s = String(value || '');
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
function output(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
