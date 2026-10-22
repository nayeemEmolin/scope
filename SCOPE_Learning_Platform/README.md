# SCOPE — School for Career-Oriented Professional Education

Premium bilingual (English/Bangla) multi-page static learning platform designed for GitHub Pages.

## Included
- Responsive homepage, course catalogue, course detail pages, About, Contact and current MEAL course page
- CSS/JS motion graphics with reduced-motion support
- Current Practical MEAL Training details and link to the existing registration platform
- Upcoming courses clearly marked as **Coming Soon**
- Optional Google Apps Script + Google Sheets registration integration (requires your own deployment)
- No framework or build step required

## Run locally
Open `index.html` in a browser, or serve the folder with a local static server.

## Publish on GitHub Pages
1. Create a GitHub repository, e.g. `scope-learning-platform`.
2. Upload all files and folders from this ZIP to the repository root.
3. Open **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. After publishing, visit the URL GitHub Pages provides.
6. If publishing under `https://USERNAME.github.io/REPOSITORY/`, all internal links in this project are relative and should work.

## Registration and Google Sheets
The current course CTA links to `https://nayeememolin.github.io/scope/`, your existing course registration platform.
A separate optional registration page is included at `current-course/register.html`. It is **not connected to a live sheet by default**. To enable it:
1. Create a new Google Sheet named `SCOPE_MEAL_Training_Registrations`.
2. Open **Extensions → Apps Script** and paste `docs/google-apps-script.gs`.
3. In Apps Script, run `setupSheet` once and authorize it.
4. Deploy → New deployment → Web app. Execute as **Me**. Set access to **Anyone** only if you intend a public form and understand the implications.
5. Copy the deployed Web App URL into `assets/js/config.js` as `SCOPE_CONFIG.appsScriptUrl`.
6. Update the CTA if you want the main MEAL course page to point to the new form. The existing registration link remains available.
7. Test with a dummy registration and check the sheet before sharing publicly.

**Privacy/security note:** A public endpoint can be abused. For production, add spam protection and review data minimization, consent wording, access permissions, and retention. Never put Google credentials or private API keys in this repository.

## Customization
- Brand colours and layout: `assets/css/styles.css`
- Motion: `assets/css/motion.css` and `assets/js/main.js`
- Course content: `assets/js/courses.js`
- Apps Script endpoint: `assets/js/config.js`
- Logo: replace `assets/img/scope-logo.svg` with your official logo asset if available.

## Important
Upcoming courses are placeholders and are not currently open for registration. Confirm dates, fees, trainers, and curriculum before publishing them as active.
