// =====================================================
// CSHS site logic
// Loads events.json and renders dynamic content
// =====================================================

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function formatTime(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function parseDate(dateStr) {
  // Parse as local date to avoid timezone shifts
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

async function loadData() {
  try {
    const res = await fetch('events.json');
    if (!res.ok) throw new Error('Failed to load events');
    return await res.json();
  } catch (err) {
    console.error(err);
    return { events: [], announcements: [], stats: {} };
  }
}

function renderEvents(events) {
  const list = document.getElementById('events-list');
  if (!list) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter upcoming events, sort by date
  const upcoming = events
    .filter(e => parseDate(e.date) >= today)
    .sort((a, b) => parseDate(a.date) - parseDate(b.date));

  if (upcoming.length === 0) {
    list.innerHTML = '<div class="empty-state">No upcoming events scheduled. Check back soon.</div>';
    return;
  }

  list.innerHTML = upcoming.map(e => {
    const d = parseDate(e.date);
    const day = d.getDate();
    const month = MONTHS[d.getMonth()];
    return `
      <article class="event">
        <div class="event-date">
          <div class="event-day">${day}</div>
          <div class="event-month">${month}</div>
        </div>
        <div class="event-body">
          <h3 class="event-title">${escapeHtml(e.title)}</h3>
          <div class="event-meta">
            <span>◷ ${formatTime(e.time)}</span>
            <span>⌖ ${escapeHtml(e.location)}</span>
          </div>
          <p class="event-description">${escapeHtml(e.description)}</p>
        </div>
        <div class="event-type ${e.type || 'other'}">${e.type || 'event'}</div>
      </article>
    `;
  }).join('');
}

function renderAnnouncements(announcements) {
  const bar = document.getElementById('announcement-track');
  if (!bar || !announcements || announcements.length === 0) return;

  // Duplicate for seamless scroll
  const items = [...announcements, ...announcements].map(a =>
    `<span class="announcement-item ${a.priority || ''}">${escapeHtml(a.text)}</span>`
  ).join('');
  bar.innerHTML = items;
}

function renderStats(stats) {
  if (!stats) return;
  Object.entries(stats).forEach(([key, val]) => {
    const el = document.querySelector(`[data-stat="${key}"]`);
    if (el) animateCount(el, val);
  });
}

function animateCount(el, target) {
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Mobile nav toggle
function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
}

// Scroll reveal
function setupReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(e => e.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(e => obs.observe(e));
}

// Activity chart (uses synthetic data — could be tied to attendance log later)
function renderActivityChart() {
  const chart = document.getElementById('activity-chart');
  if (!chart) return;

  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const attendance = [22, 28, 31, 26, 30, 35, 41, 38];
  const workshops = [1, 2, 1, 0, 2, 3, 2, 3];
  const maxAtt = Math.max(...attendance);

  chart.innerHTML = months.map((m, i) => {
    const attHeight = (attendance[i] / maxAtt) * 100;
    const wsHeight = (workshops[i] / maxAtt) * 100 * 4; // scale up workshops
    return `
      <div class="bar-col" title="${m}: ${attendance[i]} attendees, ${workshops[i]} workshops">
        <div class="bar-stack">
          <div class="bar attendance" style="height: ${attHeight}%"></div>
          <div class="bar workshops" style="height: ${wsHeight}%; margin-top: 2px;"></div>
        </div>
        <div class="bar-label">${m}</div>
      </div>
    `;
  }).join('');
}

// =====================================================
// Init
// =====================================================
document.addEventListener('DOMContentLoaded', async () => {
  setupNav();
  setupReveal();

  const data = await loadData();
  renderEvents(data.events || []);
  renderAnnouncements(data.announcements || []);
  renderStats(data.stats || {});
  renderActivityChart();
});
