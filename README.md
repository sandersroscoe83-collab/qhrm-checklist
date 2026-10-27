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

## Clearing entries
- **Export and backup → Danger zone → Clear entries…** clears what was entered for the current
  store's inspection and keeps the checklist, the selected store and its store details.
- Drafts of other stores (under Store details) each have a **Clear <Store> entries…** button with
  the same rule.
- Cleared: every A/B/C/N/A grade, portion weights, counts / par / top-up, item comments and repeat
  marks, section grades, section comments, the overall and non-conformance grades and comments,
  the sign-off fields, the inspection Date & time, Letter date, This grading, Foodcost %, and that
  store's photos (removed from the phone, freeing space).
- Kept: the selected store and the store details / letter header: restaurant name, address,
  owner, Attention, greeting (Dear ...), management team, last grading, letter signer and
  signer's company. Store profiles and other stores' drafts are never touched.
- Both ask twice: a dialog naming the store and how many answered items and photos go, with a
  **Save backup first** button; then you must type CLEAR.
- To undo a single grade, tap the selected grade again. To remove one photo, tap its thumbnail,
  then **Delete photo** and **Tap again to delete**.

## Backups
- **Save backup to phone** opens the Android share sheet (OneDrive, WhatsApp, email, Files).
  Android only shares certain file types, so it may be shared as `QHRM_<Store>_<YYYY-MM-DD>_backup.txt`;
  the content is the same JSON. Where sharing is not available it downloads instead.
- **Download full backup (with photos)** saves `QHRM_<Store>_<YYYY-MM-DD>_backup.json` to Downloads.
- Same format as the Page: `{v: 2, store, storeName, vals, photos}`. Restore here accepts backups
  from the Page and vice versa; `make_report.py` accepts both (.json or .txt).
- Data lives only in this browser on this phone and is separate from the Page's data. Clearing the
  browser's site data deletes it, so keep backing up (entries autosave on the phone; there is no backup pop-up, the top bar shows "Autosaved ✓ · last backup file: ...").
- v1.1.2: entries autosave on every change; the old "Backup reminder" box (every 12 changes / 15 min, with Dismiss)
  is gone. Auto backups: rolling snapshots of the current store's full backup (with photos) are kept inside the app
  (IndexedDB `qhrm-autobackups-v1`, last 5 per store), taken every 5 minutes while you work, when the app goes to the
  background, and before Clear entries / Start new inspection / a restore. Export and backup lists them with Restore
  (two taps) and Save as file. "Save backup file" next to the Autosaved line saves/shares the normal backup. The letter
  date now has its own section just above Export and backup.
