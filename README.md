# TIMPEX Rounds Update

A phone-first web app for writing the daily patient update to consultants. Tick chips and enter a few numbers per organ system, and it builds a plain-text message ready to paste into Viber or Messenger.

## Privacy (RA 10173)

- Patient data is stored only in the browser's local storage on the device you use.
- The app makes no network requests. A content security policy blocks every outside connection, and only the app's own script can run.
- Nothing is sent anywhere until you paste the message yourself.
- Optional app lock: with a PIN set, the data saved on the phone is encrypted (AES-256-GCM, key from PBKDF2-SHA256), and the app locks itself after a few idle minutes. If the PIN is forgotten, data can only come back from a backup.
- Backups can be encrypted with a passphrase (AES-256-GCM, key from PBKDF2-SHA256 with 600,000 iterations). Without the passphrase, the file can't be opened.
- Optional initials-only names for messages sent to group chats.
- Reminders to back up and to delete patients who haven't been updated in a week.

## What it checks before you send

Missing weight, output breakdown that doesn't add up, implausible values, antibiotic dose numbers not moved forward, sections left empty, chips that contradict the numbers (for example "afebrile" with a Tmax of 39), hypoglycemia without an intervention (level 1 below 70, level 2 below 54 mg/dl), CBG of 180 or more twice with no insulin entered (ADA), urine output under KDIGO thresholds from the void log, and antimicrobials on Day 3 (48-72 h review), past their planned duration or without an indication.

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

Replace `index.html` in this repository. Phones pick up the new version the next time the app is opened online, and use it from the launch after that.
