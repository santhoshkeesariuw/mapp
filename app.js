// uWorld Command Center — shared JS

// Inject the sidebar + topbar HTML into every page
function buildShell({ page, crumbTrail, title }) {
  const navItems = [
    { id: 'index', icon: 'ti-layout-dashboard', label: 'Overview', href: 'index.html' },
    { id: 'sites', icon: 'ti-sitemap', label: 'Sites tree', href: 'sites.html' },
    { id: 'seo', icon: 'ti-chart-line', label: 'SEO & rankings', href: 'seo.html' },
    { id: 'competitors', icon: 'ti-target-arrow', label: 'Competitors', href: 'competitors.html' },
    { id: 'content', icon: 'ti-edit', label: 'Content', href: 'content.html', badge: { count: 12, alert: true } },
    { id: 'conversion', icon: 'ti-arrows-shuffle', label: 'Conversion', href: 'conversion.html' },
    { id: 'banners', icon: 'ti-ad-2', label: 'Ad Banners', href: 'banners.html', badge: { count: 3, alert: true } },
    { id: 'team', icon: 'ti-users', label: 'Team', href: 'team.html', badge: { count: 104 } },
    { id: 'analytics', icon: 'ti-chart-pie', label: 'Analytics', href: 'analytics.html' },
    { id: 'settings', icon: 'ti-settings-2', label: 'Settings', href: 'settings.html' },
  ];

  const siteList = [
    { name: 'medical.uworld',            status: 'green'  },
    { name: 'nursing.uworld',            status: 'green'  },
    { name: 'pa.uworld',                 status: 'green'  },
    { name: 'accounting.uworld',         status: 'green'  },
    { name: 'gradschool.uworld',         status: 'yellow' },
    { name: 'finance.uworld',            status: 'yellow' },
    { name: 'collegeprep.uworld',        status: 'yellow' },
    { name: 'collegereadiness.uworld',   status: 'yellow' },
    { name: 'legal.uworld',              status: 'yellow' },
    { name: 'themisbar',                 status: 'yellow' },
    { name: 'pharmacy.uworld',           status: 'yellow' },
  ];

  const sidebar = `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">U</div>
        <div class="brand-text">
          <div class="brand-name">UWorld</div>
          <div class="brand-sub">Command center</div>
        </div>
      </div>

      <div class="nav-section">Workspace</div>
      <nav class="nav">
        ${navItems.map(n => `
          <a class="nav-item ${page === n.id ? 'active' : ''}" href="${n.href}">
            <i class="ti ${n.icon}"></i>
            <span>${n.label}</span>
            ${n.badge ? `<span class="nav-count ${n.badge.alert ? 'alert' : ''}">${n.badge.count}</span>` : ''}
          </a>
        `).join('')}
      </nav>

      <div class="nav-section">Sites</div>
      <nav class="nav">
        <a class="nav-item" href="sites.html"><i class="ti ti-world"></i><span>All sites</span><span class="nav-count">32</span></a>
        ${siteList.map(s => `
          <a class="nav-item" href="site-detail.html?site=${s.name}">
            <i class="ti ti-circle-filled" style="color: var(--${s.status === 'green' ? 'good' : s.status === 'yellow' ? 'warn' : 'bad'}); font-size: 8px;"></i>
            <span>${s.name}</span>
          </a>
        `).join('')}
      </nav>

      <div class="sidebar-foot">
        <div class="user-menu" id="userMenu">
          <div class="user-menu-header">
            <div class="user-menu-name">Ravi Kumar</div>
            <div class="user-menu-email">ravi@uworld.com</div>
          </div>
          <a class="user-menu-item" href="settings.html"><i class="ti ti-user"></i>Profile</a>
          <a class="user-menu-item" href="settings.html"><i class="ti ti-settings"></i>Settings</a>
          <button class="user-menu-item" onclick="showToast('Keyboard shortcuts', '⌘K  Command palette · ⌘/  Quick search')"><i class="ti ti-keyboard"></i>Shortcuts</button>
          <div class="user-menu-divider"></div>
          <a class="user-menu-item danger" href="login.html"><i class="ti ti-logout"></i>Log out</a>
        </div>
        <div class="user-card" id="userCard">
          <div class="avatar">R</div>
          <div class="user-info">
            <div class="user-name">Ravi</div>
            <div class="user-role">Owner · UWorld</div>
          </div>
          <button class="user-menu-btn" id="userMenuBtn" aria-label="User menu"><i class="ti ti-dots-vertical"></i></button>
        </div>
      </div>
    </aside>
  `;

  const ticker = `
    <div class="ticker">
      <div class="ticker-track">
        ${[1,2].map(() => `
          <span class="ticker-item">USMLE-Q1 <span class="up">+12%</span></span>
          <span class="ticker-item">NCLEX-PRO <span class="up">+8%</span></span>
          <span class="ticker-item">CFA-L1 <span class="down">-3%</span></span>
          <span class="ticker-item">MCAT-FL <span class="up">+22%</span></span>
          <span class="ticker-item">BAR-EXAM <span class="down">-5%</span></span>
          <span class="ticker-item">GRE-PREP <span class="up">+4%</span></span>
          <span class="ticker-item">AVG CTR <span class="up">+0.4pp</span></span>
          <span class="ticker-item">CONV $ <span class="up">+$84K</span></span>
          <span class="ticker-item">COMPETITOR-X 3 new pages</span>
          <span class="ticker-item">GOOGLE update detected · low impact</span>
        `).join('')}
      </div>
    </div>
  `;

  const topbar = `
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="menu-btn" id="menuBtn" aria-label="Toggle menu"><i class="ti ti-menu-2" style="font-size:18px;"></i></button>
        <div class="crumb">
          <a href="index.html">Workspace</a><span class="sep">/</span>
          <b>${crumbTrail || title}</b>
        </div>
      </div>
      <div class="topbar-right">
        <div class="search-mini" onclick="document.dispatchEvent(new CustomEvent('openCommand'))">
          <i class="ti ti-search" style="font-size: 14px;"></i>
          <span>Ask anything…</span>
          <span class="kbd">⌘K</span>
        </div>
        <button class="icon-btn" title="Calendar"><i class="ti ti-calendar"></i></button>
        <button class="icon-btn" title="Notifications" onclick="showToast('7 notifications', 'CompetitorX shipped 3 pages · 4 content items need approval · 1 ranking alert')">
          <i class="ti ti-bell"></i><span class="dot"></span>
        </button>
        <button class="icon-btn" title="Settings" onclick="location.href='settings.html'"><i class="ti ti-settings"></i></button>
      </div>
    </div>
  `;

  const overlay = `<div class="sidebar-overlay" id="sidebarOverlay"></div>`;

  return { sidebar, ticker, topbar, overlay };
}

