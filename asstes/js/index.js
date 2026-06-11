// ── Sidebar ──────────────────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

function closeSidebar() {
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Tab switching ─────────────────────────────────────────────
function switchTab(tab) {
  const allList = document.getElementById('list-all');
  const newList = document.getElementById('list-new');
  const tabAll  = document.getElementById('tab-all');
  const tabNew  = document.getElementById('tab-new');

  if (!allList) return;

  if (tab === 'all') {
    allList.classList.remove('hidden');
    newList.classList.add('hidden');
    tabAll.classList.add('active');
    tabNew.classList.remove('active');
  } else {
    newList.classList.remove('hidden');
    allList.classList.add('hidden');
    tabNew.classList.add('active');
    tabAll.classList.remove('active');
  }
}

// ── Search data ───────────────────────────────────────────────
const allApps = [
  { name: 'Jaiho Rummy',   bonus: '₹50',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'JR',   bg: '#15803d' },
  { name: 'Bingo 101',     bonus: '₹20',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'B101', bg: '#ca8a04' },
  { name: 'Jaiho 777 Vip', bonus: '₹155', withdraw: '₹100', link: 'jaiho-777.html', initials: 'J777', bg: '#166534' },
  { name: 'Ok Rummy',      bonus: '₹25',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'OK',   bg: '#16a34a' },
  { name: 'Joy Rummy',     bonus: '₹51',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'JOY',  bg: '#2563eb' },
  { name: 'Jaiho 91',      bonus: '₹100', withdraw: '₹100', link: 'jaiho-777.html', initials: 'J91',  bg: '#15803d' },
  { name: 'Spin Gold',     bonus: '₹37',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'SG',   bg: '#b45309' },
  { name: 'Yes Spin',      bonus: '₹40',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'YS',   bg: '#7c3aed' },
  { name: 'Slots Winner',  bonus: '₹100', withdraw: '₹100', link: 'jaiho-777.html', initials: 'SW',   bg: '#dc2626' },
  { name: 'INR Rummy',     bonus: '₹50',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'INR',  bg: '#ea580c' },
  { name: 'Gogo Rummy',    bonus: '₹55',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'GG',   bg: '#0d9488' },
  { name: 'Ever 777',      bonus: '₹60',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'E777', bg: '#4338ca' },
  { name: 'Love Rummy',    bonus: '₹75',  withdraw: '₹100', link: 'jaiho-777.html', initials: 'LR',   bg: '#be185d' },
];

// ── Search open/close ─────────────────────────────────────────
function openSearch() {
  const modal = document.getElementById('searchModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  // small delay to trigger CSS transition
  requestAnimationFrame(() => {
    document.getElementById('searchInput').focus();
  });
  renderResults('');
  document.body.style.overflow = 'hidden';
}

function closeSearch() {
  const modal = document.getElementById('searchModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.getElementById('searchInput').value = '';
  document.body.style.overflow = '';
}

// ── Render results ────────────────────────────────────────────
function renderResults(query) {
  const q        = query.trim().toLowerCase();
  const filtered = q ? allApps.filter(a => a.name.toLowerCase().includes(q)) : allApps;
  const list     = document.getElementById('searchResults');
  const empty    = document.getElementById('searchEmpty');

  if (filtered.length === 0) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  list.innerHTML = filtered.map((app, i) => `
    <li style="animation: fadeUp .2s ease ${i * 0.04}s both"
        class="flex items-center px-4 py-3 gap-3 hover:bg-green-50 transition-colors cursor-pointer border-l-2 border-transparent hover:border-green-500">
      <div class="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm"
           style="background:${app.bg}">${app.initials}</div>
      <div class="flex-1 min-w-0">
        <p class="font-semibold text-gray-800 text-sm leading-tight">${app.name}</p>
        <p class="text-green-600 text-xs font-medium mt-0.5">🎁 Signup: ${app.bonus}</p>
        <p class="text-gray-400 text-[11px]">Min Withdrawal: ${app.withdraw}</p>
      </div>
      <a href="${app.link}"
         style="background:linear-gradient(135deg,#16a34a,#15803d);box-shadow:0 2px 8px rgba(22,163,74,.35)"
         class="text-white text-[11px] font-bold px-3.5 py-2 rounded-xl flex-shrink-0 hover:opacity-90 transition-opacity">
        ⬇ Download
      </a>
    </li>
  `).join('');
}

// ── Event listeners ───────────────────────────────────────────
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', e => renderResults(e.target.value));
}

const searchModal = document.getElementById('searchModal');
if (searchModal) {
  searchModal.addEventListener('click', function(e) {
    if (e.target === this) closeSearch();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSearch();
});