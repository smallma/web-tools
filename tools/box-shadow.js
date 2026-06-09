(function() {
  var CSS = [
    '#bs-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#bs-app *,*::before,*::after{box-sizing:border-box}',
    '#bs-hdr{text-align:center}',
    '#bs-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#bs-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#bs-main{display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#bs-main{grid-template-columns:1fr}}',
    '.bs-col{display:flex;flex-direction:column;gap:12px}',
    '.bs-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.bs-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.bs-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px;transition:border-color 0.2s}',
    '.bs-ctrl-row:focus-within{border-color:var(--c-accent)}',
    '.bs-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:28px;flex-shrink:0}',
    '.bs-ctrl input[type=range]{flex:1;-webkit-appearance:none;appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.bs-ctrl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.bs-ctrl .bs-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:48px;text-align:right;flex-shrink:0}',
    '.bs-toggle-row{display:flex;align-items:center;gap:10px;padding:6px 0}',
    '.bs-toggle{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.8rem;color:var(--c-text-sec)',
    '.bs-toggle input{width:16px;height:16px;cursor:pointer;accent-color:var(--c-accent)}',
    '.bs-presets{display:grid;grid-template-columns:1fr 1fr;gap:6px}',
    '.bs-preset{padding:7px 6px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.bs-preset:hover{border-color:var(--c-accent);color:var(--c-accent)}',
    '.bs-layers{display:flex;flex-direction:column;gap:6px;max-height:280px;overflow-y:auto}',
    '.bs-layer{display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:8px;padding:7px 10px}',
    '.bs-layer-color{width:24px;height:24px;border-radius:5px;border:1px solid var(--c-border);flex-shrink:0;cursor:pointer;overflow:hidden;position:relative}',
    '.bs-layer-color input{position:absolute;inset:-4px;width:32px;height:32px;opacity:0;cursor:pointer}',
    '.bs-layer-color-preview{width:100%;height:100%;pointer-events:none}',
    '.bs-layer-info{flex:1;font-family:var(--c-mono);font-size:0.72rem;color:var(--c-text-sec);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.bs-layer-del{background:transparent;border:none;color:#666;cursor:pointer;font-size:1rem;padding:0 2px;transition:color 0.15s}',
    '.bs-layer-del:hover{color:#ef4444}',
    '.bs-add-layer{width:100%;padding:7px;border:1px dashed rgba(139,92,246,0.4);border-radius:8px;background:transparent;color:var(--c-accent);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.bs-add-layer:hover{background:rgba(139,92,246,0.1);border-color:var(--c-accent)}',
    '.bs-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:32px;display:flex;align-items:center;justify-content:center;min-height:200px;position:relative}',
    '#bs-preview-elem{width:120px;height:120px;background:#8b5cf6;transition:box-shadow 0.1s;flex-shrink:0}',
    '.bs-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.bs-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.bs-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto;word-break:break-all}',
    '.bs-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.bs-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.bs-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.bs-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.bs-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
  ].join('');

  var HTML = [
    '<div id="bs-app">',
    '<div id="bs-hdr"><h1>Box Shadow Generator</h1><p>多層陰影 · 即時預覽</p></div>',
    '<div id="bs-main">',
    '<div class="bs-col">',
    '<div class="bs-section-label" id="bs-layers-label">陰影圖層</div>',
    '<div class="bs-layers" id="bs-layers" role="list" aria-labelledby="bs-layers-label"></div>',
    '<button class="bs-add-layer" id="bs-add-layer" aria-label="新增陰影圖層">+ 新增圖層</button>',
    '<div class="bs-section-label" style="margin-top:8px">預設</div>',
    '<div class="bs-presets" role="group" aria-label="預設陰影效果">',
    '<button class="bs-preset" data-preset="material" aria-label="套用 Material 預設陰影">Material</button>',
    '<button class="bs-preset" data-preset="neumorphic" aria-label="套用 Neumorphic 預設陰影">Neumorphic</button>',
    '<button class="bs-preset" data-preset="card" aria-label="套用 Card 預設陰影">Card</button>',
    '<button class="bs-preset" data-preset="floating" aria-label="套用 Floating 預設陰影">Floating</button>',
    '<button class="bs-preset" data-preset="hard" aria-label="套用 Hard 預設陰影">Hard</button>',
    '<button class="bs-preset" data-preset="glow" aria-label="套用 Glow 預設陰影">Glow</button>',
    '</div>',
    '</div>',
    '<div class="bs-col">',
    '<div class="bs-section-label">預覽</div>',
    '<div class="bs-preview-area"><div id="bs-preview-elem"></div></div>',
    '<div class="bs-section-label">CSS 輸出</div>',
    '<div class="bs-css-output">',
    '<div class="bs-css-code" id="bs-css-code"></div>',
    '<div class="bs-copy-row"><button class="bs-copy" id="bs-copy-btn" aria-label="複製 CSS 程式碼">複製</button></div>',
    '<div id="bs-copy-announce" class="bs-sr-only" role="status" aria-live="polite"></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('box-shadow-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };

  var layers = [
    { id: 1, color: 'rgba(0,0,0,0.25)', x: 0, y: 4, blur: 12, spread: 0, inset: false }
  ];
  var nextId = 2;

  var PRESETS = {
    material: [{ color: 'rgba(0,0,0,0.25)', x: 0, y: 4, blur: 12, spread: 0, inset: false }],
    card: [{ color: 'rgba(0,0,0,0.15)', x: 0, y: 2, blur: 8, spread: 0, inset: false }, { color: 'rgba(0,0,0,0.1)', x: 0, y: 8, blur: 24, spread: 0, inset: false }],
    floating: [{ color: 'rgba(0,0,0,0.35)', x: 0, y: 12, blur: 30, spread: 0, inset: false }],
    neumorphic: [{ color: 'rgba(255,255,255,0.05)', x: -4, y: -4, blur: 10, spread: 0, inset: false }, { color: 'rgba(0,0,0,0.3)', x: 4, y: 4, blur: 10, spread: 0, inset: false }],
    hard: [{ color: 'rgba(0,0,0,0.5)', x: 5, y: 5, blur: 0, spread: 0, inset: false }],
    glow: [{ color: 'rgba(139,92,246,0.6)', x: 0, y: 0, blur: 30, spread: 0, inset: false }]
  };

  function shadowCSS(l) {
    var inset = l.inset ? 'inset ' : '';
    return inset + l.x + 'px ' + l.y + 'px ' + l.blur + 'px ' + l.spread + 'px ' + l.color;
  }

  function fullCSS() {
    return 'box-shadow:\n  ' + layers.map(shadowCSS).join(',\n  ') + ';';
  }

  function applyShadow() {
    $id('bs-preview-elem').style.boxShadow = layers.map(shadowCSS).join(', ');
    $id('bs-css-code').textContent = fullCSS();
  }

  function renderLayers() {
    var html = '';
    layers.forEach(function(l, idx) {
      var layerNum = idx + 1;
      html += [
        '<div class="bs-layer" data-id="' + l.id + '" role="listitem">',
        '<div class="bs-layer-color">',
        '<div class="bs-layer-color-preview" style="background:' + l.color + '"></div>',
        '<input type="color" value="' + (l.color.startsWith('#') ? l.color.slice(0,7) : '#8b5cf6') + '" data-id="' + l.id + '" aria-label="圖層 ' + layerNum + ' 顏色">',
        '</div>',
        '<div class="bs-layer-info" role="button" tabindex="0" aria-expanded="false" aria-label="圖層 ' + layerNum + ' 設定，點擊展開控制項">x:' + l.x + ' y:' + l.y + ' b:' + l.blur + ' ' + (l.inset ? 'inset' : '') + '</div>',
        '<button class="bs-layer-del" data-id="' + l.id + '" aria-label="刪除圖層 ' + layerNum + '">×</button>',
        '</div>'
      ].join('');
    });
    $id('bs-layers').innerHTML = html;

    // Events
    $id('bs-layers').querySelectorAll('.bs-layer-del').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = parseInt(btn.dataset.id);
        if (layers.length === 1) return;
        layers = layers.filter(function(l) { return l.id !== id; });
        renderLayers();
        applyShadow();
      });
    });

    $id('bs-layers').querySelectorAll('input[type=color]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        var id = parseInt(inp.dataset.id);
        var l = layers.find(function(x) { return x.id === id; });
        if (l) {
          l.color = inp.value;
          inp.parentElement.querySelector('.bs-layer-color-preview').style.background = inp.value;
          renderLayerControls(l);
          applyShadow();
        }
      });
    });

    layers.forEach(function(l) { renderLayerControls(l); });
  }

  function renderLayerControls(l) {
    // no individual sliders in layer list — just show shadow
  }

  function showControls(l) {
    // Show a simple inline control for the clicked layer
    var el = $id('bs-layers').querySelector('[data-id="' + l.id + '"]');
    if (!el) return;
    var infoEl = el.querySelector('.bs-layer-info');
    // Build controls
    var existing = el.querySelector('.bs-ctrl-inline');
    if (existing) {
      existing.remove();
      if (infoEl) infoEl.setAttribute('aria-expanded', 'false');
      return;
    }
    if (infoEl) infoEl.setAttribute('aria-expanded', 'true');
    var ctrl = document.createElement('div');
    ctrl.className = 'bs-ctrl-inline';
    ctrl.style.cssText = 'display:flex;flex-direction:column;gap:4px;padding:8px 0 4px;border-top:1px solid rgba(255,255,255,0.06);margin-top:4px';
    ctrl.innerHTML = [
      '<div class="bs-ctrl-row"><label for="bsc-x-' + l.id + '">X</label><input type=range id="bsc-x-' + l.id + '" min=-50 max=50 value=' + l.x + ' data-key=x aria-label="X 偏移" aria-valuemin="-50" aria-valuemax="50" aria-valuenow="' + l.x + '"><span class=bs-val>' + l.x + 'px</span></div>',
      '<div class="bs-ctrl-row"><label for="bsc-y-' + l.id + '">Y</label><input type=range id="bsc-y-' + l.id + '" min=-50 max=50 value=' + l.y + ' data-key=y aria-label="Y 偏移" aria-valuemin="-50" aria-valuemax="50" aria-valuenow="' + l.y + '"><span class=bs-val>' + l.y + 'px</span></div>',
      '<div class="bs-ctrl-row"><label for="bsc-blur-' + l.id + '">Blur</label><input type=range id="bsc-blur-' + l.id + '" min=0 max=100 value=' + l.blur + ' data-key=blur aria-label="模糊半徑" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + l.blur + '"><span class=bs-val>' + l.blur + 'px</span></div>',
      '<div class="bs-ctrl-row"><label for="bsc-spread-' + l.id + '">Spread</label><input type=range id="bsc-spread-' + l.id + '" min=-20 max=50 value=' + l.spread + ' data-key=spread aria-label="擴散距離" aria-valuemin="-20" aria-valuemax="50" aria-valuenow="' + l.spread + '"><span class=bs-val>' + l.spread + 'px</span></div>',
      '<div class="bs-toggle-row"><label class=bs-toggle><input type=checkbox data-key=inset' + (l.inset ? ' checked' : '') + ' aria-label="內陰影 (Inset)">Inset</label></div>'
    ].join('');
    el.appendChild(ctrl);
    ctrl.querySelectorAll('input[type=range]').forEach(function(inp) {
      inp.style.cssText = 'flex:1;-webkit-appearance:none;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);outline:none';
      inp.addEventListener('input', function() {
        l[inp.dataset.key] = parseInt(inp.value);
        inp.setAttribute('aria-valuenow', inp.value);
        inp.nextElementSibling.textContent = inp.value + 'px';
        if (infoEl) infoEl.textContent = 'x:' + l.x + ' y:' + l.y + ' b:' + l.blur + ' ' + (l.inset ? 'inset' : '');
        applyShadow();
      });
    });
    ctrl.querySelector('input[type=checkbox]').addEventListener('change', function() {
      l.inset = this.checked;
      if (infoEl) infoEl.textContent = 'x:' + l.x + ' y:' + l.y + ' b:' + l.blur + ' ' + (l.inset ? 'inset' : '');
      applyShadow();
    });
  }

  function init() {
    $id('bs-add-layer').addEventListener('click', function() {
      layers.push({ id: nextId++, color: 'rgba(0,0,0,0.2)', x: 0, y: 4, blur: 10, spread: 0, inset: false });
      renderLayers();
      applyShadow();
    });

    $id('bs-layers').addEventListener('click', function(e) {
      if (e.target.classList.contains('bs-layer-info') || e.target.classList.contains('bs-layer-color')) {
        var layerEl = e.target.closest('.bs-layer');
        var id = parseInt(layerEl.dataset.id);
        var l = layers.find(function(x) { return x.id === id; });
        if (l) showControls(l);
      }
    });

    $id('bs-layers').addEventListener('keydown', function(e) {
      if (e.target.classList.contains('bs-layer-info') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        var layerEl = e.target.closest('.bs-layer');
        var id = parseInt(layerEl.dataset.id);
        var l = layers.find(function(x) { return x.id === id; });
        if (l) showControls(l);
      }
    });

    document.querySelectorAll('.bs-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var preset = PRESETS[btn.dataset.preset] || PRESETS.material;
        layers = preset.map(function(p, i) {
          return { id: nextId++, color: p.color, x: p.x, y: p.y, blur: p.blur, spread: p.spread, inset: p.inset || false };
        });
        renderLayers();
        applyShadow();
      });
    });

    $id('bs-copy-btn').addEventListener('click', function() {
      var css = fullCSS();
      var btn = $id('bs-copy-btn');
      var announce = $id('bs-copy-announce');
      function onCopied() {
        btn.classList.add('copied');
        btn.textContent = '已複製!';
        if (announce) { announce.textContent = ''; announce.textContent = '已複製 CSS 程式碼'; }
        setTimeout(function() {
          btn.classList.remove('copied');
          btn.textContent = '複製';
          if (announce) announce.textContent = '';
        }, 1500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(css).then(onCopied).catch(function() {
          try { document.execCommand('copy', false, css); onCopied(); } catch(e) {}
        });
      } else {
        try { document.execCommand('copy', false, css); onCopied(); } catch(e) {}
      }
    });

    renderLayers();
    applyShadow();
  }

  function tryInit() {
    var panel = $id('panel-box-shadow');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
