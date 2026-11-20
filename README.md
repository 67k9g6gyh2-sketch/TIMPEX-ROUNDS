# TIMPEX Rounds Update

A phone-first web app for writing the daily patient update to consultants. Tick chips and enter a few numbers per organ system, and it builds a plain-text message ready to paste into Viber or Messenger.

## Privacy (RA 10173)

- Patient data is stored only in the browser's local storage on the device you use.
- The app makes no network requests. A content security policy blocks every outside connection, and only the app's own script can run.
- Nothing is sent anywhere until you paste the message yourself.
- Backups can be encrypted with a passphrase (AES-256-GCM, key from PBKDF2-SHA256 with 600,000 iterations). Without the passphrase, the file can't be opened.

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
