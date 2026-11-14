'use strict';
// index.html's head adds .js to <html> when motion is allowed. Without it everything is simply visible.
const motion = document.documentElement.classList.contains('js');

// ---------- Terminal hero ----------
const term = document.getElementById('term');
if (term) {
  const $ = id => document.getElementById(id);
  const out = $('out'), input = $('in'), screen = $('screen'), ls = $('ls');
  let pick = null; // set while a quiz question is waiting for an answer

  // html is always our own markup; anything typed by the visitor goes in with append(), which never parses HTML.
  const print = (html, cls) => { const p = document.createElement('p'); if (cls) p.className = cls; p.innerHTML = html; out.append(p); return p; };
  const bottom = () => { screen.scrollTop = screen.scrollHeight; };
  const exam = k => [...ls.querySelectorAll('a')].find(a => a.dataset.k === k);

  function quiz(k) {
    const pool = window.QUIZ || [];
    const item = pool.find(x => x.k === k) || pool[Math.floor(Math.random() * pool.length)];
    if (!item) return print('quiz: questions failed to load', 'bad');
    const a = exam(item.k), code = a.firstElementChild.textContent;
    const order = item.o.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    const head = print(`${code} · sample question`, 'dim');
    print('').append(item.q);
    const box = document.createElement('div');
    box.className = 'opts';
    order.forEach((oi, n) => {
      const b = document.createElement('button');
      b.type = 'button'; b.innerHTML = `<b>${'ABCD'[n]}</b>`; b.append(item.o[oi]); b.onclick = () => pick && pick(n);
      box.append(b);
    });
    out.append(box);
    print('Press A-D or tap an answer.', 'dim');
    pick = n => {
      pick = null;
      const right = order.indexOf(item.a);
      [...box.children].forEach((b, i) => { b.disabled = true; if (i === right) b.classList.add('ok'); else if (i === n) b.classList.add('bad'); });
      print(n === right ? '<span class="ok">Correct.</span> ' : '<span class="bad">Not quite.</span> ').append(item.r[order[n]]);
      if (n !== right) print(`<span class="ok">${'ABCD'[right]} is correct.</span> `).append(item.r[item.a]);
      print(`<span class="dim">${parseInt(a.lastElementChild.textContent) - 1} more like this, free:</span> <a href="${a.href}">open ${code} →</a>`);
      screen.scrollTop = box.offsetTop - 8;
    };
    screen.scrollTop = head.offsetTop - 8;
  }

  function run(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    print('<span class="ps">$</span>').append(cmd);
    const [name, arg = ''] = cmd.toLowerCase().split(/\s+/);
    if (name === 'quiz') return quiz(arg.slice(0, 3));
    if (name === 'ls' || name === 'aws-practice') { const c = ls.cloneNode(true); c.removeAttribute('id'); out.append(c); }
    else if (name === 'open') {
      const a = exam(arg.slice(0, 3)); // "aib" and "aib-c01" both work
      if (a) { print(`opening ${a.href} …`, 'dim'); location.href = a.href; } else print('usage: open aib | soa | scs', 'bad');
    }
    else if (name === 'help') print('ls            list the exams\nquiz [code]   try one real question (aib, soa, scs)\nopen &lt;code&gt;   go to an exam\nclear         clear the screen', 'dim');
    else if (name === 'clear') { out.replaceChildren(); pick = null; }
    else print('', 'bad').append(`command not found: ${name}. Try help.`);
    bottom();
  }

  $('f').addEventListener('submit', e => { e.preventDefault(); run(input.value); input.value = ''; });
  // During a quiz a single A-D keystroke answers straight away.
  input.addEventListener('input', () => {
    const n = 'abcd'.indexOf(input.value.toLowerCase());
    if (pick && input.value.length === 1 && n >= 0) { input.value = ''; pick(n); }
  });
  $('chips').addEventListener('click', e => { if (e.target.tagName === 'BUTTON') run(e.target.dataset.c); });
  screen.addEventListener('click', e => { if (!e.target.closest('a,button') && !getSelection().toString()) input.focus({ preventScroll: true }); });

  // Boot: type the first command, then print the listing line by line. Any key or tap skips it.
  if (motion) {
    const boots = [...term.querySelectorAll('.boot')], typed = $('typed'), text = typed.textContent;
    let i = 0, timer;
    const show = gap => boots.forEach((b, n) => { b.style.transitionDelay = n * gap + 'ms'; b.classList.add('on'); });
    const skip = () => { clearTimeout(timer); typed.textContent = text; typed.classList.remove('typing'); show(0); };
    const tick = () => {
      typed.textContent = text.slice(0, ++i);
      if (i < text.length) timer = setTimeout(tick, 45); else { typed.classList.remove('typing'); show(80); }
    };
    typed.textContent = '';
    typed.classList.add('on', 'typing');
    timer = setTimeout(tick, 400);
    addEventListener('keydown', skip, { once: true });
    addEventListener('pointerdown', skip, { once: true });
  }
}

