// ═══════════════════════════════════════════════════════════
//  SHARED.JS — All Yono App
//  Used by: index.html, jaiho-777.html
// ═══════════════════════════════════════════════════════════

// ── Sidebar ─────────────────────────────────────────────────
function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  sidebar.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (typeof anime !== 'undefined') {
    anime({
      targets: '#sidebar .sidebar-link',
      translateX: [-20, 0], opacity: [0, 1],
      delay: anime.stagger(55, { start: 100 }),
      duration: 340, easing: 'easeOutCubic'
    });
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Search modal ─────────────────────────────────────────────
function openSearch() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  setTimeout(() => {
    const input = document.getElementById('searchInput');
    if (input) input.focus();
  }, 60);
  if (typeof anime !== 'undefined') {
    anime({ targets: '.search-box', translateY: [-16, 0], opacity: [0, 1], duration: 300, easing: 'easeOutCubic' });
  }
  if (typeof renderResults === 'function') renderResults('');
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  const modal = document.getElementById('searchModal');
  if (!modal) return;
  if (typeof anime !== 'undefined') {
    anime({
      targets: '.search-box', translateY: [0, -12], opacity: [1, 0],
      duration: 200, easing: 'easeInCubic',
      complete: () => {
        modal.classList.add('hidden');
        modal.style.display = '';
        const input = document.getElementById('searchInput');
        if (input) input.value = '';
        const results = document.getElementById('searchResults');
        if (results) results.innerHTML = '';
        const empty = document.getElementById('searchEmpty');
        if (empty) empty.classList.add('hidden');
      }
    });
  } else {
    modal.classList.add('hidden');
    modal.style.display = '';
  }
  document.body.style.overflow = '';
}

// ── Tab switching (index only) ───────────────────────────────
function switchTab(tab) {
  const allList = document.getElementById('list-all');
  const newList = document.getElementById('list-new');
  const tabAll  = document.getElementById('tab-all');
  const tabNew  = document.getElementById('tab-new');
  if (!allList) return;
  if (tab === 'all') {
    allList.classList.remove('hidden'); newList.classList.add('hidden');
    tabAll.classList.add('active');     tabNew.classList.remove('active');
    animeListIn('#list-all .app-item');
  } else {
    newList.classList.remove('hidden'); allList.classList.add('hidden');
    tabNew.classList.add('active');     tabAll.classList.remove('active');
    animeListIn('#list-new .app-item');
  }
}

function animeListIn(sel) {
  if (typeof anime === 'undefined') return;
  anime({ targets: sel, translateY: [12, 0], opacity: [0, 1], delay: anime.stagger(55), duration: 300, easing: 'easeOutCubic' });
}

// ── Search data ──────────────────────────────────────────────
const allApps = [
  { name: 'Yn 777',   bonus: '₹50',  withdraw: '₹100', link: 'yn777.html', initials: 'JR',   bg: '#0A65E6' },
  { name: 'boss Rummy',     bonus: '₹20',  withdraw: '₹100', link: 'bossRummy.html', initials: 'B101', bg: '#ca8a04' },
  { name: '789 Jackpot', bonus: '₹155', withdraw: '₹100', link: '789jackpot.html', initials: 'J777', bg: '#166534' },
  { name: 'Joy Rummy',      bonus: '₹25',  withdraw: '₹100', link: 'joyRummy.html', initials: 'OK',   bg: '#0A65E6' },
  { name: 'Meha Games',    bonus: '₹55',  withdraw: '₹100', link: 'mehaGames.html', initials: 'GG',   bg: '#0d9488' },
];

function renderResults(query) {
  const q        = (query || '').trim().toLowerCase();
  const filtered = q ? allApps.filter(a => a.name.toLowerCase().includes(q)) : allApps;
  const list     = document.getElementById('searchResults');
  const empty    = document.getElementById('searchEmpty');
  if (!list) return;
  if (!filtered.length) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');
  list.innerHTML = filtered.map((app, i) => `
    <li style="animation:fadeUp .2s ease ${i * 0.04}s both"
        class="flex items-center px-4 py-3 gap-3 hover:bg-green-50 transition-colors cursor-pointer border-l-2 border-transparent hover:border-green-500">
      <div class="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm"
           style="background:${app.bg}">${app.initials}</div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-800 text-sm leading-tight">${app.name}</p>
        <p class="text-green-600 text-xs font-medium mt-0.5">🎁 Signup: ${app.bonus}</p>
        <p class="text-gray-400 text-[11px]">Min Withdrawal: ${app.withdraw}</p>
      </div>
      <a href="${app.link}"
         class="btn-dl text-white text-[11px] font-bold px-3.5 py-2 rounded-xl flex-shrink-0">
        <span class="dl-text">⬇ Download</span>
      </a>
    </li>`).join('');
  if (typeof anime !== 'undefined') {
    anime({ targets: '#searchResults li', translateY: [-8, 0], opacity: [0, 1], delay: anime.stagger(40), duration: 250, easing: 'easeOutCubic' });
  }
}

