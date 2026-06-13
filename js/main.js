/* ============================================================
   Hardware Handbook — main.js
   ============================================================ */

'use strict';

// ── Theme Toggle ──────────────────────────────────────────
(function initTheme() {
  const stored = localStorage.getItem('hh-theme');
  if (stored === 'light') document.body.classList.add('light-mode');
})();

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('hh-theme', isLight ? 'light' : 'dark');
}

// ── Mobile Sidebar ────────────────────────────────────────
let sidebarOpen = false;

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  sidebarOpen = !sidebarOpen;
  sidebar.classList.toggle('open', sidebarOpen);
  document.body.style.overflow = sidebarOpen ? 'hidden' : '';
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  sidebarOpen = false;
  sidebar.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Active Nav Link ───────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .sidebar-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const target = href.split('/').pop();
    if (target === filename || (filename === '' && target === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── Copy Code Buttons ─────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('pre').forEach(pre => {
    // skip if already has a copy button
    if (pre.parentElement.querySelector('.copy-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', 'Copy code');

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btnWrap = document.createElement('div');
    btnWrap.style.cssText = 'position:absolute;top:10px;right:12px;';
    btnWrap.appendChild(btn);
    wrapper.appendChild(btnWrap);

    btn.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent ?? pre.textContent;
      try {
        await navigator.clipboard.writeText(code.trim());
        btn.textContent = 'copied!';
        btn.style.color = 'var(--teal)';
        btn.style.borderColor = 'var(--teal)';
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      } catch {
        btn.textContent = 'error';
        setTimeout(() => { btn.textContent = 'copy'; }, 1500);
      }
    });
  });
}

// ── Accordion (Interview Questions) ──────────────────────
function initAccordions() {
  document.querySelectorAll('.question-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.question-card');
      const wasOpen = card.classList.contains('open');

      // Close all
      document.querySelectorAll('.question-card.open').forEach(c => c.classList.remove('open'));

      // Toggle clicked
      if (!wasOpen) card.classList.add('open');
    });
  });
}

// ── Checklist Progress ────────────────────────────────────
function initChecklists() {
  document.querySelectorAll('.checklist').forEach(list => {
    const items = list.querySelectorAll('li');
    const section = list.closest('.checklist-section');
    const progressFill = section?.querySelector('.progress-fill');
    const progressText = section?.querySelector('.progress-text');

    function updateProgress() {
      const total   = items.length;
      const checked = list.querySelectorAll('input[type="checkbox"]:checked').length;
      const pct     = total ? Math.round((checked / total) * 100) : 0;
      if (progressFill) progressFill.style.width = pct + '%';
      if (progressText) progressText.textContent  = `${checked}/${total}`;
    }

    items.forEach(item => {
      const cb = item.querySelector('input[type="checkbox"]');
      if (!cb) return;

      cb.addEventListener('change', () => {
        item.classList.toggle('checked', cb.checked);
        updateProgress();
        saveChecklistState(list);
      });
    });

    // Restore state
    loadChecklistState(list);
    updateProgress();
  });
}

function getChecklistKey(list) {
  return 'hh-checklist-' + (list.id || list.dataset.id || window.location.pathname);
}

function saveChecklistState(list) {
  const state = {};
  list.querySelectorAll('li').forEach((item, i) => {
    const cb = item.querySelector('input[type="checkbox"]');
    if (cb) state[i] = cb.checked;
  });
  try { localStorage.setItem(getChecklistKey(list), JSON.stringify(state)); } catch {}
}

function loadChecklistState(list) {
  try {
    const raw = localStorage.getItem(getChecklistKey(list));
    if (!raw) return;
    const state = JSON.parse(raw);
    list.querySelectorAll('li').forEach((item, i) => {
      const cb = item.querySelector('input[type="checkbox"]');
      if (cb && state[i]) {
        cb.checked = true;
        item.classList.add('checked');
      }
    });
  } catch {}
}

