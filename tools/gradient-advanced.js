(function() {
  var CSS = [
    '#ga-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-mono:"JetBrains Mono","Fira Code",monospace;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#ga-app *,*::before,*::after{box-sizing:border-box}',
    '#ga-hdr{text-align:center}',
    '#ga-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#ga-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    /* mode tabs — tablist */
    '#ga-mode-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:4px;width:fit-content}',
    '.ga-mode-tab{padding:7px 16px;border:none;border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.18s}',
    '.ga-mode-tab[aria-selected="true"]{background:var(--c-accent);color:#fff}',
    /* layout */
    '#ga-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#ga-main{grid-template-columns:1fr}}',
    '.ga-col{display:flex;flex-direction:column;gap:12px}',
    '.ga-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.ga-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.ga-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.ga-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:52px;flex-shrink:0}',
    '.ga-ctrl input[type=range]{flex:1;-webkit-appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.ga-ctrl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.ga-ctrl .ga-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:52px;text-align:right;flex-shrink:0}',
    '.ga-ctrl select{flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:6px;color:var(--c-text);font-family:var(--c-mono);font-size:0.8rem;padding:4px 6px;outline:none;cursor:pointer}',
    /* stops list */
    '.ga-stops-scroll-hint{font-size:0.68rem;color:var(--c-text-sec);text-align:right;opacity:0;transition:opacity 0.2s;height:0;overflow:hidden}',
    '.ga-stops-scroll-hint.show{opacity:1;height:auto}',
    '.ga-stops{display:flex;flex-direction:column;gap:6px;max-height:260px;overflow-y:auto;scroll-behavior:smooth}',
    '.ga-stop{display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:8px;padding:6px 10px}',
    '.ga-stop input[type=color]{width:28px;height:28px;border:1px solid var(--c-border);border-radius:5px;cursor:pointer;background:transparent;padding:1px}',
    '.ga-stop input[type=range]{flex:1;-webkit-appearance:none;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);outline:none;cursor:pointer}',
    '.ga-stop input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:#fff;border:1px solid rgba(0,0,0,0.3);cursor:grab}',
    '.ga-stop .ga-stop-pct{font-family:var(--c-mono);font-size:0.7rem;color:var(--c-text-sec);width:36px;text-align:right}',
    '.ga-stop-del{background:transparent;border:none;color:#666;cursor:pointer;font-size:1rem;line-height:1;padding:2px 4px;border-radius:4px;transition:color 0.15s}',
    '.ga-stop-del:hover{color:#ef4444}',
    '.ga-add-stop{width:100%;padding:7px;border:1px dashed rgba(139,92,246,0.4);border-radius:8px;background:transparent;color:var(--c-accent);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.ga-add-stop:hover{background:rgba(139,92,246,0.1)}',
    /* presets */
    '.ga-presets{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}',
    '.ga-preset{height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;transition:all 0.15s;font-size:0;overflow:hidden}',
    '.ga-preset:hover{border-color:var(--c-accent)}',
    '.ga-preset:focus-visible{outline:2px solid var(--c-accent);outline-offset:2px}',
    /* preview */
    '.ga-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:32px;display:flex;align-items:center;justify-content:center;min-height:200px;transition:all 0.15s}',
    '#ga-preview-elem{width:180px;height:120px;border-radius:10px;transition:all 0.15s}',
    /* css output */
    '.ga-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.ga-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.ga-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto}',
    '.ga-copy-row{display:flex;align-items:center;justify-content:flex-end;gap:10px;padding-top:4px}',
    '.ga-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.ga-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.ga-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="ga-app">',
    '<div id="ga-hdr"><h1>Gradient Generator</h1><p>Linear · Radial · Conic · Repeating</p></div>',
    /* mode tabs */
    '<div id="ga-mode-tabs" role="tablist" aria-label="漸層模式">',
    '<button class="ga-mode-tab" role="tab" aria-selected="true"  data-mode="linear">Linear</button>',
    '<button class="ga-mode-tab" role="tab" aria-selected="false" data-mode="radial">Radial</button>',
    '<button class="ga-mode-tab" role="tab" aria-selected="false" data-mode="conic">Conic</button>',
    '<button class="ga-mode-tab" role="tab" aria-selected="false" data-mode="repeating-linear">Repeating</button>',
    '</div>',
    '<div id="ga-main">',
    '<div class="ga-col">',
    /* linear / repeating angle ctrl */
    '<div id="ga-linear-ctrl">',
    '<div class="ga-section-label">Angle</div>',
    '<div class="ga-ctrl">',
    '<div class="ga-ctrl-row">',
    '<label for="ga-angle">Angle</label>',
    '<input type="range" id="ga-angle" min="0" max="360" value="135" aria-label="漸層角度" aria-valuemin="0" aria-valuemax="360" aria-valuenow="135">',
    '<span class="ga-val" id="ga-angle-v" aria-live="polite">135deg</span>',
    '</div>',
    '</div>',
    '</div>',
    /* radial ctrl */
    '<div id="ga-radial-ctrl" style="display:none">',
    '<div class="ga-section-label">Shape</div>',
    '<div class="ga-ctrl">',
    '<div class="ga-ctrl-row">',
    '<label for="ga-radial-type">Type</label>',
    '<select id="ga-radial-type" aria-label="徑向漸層形狀"><option>ellipse</option><option>circle</option></select>',
    '</div>',
    '<div class="ga-ctrl-row">',
    '<label for="ga-radial-pos">Position</label>',
    '<select id="ga-radial-pos" aria-label="徑向漸層位置"><option>center</option><option>top</option><option>bottom</option><option>left</option><option>right</option><option>top left</option><option>top right</option><option>bottom left</option><option>bottom right</option></select>',
    '</div>',
    '</div>',
    '</div>',
    /* conic ctrl */
    '<div id="ga-conic-ctrl" style="display:none">',
    '<div class="ga-section-label">Angle</div>',
    '<div class="ga-ctrl">',
    '<div class="ga-ctrl-row">',
    '<label for="ga-conic-angle">From</label>',
    '<input type="range" id="ga-conic-angle" min="0" max="360" value="0" aria-label="角度漸層起始角度" aria-valuemin="0" aria-valuemax="360" aria-valuenow="0">',
    '<span class="ga-val" id="ga-conic-angle-v" aria-live="polite">0deg</span>',
    '</div>',
    '<div class="ga-ctrl-row">',
    '<label for="ga-conic-pos">Position</label>',
    '<select id="ga-conic-pos" aria-label="角度漸層中心位置"><option>center</option><option>top</option><option>bottom</option></select>',
    '</div>',
    '</div>',
    '</div>',
    /* stops */
    '<div class="ga-section-label">Color Stops</div>',
    '<div class="ga-stops-scroll-hint" id="ga-stops-hint" aria-hidden="true">↕ 可捲動</div>',
    '<div class="ga-stops" id="ga-stops" role="group" aria-label="色標清單"></div>',
    '<button class="ga-add-stop" id="ga-add-stop">+ 新增色標</button>',
    /* presets */
    '<div class="ga-section-label" style="margin-top:8px">預設漸層</div>',
    '<div class="ga-presets" role="group" aria-label="預設漸層">',
    '<button class="ga-preset" aria-label="預設：紫藍" data-g="linear:135:#667eea 0%,#764ba2 100%" style="background:linear-gradient(135deg,#667eea,#764ba2)"></button>',
    '<button class="ga-preset" aria-label="預設：天藍" data-g="linear:90:#4facfe 0%,#00f2fe 100%" style="background:linear-gradient(90deg,#4facfe,#00f2fe)"></button>',
    '<button class="ga-preset" aria-label="預設：粉紅" data-g="linear:45:#f093fb 0%,#f5576c 100%" style="background:linear-gradient(45deg,#f093fb,#f5576c)"></button>',
    '<button class="ga-preset" aria-label="預設：薄荷" data-g="linear:180:#a8edea 0%,#fed6e3 100%" style="background:linear-gradient(180deg,#a8edea,#fed6e3)"></button>',
    '<button class="ga-preset" aria-label="預設：日落 (Radial)" data-g="radial:#f58529 0%,#dd2c7a 100%" style="background:radial-gradient(#f58529,#dd2c7a)"></button>',
    '<button class="ga-preset" aria-label="預設：彩虹 (Conic)" data-g="conic:#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000" style="background:conic-gradient(#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)"></button>',
    '<button class="ga-preset" aria-label="預設：三色極光" data-g="linear:90:#06b6d4 0%,#8b5cf6 50%,#ec4899 100%" style="background:linear-gradient(90deg,#06b6d4,#8b5cf6,#ec4899)"></button>',
    '<button class="ga-preset" aria-label="預設：綠色" data-g="linear:135:#11998e 0%,#38ef7d 100%" style="background:linear-gradient(135deg,#11998e,#38ef7d)"></button>',
    '<button class="ga-preset" aria-label="預設：橙紅" data-g="linear:135:#ee0979 0%,#ff6a00 100%" style="background:linear-gradient(135deg,#ee0979,#ff6a00)"></button>',
    '<button class="ga-preset" aria-label="預設：條紋 (Repeating)" data-g="repeating:45:#fff 0px,#fff 10px,#f0f 10px,#f0f 20px" style="background:repeating-linear-gradient(45deg,#fff,#fff 10px,#f0f 10px,#f0f 20px)"></button>',
    '</div>',
    '</div>',
    /* right col */
    '<div class="ga-col">',
    '<div class="ga-section-label">預覽</div>',
    '<div class="ga-preview-area" role="img" aria-label="漸層預覽"><div id="ga-preview-elem"></div></div>',
    '<div class="ga-section-label">CSS 輸出</div>',
    '<div class="ga-css-output">',
    '<div class="ga-css-code" id="ga-css-code"></div>',
    '<div class="ga-copy-row">',
    '<span id="ga-copy-status" role="status" aria-live="polite" style="font-size:0.75rem;color:var(--c-success);opacity:0;transition:opacity 0.3s"></span>',
    '<button class="ga-copy" id="ga-copy-btn">複製</button>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('gradient-advanced-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };

  /* ── 狀態 ── */
  var mode = 'linear';
  var _uid = 0;
  function nextId() { return ++_uid; }

  var stops = [
    { id: nextId(), color: '#667eea', pct: 0 },
    { id: nextId(), color: '#764ba2', pct: 100 }
  ];

  /* ── CSS 產生 ── */
  function buildGradient() {
    var stopStr = stops.map(function(s) { return s.color + ' ' + s.pct + '%'; }).join(', ');
    if (mode === 'linear') {
      return 'linear-gradient(' + $id('ga-angle').value + 'deg, ' + stopStr + ')';
    } else if (mode === 'radial') {
      var shape = $id('ga-radial-type').value;
      var pos   = $id('ga-radial-pos').value;
      return 'radial-gradient(' + shape + ' at ' + pos + ', ' + stopStr + ')';
    } else if (mode === 'conic') {
      var from = $id('ga-conic-angle').value;
      var pos  = $id('ga-conic-pos').value;
      return 'conic-gradient(from ' + from + 'deg at ' + pos + ', ' + stopStr + ')';
    } else {
      return 'repeating-linear-gradient(' + $id('ga-angle').value + 'deg, ' + stopStr + ')';
    }
  }

  function apply() {
    var g = buildGradient();
    $id('ga-preview-elem').style.background = g;
    $id('ga-css-code').textContent = 'background: ' + g + ';';
  }

  /* ── 溢出提示 ── */
  function updateScrollHint() {
    var el = $id('ga-stops');
    var hint = $id('ga-stops-hint');
    if (!el || !hint) return;
    var overflow = el.scrollHeight > el.clientHeight + 4;
    hint.classList.toggle('show', overflow);
    hint.setAttribute('aria-hidden', String(!overflow));
  }

  /* ── 色標渲染 ── */
  function renderStops() {
    var container = $id('ga-stops');
    container.innerHTML = '';
    stops.forEach(function(s, i) {
      var num = i + 1;
      var div = document.createElement('div');
      div.className = 'ga-stop';
      div.setAttribute('aria-label', '色標 ' + num + ': ' + s.color + ' ' + s.pct + '%');

      /* 色彩選擇器 */
      var colorInp = document.createElement('input');
      colorInp.type = 'color';
      colorInp.value = s.color;
      colorInp.setAttribute('aria-label', '色標 ' + num + ' 顏色');
      colorInp.addEventListener('input', (function(sid) {
        return function() {
          var target = stops.find(function(x) { return x.id === sid; });
          if (target) {
            target.color = colorInp.value;
            /* 更新 aria-label */
            div.setAttribute('aria-label', '色標 ' + num + ': ' + target.color + ' ' + target.pct + '%');
            apply();
          }
        };
      })(s.id));

      /* 位置滑桿 */
      var rangeInp = document.createElement('input');
      rangeInp.type = 'range';
      rangeInp.min = '0';
      rangeInp.max = '100';
      rangeInp.value = String(s.pct);
      rangeInp.setAttribute('aria-label', '色標 ' + num + ' 位置');
      rangeInp.setAttribute('aria-valuemin', '0');
      rangeInp.setAttribute('aria-valuemax', '100');
      rangeInp.setAttribute('aria-valuenow', String(s.pct));

      /* 百分比文字 */
      var pctSpan = document.createElement('span');
      pctSpan.className = 'ga-stop-pct';
      pctSpan.textContent = s.pct + '%';

      rangeInp.addEventListener('input', (function(sid) {
        return function() {
          var target = stops.find(function(x) { return x.id === sid; });
          if (target) {
            target.pct = parseInt(rangeInp.value);
            rangeInp.setAttribute('aria-valuenow', rangeInp.value);
            pctSpan.textContent = rangeInp.value + '%';
            div.setAttribute('aria-label', '色標 ' + num + ': ' + target.color + ' ' + target.pct + '%');
            apply();
          }
        };
      })(s.id));

      div.appendChild(colorInp);
      div.appendChild(rangeInp);
      div.appendChild(pctSpan);

      /* 刪除鈕（至少保留 2 個） */
      if (stops.length > 2) {
        var delBtn = document.createElement('button');
        delBtn.className = 'ga-stop-del';
        delBtn.setAttribute('aria-label', '刪除色標 ' + num);
        delBtn.textContent = '×';
        delBtn.addEventListener('click', (function(sid) {
          return function() {
            stops = stops.filter(function(x) { return x.id !== sid; });
            renderStops();
            apply();
          };
        })(s.id));
        div.appendChild(delBtn);
      }

      container.appendChild(div);
    });

    updateScrollHint();
  }

  /* ── 模式切換 ── */
  function setMode(newMode) {
    mode = newMode;
    document.querySelectorAll('#ga-app .ga-mode-tab').forEach(function(b) {
      var active = b.dataset.mode === newMode;
      b.setAttribute('aria-selected', String(active));
    });
    $id('ga-linear-ctrl').style.display = (mode === 'linear' || mode === 'repeating-linear') ? '' : 'none';
    $id('ga-radial-ctrl').style.display  = mode === 'radial'  ? '' : 'none';
    $id('ga-conic-ctrl').style.display   = mode === 'conic'   ? '' : 'none';
  }

  /* ── 預設漸層解析 ── */
  function applyPreset(g) {
    var parts = g.split(':');
    var type  = parts[0];
    var args  = parts[1];

    if (type === 'linear') {
      var tokens = args.split(',');
      var angle = parseInt(tokens[0]);
      var newStops = tokens.slice(1).map(function(s) {
        var t = s.trim().split(' ');
        return { id: nextId(), color: t[0], pct: parseInt(t[1]) || 0 };
      });
      stops = newStops;
      $id('ga-angle').value = angle;
      $id('ga-angle-v').textContent = angle + 'deg';
      $id('ga-angle').setAttribute('aria-valuenow', String(angle));
      setMode('linear');

    } else if (type === 'radial') {
      stops = args.split(',').map(function(s) {
        var t = s.trim().split(' ');
        return { id: nextId(), color: t[0], pct: parseInt(t[1]) || 0 };
      });
      setMode('radial');

    } else if (type === 'conic') {
      var colors = args.split(',');
      stops = colors.map(function(s, i) {
        return { id: nextId(), color: s.trim(), pct: Math.round(i * 100 / (colors.length - 1)) };
      });
      setMode('conic');

    } else if (type === 'repeating') {
      var tokens = args.split(',');
      var angle = parseInt(tokens[0]);
      var newStops = tokens.slice(1).map(function(s) {
        var t = s.trim().split(' ');
        return { id: nextId(), color: t[0], pct: parseInt(t[1]) || 0 };
      });
      stops = newStops;
      $id('ga-angle').value = angle;
      $id('ga-angle-v').textContent = angle + 'deg';
      $id('ga-angle').setAttribute('aria-valuenow', String(angle));
      setMode('repeating-linear');
    }

    renderStops();
    apply();
  }

  /* ── 初始化事件 ── */
  function init() {
    /* 模式 tabs */
    document.querySelectorAll('#ga-app .ga-mode-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setMode(btn.dataset.mode);
        apply();
      });
    });

    /* 角度滑桿（linear / repeating） */
    $id('ga-angle').addEventListener('input', function() {
      $id('ga-angle-v').textContent = this.value + 'deg';
      this.setAttribute('aria-valuenow', this.value);
      apply();
    });

    /* conic 角度 */
    $id('ga-conic-angle').addEventListener('input', function() {
      $id('ga-conic-angle-v').textContent = this.value + 'deg';
      this.setAttribute('aria-valuenow', this.value);
      apply();
    });

    /* radial / conic select */
    $id('ga-radial-type').addEventListener('change', apply);
    $id('ga-radial-pos').addEventListener('change', apply);
    $id('ga-conic-pos').addEventListener('change', apply);

    /* 新增色標 */
    $id('ga-add-stop').addEventListener('click', function() {
      var lastStop = stops[stops.length - 1];
      stops.push({ id: nextId(), color: lastStop.color, pct: 100 });
      renderStops();
      apply();
      /* 捲到底 */
      var el = $id('ga-stops');
      el.scrollTop = el.scrollHeight;
    });

    /* 預設 */
    document.querySelectorAll('#ga-app .ga-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        applyPreset(btn.dataset.g);
      });
    });

    /* 複製 */
    $id('ga-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText('background: ' + buildGradient() + ';').then(function() {
        var btn    = $id('ga-copy-btn');
        var status = $id('ga-copy-status');
        btn.classList.add('copied');
        btn.textContent = '已複製!';
        status.textContent = '已複製到剪貼簿';
        status.style.opacity = '1';
        setTimeout(function() {
          btn.classList.remove('copied');
          btn.textContent = '複製';
          status.style.opacity = '0';
          setTimeout(function() { status.textContent = ''; }, 300);
        }, 1500);
      });
    });

    renderStops();
    apply();
  }

  /* ── 延遲初始化（等 panel 顯示後再掛事件） ── */
  var inited = false;
  function tryInit() {
    if (inited) return;
    var panel = $id('panel-gradient-advanced');
    if (!panel || panel.classList.contains('hidden')) return;
    inited = true;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
