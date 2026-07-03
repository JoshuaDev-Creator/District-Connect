# Enable Live Site — One-Time Setup (2 minutes)

The app is built and ready. You only need to **turn on GitHub Pages once**:

## Steps

1. Open: **https://github.com/JoshuaDev-Creator/District-Connect/settings/pages**

2. Under **Build and deployment** → **Source**, choose:
   - **Deploy from a branch**

3. Set:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`

4. Click **Save**

5. Wait 2–3 minutes, then open:

   **https://joshuadev-creator.github.io/District-Connect/**

---

## Alternative (if branch deploy doesn't work)

Use the `docs` folder on `main`:

1. Same settings page
2. **Branch:** `main`
3. **Folder:** `/docs`
4. Save

---

## Why the old jsDelivr link didn't work

`cdn.jsdelivr.net` serves HTML as plain text, so browsers show code instead of the website. GitHub Pages serves it correctly.