// ── FAQ toggle ───────────────────────────────────────────────
function toggleFaq(btn) {
  const body   = btn.nextElementSibling;
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.faq-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.faq-btn').forEach(b => b.classList.remove('active'));
  if (!isOpen) {
    body.classList.add('open');
    btn.classList.add('active');
    if (typeof anime !== 'undefined') anime({ targets: btn.querySelector('.faq-icon'), rotate: 45, duration: 260, easing: 'easeOutCubic' });
  } else {
    if (typeof anime !== 'undefined') anime({ targets: btn.querySelector('.faq-icon'), rotate: 0, duration: 260, easing: 'easeOutCubic' });
  }
}

// ── Share function ───────────────────────────────────────────
function shareApp() {
  const title = document.querySelector('h2')?.textContent?.trim() || document.title;
  const text  = `🎮 Download ${title} now & get signup bonus! Play Rummy, Slots & more — Win Real Cash!`;
  const url   = window.location.href;

  if (navigator.share) {
    // Native share sheet (Android / iOS)
    navigator.share({ title, text, url })
      .then(() => showToast('Shared successfully! 🎉'))
      .catch(err => { if (err.name !== 'AbortError') copyToClipboard(url); });
  } else {
    // Desktop fallback — copy link to clipboard
    copyToClipboard(url);
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('Link copied to clipboard! 📋'))
      .catch(() => legacyCopy(text));
  } else {
    legacyCopy(text);
  }
}

function legacyCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try {
    document.execCommand('copy');
    showToast('Link copied to clipboard! 📋');
  } catch {
    showToast('Copy: ' + text, 5000);
  }
  document.body.removeChild(ta);
}

// ── Toast notification ────────────────────────────────────────
function showToast(msg, duration = 2400) {
  document.querySelector('.yono-toast')?.remove();
  const toast = document.createElement('div');
  toast.className = 'yono-toast';
  toast.textContent = msg;
  toast.style.cssText = [
    'position:fixed', 'bottom:28px', 'left:50%',
    'transform:translateX(-50%) translateY(16px)',
    'background:#1a1a1a', 'color:#fff',
    'font-size:13px', 'font-weight:600', 'letter-spacing:.01em',
    'padding:11px 22px', 'border-radius:50px', 'z-index:99999',
    'box-shadow:0 6px 24px rgba(0,0,0,.35)',
    'pointer-events:none', 'white-space:nowrap',
    'opacity:0', 'transition:opacity .22s ease, transform .22s ease',
    'font-family:Inter,sans-serif',
    'border:1px solid rgba(255,255,255,.08)'
  ].join(';');
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 260);
  }, duration);
}

// ── Ripple helper ────────────────────────────────────────────
function addRipple(btn) {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const r = document.createElement('span');
    r.className = 'ripple-circle';
    r.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
}

