<div align="center">

# 💻 Cedar Grove CSHS

### Computer Science Honor Society — Cedar Grove High School

The official chapter website for the CSHS at Cedar Grove High School in Cedar Grove, NJ.

![HTML](https://img.shields.io/badge/HTML-62.4%25-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-30.0%25-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-7.6%25-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?style=flat-square&logo=github)

</div>

---

## ✨ Overview

A clean, framework-free static site that serves as the public home for the Cedar Grove High School Computer Science Honor Society. It introduces the chapter, highlights upcoming events, showcases member projects, lists curated learning resources, and gives prospective members a clear path to join.

Built deliberately without frameworks or a build step — just HTML, CSS, and a sprinkle of JavaScript. Easy to host, easy to maintain, easy for the next officer to pick up.

---

## 🗂️ Pages

| Page | Purpose |
|------|---------|
| **`index.html`** | Homepage with hero, upcoming events, chapter stats, and an activity chart |
| **`about.html`** | About the society and the programs we run |
| **`officers.html`** | Officer board with names and roles |
| **`projects.html`** | Showcase of member-built projects |
| **`resources.html`** | Curated learning resources for members |
| **`join.html`** | How to join + FAQ |

---

## 🎯 Features

- **🗓️ JSON-driven events system** — all events, announcements, and homepage stats live in a single `events.json` file. No HTML editing needed to add a meeting.
- **⏳ Auto-hiding past events** — events automatically disappear from the site once their date passes.
- **📢 Scrolling announcement ticker** — high-priority announcements get a visual indicator.
- **📊 Live stats** — homepage stat counters and activity chart driven from the same data file.
- **🎨 CSS variable theming** — change the entire color scheme by editing a handful of variables in `:root`.
- **⚡ Zero build step** — no npm install, no bundler, no framework. Open and edit.

---

## 🚀 Deployment

The site is designed to be hosted free on **GitHub Pages**.

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, choose `Deploy from a branch`.
4. Pick `main` / `(root)` and save.
5. Your site will be live at `https://<username>.github.io/<repo-name>/` within a minute.

---

## 🛠️ Local Development

Because the site uses `fetch()` to load `events.json`, opening `index.html` directly won't work — browsers block local file fetches. Spin up a quick local server:

**Python:**
```bash
