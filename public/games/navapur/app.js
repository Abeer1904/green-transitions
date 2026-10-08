(() => {
  'use strict';
  const C = window.NAVAPUR;
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const names = ['Navapur', 'Who are you?', 'Peak', "What's the problem?", 'Solutions', 'Force majeure', 'Climate manifesto', 'What we tried to do today'];
  const counts = [C.chapters.length, 2, 1, 1, 1, 2, 1, 1];
  let scene = location.hash === '#peak' ? 2 : 0, beat = 0;
  let event = Number.isInteger(C.selectedEvent) && C.events[C.selectedEvent] ? C.selectedEvent : 0;
  let duration = 0, remaining = 0, running = false, last = performance.now();
  const stage = $('#stage'), canvas = $('#town'), ctx = canvas.getContext('2d');
  const images = ['town.png', 'town-drought.png', 'town-flood.png'].map(src => {
    const image = new Image(); image.src = src; image.onload = drawTown; return image;
  });

  function format(seconds) {
    const n = Math.ceil(seconds);
    return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;
  }
  function timer(seconds, label = '') {
    duration = remaining = seconds;
    return `<div class="timer"><div class="timer-status">${esc(label)}</div><div class="clock" role="timer" aria-label="Time remaining">${format(seconds)}</div><div class="timer-actions"><button data-action="timer">Start</button><button data-action="reset">Reset</button></div></div>`;
  }
  const title = text => `<h1>${esc(text)}</h1>`;
  const timed = (text, seconds, extra = '') => `<div class="split"><div>${title(text)}${extra}</div>${timer(seconds)}</div>`;

  function render() {
    running = false; duration = remaining = 0;
    document.body.className = `${scene === 0 ? 'story' : ''} ${scene === 5 || scene === 6 ? 'dark' : ''}`;
    canvas.style.opacity = scene === 0 ? '1' : '0';
    let html = '';
    if (scene === 0) {
      const chapter = C.chapters[beat];
      html = `<article class="chapter"><p class="eyebrow">${esc(C.town)} · Chapter ${beat + 1} / ${C.chapters.length}</p>${title(chapter.title)}<p class="chapter-text">${esc(chapter.text)}</p><div class="chapter-nav" aria-label="Story chapters">${C.chapters.map((ch, i) => `<button data-chapter="${i}" aria-label="Chapter ${i + 1}: ${esc(ch.title)}" aria-current="${beat === i ? 'step' : 'false'}">${i + 1}</button>`).join('')}</div></article>`;
    }
    if (scene === 1) {
      if (beat === 0) html = `${title('Who are you in Navapur?')}<div class="roles">${C.families.map(([name, roles]) => `<section><h2>${esc(name)}</h2><p>${roles.map(esc).join(' · ')}</p></section>`).join('')}</div>`;
      if (beat === 1) html = `<div class="character-board">${title('What drives you?')}<div class="split"><div><div class="motivations">${C.motivations.map(m => `<span>${esc(m)}</span>`).join('')}</div><div class="introduction-prompt"><h2>Who are you?</h2><p>Introductions · 4:00</p></div></div><div><div class="timer-presets" aria-label="Character exercise timer"><button data-seconds="120" data-label="Motivation" aria-pressed="true">Motivation · 2:00</button><button data-seconds="240" data-label="Introductions" aria-pressed="false">Introductions · 4:00</button></div>${timer(120, 'Motivation')}</div></div></div>`;
    }
    if (scene === 2) html = timed('Are we at peak phone?', 180, '<p class="lead">Peak tyres · Peak travel · Peak clothes</p><p class="peak-explanation">Have these reached their fullest form, or could everyday life become different? Imagine a future scene: what will be there, what do you hope changes, and for whom?</p><p class="peak-explanation">Make a postcard, image or letter from that future. Then ask what would have to happen to get there.</p><a class="peak-link" href="../../#/visioning" target="_blank" rel="noopener">Open the visioning guide ↗ <small>(new tab; workshop stays here)</small></a>');
    if (scene === 3) {
      html = `<div class="problem-board">${title('What is the problem?')}<div class="problem-layout"><div><div class="problem-steps" aria-label="Problem exercise timer"><button data-seconds="120" data-label="One problem" aria-pressed="true"><span>One problem</span><small>2:00</small></button><button data-seconds="180" data-label="Three problems" aria-pressed="false"><span>Three problems</span><small>3:00</small></button><button data-seconds="180" data-label="Vote" aria-pressed="false"><span>Vote</span><small>3:00</small></button></div><div class="horizon-heading"><h2>Over time</h2><button data-seconds="180" data-label="Over time" aria-pressed="false">3:00</button></div><div class="horizon-columns"><div><h3>Short term</h3><p>This year</p></div><div><h3>Medium term</h3><p>Within five years</p></div><div><h3>Long term</h3><p>Ten years or more</p></div></div></div>${timer(120, 'One problem')}</div></div>`;
    }
    if (scene === 4) {
      html = `<div class="solutions-board"><div class="solutions-heading">${title("What's the peak solution?")}${timer(180)}</div><p class="peak-explanation">Picture the problem being addressed well. What would people’s lives look like? Work backwards from that vision: what can begin now, what needs development, and what requires a different approach?</p><a class="peak-link" href="../../#/visioning" target="_blank" rel="noopener">Explore visioning and possible futures ↗</a><div class="solution-columns">${C.lenses.map(lens => `<section><p class="eyebrow">${esc(lens.horizon)}</p><h2>${esc(lens.name)}</h2><p>${esc(lens.question)}</p></section>`).join('')}</div></div>`;
    }
    if (scene === 5) {
      html = beat === 0 ? `<div class="center">${title('Force majeure')}</div>` : `<article class="shock"><p class="eyebrow">Force majeure</p><p class="shock-text">${esc(C.events[event].text)}</p></article>`;
    }
    if (scene === 6) html = `<div class="manifesto">${title("Navapur's climate manifesto for the year")}<div class="split"><div class="manifesto-lines">${C.manifesto.map(line => `<p>${esc(line)}</p>`).join('')}</div>${timer(600)}</div></div>`;
    if (scene === 7) html = `<article class="summary">${title('What we tried to do today')}<p class="summary-text">${esc(C.summary[0])}</p><p class="summary-close">${esc(C.summary[1])}<br>${esc(C.summary[2])}</p><p class="signature">${esc(C.summary[3])}</p><a class="urja-continue" href="../../#/reflection">Continue into Gram Urja →</a></article>`;
    stage.innerHTML = `<div class="content">${html}</div>`;
    $('#scene-label').textContent = `${String(scene + 1).padStart(2, '0')} / ${names[scene]}`;
    $('#scenes').innerHTML = names.map((name, i) => `<button data-scene="${i}" class="${scene === i ? 'active' : ''}" aria-current="${scene === i ? 'step' : 'false'}" title="${esc(name)}">${String(i + 1).padStart(2, '0')} <span>${esc(name)}</span></button>`).join('');
    $('#back').disabled = scene === 0 && beat === 0;
    $('#next').disabled = scene === counts.length - 1;
    $('#next').textContent = scene === 7 ? 'End' : scene === 0 && beat < counts[0] - 1 ? 'Next chapter →' : scene === 5 && beat === 0 ? 'Reveal →' : beat === counts[scene] - 1 ? 'Next section →' : 'Continue →';
    drawTown();
  }
  function jump(nextScene, nextBeat = 0) {
    if (!Number.isInteger(nextScene) || !counts[nextScene] || nextBeat < 0 || nextBeat >= counts[nextScene]) return;
    scene = nextScene; beat = nextBeat; render();
  }
  function move(direction) {
    if (direction < 0 && scene === 0 && beat === 0) return;
    if (direction > 0 && scene === counts.length - 1) return;
    let nextScene = scene, nextBeat = beat + direction;
    if (nextBeat >= counts[scene]) { nextScene++; nextBeat = 0; }
    if (nextBeat < 0) { nextScene--; nextBeat = counts[nextScene] - 1; }
    jump(nextScene, nextBeat);
  }
  function updateTimer() {
    if (!$('.clock')) return;
    $('.clock').textContent = format(remaining);
    $('.timer').classList.toggle('done', remaining <= 0);
    $('[data-action="timer"]').textContent = running ? 'Pause' : remaining <= 0 ? 'Restart' : 'Start';
  }
  function toggleTimer() {
    if (!duration) return;
    if (remaining <= 0) remaining = duration;
    running = !running; last = performance.now(); updateTimer();
  }
  function resetTimer() { running = false; remaining = duration; updateTimer(); }
  function tick(ms) {
    if (!running) return;
    remaining = Math.max(0, remaining - ms / 1000);
    if (remaining === 0) running = false;
    updateTimer();
  }
  setInterval(() => { const now = performance.now(); tick(now - last); last = now; }, 100);
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { $('#fullscreen').textContent = 'Use browser full screen'; }
  }
  document.addEventListener('click', e => {
    const button = e.target.closest('button'); if (!button) return;
    if (button.dataset.scene !== undefined) jump(Number(button.dataset.scene));
    if (button.dataset.chapter !== undefined) jump(0, Number(button.dataset.chapter));
    if (button.dataset.seconds !== undefined) {
      running = false;
      duration = remaining = Number(button.dataset.seconds);
      document.querySelectorAll('[data-seconds]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      $('.timer-status').textContent = button.dataset.label || '';
      updateTimer();
    }
    if (button.dataset.action === 'timer') toggleTimer();
    if (button.dataset.action === 'reset') resetTimer();
  });
  $('#next').onclick = () => move(1);
  $('#back').onclick = () => move(-1);
  $('#fullscreen').onclick = fullscreen;
  $('#help').onclick = () => { running = false; updateTimer(); $('#guide').showModal(); };
  $('#close-help').onclick = () => $('#guide').close();
  $('.brand').onclick = e => { e.preventDefault(); jump(0); };
  document.addEventListener('keydown', e => {
    if ($('#guide').open || e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    const key = e.key.toLowerCase();
    if (key === 'arrowright') { e.preventDefault(); move(1); }
    if (key === 'arrowleft') { e.preventDefault(); move(-1); }
    if (key === 'f') fullscreen();
    if (key === 't') toggleTimer();
    if (key === 'r') resetTimer();
    // Choose privately before revealing. No alternate event titles are projected.
    if (scene === 5 && beat === 0) {
      const index = C.events.findIndex(item => item.key === key);
      if (index >= 0) event = index;
    }
  });
  function drawTown() {
    const dpr = Math.min(devicePixelRatio || 1, 2), width = innerWidth, height = Math.max(innerHeight, $('#app').offsetHeight);
    canvas.width = width * dpr; canvas.height = height * dpr; ctx.scale(dpr, dpr);
    ctx.fillStyle = '#f3ecde'; ctx.fillRect(0, 0, width, height);
    // Keep the framing fixed. Only chapters five and six change the artwork.
    const index = beat >= 5 ? 2 : beat === 4 ? 1 : 0;
    const art = images[index]?.naturalWidth ? images[index] : images[0];
    if (art?.naturalWidth) {
      const scale = Math.max(width / art.width, height / art.height);
      ctx.drawImage(art, (width - art.width * scale) / 2, (height - art.height * scale) / 2, art.width * scale, art.height * scale);
    }
    const wash = ctx.createLinearGradient(0, 0, width, 0);
    wash.addColorStop(0, 'rgba(243,236,222,.99)');
    wash.addColorStop(.51, 'rgba(243,236,222,.96)');
    wash.addColorStop(.73, 'rgba(243,236,222,.4)');
    wash.addColorStop(1, 'rgba(243,236,222,.02)');
    ctx.fillStyle = wash; ctx.fillRect(0, 0, width, height);
  }
  window.addEventListener('resize', drawTown);
  window.render_game_to_text = () => JSON.stringify({
    scene: scene + 1, name: names[scene], beat,
    chapter: scene === 0 ? beat + 1 : null,
    artwork: scene === 0 ? (beat >= 5 ? 'flood' : beat === 4 ? 'drought' : 'town') : null,
    event: scene === 5 && beat === 1 ? C.events[event].name : null,
    timer: { duration, remaining, running }, text: stage.innerText,
    coordinateSystem: 'DOM layout; canvas origin top-left, x right, y down. No participant inputs.'
  });
  window.advanceTime = ms => { tick(ms); last = performance.now(); };
  render();
})();