// ── Table of Contents — Scroll Spy ───────────────────────
function initTocSpy() {
  const toc = document.querySelector('.toc-list');
  if (!toc) return;

  const headings = document.querySelectorAll('.article-body h2, .article-body h3');
  if (!headings.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        toc.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-');
    }
    observer.observe(h);
  });
}

// ── Auto-generate TOC links ───────────────────────────────
function buildToc() {
  const tocList = document.querySelector('.toc-list');
  if (!tocList || tocList.children.length) return; // already has items

  const headings = document.querySelectorAll('.article-body h2, .article-body h3');
  headings.forEach(h => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g, '-');
    }
    const li = document.createElement('li');
    if (h.tagName === 'H3') li.style.paddingLeft = '12px';
    li.innerHTML = `<a href="#${h.id}">${h.textContent}</a>`;
    tocList.appendChild(li);
  });
}

// ── Glossary Filter ───────────────────────────────────────
function initGlossaryFilter() {
  const input = document.querySelector('.glossary-search');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();

    document.querySelectorAll('.glossary-group').forEach(group => {
      let visible = 0;
      group.querySelectorAll('.glossary-entry').forEach(entry => {
        const term = entry.querySelector('.glossary-term')?.textContent.toLowerCase() ?? '';
        const def  = entry.querySelector('.glossary-def')?.textContent.toLowerCase() ?? '';
        const show = !q || term.includes(q) || def.includes(q);
        entry.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      group.style.display = visible ? '' : 'none';
    });
  });
}

// ── Category filter pills ─────────────────────────────────
function initFilterPills() {
  const pills = document.querySelectorAll('.filter-pill');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const isAll = pill.dataset.filter === 'all';

      if (isAll) {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        document.querySelectorAll('[data-category]').forEach(el => el.style.display = '');
        return;
      }

      pill.classList.toggle('active');

      const activePills = [...pills].filter(p => p.classList.contains('active') && p.dataset.filter !== 'all');
      const allPill = document.querySelector('[data-filter="all"]');
      if (allPill) allPill.classList.toggle('active', activePills.length === 0);

      if (activePills.length === 0) {
        document.querySelectorAll('[data-category]').forEach(el => el.style.display = '');
      } else {
        const activeFilters = activePills.map(p => p.dataset.filter);
        document.querySelectorAll('[data-category]').forEach(el => {
          const cats = (el.dataset.category || '').split(' ');
          el.style.display = cats.some(c => activeFilters.includes(c)) ? '' : 'none';
        });
      }
    });
  });
}

// ── Smooth anchor scroll ──────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 56;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── Back to top button ────────────────────────────────────
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Keyboard shortcut: / or Ctrl+K → open search ─────────
function initSearchShortcut() {
  document.addEventListener('keydown', e => {
    if ((e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') ||
        (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });
}

function openSearch() {
  const overlay = document.querySelector('.search-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  const input = overlay.querySelector('.search-input');
  if (input) input.focus();
}

function closeSearch() {
  document.querySelector('.search-overlay')?.classList.remove('open');
}

// ── DOM ready ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initCopyButtons();
  initAccordions();
  initChecklists();
  buildToc();
  initTocSpy();
  initGlossaryFilter();
  initFilterPills();
  initSmoothScroll();
  initBackToTop();
  initSearchShortcut();

  // Theme toggle button
  document.querySelectorAll('.nav-theme-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Sidebar toggle
  document.querySelectorAll('.nav-menu-btn').forEach(btn => {
    btn.addEventListener('click', toggleSidebar);
  });

  // Close sidebar on outside click
  document.addEventListener('click', e => {
    const sidebar = document.querySelector('.sidebar');
    const btn = document.querySelector('.nav-menu-btn');
    if (sidebarOpen && sidebar && !sidebar.contains(e.target) && !btn?.contains(e.target)) {
      closeSidebar();
    }
  });

  // Search overlay close on backdrop
  document.querySelector('.search-overlay')?.addEventListener('click', e => {
    if (e.target.classList.contains('search-overlay')) closeSearch();
  });

  // Nav search trigger
  document.querySelectorAll('.nav-search-trigger').forEach(el => {
    el.addEventListener('click', openSearch);
  });
});
