(() => {
  'use strict';
  const { demos, libraries, buildDocument } = window.ScrollLab;
  const $ = selector => document.querySelector(selector);
  const categoryNames = { entrance: '기본 등장', scroll: '스크롤 연동', pin: '화면 고정' };
  const levelNames = { beginner: '입문', intermediate: '응용', advanced: '심화' };
  const knownIds = new Set(demos.map(demo => demo.id));
  let saved = new Set();
  try {
    const stored = JSON.parse(localStorage.getItem('scrolllab-saved') || '[]');
    if (Array.isArray(stored)) saved = new Set(stored.filter(id => knownIds.has(id)));
  } catch { /* 저장소를 사용할 수 없는 환경에서도 예제는 동작합니다. */ }
  let filter = 'all';
  let query = '';
  let current = demos[0];
  let activeTab = 'js';
  let toastTimer;
  let loadTimer;
  let previewToken;
  let returnFocus;
  const dialog = $('#demo-dialog');

  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('visible'), 2600);
  }

  function saveEffect(id) {
    if (saved.has(id)) saved.delete(id);
    else saved.add(id);
    try { localStorage.setItem('scrolllab-saved', JSON.stringify([...saved])); }
    catch { toast('이 브라우저에서는 현재 방문 중에만 저장됩니다.'); }
    renderCards();
    updateSaveButton();
  }

  function renderCards() {
    const visible = demos.filter(demo => {
      const inCategory = filter === 'all' || (filter === 'saved' ? saved.has(demo.id) : demo.category === filter);
      const haystack = `${demo.title} ${demo.en} ${demo.short} ${demo.use} ${categoryNames[demo.category]}`.toLowerCase();
      return inCategory && haystack.includes(query.toLowerCase().trim());
    });
    $('#card-grid').innerHTML = visible.map(demo => `
      <article class="motion-card" data-id="${demo.id}">
        <button class="card-preview" data-open="${demo.id}" aria-label="${demo.title} 미리보기 열기" style="--scene-bg:${demo.bg};--scene-ink:${demo.ink}">
          <span class="preview-grid"></span><span class="preview-topline"><span>EXPERIMENT ${demo.number}</span><span>↗</span></span>
          ${demo.thumbnail}<span class="preview-caption">${demo.en.toUpperCase()} / SCROLL EXPLORATION</span><span class="play-badge" aria-hidden="true">↗</span>
        </button>
        <div class="card-body"><div class="card-meta"><span class="card-number">${demo.number}</span><span>${demo.en}</span><button class="save-card ${saved.has(demo.id) ? 'saved' : ''}" data-save="${demo.id}" aria-label="${demo.title} 저장" aria-pressed="${saved.has(demo.id)}">${saved.has(demo.id) ? '♥' : '♡'}</button></div>
          <h3 class="card-title"><button data-open="${demo.id}">${demo.title}</button></h3><p class="card-description">${demo.short}</p>
          <div class="card-bottom"><span class="type-tag ${demo.category}">${categoryNames[demo.category]}</span><span class="level ${demo.level}"><i></i>${levelNames[demo.level]}</span></div>
        </div>
      </article>`).join('');
    $('#empty-state').hidden = visible.length > 0;
    $('#result-count').textContent = `${visible.length}개의 애니메이션`;
    $('#saved-count').textContent = saved.size;
  }

  function setFilter(value) {
    filter = value;
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === value);
      button.setAttribute('aria-pressed', String(button.dataset.filter === value));
    });
    renderCards();
  }

  function updateSaveButton() {
    const isSaved = saved.has(current.id);
    $('#demo-save').textContent = isSaved ? '♥ 저장한 효과' : '♡ 효과 저장';
    $('#demo-save').setAttribute('aria-pressed', String(isSaved));
  }

  function renderCode(tab, focus = false) {
    activeTab = tab;
    $('#code-content').textContent = current[tab];
    $('#code-panel').setAttribute('aria-labelledby', `tab-${tab}`);
    $('#code-panel').scrollTop = 0;
    $('#code-panel').scrollLeft = 0;
    document.querySelectorAll('[data-tab]').forEach(button => {
      const active = button.dataset.tab === tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
    $('#copy-code').textContent = '복사 ↗';
  }

  function loadPreview() {
    clearTimeout(loadTimer);
    previewToken = `${Date.now()}-${Math.random()}`;
    const status = $('#load-status');
    status.hidden = false;
    status.textContent = '예제 준비 중…';
    $('#demo-frame').srcdoc = buildDocument(current, { preview: true, markers: $('#markers').checked, token: previewToken });
    $('#demo-frame').title = `${current.title} — 안에서 스크롤해 보세요`;
    loadTimer = setTimeout(() => {
      status.textContent = '라이브러리 로딩이 지연되고 있어요. 인터넷 연결을 확인하고 재시작해 주세요.';
    }, 15000);
  }

  function openDemo(id, trigger) {
    const demo = demos.find(item => item.id === id);
    if (!demo) return;
    current = demo;
    if (!dialog.open) {
      returnFocus = trigger || document.activeElement;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    $('#dialog-number').textContent = demo.number;
    $('#dialog-title').textContent = demo.title;
    $('#dialog-en').textContent = demo.en;
    $('#dialog-subtitle').textContent = demo.headline;
    $('#dialog-description').textContent = demo.description;
    $('#dialog-use').textContent = demo.use;
    $('#dialog-option').textContent = demo.option;
    $('#dialog-experiment').textContent = demo.experiment;
    $('#dialog-tags').innerHTML = `<span class="type-tag ${demo.category}">${categoryNames[demo.category]}</span><span class="type-tag">${levelNames[demo.level]}</span>`;
    $('#demo-position').textContent = `${demos.indexOf(demo) + 1} / ${demos.length}`;
    updateSaveButton();
    renderCode(activeTab);
    loadPreview();
    $('.studio-body').scrollTop = 0;
    $('.code-column').scrollTop = 0;
  }

  function closeDemo() { dialog.close(); }
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    clearTimeout(loadTimer);
    // 닫힌 iframe의 스크롤 이벤트와 GSAP 타임라인도 함께 정리합니다.
    $('#demo-frame').removeAttribute('srcdoc');
    $('#demo-frame').src = 'about:blank';
    const target = returnFocus?.isConnected ? returnFocus : $('#collection-title');
    if (!target.matches('button, a, input')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) closeDemo(); });
  $('#close-dialog').addEventListener('click', closeDemo);
  $('#previous-demo').addEventListener('click', () => openDemo(demos[(demos.indexOf(current) - 1 + demos.length) % demos.length].id));
  $('#next-demo').addEventListener('click', () => openDemo(demos[(demos.indexOf(current) + 1) % demos.length].id));
  $('#restart-demo').addEventListener('click', loadPreview);
  $('#markers').addEventListener('change', loadPreview);
  $('#demo-save').addEventListener('click', () => saveEffect(current.id));
  window.addEventListener('message', event => {
    if (event.source !== $('#demo-frame').contentWindow || event.data?.source !== 'scroll-lab' || event.data.token !== previewToken) return;
    clearTimeout(loadTimer);
    if (event.data.type === 'ready') $('#load-status').hidden = true;
    else if (event.data.type === 'error') {
      $('#load-status').hidden = false;
      $('#load-status').textContent = '예제를 실행하지 못했어요. 인터넷 연결을 확인하고 재시작해 주세요.';
    }
  });

  $('#card-grid').addEventListener('click', event => {
    const save = event.target.closest('[data-save]');
    const open = event.target.closest('[data-open]');
    if (save) {
      const id = save.dataset.save;
      saveEffect(id);
      document.querySelector(`[data-save="${id}"]`)?.focus({ preventScroll: true });
    } else if (open) openDemo(open.dataset.open, open);
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
  $('#search').addEventListener('input', event => { query = event.target.value; renderCards(); });
  $('#reset-filter').addEventListener('click', () => { query = ''; $('#search').value = ''; setFilter('all'); });
  document.querySelectorAll('[data-tab]').forEach(button => {
    button.addEventListener('click', () => renderCode(button.dataset.tab));
    button.addEventListener('keydown', event => {
      const tabs = ['html', 'css', 'js'];
      let next;
      if (event.key === 'ArrowRight') next = tabs[(tabs.indexOf(activeTab) + 1) % 3];
      if (event.key === 'ArrowLeft') next = tabs[(tabs.indexOf(activeTab) + 2) % 3];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[2];
      if (next) { event.preventDefault(); renderCode(next, true); }
    });
  });

  $('#copy-code').addEventListener('click', async () => {
    const text = current[activeTab];
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
        dialog.append(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        textarea.remove();
        if (!copied) throw new Error('Clipboard not available');
      }
      $('#copy-code').textContent = '복사됨 ✓';
      toast(`${activeTab.toUpperCase()} 코드를 복사했어요.`);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('#code-content'));
      selection.removeAllRanges();
      selection.addRange(range);
      toast('자동 복사가 제한되어 코드를 선택했어요. Ctrl+C / ⌘C로 복사하세요.');
    }
  });

  $('#download-demo').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([buildDocument(current)], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `scrolllab-${current.number}-${current.id}.html`;
    dialog.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    toast('독립 실행용 HTML 파일을 준비했어요.');
  });

  $('#open-codepen').addEventListener('click', () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://codepen.io/pen/define';
    form.target = '_blank';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify({
      title: `Scroll Lab ${current.number} — ${current.title}`,
      description: `${current.description}\n${current.experiment}`,
      html: current.html, css: current.css, js: current.js,
      js_external: libraries.join(';'),
      editors: '111', layout: 'left', tags: ['gsap', 'scrolltrigger', 'scroll-animation']
    });
    form.append(input);
    dialog.append(form);
    form.submit();
    form.remove();
  });

  renderCards();
})();
