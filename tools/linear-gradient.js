(function() {
  const css = `
    #gradient-app {
      --lg-bg: #0d0d12;
      --lg-card: rgba(25,25,38,0.7);
      --lg-border: rgba(255,255,255,0.09);
      --lg-border-active: rgba(139,92,246,0.5);
      --lg-text: #f0f0f5;
      --lg-text-sec: #aab0cc;
      --lg-text-muted: #55556a;
      --lg-accent: #8b5cf6;
      --lg-accent2: #06b6d4;
      --lg-accent-glow: rgba(139,92,246,0.22);
      --lg-success: #34d399;
      --lg-error: #f87171;
      --lg-r-sm: 8px;
      --lg-r-md: 12px;
      --lg-r-lg: 16px;
      --lg-r-xl: 20px;
      --lg-mono: "JetBrains Mono", monospace;
      --lg-trans: 0.2s cubic-bezier(0.4,0,0.2,1);
      --lg-checker: 12px;

      font-family: 'Inter', sans-serif;
      color: var(--lg-text);
      min-height: 100%;
      padding: 32px 20px;
      display: flex;
      justify-content: center;
    }

    #gradient-app .lg-app {
      width: 100%;
      max-width: 580px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Header */
    #gradient-app .lg-header {
      display: grid;
      grid-template-columns: 280px 1fr;
      align-items: center;
      gap: 12px;
    }
    @media (max-width: 800px) {
      #gradient-app .lg-header { grid-template-columns: 1fr; }
    }
    #gradient-app .lg-header__title {
      font-size: 1.8rem; font-weight: 700;
      display: flex; align-items: center; gap: 10px; margin: 0;
      background: linear-gradient(130deg, #8b5cf6, #06b6d4);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    #gradient-app .lg-header__subtitle {
      color: var(--lg-text-sec); font-size: 0.9rem; margin: 0;
    }

    /* Tabs */
    #gradient-app .lg-tabs {
      display: flex; gap: 4px; background: var(--lg-card);
      border: 1px solid var(--lg-border); border-radius: var(--lg-r-lg);
      padding: 6px; backdrop-filter: blur(12px);
    }
    #gradient-app .lg-tab {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 10px 8px; border: none; border-radius: var(--lg-r-md);
      background: transparent; color: var(--lg-text-sec);
      font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: all var(--lg-trans);
    }
    #gradient-app .lg-tab:hover { color: var(--lg-text); background: rgba(255,255,255,0.06); }
    #gradient-app .lg-tab[aria-selected="true"] {
      color: var(--lg-text); background: rgba(255,255,255,0.06);
      box-shadow: 0 0 0 1px var(--lg-border-active), 0 2px 8px var(--lg-accent-glow);
    }
    #gradient-app .lg-tab__dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
    #gradient-app .lg-tab__dot--solid { background: #8b5cf6; }
    #gradient-app .lg-tab__dot--solid-alpha { background: rgba(139,92,246,0.5); border: 1px dashed rgba(139,92,246,0.6); }
    #gradient-app .lg-tab__dot--gradient { background: linear-gradient(135deg,#8b5cf6,#3b82f6); }
    #gradient-app .lg-tab__dot--gradient-alpha { background: linear-gradient(135deg,rgba(139,92,246,0.7),rgba(59,130,246,0.4)); border: 1px dashed rgba(139,92,246,0.5); }

    /* Preview */
    #gradient-app .lg-preview {
      position: relative; height: 200px; border-radius: var(--lg-r-xl);
      overflow: hidden; border: 1px solid var(--lg-border);
    }
    #gradient-app .lg-preview__checker {
      position: absolute; inset: 0;
      background-image: linear-gradient(45deg,#1a1a2e 25%,transparent 25%),linear-gradient(-45deg,#1a1a2e 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1a1a2e 75%),linear-gradient(-45deg,transparent 75%,#1a1a2e 75%);
      background-size: calc(var(--lg-checker)*2) calc(var(--lg-checker)*2);
      background-position: 0 0, 0 var(--lg-checker), var(--lg-checker) calc(-1*var(--lg-checker)), calc(-1*var(--lg-checker)) 0;
      background-color: #12121e;
    }
    #gradient-app .lg-preview__gradient { position: absolute; inset: 0; transition: background-image 0.15s ease; }
    #gradient-app .lg-preview__label { position: absolute; bottom: 10px; right: 14px; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; color: rgba(255,255,255,0.3); }

    /* Gradient bar */
    #gradient-app .lg-bar-section { display: flex; flex-direction: column; gap: 8px; }
    #gradient-app .lg-bar-wrapper { position: relative; display: flex; align-items: center; gap: 12px; }
    #gradient-app .lg-bar { position: relative; flex: 1; height: 32px; border-radius: 16px; cursor: crosshair; }
    #gradient-app .lg-bar__track {
      position: absolute; inset: 0; border-radius: 16px;
      border: 1px solid var(--lg-border); overflow: hidden; pointer-events: none;
    }
    #gradient-app .lg-bar__track::before {
      content: ''; position: absolute; inset: 0;
      background-image: linear-gradient(45deg,#1a1a2e 25%,transparent 25%),linear-gradient(-45deg,#1a1a2e 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1a1a2e 75%),linear-gradient(-45deg,transparent 75%,#1a1a2e 75%);
      background-size: 12px 12px; background-position: 0 0,0 6px,6px -6px,-6px 0; background-color: #12121e;
    }
    #gradient-app .lg-bar__track::after { content: ''; position: absolute; inset: 0; border-radius: 16px; }
    #gradient-app .lg-bar__add {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      border: 1px solid var(--lg-border); background: var(--lg-card);
      color: var(--lg-text-sec); cursor: pointer; transition: all var(--lg-trans);
    }
    #gradient-app .lg-bar__add:hover { color: var(--lg-accent); border-color: var(--lg-accent); background: var(--lg-accent-glow); }
    #gradient-app .lg-bar__hint { font-size: 0.75rem; color: var(--lg-text-muted); text-align: center; }

    /* Handles */
    #gradient-app .lg-handle {
      position: absolute; top: 50%; width: 22px; height: 22px; border-radius: 50%;
      border: 3px solid #fff; transform: translate(-50%,-50%); cursor: grab;
      box-shadow: 0 1px 4px rgba(0,0,0,0.5); z-index: 2;
    }
    #gradient-app .lg-handle.dragging { cursor: grabbing; transform: translate(-50%,-50%) scale(1.2); box-shadow: 0 2px 12px rgba(0,0,0,0.7),0 0 0 2px var(--lg-accent); }
    #gradient-app .lg-handle.active { box-shadow: 0 2px 8px rgba(0,0,0,0.6),0 0 0 3px var(--lg-accent); }

    /* Controls */
    #gradient-app .lg-controls { display: flex; flex-direction: column; gap: 24px; }
    #gradient-app .lg-control-group { display: flex; flex-direction: column; gap: 12px; }
    #gradient-app .lg-control-label { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--lg-text-sec); }

    /* Angle */
    #gradient-app .lg-angle-ctrl { display: flex; align-items: center; gap: 20px; }
    #gradient-app .lg-angle-wheel {
      position: relative; width: 64px; height: 64px; border-radius: 50%;
      border: 2px solid var(--lg-border); background: var(--lg-card);
      cursor: pointer; outline-offset: 3px;
    }
    #gradient-app .lg-angle-wheel:focus { outline: 2px solid var(--lg-accent); }
    #gradient-app .lg-angle-wheel__indicator {
      position: absolute; top: 50%; left: 50%; width: 2px; height: 45%;
      background: var(--lg-accent); transform-origin: bottom center;
      transform: translate(-50%,-100%) rotate(90deg); pointer-events: none;
    }
    #gradient-app .lg-angle-wheel__indicator::after {
      content: ''; position: absolute; top: -2px; left: 50%; transform: translateX(-50%);
      width: 6px; height: 6px; border-radius: 50%; background: var(--lg-accent);
    }
    #gradient-app .lg-angle-input-wrap {
      display: flex; align-items: center; gap: 4px;
      background: var(--lg-card); border: 1px solid var(--lg-border);
      border-radius: var(--lg-r-sm); padding: 10px 16px;
    }
    #gradient-app .lg-angle-input {
      width: 48px; border: none; background: transparent;
      color: var(--lg-text); font-family: var(--lg-mono); font-size: 1rem; outline: none; text-align: right;
    }
    #gradient-app .lg-angle-unit { color: var(--lg-text-muted); font-family: var(--lg-mono); font-size: 0.9rem; }

    /* Stops list */
    #gradient-app .lg-stops-list { display: flex; flex-direction: column; gap: 10px; }
    #gradient-app .lg-stop {
      display: flex; align-items: center; gap: 10px; padding: 12px 14px;
      background: rgba(0,0,0,0.2); border: 1px solid var(--lg-border);
      border-radius: var(--lg-r-md); transition: border-color 0.2s;
    }
    #gradient-app .lg-stop.active { border-color: var(--lg-border-active); box-shadow: 0 0 0 1px var(--lg-accent-glow); }
    #gradient-app .lg-stop__color-wrap {
      position: relative; width: 36px; height: 36px; border-radius: var(--lg-r-sm);
      overflow: hidden; border: 1px solid var(--lg-border); flex-shrink: 0;
    }
    #gradient-app .lg-stop__checker { position: absolute; inset: 0; background-color: #12121e; }
    #gradient-app .lg-stop__preview { position: absolute; inset: 0; pointer-events: none; }
    #gradient-app .lg-stop__color-in {
      position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.01; cursor: pointer;
    }
    #gradient-app .lg-stop__hex {
      width: 78px; border: none; background: transparent;
      color: var(--lg-text); font-family: var(--lg-mono); font-size: 0.88rem; outline: none; text-transform: uppercase;
      border-bottom: 1px solid transparent; transition: border-color 0.15s;
    }
    #gradient-app .lg-stop__hex:focus { border-bottom-color: var(--lg-accent); }
    #gradient-app .lg-stop__hex.invalid { border-bottom-color: var(--lg-error); color: var(--lg-error); }
    #gradient-app .lg-stop__alpha-group { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }
    #gradient-app .lg-stop__alpha-slider {
      flex: 1; -webkit-appearance: none; height: 6px; border-radius: 3px; outline: none; min-width: 0;
    }
    #gradient-app .lg-stop__alpha-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
      border: 2px solid var(--lg-text); background: var(--lg-accent); cursor: grab;
    }
    #gradient-app .lg-stop__alpha-val {
      width: 42px; text-align: right; border: none; background: transparent;
      color: var(--lg-text-sec); font-family: var(--lg-mono); font-size: 0.83rem; outline: none;
    }
    #gradient-app .lg-stop__pos-group { display: flex; align-items: center; gap: 4px; }
    #gradient-app .lg-stop__pos {
      width: 38px; text-align: right; border: none; background: transparent;
      color: var(--lg-text-sec); font-family: var(--lg-mono); font-size: 0.83rem; outline: none;
    }
    #gradient-app .lg-stop__pos-unit { color: var(--lg-text-muted); font-size: 0.83rem; }
    #gradient-app .lg-stop__del {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; flex-shrink: 0;
      border: 1px solid transparent; border-radius: 6px;
      background: transparent; color: var(--lg-text-muted); cursor: pointer; transition: all 0.2s;
    }
    #gradient-app .lg-stop__del:hover { color: #ef4444; border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.1); }
    #gradient-app .lg-stop__del:focus-visible { outline: 2px solid #ef4444; outline-offset: 2px; }

    /* Output */
    #gradient-app .lg-output { display: flex; flex-direction: column; gap: 8px; }
    #gradient-app .lg-output__box {
      position: relative; background: rgba(0,0,0,0.3);
      border: 1px solid var(--lg-border); border-radius: var(--lg-r-md); padding: 16px 50px 16px 16px;
    }
    #gradient-app .lg-output__code {
      font-family: var(--lg-mono); font-size: 0.85rem;
      color: var(--lg-text); white-space: pre-wrap; word-break: break-all; margin: 0;
    }
    #gradient-app .lg-output__copy {
      position: absolute; top: 12px; right: 12px;
      display: flex; align-items: center; justify-content: center;
      width: 36px; height: 36px; border: 1px solid var(--lg-border);
      border-radius: var(--lg-r-sm); background: var(--lg-card);
      color: var(--lg-text-sec); cursor: pointer; transition: all 0.2s;
    }
    #gradient-app .lg-output__copy:hover { color: var(--lg-accent); border-color: var(--lg-accent); background: var(--lg-accent-glow); }
    #gradient-app .lg-output__copy.copied { color: var(--lg-success); border-color: var(--lg-success); background: rgba(52,211,153,0.1); }
    #gradient-app .lg-output__copy:focus-visible { outline: 2px solid var(--lg-accent); outline-offset: 2px; }

    /* Utility */
    #gradient-app .lg-hidden { display: none !important; }
  `;

  const html = `
    <div class="lg-app">
      <header class="lg-header">
        <h1 class="lg-header__title">◆ CSS Gradient</h1>
        <p class="lg-header__subtitle">產生線性漸層與透明度 CSS</p>
      </header>

      <nav class="lg-tabs" role="tablist" aria-label="漸層模式">
        <button class="lg-tab" role="tab" data-mode="solid"
          aria-selected="true" aria-controls="lg-tabpanel" id="lg-tab-solid">
          <span class="lg-tab__dot lg-tab__dot--solid" aria-hidden="true"></span>單色
        </button>
        <button class="lg-tab" role="tab" data-mode="solid-alpha"
          aria-selected="false" aria-controls="lg-tabpanel" id="lg-tab-solid-alpha">
          <span class="lg-tab__dot lg-tab__dot--solid-alpha" aria-hidden="true"></span>單色透明
        </button>
        <button class="lg-tab" role="tab" data-mode="gradient"
          aria-selected="false" aria-controls="lg-tabpanel" id="lg-tab-gradient">
          <span class="lg-tab__dot lg-tab__dot--gradient" aria-hidden="true"></span>漸層
        </button>
        <button class="lg-tab" role="tab" data-mode="gradient-alpha"
          aria-selected="false" aria-controls="lg-tabpanel" id="lg-tab-gradient-alpha">
          <span class="lg-tab__dot lg-tab__dot--gradient-alpha" aria-hidden="true"></span>漸層透明
        </button>
      </nav>

      <div id="lg-tabpanel" role="tabpanel" aria-live="polite">
        <section class="lg-preview" aria-label="漸層預覽">
          <div class="lg-preview__checker" aria-hidden="true"></div>
          <div class="lg-preview__gradient" id="lg-preview" aria-hidden="true"></div>
          <div class="lg-preview__label" aria-hidden="true">Preview</div>
        </section>

        <section class="lg-bar-section" id="lg-bar-section" aria-label="漸層條">
          <div class="lg-bar-wrapper">
            <div class="lg-bar" id="lg-bar" aria-label="點擊新增色標" role="button" tabindex="0">
              <div class="lg-bar__track" id="lg-track" aria-hidden="true"></div>
            </div>
            <button class="lg-bar__add" id="lg-add-btn" aria-label="新增色標">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <p class="lg-bar__hint" id="lg-bar-hint">點擊漸層條新增色標・拖曳調整位置・點刪除鈕移除</p>
        </section>

        <section class="lg-controls" aria-label="漸層設定">
          <div class="lg-control-group" id="lg-angle-group">
            <p class="lg-control-label" id="lg-angle-label">角度</p>
            <div class="lg-angle-ctrl">
              <div class="lg-angle-wheel" id="lg-wheel"
                role="slider" tabindex="0"
                aria-label="角度輪盤"
                aria-valuemin="0" aria-valuemax="360" aria-valuenow="90" aria-valuetext="90 度">
                <div class="lg-angle-wheel__indicator" id="lg-indicator" aria-hidden="true"></div>
              </div>
              <div class="lg-angle-input-wrap">
                <label for="lg-angle-in" class="lg-hidden">角度數值</label>
                <input type="number" class="lg-angle-input" id="lg-angle-in"
                  value="90" min="0" max="360" aria-label="角度數值（度）">
                <span class="lg-angle-unit" aria-hidden="true">deg</span>
              </div>
            </div>
          </div>

          <div class="lg-control-group" id="lg-stops-group">
            <p class="lg-control-label" id="lg-stops-label">色標</p>
            <div class="lg-stops-list" id="lg-stops-list"
              role="group" aria-label="色標清單" aria-labelledby="lg-stops-label"></div>
          </div>
        </section>

        <section class="lg-output" aria-label="CSS 輸出">
          <p class="lg-control-label">CSS 輸出</p>
          <div class="lg-output__box">
            <pre class="lg-output__code" id="lg-out-code" aria-label="CSS 程式碼輸出"></pre>
            <button class="lg-output__copy" id="lg-copy-btn" aria-label="複製 CSS">
              <svg class="lg-copy-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="6" y="6" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M12 6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.5"/></svg>
              <svg class="lg-check-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" style="display:none" aria-hidden="true"><path d="M4 9l3.5 3.5L14 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div id="lg-copy-status" role="status" aria-live="polite" aria-atomic="true" class="lg-hidden" aria-label="複製狀態"></div>
        </section>
      </div>
    </div>
  `;

  const app = document.getElementById('gradient-app');
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  app.appendChild(styleEl);
  app.insertAdjacentHTML('beforeend', html);

  // -- Helpers --
  const $ = sel => app.querySelector(sel);
  const $$ = sel => app.querySelectorAll(sel);

  function hexToRgb(h) {
    let x = h.replace('#', '');
    if (x.length === 3) x = x.split('').map(c => c + c).join('');
    const n = parseInt(x, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  // -- State --
  const state = {
    mode: 'solid',
    angle: 90,
    activeIdx: 0,
    stops: [
      { color: '#8b5cf6', alpha: 1, position: 0 },
      { color: '#3b82f6', alpha: 1, position: 100 }
    ]
  };

  function isGrad()  { return state.mode.startsWith('gradient'); }
  function hasAlpha(){ return state.mode.includes('alpha'); }

  function buildCol(s) {
    const { r, g, b } = hexToRgb(s.color);
    return hasAlpha() ? `rgba(${r},${g},${b},${s.alpha})` : `rgb(${r},${g},${b})`;
  }

  function buildCSS() {
    const st = [...state.stops].sort((a, b) => a.position - b.position);
    if (!isGrad()) {
      const c = buildCol(st[0]);
      return `linear-gradient(${c}, ${c})`;
    }
    const p = st.map(s => `${buildCol(s)} ${s.position}%`).join(', ');
    return `linear-gradient(${state.angle}deg, ${p})`;
  }

  // -- DOM refs --
  const dom = {
    tabs:    $$('.lg-tab'),
    preview: $('#lg-preview'),
    barSec:  $('#lg-bar-section'),
    bar:     $('#lg-bar'),
    track:   $('#lg-track'),
    addBtn:  $('#lg-add-btn'),
    angGrp:  $('#lg-angle-group'),
    wheel:   $('#lg-wheel'),
    ind:     $('#lg-indicator'),
    angIn:   $('#lg-angle-in'),
    list:    $('#lg-stops-list'),
    out:     $('#lg-out-code'),
    copyBtn: $('#lg-copy-btn'),
    copyStatus: $('#lg-copy-status'),
    hint:    $('#lg-bar-hint')
  };

  // -- Update visuals without full re-render --
  function updateVisuals() {
    dom.preview.style.backgroundImage = buildCSS();

    // Bar track gradient
    const st = [...state.stops].sort((a, b) => a.position - b.position);
    const gradStr = isGrad()
      ? `linear-gradient(90deg, ${st.map(s => `${buildCol(s)} ${s.position}%`).join(',')})`
      : buildCol(st[0]);
    dom.track.style.background = gradStr;

    // Handles
    const handles = $$('.lg-handle');
    if (handles.length === state.stops.length) {
      state.stops.forEach((s, i) => {
        handles[i].className = 'lg-handle' + (i === state.activeIdx ? ' active' : '');
        handles[i].style.left = `${s.position}%`;
        handles[i].style.backgroundColor = buildCol(s);
      });
    }

    // Stop items
    const items = $$('.lg-stop');
    const toShow = isGrad() ? state.stops : [state.stops[0]];
    if (items.length === toShow.length) {
      toShow.forEach((s, i) => {
        const { r, g, b } = hexToRgb(s.color);
        const prev = hasAlpha() ? `rgba(${r},${g},${b},${s.alpha})` : s.color;
        items[i].className = 'lg-stop' + (i === state.activeIdx ? ' active' : '');
        items[i].style.order = Math.round(s.position);

        items[i].querySelector('.lg-stop__preview').style.background = prev;

        const cIn = items[i].querySelector('.lg-stop__color-in');
        if (cIn.value !== s.color) cIn.value = s.color;

        const hIn = items[i].querySelector('.lg-stop__hex');
        if (document.activeElement !== hIn) hIn.value = s.color.toUpperCase();

        if (hasAlpha()) {
          const aSli = items[i].querySelector('.lg-stop__alpha-slider');
          const aVal = Math.round(s.alpha * 100);
          if (String(aSli.value) !== String(aVal)) aSli.value = aVal;
          aSli.style.background = `linear-gradient(to right, rgba(${r},${g},${b},0), rgba(${r},${g},${b},1))`;
          const aValIn = items[i].querySelector('.lg-stop__alpha-val');
          if (document.activeElement !== aValIn) aValIn.value = aVal + '%';
        }

        if (isGrad()) {
          const pIn = items[i].querySelector('.lg-stop__pos');
          if (document.activeElement !== pIn) pIn.value = Math.round(s.position);
        }
      });
    }

    // Angle
    dom.ind.style.transform = `translate(-50%, -100%) rotate(${state.angle}deg)`;
    dom.wheel.setAttribute('aria-valuenow', state.angle);
    dom.wheel.setAttribute('aria-valuetext', `${state.angle} 度`);
    if (document.activeElement !== dom.angIn) dom.angIn.value = state.angle;

    dom.out.textContent = buildCSS() + ';';
  }

  // -- Full render (rebuild DOM) --
  function render() {
    dom.preview.style.backgroundImage = buildCSS();

    // Bar track
    const st = [...state.stops].sort((a, b) => a.position - b.position);
    const gradStr = isGrad()
      ? `linear-gradient(90deg, ${st.map(s => `${buildCol(s)} ${s.position}%`).join(',')})`
      : buildCol(st[0]);
    dom.track.style.background = gradStr;

    // Handles
    $$('.lg-handle').forEach(h => h.remove());
    if (isGrad()) {
      state.stops.forEach((s, i) => {
        const h = document.createElement('div');
        h.className = 'lg-handle' + (i === state.activeIdx ? ' active' : '');
        h.style.left = `${s.position}%`;
        h.style.backgroundColor = buildCol(s);
        h.setAttribute('role', 'button');
        h.setAttribute('tabindex', '0');
        h.setAttribute('aria-label', `色標 ${i + 1} 拖曳調整位置`);
        h.addEventListener('mousedown', e => onDrag(e, i));
        h.addEventListener('dblclick', () => rmStop(i));
        h.addEventListener('click', e => { e.stopPropagation(); state.activeIdx = i; updateVisuals(); });
        h.addEventListener('keydown', e => {
          if (e.key === 'Delete' || e.key === 'Backspace') rmStop(i);
        });
        dom.bar.appendChild(h);
      });
    }

    // Stop list
    dom.list.innerHTML = '';
    const toShow = isGrad() ? state.stops : [state.stops[0]];
    toShow.forEach((s, i) => {
      const { r, g, b } = hexToRgb(s.color);
      const prevColor = hasAlpha() ? `rgba(${r},${g},${b},${s.alpha})` : s.color;
      const canDelete = isGrad() && toShow.length > 2;
      const stopNum = i + 1;

      const el = document.createElement('div');
      el.className = 'lg-stop' + (i === state.activeIdx ? ' active' : '');
      el.style.order = Math.round(s.position);

      el.innerHTML = `
        <div class="lg-stop__color-wrap" title="色標 ${stopNum} 顏色">
          <div class="lg-stop__checker" aria-hidden="true"></div>
          <div class="lg-stop__preview" style="background:${prevColor}" aria-hidden="true"></div>
          <input type="color" class="lg-stop__color-in" value="${s.color}"
            aria-label="色標 ${stopNum} 顏色選擇器">
        </div>
        <input type="text" class="lg-stop__hex" value="${s.color.toUpperCase()}" maxlength="7"
          aria-label="色標 ${stopNum} HEX 色值" placeholder="#000000" autocomplete="off" spellcheck="false">
        ${hasAlpha() ? `
        <div class="lg-stop__alpha-group">
          <input type="range" class="lg-stop__alpha-slider" min="0" max="100"
            value="${Math.round(s.alpha * 100)}"
            style="background: linear-gradient(to right, rgba(${r},${g},${b},0), rgba(${r},${g},${b},1))"
            aria-label="色標 ${stopNum} 透明度">
          <input type="text" class="lg-stop__alpha-val" value="${Math.round(s.alpha * 100)}%"
            aria-label="色標 ${stopNum} 透明度數值">
        </div>` : ''}
        ${isGrad() ? `
        <div class="lg-stop__pos-group">
          <input type="number" class="lg-stop__pos" value="${Math.round(s.position)}"
            min="0" max="100" aria-label="色標 ${stopNum} 位置（%）">
          <span class="lg-stop__pos-unit" aria-hidden="true">%</span>
        </div>` : ''}
        <button class="lg-stop__del${canDelete ? '' : ' lg-hidden'}"
          aria-label="刪除色標 ${stopNum}">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      `;

      // Events
      el.querySelector('.lg-stop__color-in').addEventListener('input', e => {
        state.stops[i].color = e.target.value;
        updateVisuals();
      });

      const hexIn = el.querySelector('.lg-stop__hex');
      hexIn.addEventListener('input', e => {
        let v = e.target.value.trim();
        if (!v.startsWith('#')) v = '#' + v;
        if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
          hexIn.classList.remove('invalid');
          state.stops[i].color = v.toLowerCase();
          updateVisuals();
        } else {
          hexIn.classList.add('invalid');
        }
      });
      hexIn.addEventListener('blur', () => {
        // On blur, revert to valid value if still invalid
        if (hexIn.classList.contains('invalid')) {
          hexIn.classList.remove('invalid');
          hexIn.value = state.stops[i].color.toUpperCase();
        }
      });

      if (hasAlpha()) {
        el.querySelector('.lg-stop__alpha-slider').addEventListener('input', e => {
          state.stops[i].alpha = e.target.value / 100;
          updateVisuals();
        });
        el.querySelector('.lg-stop__alpha-val').addEventListener('input', e => {
          const v = parseInt(e.target.value);
          if (!isNaN(v)) {
            state.stops[i].alpha = Math.max(0, Math.min(100, v)) / 100;
            updateVisuals();
          }
        });
      }

      if (isGrad()) {
        el.querySelector('.lg-stop__pos').addEventListener('input', e => {
          const v = parseInt(e.target.value);
          if (!isNaN(v)) {
            state.stops[i].position = Math.max(0, Math.min(100, v));
            updateVisuals();
          }
        });
        const delBtn = el.querySelector('.lg-stop__del');
        if (delBtn) delBtn.addEventListener('click', () => rmStop(i));
      }

      el.addEventListener('click', () => { state.activeIdx = i; updateVisuals(); });
      dom.list.appendChild(el);
    });

    // Angle & output
    dom.ind.style.transform = `translate(-50%, -100%) rotate(${state.angle}deg)`;
    dom.wheel.setAttribute('aria-valuenow', state.angle);
    dom.wheel.setAttribute('aria-valuetext', `${state.angle} 度`);
    dom.angIn.value = state.angle;
    dom.out.textContent = buildCSS() + ';';

    // Toggle visibility
    dom.angGrp.classList.toggle('lg-hidden', !isGrad());
    dom.addBtn.classList.toggle('lg-hidden', !isGrad());
    dom.hint.classList.toggle('lg-hidden', !isGrad());
  }

  // -- Stop operations --
  function addStop(pos) {
    state.stops.push({ color: '#000000', alpha: 1, position: pos });
    state.activeIdx = state.stops.length - 1;
    render();
  }

  function rmStop(idx) {
    if (state.stops.length <= 2) return;
    state.stops.splice(idx, 1);
    state.activeIdx = Math.max(0, idx - 1);
    render();
  }

  // -- Drag handles --
  function onDrag(e, i) {
    e.preventDefault(); e.stopPropagation();
    state.activeIdx = i;
    updateVisuals();
    const rect = dom.bar.getBoundingClientRect();
    const handle = $$('.lg-handle')[i];
    if (handle) handle.classList.add('dragging');

    const move = ev => {
      const pct = Math.max(0, Math.min(100, ((ev.clientX - rect.left) / rect.width) * 100));
      state.stops[i].position = Math.round(pct);
      updateVisuals();
    };
    const up = () => {
      if (handle) handle.classList.remove('dragging');
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  // -- Tab switching --
  dom.tabs.forEach(t => t.addEventListener('click', () => {
    state.mode = t.dataset.mode;
    dom.tabs.forEach(btn => {
      btn.setAttribute('aria-selected', String(btn === t));
    });
    if (!isGrad()) state.activeIdx = 0;
    render();
  }));

  // -- Bar click to add stop --
  dom.bar.addEventListener('click', e => {
    if (!isGrad() || e.target.closest('.lg-handle')) return;
    const rect = dom.bar.getBoundingClientRect();
    addStop(Math.round(((e.clientX - rect.left) / rect.width) * 100));
  });
  dom.bar.addEventListener('keydown', e => {
    if (!isGrad()) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); addStop(50); }
  });

  dom.addBtn.addEventListener('click', () => { if (isGrad()) addStop(50); });

  // -- Angle wheel (mouse + keyboard) --
  let angDrag = false;
  const updateAngle = ev => {
    const rect = dom.wheel.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let ang = Math.round(Math.atan2(ev.clientX - cx, cy - ev.clientY) * (180 / Math.PI));
    if (ang < 0) ang += 360;
    state.angle = ang;
    updateVisuals();
  };

  dom.wheel.addEventListener('mousedown', e => { angDrag = true; updateAngle(e); });
  document.addEventListener('mousemove', e => { if (angDrag) updateAngle(e); });
  document.addEventListener('mouseup', () => { angDrag = false; });

  dom.wheel.addEventListener('keydown', e => {
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -1;
    else if (e.key === 'PageUp') delta = 10;
    else if (e.key === 'PageDown') delta = -10;
    else if (e.key === 'Home') { state.angle = 0; updateVisuals(); return; }
    else if (e.key === 'End')  { state.angle = 360; updateVisuals(); return; }
    if (delta !== 0) {
      e.preventDefault();
      state.angle = (state.angle + delta + 360) % 360;
      updateVisuals();
    }
  });

  dom.angIn.addEventListener('input', e => {
    state.angle = ((+e.target.value % 360) + 360) % 360;
    updateVisuals();
  });

  // -- Copy --
  dom.copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(dom.out.textContent).then(() => {
      dom.copyBtn.classList.add('copied');
      dom.copyBtn.setAttribute('aria-label', '已複製！');
      app.querySelector('.lg-copy-icon').style.display = 'none';
      app.querySelector('.lg-check-icon').style.display = '';
      dom.copyStatus.textContent = '已複製 CSS！';
      dom.copyStatus.classList.remove('lg-hidden');
      setTimeout(() => {
        dom.copyBtn.classList.remove('copied');
        dom.copyBtn.setAttribute('aria-label', '複製 CSS');
        app.querySelector('.lg-copy-icon').style.display = '';
        app.querySelector('.lg-check-icon').style.display = 'none';
        dom.copyStatus.classList.add('lg-hidden');
        dom.copyStatus.textContent = '';
      }, 1500);
    });
  });

  // -- Init --
  render();
})();