// ── DOM Ready ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Share button ──
  const shareBtn = document.querySelector('.share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      shareApp();
      if (typeof anime !== 'undefined') {
        anime({
          targets: shareBtn,
          rotate: [0, 20, -10, 0],
          scale:  [1, 1.2, 1],
          duration: 420,
          easing: 'easeOutBack'
        });
      }
    });
  }

  // Wire menu button
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      openSidebar();
      if (typeof anime !== 'undefined') anime({ targets: menuBtn, rotate: [0, 8, -4, 0], duration: 380, easing: 'easeOutElastic(1,.8)' });
    });
  }

  // Wire search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', e => renderResults(e.target.value));

  // Close search on backdrop click
  const searchModal = document.getElementById('searchModal');
  if (searchModal) searchModal.addEventListener('click', e => { if (e.target === searchModal) closeSearch(); });

  // Esc key closes search
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

  // Ripple on all .btn-dl
  document.querySelectorAll('.btn-dl').forEach(addRipple);

  if (typeof anime === 'undefined') return;

  // ── Header ──
  anime({ targets: '.header-title', translateY: [-12, 0], opacity: [0, 1], duration: 520, easing: 'easeOutBack' });
  // header-title id alias
  const ht = document.getElementById('headerTitle');
  if (ht) anime({ targets: ht, translateY: [-12, 0], opacity: [0, 1], duration: 520, easing: 'easeOutBack' });

  anime({ targets: '#hp1', translateY: [-8, 8], opacity: [.15, .32], direction: 'alternate', loop: true, duration: 3100, easing: 'easeInOutSine' });
  anime({ targets: '#hp2', translateY: [5, -5], translateX: [-3, 3], opacity: [.1, .22], direction: 'alternate', loop: true, duration: 2400, easing: 'easeInOutSine' });
  anime({ targets: '#hp3', translateY: [-4, 4], opacity: [.08, .18], direction: 'alternate', loop: true, duration: 2700, easing: 'easeInOutSine' });

  // ── Index page ──
  anime({ targets: '.hero-section', translateY: [20, 0], opacity: [0, 1], duration: 600, delay: 150, easing: 'easeOutCubic' });
  anime({ targets: '.podium-card',  translateY: [30, 0], opacity: [0, 1], delay: anime.stagger(100, { start: 300 }), duration: 600, easing: 'easeOutBack' });
  anime({ targets: '.tg-banner',    translateX: [-24, 0], opacity: [0, 1], duration: 500, delay: 550, easing: 'easeOutCubic' });
  anime({ targets: '.section-appear', translateY: [24, 0], opacity: [0, 1], duration: 500, delay: 650, easing: 'easeOutCubic' });
  animeListIn('#list-all .app-item');

  // ── Jaiho-777 page ──
  anime({ targets: '.app-card',    translateY: [20, 0], opacity: [0, 1], duration: 580, delay: 120, easing: 'easeOutCubic' });
  anime({ targets: '.section-fade', translateY: [22, 0], opacity: [0, 1], delay: anime.stagger(100, { start: 280 }), duration: 520, easing: 'easeOutCubic' });
  anime({ targets: '.also-card',   translateY: [16, 0], opacity: [0, 1], delay: anime.stagger(55,  { start: 500 }), duration: 380, easing: 'easeOutBack' });
  anime({ targets: '.more-card',   translateY: [16, 0], opacity: [0, 1], delay: anime.stagger(50,  { start: 650 }), duration: 360, easing: 'easeOutBack' });
  anime({ targets: '.faq-item',    translateX: [-14, 0], opacity: [0, 1], delay: anime.stagger(80,  { start: 400 }), duration: 420, easing: 'easeOutCubic' });
  anime({ targets: '.stat-item',   scale: [0.85, 1],    opacity: [0, 1], delay: anime.stagger(80,  { start: 250 }), duration: 380, easing: 'easeOutBack' });

  // ── Download btn interactions ──
  const dlBtn = document.querySelector('.btn-main-dl');
  if (dlBtn) {
    addRipple(dlBtn);
    dlBtn.addEventListener('mousedown', () => anime({ targets: dlBtn, scale: [1, 0.96], duration: 90, easing: 'easeInCubic' }));
    dlBtn.addEventListener('mouseup',   () => anime({ targets: dlBtn, scale: [0.96, 1.04, 1], duration: 300, easing: 'easeOutBack' }));
    dlBtn.addEventListener('mouseleave',() => anime({ targets: dlBtn, scale: 1, duration: 200, easing: 'easeOutCubic' }));
  }

  // List btn interactions
  document.querySelectorAll('.btn-dl').forEach(btn => {
    btn.addEventListener('mousedown', function() { anime({ targets: this, scale: [1, 0.92], duration: 100, easing: 'easeInCubic' }); });
    btn.addEventListener('mouseup',   function() { anime({ targets: this, scale: [0.92, 1.06, 1], duration: 280, easing: 'easeOutBack' }); });
    btn.addEventListener('mouseleave',function() { anime({ targets: this, scale: 1, duration: 180, easing: 'easeOutCubic' }); });
  });

  // Podium dl btns
  document.querySelectorAll('.podium-dl-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => anime({ targets: btn, scale: 1.07, duration: 200, easing: 'easeOutBack' }));
    btn.addEventListener('mouseleave', () => anime({ targets: btn, scale: 1, duration: 200, easing: 'easeOutCubic' }));
  });

  // App icon (jaiho page)
  const appIcon = document.querySelector('.app-icon-wrap');
  if (appIcon) {
    appIcon.addEventListener('mouseenter', () => anime({ targets: appIcon, scale: 1.07, rotate: -2, duration: 220, easing: 'easeOutBack' }));
    appIcon.addEventListener('mouseleave', () => anime({ targets: appIcon, scale: 1, rotate: 0, duration: 220, easing: 'easeOutCubic' }));
  }

  // Rank badge pop (index)
  document.querySelectorAll('.app-item').forEach(item => {
    const badge = item.querySelector('.rank-badge');
    if (!badge) return;
    item.addEventListener('mouseenter', () => anime({ targets: badge, scale: [1, 1.25], duration: 220, easing: 'easeOutBack' }));
    item.addEventListener('mouseleave', () => anime({ targets: badge, scale: [1.25, 1], duration: 180, easing: 'easeOutCubic' }));
  });

  // FAQ hover nudge
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('mouseenter', () => anime({ targets: item, translateX: [0, 3], duration: 180, easing: 'easeOutCubic' }));
    item.addEventListener('mouseleave', () => anime({ targets: item, translateX: [3, 0], duration: 180, easing: 'easeOutCubic' }));
  });

  // Social icons
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => anime({ targets: icon, translateY: -4, scale: 1.1, duration: 200, easing: 'easeOutBack' }));
    icon.addEventListener('mouseleave', () => anime({ targets: icon, translateY: 0,  scale: 1,   duration: 200, easing: 'easeOutCubic' }));
  });

  // Also-like / More cards
  [...document.querySelectorAll('.also-card'), ...document.querySelectorAll('.more-card')].forEach(card => {
    card.addEventListener('mouseenter', () => anime({ targets: card, translateY: -5, duration: 200, easing: 'easeOutBack' }));
    card.addEventListener('mouseleave', () => anime({ targets: card, translateY: 0,  duration: 200, easing: 'easeOutCubic' }));
  });
});