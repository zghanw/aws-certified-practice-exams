'use strict';
// index.html's head sets data-theme, and adds .js to <html> when motion is allowed.
const root = document.documentElement;
const motion = root.classList.contains('js');

// ---------- Theme: follows the system until the reader picks one, which is then remembered ----------
const themeBtn = document.getElementById('theme');
themeBtn.setAttribute('aria-pressed', root.dataset.theme === 'dark');
themeBtn.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.classList.add('theming');
  root.dataset.theme = theme;
  themeBtn.setAttribute('aria-pressed', theme === 'dark');
  try { localStorage.setItem('hub:theme', JSON.stringify(theme)); } catch {}
  setTimeout(() => root.classList.remove('theming'), 300);
});

// ---------- Live sample question: one real question per exam (questions.js) ----------
const qEl = document.getElementById('q');
const tabs = [...document.querySelectorAll('.seg button')];
const el = (tag, cls, text = '') => { const e = document.createElement(tag); e.className = cls; e.textContent = text; return e; };

function show(k) {
  const item = (window.QUIZ || []).find(x => x.k === k);
  if (!item) return;
  tabs.forEach(t => t.setAttribute('aria-pressed', t.dataset.k === k));
  const card = document.querySelector(`.exam[data-k="${k}"]`), code = card.querySelector('.code').textContent;
  const cut = item.q.lastIndexOf('\n\n'); // stems are a scenario, a blank line, then the question
  const order = item.o.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const list = el('div', 'opts');
  order.forEach((oi, n) => {
    const b = el('button', 'opt');
    b.type = 'button';
    b.style.setProperty('--i', n);
    b.append(el('b', '', 'ABCD'[n]), el('span', '', item.o[oi]));
    b.onclick = () => grade(oi);
    list.append(b);
  });
  qEl.replaceChildren(el('p', 'scenario', item.q.slice(0, cut)), el('p', 'ask', item.q.slice(cut + 2)), list);

  // After an answer every option shows why it is right or wrong, as on the exam sites.
  function grade(picked) {
    [...list.children].forEach((b, n) => {
      const oi = order[n], right = oi === item.a, mine = oi === picked;
      b.disabled = true;
      b.style.animation = 'none';
      if (right) b.classList.add('right'); else if (mine) b.classList.add('wrong');
      if (right || mine) b.lastChild.append(el('em', '', right && mine ? 'Your answer, correct' : right ? 'Correct answer' : 'Your answer'));
      b.append(el('span', 'why', item.r[oi]));
    });
    navigator.vibrate?.(picked === item.a ? 10 : [10, 60, 10]); // a tap for right, a double tap for wrong, where supported
    const more = el('p', 'more', `${card.dataset.n - 1} more like this, free. `);
    const a = el('a', '', `Start ${code} →`);
    a.href = card.href;
    more.append(a);
    qEl.append(more);
  }
}
tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.k)));
show('aib');

// ---------- Mock exam clock on the "Timed mock exams" tile ----------
const clock = document.getElementById('clock');
let left = 170 * 60;
setInterval(() => {
  left = left ? left - 1 : 170 * 60;
  clock.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
}, 1000);

// ---------- Reveal on scroll, and count the numbers up as they arrive ----------
if (motion) {
  const count = dt => {
    const to = +dt.dataset.n, t0 = performance.now();
    const step = t => {
      const p = Math.min(1, (t - t0) / 1200);
      dt.textContent = Math.round(to * (1 - (1 - p) ** 4)).toLocaleString('en-US');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-n]').forEach(count);
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv').forEach(x => io.observe(x));
}