// Toast
function showToast(title, text) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    t.id = 'toast';
    t.innerHTML = `<div class="toast-title"><i class="ti ti-check"></i><span id="toastTitle">Done</span></div><div class="toast-text" id="toastText">Action completed.</div>`;
    document.body.appendChild(t);
  }
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastText').textContent = text;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 4200);
}

// Chart defaults
function setupCharts() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.color = '#9AA1B2';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family = "'Geist', sans-serif";
}

// Sparkline helper
function spark(id, data, color) {
  const ctx = document.getElementById(id);
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: { labels: data.map((_,i)=>i), datasets: [{ data, borderColor: color, backgroundColor: color + '20', fill: true, borderWidth: 1.5, tension: 0.4, pointRadius: 0 }] },
    options: { responsive: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }
  });
}

// Render shell on every page
document.addEventListener('DOMContentLoaded', () => {
  const meta = window.PAGE_META || { page: 'index', title: 'Overview' };
  const { sidebar, ticker, topbar, overlay } = buildShell(meta);

  const app = document.querySelector('.app');
  if (app) {
    app.insertAdjacentHTML('afterbegin', sidebar);
    const main = app.querySelector('.main');
    if (main) {
      main.insertAdjacentHTML('afterbegin', ticker + topbar);
    }
  }
  document.body.insertAdjacentHTML('beforeend', overlay);

  // Sidebar drawer toggle
  const menuBtn = document.getElementById('menuBtn');
  const sidebarEl = document.querySelector('.sidebar');
  const overlayEl = document.getElementById('sidebarOverlay');
  function isMobileNav() {
    return window.innerWidth <= 768;
  }
  function openSidebar() {
    if (!sidebarEl) return;
    sidebarEl.classList.add('open');
    if (isMobileNav()) sidebarEl.style.transform = 'translateX(0)';
    overlayEl && overlayEl.classList.add('open');
  }
  function closeSidebar() {
    if (!sidebarEl) return;
    sidebarEl.classList.remove('open');
    if (isMobileNav()) sidebarEl.style.transform = '';
    overlayEl && overlayEl.classList.remove('open');
  }
  menuBtn && menuBtn.addEventListener('click', () => {
    sidebarEl && sidebarEl.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlayEl && overlayEl.addEventListener('click', closeSidebar);
  // Close sidebar on resize to desktop
  window.addEventListener('resize', () => {
    if (!isMobileNav()) { closeSidebar(); sidebarEl && (sidebarEl.style.transform = ''); }
  });

  setupCharts();

  // User menu toggle
  const userMenuBtn = document.getElementById('userMenuBtn');
  const userMenu    = document.getElementById('userMenu');
  userMenuBtn && userMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu && userMenu.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (userMenu && !userMenu.contains(e.target) && e.target !== userMenuBtn) {
      userMenu.classList.remove('open');
    }
  });
  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') userMenu && userMenu.classList.remove('open');
  });

  // Welcome toast
  if (meta.welcomeToast) {
    setTimeout(() => showToast(meta.welcomeToast.title, meta.welcomeToast.text), 800);
  }
});
