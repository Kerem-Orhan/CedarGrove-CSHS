# CSHS — Computer Science Honor Society Website

A static website for the CSHS chapter, designed to be hosted free on GitHub Pages.

---

## 🚀 How to put this on GitHub Pages

1. **Create a new repository** on GitHub (e.g. named `cshs-website` or whatever you like).
2. **Upload all the files in this folder** to the root of that repository (drag and drop on the GitHub web interface works fine).
3. Go to **Settings → Pages** in your repo.
4. Under **Source**, pick `Deploy from a branch`.
5. Pick branch `main` and folder `/ (root)`. Click **Save**.
6. Wait ~1 minute. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/REPO-NAME/
   ```

**Tip:** If you name the repo `YOUR-USERNAME.github.io` (replacing with your actual username), the URL becomes just `https://YOUR-USERNAME.github.io/` with no folder.

---

## ✏️ How to update events / meetings (the easy part)

You **don't have to edit any HTML**. All events, announcements, and stats live in one file:

### **`events.json`**

Open it in any text editor (or right on GitHub by clicking the file → pencil icon). It looks like this:

```json
{
  "events": [
    {
      "title": "General Meeting #5",
      "date": "2026-05-22",
      "time": "15:00",
      "location": "Room 204",
      "type": "meeting",
      "description": "Recap of the semester."
    }
  ]
}
```

### Fields:

- **`date`** — Format: `YYYY-MM-DD` (e.g. `2026-05-22` = May 22, 2026)
- **`time`** — 24-hour format: `15:00` = 3:00 PM, `08:30` = 8:30 AM
- **`location`** — Whatever you want (Room 204, Library, etc.)
- **`type`** — One of: `meeting`, `workshop`, `competition`, `social`, `guest`, `other` (each shows in a different color)
- **`description`** — Short blurb

### To add an event:

Copy one of the existing event blocks, paste it after the previous one, and edit the fields. **Don't forget the comma between events!**

### Past events disappear automatically

The site auto-hides events whose date has already passed. You can either leave them in the file or delete them — your choice.

### Announcements (scrolling ticker)

Edit the `"announcements"` section the same way. Set `"priority": "high"` to make one stand out with a red dot.

### Stats (the big numbers on the homepage)

Just edit the numbers in the `"stats"` section.

---

## 📄 Pages in this site

| File | What it is |
|---|---|
| `index.html` | Homepage — hero, events, stats, activity chart |
| `about.html` | About the society + programs we run |
| `officers.html` | Officer board with names and roles |
| `projects.html` | Showcase of member projects |
| `resources.html` | Curated learning resources |
| `join.html` | How to join + FAQ |

To **edit text** on any of these pages, open the `.html` file. The content sits inside regular tags — find the text, change it.

To **change colors or fonts**, edit `assets/style.css`. The `:root` variables at the top control the theme:

```css
:root {
  --accent: #00ff9c;   /* the bright green */
  --bg: #0a0e14;       /* main background */
  ...
}
```

---

## ⚠️ Things to customize before going live

These show up in placeholder form — search and replace them:

- `cshs@yourschool.edu` → your actual email
- Officer names on `officers.html` → real officers
- The `#` placeholder in the Discord/GitHub footer links
- Stats numbers in `events.json` if you want different starting values
- Project descriptions on `projects.html` → real projects (or keep as examples)

---

## 🧪 Testing locally

Because the site uses `fetch()` to load `events.json`, you can't just double-click `index.html` — browsers block local file fetches. Use a quick local server:

**Python:**
```bash
python3 -m http.server
```
Then open `http://localhost:8000` in your browser.

**Node:**
```bash
npx serve
```

Or just push to GitHub Pages and refresh.

---

That's it. Built clean, no frameworks, no build step, just three folders to manage.
