(function() {
  var CSS = [
    '#ts2-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#ts2-app *,*::before,*::after{box-sizing:border-box}',
    '#ts2-hdr{text-align:center}',
    '#ts2-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#ts2-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#ts2-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#ts2-main{grid-template-columns:1fr}}',
    '.ts2-col{display:flex;flex-direction:column;gap:12px}',
    '.ts2-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.ts2-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.ts2-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.ts2-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:48px;flex-shrink:0}',
    '.ts2-ctrl input[type=range]{flex:1;-webkit-appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.ts2-ctrl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.ts2-ctrl .ts2-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:48px;text-align:right;flex-shrink:0}',
    '.ts2-ctrl-row input[type=color]{width:36px;height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;background:transparent;padding:2px}',
    '.ts2-ctrl-row input[type=color]::-webkit-color-swatch-wrapper{padding:0}',
    '.ts2-ctrl-row input[type=color]::-webkit-color-swatch{border:none;border-radius:4px}',
    '.ts2-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:40px;display:flex;align-items:center;justify-content:center;min-height:200px;transition:all 0.15s}',
    '#ts2-preview-text{font-size:3rem;font-weight:700;color:#fff;transition:text-shadow 0.1s;cursor:default;user-select:none}',
    '.ts2-layers{display:flex;flex-direction:column;gap:6px;max-height:240px;overflow-y:auto}',
    '.ts2-layer{display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:8px;padding:7px 10px}',
    '.ts2-layer-color{width:24px;height:24px;border-radius:5px;border:1px solid var(--c-border);flex-shrink:0}',
    '.ts2-layer-info{flex:1;font-family:var(--c-mono);font-size:0.72rem;color:var(--c-text-sec);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ts2-layer-del{background:transparent;border:none;color:#666;cursor:pointer;font-size:1rem;padding:0 2px}',
    '.ts2-layer-del:hover{color:#ef4444}',
    '.ts2-add-layer{width:100%;padding:7px;border:1px dashed rgba(139,92,246,0.4);border-radius:8px;background:transparent;color:var(--c-accent);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.ts2-add-layer:hover{background:rgba(139,92,246,0.1)}',
    '.ts2-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}',
    '.ts2-preset{padding:6px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.ts2-preset:hover{border-color:var(--c-accent);color:var(--c-accent)}',
    '.ts2-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.ts2-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.ts2-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto}',
    '.ts2-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.ts2-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.ts2-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.ts2-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="ts2-app">',
    '<div id="ts2-hdr"><h1>Text Shadow Generator</h1><p>多層文字陰影 · 即時預覽</p></div>',
    '<div id="ts2-main">',
    '<div class="ts2-col">',
    '<div class="ts2-section-label">圖層</div>',
    '<div class="ts2-layers" id="ts2-layers"></div>',
    '<button class="ts2-add-layer" id="ts2-add">+ 新增圖層</button>',
    '<div class="ts2-section-label" style="margin-top:8px">預設</div>',
    '<div class="ts2-presets">',
    '<button class="ts2-preset" data-style="subtle">Subtle</button>',
    '<button class="ts2-preset" data-style="medium">Medium</button>',
    '<button class="ts2-preset" data-style="neon">Neon</button>',
    '<button class="ts2-preset" data-style="hard">Hard</button>',
    '<button class="ts2-preset" data-style="long">Long</button>',
    '<button class="ts2-preset" data-style="glow">Glow</button>',
    '<button class="ts2-preset" data-style="emboss">Emboss</button>',
    '<button class="ts2-preset" data-style="outline">Outline</button>',
    '</div>',
    '</div>',
    '<div class="ts2-col">',
    '<div class="ts2-section-label">預覽</div>',
    '<div class="ts2-preview-area"><div id="ts2-preview-text">Aa</div></div>',
    '<div class="ts2-section-label">CSS 輸出</div>',
    '<div class="ts2-css-output">',
    '<div class="ts2-css-label">text-shadow</div>',
    '<div class="ts2-css-code" id="ts2-css-code"></div>',
    '<div class="ts2-copy-row"><button class="ts2-copy" id="ts2-copy-btn">複製</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('text-shadow-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };
  var layers = [{ id: 1, color: '#000000', x: 0, y: 2, blur: 4, alpha: 50 }];
  var nextId = 2;

  var PRESETS = {
    subtle: [{ color: '#000', x: 0, y: 1, blur: 3, alpha: 25 }],
    medium: [{ color: '#000', x: 0, y: 3, blur: 8, alpha: 40 }],
    neon: [{ color: '#ff00ff', x: 0, y: 0, blur: 20, alpha: 100 }, { color: '#00ffff', x: 0, y: 0, blur: 40, alpha: 60 }],
    hard: [{ color: '#000', x: 3, y: 3, blur: 0, alpha: 80 }],
    long: [{ color: '#000', x: 0, y: 8, blur: 0, alpha: 50 }],
    glow: [{ color: '#8b5cf6', x: 0, y: 0, blur: 30, alpha: 80 }],
    emboss: [{ color: '#fff', x: -1, y: -1, blur: 1, alpha: 30 }, { color: '#000', x: 1, y: 1, blur: 1, alpha: 50 }],
    outline: [{ color: '#000', x: -2, y: -2, blur: 0, alpha: 100 }, { color: '#000', x: 2, y: 2, blur: 0, alpha: 100 }, { color: '#000', x: -2, y: 2, blur: 0, alpha: 100 }, { color: '#000', x: 2, y: -2, blur: 0, alpha: 100 }]
  };

  function shadowCSS(l) {
    var r = parseInt(l.color.slice(1,3), 16);
    var g = parseInt(l.color.slice(3,5), 16);
    var b = parseInt(l.color.slice(5,7), 16);
    return l.x + 'px ' + l.y + 'px ' + l.blur + 'px rgba(' + r + ',' + g + ',' + b + ',' + (l.alpha / 100).toFixed(2) + ')';
  }

  function fullCSS() {
    return layers.map(shadowCSS).join(',\n     ');
  }

  function apply() {
    $id('ts2-preview-text').style.textShadow = fullCSS();
    $id('ts2-css-code').textContent = 'text-shadow:\n  ' + fullCSS() + ';';
  }

  function renderLayers() {
    var html = '';
    layers.forEach(function(l) {
      html += '<div class="ts2-layer" data-id="' + l.id + '">' +
        '<input type="color" class="ts2-layer-color" value="' + l.color + '" data-id="' + l.id + '" style="padding:0;background:transparent">' +
        '<div class="ts2-layer-info">x:' + l.x + ' y:' + l.y + ' b:' + l.blur + '</div>' +
        '<button class="ts2-layer-del" data-id="' + l.id + '">×</button>' +
        '</div>';
    });
    $id('ts2-layers').innerHTML = html;

    $id('ts2-layers').querySelectorAll('input[type=color]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        var l = layers.find(function(x) { return x.id === parseInt(inp.dataset.id); });
        if (l) { l.color = inp.value; inp.style.background = inp.value; apply(); }
      });
    });

    $id('ts2-layers').querySelectorAll('.ts2-layer-del').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (layers.length === 1) return;
        layers = layers.filter(function(l) { return l.id !== parseInt(btn.dataset.id); });
        renderLayers();
        apply();
      });
    });

    $id('ts2-layers').querySelectorAll('.ts2-layer').forEach(function(el) {
      el.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        var l = layers.find(function(x) { return x.id === parseInt(el.dataset.id); });
        if (!l) return;
        var newX = prompt('X offset (px):', l.x);
        if (newX !== null) l.x = parseInt(newX) || 0;
        var newY = prompt('Y offset (px):', l.y);
        if (newY !== null) l.y = parseInt(newY) || 0;
        var newBlur = prompt('Blur (px):', l.blur);
        if (newBlur !== null) l.blur = parseInt(newBlur) || 0;
        renderLayers();
        apply();
      });
    });
  }

  function init() {
    $id('ts2-add').addEventListener('click', function() {
      layers.push({ id: nextId++, color: '#000000', x: 0, y: 2, blur: 4, alpha: 50 });
      renderLayers();
      apply();
    });

    document.querySelectorAll('.ts2-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var p = PRESETS[btn.dataset.style] || PRESETS.subtle;
        layers = p.map(function(s, i) {
          return { id: nextId++, color: s.color, x: s.x, y: s.y, blur: s.blur, alpha: s.alpha };
        });
        renderLayers();
        apply();
      });
    });

    $id('ts2-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText('text-shadow: ' + fullCSS() + ';').then(function() {
        $id('ts2-copy-btn').classList.add('copied');
        $id('ts2-copy-btn').textContent = '已複製!';
        setTimeout(function() {
          $id('ts2-copy-btn').classList.remove('copied');
          $id('ts2-copy-btn').textContent = '複製';
        }, 1500);
      });
    });

    renderLayers();
    apply();
  }

  function tryInit() {
    var panel = $id('panel-text-shadow');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
