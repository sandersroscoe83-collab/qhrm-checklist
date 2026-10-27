# QHRM Checklist (Jackson & Black)

Standalone, installable, offline version of the "QHRM Inspection Checklist – Jackson & Black" Page:
Bossa QHRM operations report for Jackson & Black Strand, Tyger Valley and Paarl, 493 line items in
24 sections, in the paper form's order. Entries and photos stay on the phone (localStorage for
entries, IndexedDB for photos; persistent storage is requested on first use).

## Files
- `index.html` – page, styles (light and dark), service-worker registration
- `app.js` – the app (built from the Page source; no network calls)
- `vendor/preact-htm.js` – preact + hooks (MIT, vendored; licences in `vendor/`)
- `manifest.webmanifest`, `icons/` – install to the home screen as "QHRM"
- `sw.js` – offline cache of the app shell. **Bump `CACHE` in sw.js after changing any file**,
  then phones show "A new version of the app is ready – Reload".
- `.nojekyll` – serve the files as they are on GitHub Pages

## Host on GitHub Pages
1. Create a repository (e.g. `qhrm`) and upload the contents of this folder to its root.
2. Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
3. Open `https://<user>.github.io/<repo>/` in Chrome on the phone → menu → **Add to Home screen / Install app**.
All paths are relative, so it works from any sub-path. Test locally with `python3 -m http.server`.

## Checklist sections
- Tap a section heading to open or close it (▼ open, ▶ closed); a closed heading still shows
  "done/total" and its A/B/C/N/A counts. Every open section ends with a **Collapse section ▲**
  button that closes it and scrolls back to its heading. **Collapse all / Expand all** sit above
  the sections. Search and filters open matching sections; "Go to item in checklist" in Findings
  opens the item's section and scrolls to it.
- Which sections are open is remembered on the phone under `qhrm-collapsed-v1` (display only:
  not part of entries, backups or exports).

## Deleting a report
- **Export and backup → Danger zone → Delete this report…** deletes the current inspection's
  answers and its photos (frees space) and starts a blank checklist; store details are kept.
- Drafts of other stores (under Store details) each have a **Delete … draft…** button.
- Both ask twice: a dialog with the store, date, number of items and photos and a
  **Save backup first** button, then you must type DELETE. Other stores' drafts and the store
  profiles are never touched.

## Backups
- **Save backup to phone** opens the Android share sheet (OneDrive, WhatsApp, email, Files).
  Android only shares certain file types, so it may be shared as `QHRM_<Store>_<YYYY-MM-DD>_backup.txt`;
  the content is the same JSON. Where sharing is not available it downloads instead.
- **Download full backup (with photos)** saves `QHRM_<Store>_<YYYY-MM-DD>_backup.json` to Downloads.
- Same format as the Page: `{v: 2, store, storeName, vals, photos}`. Restore here accepts backups
  from the Page and vice versa; `make_report.py` accepts both (.json or .txt).
- Data lives only in this browser on this phone and is separate from the Page's data. Clearing the
  browser's site data deletes it, so keep backing up (reminder after 12 changes or 15 minutes).
