(function() {
  var CSS = [
    '#ts2-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#ts2-app *,*::before,*::after{box-sizing:border-box}',
    '#ts2-hdr{text-align:center}',
    '#ts2-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#ts2-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#ts2-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#ts2-main{grid-template-columns:1fr}}',
    '.ts2-col{display:flex;flex-direction:column;gap:12px}',
    '.ts2-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.ts2-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:7px 10px;transition:border-color 0.2s}',
    '.ts2-ctrl-row:focus-within{border-color:var(--c-accent)}',
    '.ts2-ctrl-row label{font-size:0.78rem;color:var(--c-text-sec);width:52px;flex-shrink:0}',
    '.ts2-ctrl-row input[type=range]{flex:1;-webkit-appearance:none;appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.ts2-ctrl-row input[type=range]:focus{outline:2px solid var(--c-accent);outline-offset:2px}',
    '.ts2-ctrl-row input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.ts2-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:48px;text-align:right;flex-shrink:0}',
    '.ts2-layers{display:flex;flex-direction:column;gap:6px;max-height:360px;overflow-y:auto}',
    '.ts2-layer{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:8px;overflow:hidden;transition:border-color 0.2s}',
    '.ts2-layer.expanded{border-color:rgba(139,92,246,0.4)}',
    '.ts2-layer-head{display:flex;align-items:center;gap:6px;padding:7px 10px;cursor:pointer;user-select:none}',
    '.ts2-layer-head:focus-visible{outline:2px solid var(--c-accent);outline-offset:-2px;border-radius:8px}',
    '.ts2-layer-color-wrap{width:24px;height:24px;border-radius:5px;border:1px solid var(--c-border);flex-shrink:0;overflow:hidden;position:relative}',
    '.ts2-layer-color-wrap input[type=color]{position:absolute;inset:-4px;width:32px;height:32px;opacity:0;cursor:pointer;border:none;padding:0}',
    '.ts2-layer-color-preview{width:100%;height:100%;pointer-events:none}',
    '.ts2-layer-info{flex:1;font-family:var(--c-mono);font-size:0.72rem;color:var(--c-text-sec);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ts2-layer-toggle{background:transparent;border:none;color:var(--c-text-sec);cursor:pointer;font-size:0.72rem;padding:0 4px;transition:transform 0.2s,color 0.15s;flex-shrink:0}',
    '.ts2-layer.expanded .ts2-layer-toggle{transform:rotate(180deg);color:var(--c-accent)}',
    '.ts2-layer-del{background:transparent;border:none;color:#666;cursor:pointer;font-size:1rem;padding:0 2px;transition:color 0.15s;flex-shrink:0;line-height:1}',
    '.ts2-layer-del:hover,.ts2-layer-del:focus-visible{color:#ef4444;outline:2px solid #ef4444;outline-offset:2px;border-radius:3px}',
    '.ts2-layer-ctrls{display:flex;flex-direction:column;gap:4px;padding:8px 10px;border-top:1px solid rgba(255,255,255,0.06)}',
    '.ts2-add-layer{width:100%;padding:7px;border:1px dashed rgba(139,92,246,0.4);border-radius:8px;background:transparent;color:var(--c-accent);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.ts2-add-layer:hover,.ts2-add-layer:focus-visible{background:rgba(139,92,246,0.1);border-color:var(--c-accent);outline:none}',
    '.ts2-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}',
    '.ts2-preset{padding:6px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.ts2-preset:hover,.ts2-preset:focus-visible{border-color:var(--c-accent);color:var(--c-accent);outline:none}',
    '.ts2-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:40px;display:flex;align-items:center;justify-content:center;min-height:200px;transition:all 0.15s}',
    '#ts2-preview-text{font-size:3rem;font-weight:700;color:#fff;transition:text-shadow 0.1s;cursor:default;user-select:none;text-align:center}',
    '.ts2-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.ts2-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.ts2-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto}',
    '.ts2-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.ts2-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.ts2-copy:hover,.ts2-copy:focus-visible{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1);outline:none}',
    '.ts2-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.ts2-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
  ].join('');

  var HTML = [
    '<div id="ts2-app">',
    '<div id="ts2-hdr"><h1>Text Shadow Generator</h1><p>多層文字陰影 · 即時預覽</p></div>',
    '<div id="ts2-main">',
    '<div class="ts2-col">',
    '<div class="ts2-section-label" aria-hidden="true">圖層</div>',
    '<div class="ts2-layers" id="ts2-layers" role="list" aria-label="陰影圖層列表"></div>',
    '<button class="ts2-add-layer" id="ts2-add" aria-label="新增陰影圖層">+ 新增圖層</button>',
    '<div class="ts2-section-label" style="margin-top:8px" aria-hidden="true">預設</div>',
    '<div class="ts2-presets" role="group" aria-label="預設樣式">',
    '<button class="ts2-preset" data-style="subtle" aria-label="套用 Subtle 預設">Subtle</button>',
    '<button class="ts2-preset" data-style="medium" aria-label="套用 Medium 預設">Medium</button>',
    '<button class="ts2-preset" data-style="neon" aria-label="套用 Neon 預設">Neon</button>',
    '<button class="ts2-preset" data-style="hard" aria-label="套用 Hard 預設">Hard</button>',
    '<button class="ts2-preset" data-style="long" aria-label="套用 Long 預設">Long</button>',
    '<button class="ts2-preset" data-style="glow" aria-label="套用 Glow 預設">Glow</button>',
    '<button class="ts2-preset" data-style="emboss" aria-label="套用 Emboss 預設">Emboss</button>',
    '<button class="ts2-preset" data-style="outline" aria-label="套用 Outline 預設">Outline</button>',
    '</div>',
    '</div>',
    '<div class="ts2-col">',
    '<div class="ts2-section-label" aria-hidden="true">預覽</div>',
    '<div class="ts2-preview-area" aria-label="文字陰影預覽區域"><div id="ts2-preview-text" aria-live="off">Aa</div></div>',
    '<div class="ts2-section-label" aria-hidden="true">CSS 輸出</div>',
    '<div class="ts2-css-output" role="region" aria-label="CSS 輸出">',
    '<div class="ts2-css-label" aria-hidden="true">text-shadow</div>',
    '<div class="ts2-css-code" id="ts2-css-code" aria-label="CSS 程式碼" tabindex="0"></div>',
    '<div class="ts2-copy-row">',
    '<button class="ts2-copy" id="ts2-copy-btn" aria-label="複製 CSS">複製</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '<div id="ts2-sr-status" class="ts2-sr-only" role="status" aria-live="polite" aria-atomic="true"></div>',
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
    subtle:  [{ color: '#000000', x: 0, y: 1, blur: 3,  alpha: 25 }],
    medium:  [{ color: '#000000', x: 0, y: 3, blur: 8,  alpha: 40 }],
    neon:    [{ color: '#ff00ff', x: 0, y: 0, blur: 20, alpha: 100 }, { color: '#00ffff', x: 0, y: 0, blur: 40, alpha: 60 }],
    hard:    [{ color: '#000000', x: 3, y: 3, blur: 0,  alpha: 80 }],
    long:    [{ color: '#000000', x: 0, y: 8, blur: 0,  alpha: 50 }],
    glow:    [{ color: '#8b5cf6', x: 0, y: 0, blur: 30, alpha: 80 }],
    emboss:  [{ color: '#ffffff', x: -1, y: -1, blur: 1, alpha: 30 }, { color: '#000000', x: 1, y: 1, blur: 1, alpha: 50 }],
    outline: [{ color: '#000000', x: -2, y: -2, blur: 0, alpha: 100 }, { color: '#000000', x: 2, y: 2, blur: 0, alpha: 100 }, { color: '#000000', x: -2, y: 2, blur: 0, alpha: 100 }, { color: '#000000', x: 2, y: -2, blur: 0, alpha: 100 }]
  };

  function hexToRgb(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  function shadowCSS(l) {
    var rgb = hexToRgb(l.color);
    return l.x + 'px ' + l.y + 'px ' + l.blur + 'px rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (l.alpha / 100).toFixed(2) + ')';
  }

  function fullCSS() {
    return layers.map(shadowCSS).join(',\n     ');
  }

  function apply() {
    $id('ts2-preview-text').style.textShadow = fullCSS();
    $id('ts2-css-code').textContent = 'text-shadow:\n  ' + fullCSS() + ';';
  }

  function announce(msg) {
    var el = $id('ts2-sr-status');
    if (el) { el.textContent = ''; setTimeout(function() { el.textContent = msg; }, 50); }
  }

  function layerIndex(l) {
    return layers.indexOf(l) + 1;
  }

  function buildLayerHead(l, idx) {
    var rgb = hexToRgb(l.color);
    var previewBg = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (l.alpha / 100).toFixed(2) + ')';
    return [
      '<div class="ts2-layer-head" tabindex="0" role="button" aria-expanded="false" aria-controls="ts2-ctrl-' + l.id + '">',
      '<div class="ts2-layer-color-wrap">',
      '<div class="ts2-layer-color-preview" style="background:' + previewBg + '"></div>',
      '<input type="color" value="' + l.color + '" data-id="' + l.id + '" aria-label="圖層 ' + idx + ' 顏色" tabindex="-1">',
      '</div>',
      '<div class="ts2-layer-info" id="ts2-info-' + l.id + '">x:' + l.x + ' y:' + l.y + ' b:' + l.blur + ' a:' + l.alpha + '%</div>',
      '<span class="ts2-layer-toggle" aria-hidden="true">▾</span>',
      '<button class="ts2-layer-del" data-id="' + l.id + '" aria-label="刪除圖層 ' + idx + '">×</button>',
      '</div>'
    ].join('');
  }

  function buildLayerCtrls(l, idx) {
    return [
      '<div class="ts2-layer-ctrls" id="ts2-ctrl-' + l.id + '" hidden>',
      '<div class="ts2-ctrl-row"><label for="ts2-x-' + l.id + '">X 位移</label>',
      '<input type="range" id="ts2-x-' + l.id + '" min="-50" max="50" value="' + l.x + '" data-id="' + l.id + '" data-key="x"',
      ' aria-label="圖層 ' + idx + ' X 位移" aria-valuemin="-50" aria-valuemax="50" aria-valuenow="' + l.x + '">',
      '<span class="ts2-val" id="ts2-x-val-' + l.id + '">' + l.x + 'px</span></div>',

      '<div class="ts2-ctrl-row"><label for="ts2-y-' + l.id + '">Y 位移</label>',
      '<input type="range" id="ts2-y-' + l.id + '" min="-50" max="50" value="' + l.y + '" data-id="' + l.id + '" data-key="y"',
      ' aria-label="圖層 ' + idx + ' Y 位移" aria-valuemin="-50" aria-valuemax="50" aria-valuenow="' + l.y + '">',
      '<span class="ts2-val" id="ts2-y-val-' + l.id + '">' + l.y + 'px</span></div>',

      '<div class="ts2-ctrl-row"><label for="ts2-blur-' + l.id + '">模糊</label>',
      '<input type="range" id="ts2-blur-' + l.id + '" min="0" max="100" value="' + l.blur + '" data-id="' + l.id + '" data-key="blur"',
      ' aria-label="圖層 ' + idx + ' 模糊半徑" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + l.blur + '">',
      '<span class="ts2-val" id="ts2-blur-val-' + l.id + '">' + l.blur + 'px</span></div>',

      '<div class="ts2-ctrl-row"><label for="ts2-alpha-' + l.id + '">不透明</label>',
      '<input type="range" id="ts2-alpha-' + l.id + '" min="0" max="100" value="' + l.alpha + '" data-id="' + l.id + '" data-key="alpha"',
      ' aria-label="圖層 ' + idx + ' 不透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + l.alpha + '">',
      '<span class="ts2-val" id="ts2-alpha-val-' + l.id + '">' + l.alpha + '%</span></div>',
      '</div>'
    ].join('');
  }

  function renderLayers() {
    var html = '';
    layers.forEach(function(l, i) {
      var idx = i + 1;
      html += '<div class="ts2-layer" data-id="' + l.id + '" role="listitem" aria-label="陰影圖層 ' + idx + '">' +
        buildLayerHead(l, idx) +
        buildLayerCtrls(l, idx) +
        '</div>';
    });
    $id('ts2-layers').innerHTML = html;
    bindLayerEvents();
  }

  function bindLayerEvents() {
    var layersEl = $id('ts2-layers');

    // colour input
    layersEl.querySelectorAll('input[type=color]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        var id = parseInt(inp.dataset.id);
        var l = layers.find(function(x) { return x.id === id; });
        if (!l) return;
        l.color = inp.value;
        var rgb = hexToRgb(l.color);
        var previewBg = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (l.alpha / 100).toFixed(2) + ')';
        inp.previousElementSibling.style.background = previewBg;
        updateInfo(l);
        apply();
      });
    });

    // range sliders
    layersEl.querySelectorAll('input[type=range]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        var id = parseInt(inp.dataset.id);
        var key = inp.dataset.key;
        var l = layers.find(function(x) { return x.id === id; });
        if (!l) return;
        var val = parseInt(inp.value);
        l[key] = val;
        inp.setAttribute('aria-valuenow', val);
        var suffix = key === 'alpha' ? '%' : 'px';
        var valEl = $id('ts2-' + key + '-val-' + id);
        if (valEl) valEl.textContent = val + suffix;

        // also update colour preview when alpha changes
        if (key === 'alpha') {
          var rgb = hexToRgb(l.color);
          var previewBg = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + (val / 100).toFixed(2) + ')';
          var head = layersEl.querySelector('.ts2-layer[data-id="' + id + '"] .ts2-layer-color-preview');
          if (head) head.style.background = previewBg;
        }
        updateInfo(l);
        apply();
      });
    });

    // delete buttons
    layersEl.querySelectorAll('.ts2-layer-del').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (layers.length === 1) { announce('至少保留一個圖層'); return; }
        var id = parseInt(btn.dataset.id);
        layers = layers.filter(function(l) { return l.id !== id; });
        renderLayers();
        apply();
        announce('已刪除圖層');
      });
    });

    // toggle expand (click on head, or keyboard on head element)
    layersEl.querySelectorAll('.ts2-layer-head').forEach(function(head) {
      function toggleExpand() {
        var layerEl = head.closest('.ts2-layer');
        var ctrls = layerEl.querySelector('.ts2-layer-ctrls');
        var expanded = !ctrls.hidden;
        ctrls.hidden = expanded;
        head.setAttribute('aria-expanded', String(!expanded));
        layerEl.classList.toggle('expanded', !expanded);
      }

      head.addEventListener('click', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.classList.contains('ts2-layer-del')) return;
        toggleExpand();
      });

      head.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (e.target.tagName !== 'INPUT') toggleExpand();
        }
      });
    });
  }

  function updateInfo(l) {
    var el = $id('ts2-info-' + l.id);
    if (el) el.textContent = 'x:' + l.x + ' y:' + l.y + ' b:' + l.blur + ' a:' + l.alpha + '%';
  }

  function init() {
    $id('ts2-add').addEventListener('click', function() {
      layers.push({ id: nextId++, color: '#000000', x: 0, y: 2, blur: 4, alpha: 50 });
      renderLayers();
      apply();
      announce('已新增圖層');
    });

    $id('ts2-app').querySelectorAll('.ts2-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var p = PRESETS[btn.dataset.style] || PRESETS.subtle;
        layers = p.map(function(s) {
          return { id: nextId++, color: s.color, x: s.x, y: s.y, blur: s.blur, alpha: s.alpha };
        });
        renderLayers();
        apply();
        announce('已套用預設：' + btn.textContent);
      });
    });

    $id('ts2-copy-btn').addEventListener('click', function() {
      var cssText = 'text-shadow: ' + fullCSS() + ';';
      navigator.clipboard.writeText(cssText).then(function() {
        var btn = $id('ts2-copy-btn');
        btn.classList.add('copied');
        btn.textContent = '已複製!';
        announce('CSS 已複製到剪貼簿');
        setTimeout(function() {
          btn.classList.remove('copied');
          btn.textContent = '複製';
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
