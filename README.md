# TIMPEX Rounds Update

A phone-first web app for writing the daily patient update to consultants. Tick chips and enter a few numbers per organ system, and it builds a plain-text message ready to paste into Viber or Messenger.

## Privacy (RA 10173)

- Patient data is stored only in the browser's local storage on the device you use.
- The page makes no network requests. A content security policy blocks every outside connection, and only the app's own script can run. The optional service worker only re-downloads the app's own files from this site, to keep it up to date and working offline.
- Nothing is sent anywhere until you paste the message yourself.
- Optional app lock: with a PIN set, the data saved on the phone is encrypted (AES-256-GCM, key from PBKDF2-SHA256), and the app locks itself after a few idle minutes. If the PIN is forgotten, data can only come back from a backup.
- Backups can be encrypted with a passphrase (AES-256-GCM, key from PBKDF2-SHA256 with 600,000 iterations). Without the passphrase, the file can't be opened.
- Optional initials-only names for messages sent to group chats.
- Reminders to back up and to delete patients who haven't been updated in a week.

## What it checks before you send

Missing weight, output breakdown that doesn't add up, implausible values, antibiotic dose numbers not moved forward, sections left empty, chips that contradict the numbers (for example "afebrile" with a Tmax of 39), hypoglycemia without an intervention (level 1 below 70, level 2 below 54 mg/dl), CBG of 180 or more twice with no insulin entered (ADA), urine output under KDIGO thresholds from the void log, and antimicrobials on Day 3 (48-72 h review), past their planned duration or without an indication.

## Also in the app

- **Illness severity** (I-PASS: stable, watcher, unstable) under the day counters, and a **contingency plan** ("if this happens, then...") in Assessment and requests. Both are optional; when left blank the message format is unchanged.
- **What changed since the last update**: Preview lists new, changed and stopped medications, drips, oxygen, severity and chips compared with the last message you copied or shared. It is for your own check and is not added to the message.
- **Copy in parts** for long messages: Viber may not send a message over 7,000 characters, so Preview offers the message in parts that break at section dividers.
- **Normal values** under vital signs (MedlinePlus; SpO₂ from ABIM), with values outside the range marked. Settings can turn this off. A **Reference** screen lists adult normal values for vitals, bedside targets and common labs (ABIM January 2026, with SI units), searchable.
- **Drip dose guide**: pick what a drip is for (for example septic shock, cardiogenic shock, bradycardia) and the app shows the usual dose for that use and where the current dose sits. It covers norepinephrine, epinephrine, dopamine, dobutamine, milrinone, vasopressin, phenylephrine, nitroglycerin and nicardipine, from the Surviving Sepsis Campaign 2026, AHA 2025 and 2017, Resuscitation Council UK 2021 and the package inserts. A dose above the label maximum is flagged before sending. Your hospital protocol and the consultant's order come first.
- **Tidal volume per kg of predicted body weight** on the ventilator, from height and sex (lung-protective range 4–8 mL/kg).
- Home search once you have more than five patients.
- Works with screen readers and a keyboard (named dialogs, focus kept inside open sheets and returned on close), and with large text or Chrome's Page Zoom up to 200%.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: HTML, CSS and JavaScript in one file. Works on its own. |
| `sw.js` | Optional. Caches the app so it opens with no signal. |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Optional. App name and icon for "Add to Home Screen". |

## Use

1. Open the GitHub Pages address once while online.
2. Add it to your home screen.
3. Tap **Load demo patient**, then **Preview**, to see a complete message.

On iPhone, the Safari tab and the Home Screen icon keep separate data. Use one of them, or move data between them with Export and Import backup.

## Updating

Replace `index.html` in this repository. The next time the app is opened online it downloads the new version and shows **A new version of the app is ready. Reload now**. Patients are kept. The version number is in Settings, under About.
