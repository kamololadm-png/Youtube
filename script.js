function initTheme() {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;

  const saved = localStorage.getItem('theme');
  let dark = saved
    ? saved === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    btn.textContent = dark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  applyTheme();
  btn.addEventListener('click', () => {
    dark = !dark;
    applyTheme();
  });
}

function initChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

function initSidebar() {
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.getElementById('sidebar');

  menuBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('open');
    } else {
      document.body.classList.toggle('sidebar-mini');
    }
  });

  document.addEventListener('click', (e) => {
    if (
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      sidebar.classList.remove('open');
    }
  });
}

function initSearch() {
  const form = document.querySelector('.search-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = form.querySelector('.search-input').value.trim();
    if (query) {
      alert(`Searching for: "${query}"`);
    }
  });
}

function initVideoLinks() {
  const cards = document.querySelectorAll('.video-card, .short-card');

  cards.forEach((card) => {
    const thumbnail = card.querySelector('.thumbnail');
    const title = card.querySelector('.video-title, .short-card-title');
    if (!thumbnail || !title || thumbnail.tagName === 'IFRAME') return;

    const link = document.createElement('a');
    const youtubeUrl = card.dataset.youtubeUrl;
    link.href = youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(title.textContent.trim())}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'youtube-video-link';
    link.setAttribute('aria-label', `Watch ${title.textContent.trim()} on YouTube`);

    thumbnail.parentNode.insertBefore(link, thumbnail);
    link.appendChild(thumbnail);
  });
}

initTheme();
initChips();
initSidebar();
initSearch();
initVideoLinks();