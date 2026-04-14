(function() {
  var CSS = [
    '#ga-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#ga-app *,*::before,*::after{box-sizing:border-box}',
    '#ga-hdr{text-align:center}',
    '#ga-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#ga-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#ga-mode-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:4px;width:fit-content}',
    '.ga-mode-tab{padding:7px 16px;border:none;border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.18s}',
    '.ga-mode-tab.active{background:var(--c-accent);color:#fff}',
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
    '.ga-stops{display:flex;flex-direction:column;gap:6px;max-height:260px;overflow-y:auto}',
    '.ga-stop{display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:8px;padding:6px 10px}',
    '.ga-stop input[type=color]{width:28px;height:28px;border:1px solid var(--c-border);border-radius:5px;cursor:pointer;background:transparent;padding:1px}',
    '.ga-stop input[type=range]{flex:1;-webkit-appearance:none;height:4px;border-radius:2px;background:rgba(255,255,255,0.1);outline:none;cursor:pointer}',
    '.ga-stop input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:#fff;border:1px solid rgba(0,0,0,0.3);cursor:grab}',
    '.ga-stop .ga-stop-pct{font-family:var(--c-mono);font-size:0.7rem;color:var(--c-text-sec);width:36px;text-align:right}',
    '.ga-stop-del{background:transparent;border:none;color:#666;cursor:pointer;font-size:1rem}',
    '.ga-stop-del:hover{color:#ef4444}',
    '.ga-add-stop{width:100%;padding:7px;border:1px dashed rgba(139,92,246,0.4);border-radius:8px;background:transparent;color:var(--c-accent);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.ga-add-stop:hover{background:rgba(139,92,246,0.1)}',
    '.ga-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:32px;display:flex;align-items:center;justify-content:center;min-height:200px;transition:all 0.15s}',
    '#ga-preview-elem{width:180px;height:120px;border-radius:10px;transition:all 0.15s}',
    '.ga-presets{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}',
    '.ga-preset{height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;transition:all 0.15s;font-size:0}',
    '.ga-preset:hover{border-color:var(--c-accent)}',
    '.ga-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.ga-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.ga-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto}',
    '.ga-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.ga-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.ga-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.ga-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="ga-app">',
    '<div id="ga-hdr"><h1>Gradient Generator</h1><p>Linear · Radial · Conic · Repeating</p></div>',
    '<div id="ga-mode-tabs">',
    '<button class="ga-mode-tab active" data-mode="linear">Linear</button>',
    '<button class="ga-mode-tab" data-mode="radial">Radial</button>',
    '<button class="ga-mode-tab" data-mode="conic">Conic</button>',
    '<button class="ga-mode-tab" data-mode="repeating-linear">Repeating</button>',
    '</div>',
    '<div id="ga-main">',
    '<div class="ga-col">',
    '<div id="ga-linear-ctrl">',
    '<div class="ga-section-label">Angle</div>',
    '<div class="ga-ctrl">',
    '<div class="ga-ctrl-row"><label>Angle</label><input type=range id=ga-angle min=0 max=360 value=135><span class=ga-val id=ga-angle-v>135deg</span></div>',
    '</div>',
    '</div>',
    '<div id="ga-radial-ctrl" style="display:none">',
    '<div class="ga-section-label">Shape</div>',
    '<div class="ga-ctrl">',
    '<div class="ga-ctrl-row"><label>Type</label><select id=ga-radial-type><option>ellipse</option><option>circle</option></select></div>',
    '<div class="ga-ctrl-row"><label>Position</label><select id=ga-radial-pos><option>at center</option><option>at top</option><option>at bottom</option><option>at left</option><option>at right</option><option>at top left</option><option>at top right</option><option>at bottom left</option><option>at bottom right</option></select></div>',
    '</div>',
    '</div>',
    '<div id="ga-conic-ctrl" style="display:none">',
    '<div class="ga-section-label">Angle</div>',
    '<div class="ga-ctrl">',
    '<div class="ga-ctrl-row"><label>From</label><input type=range id=ga-conic-angle min=0 max=360 value=0><span class=ga-val id=ga-conic-angle-v>0deg</span></div>',
    '<div class="ga-ctrl-row"><label>Position</label><select id=ga-conic-pos><option>at center</option><option>at top</option><option>at bottom</option></select></div>',
    '</div>',
    '</div>',
    '<div class="ga-section-label">Color Stops</div>',
    '<div class="ga-stops" id="ga-stops"></div>',
    '<button class="ga-add-stop" id="ga-add-stop">+ 新增色標</button>',
    '<div class="ga-section-label" style="margin-top:8px">預設漸層</div>',
    '<div class="ga-presets">',
    '<button class="ga-preset" data-g="linear:135:#667eea 0%,#764ba2 100%" style="background:linear-gradient(135deg,#667eea,#764ba2)"></button>',
    '<button class="ga-preset" data-g="linear:90:#4facfe 0%,#00f2fe 100%" style="background:linear-gradient(90deg,#4facfe,#00f2fe)"></button>',
    '<button class="ga-preset" data-g="linear:45:#f093fb 0%,#f5576c 100%" style="background:linear-gradient(45deg,#f093fb,#f5576c)"></button>',
    '<button class="ga-preset" data-g="linear:180:#a8edea 0%,#fed6e3 100%" style="background:linear-gradient(180deg,#a8edea,#fed6e3)"></button>',
    '<button class="ga-preset" data-g="radial:#f58529 0%,#dd2c7a 100%" style="background:radial-gradient(#f58529,#dd2c7a)"></button>',
    '<button class="ga-preset" data-g="conic:#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000" style="background:conic-gradient(#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)"></button>',
    '<button class="ga-preset" data-g="linear:90:#06b6d4 0%,#8b5cf6 50%,#ec4899 100%" style="background:linear-gradient(90deg,#06b6d4,#8b5cf6,#ec4899)"></button>',
    '<button class="ga-preset" data-g="linear:135:#11998e 0%,#38ef7d 100%" style="background:linear-gradient(135deg,#11998e,#38ef7d)"></button>',
    '<button class="ga-preset" data-g="linear:135:#ee0979 0%,#ff6a00 100%" style="background:linear-gradient(135deg,#ee0979,#ff6a00)"></button>',
    '<button class="ga-preset" data-g="repeating:45:#fff 0px,#fff 10px,#f0f 10px,#f0f 20px" style="background:repeating-linear-gradient(45deg,#fff,#fff 10px,#f0f 10px,#f0f 20px)"></button>',
    '</div>',
    '</div>',
    '<div class="ga-col">',
    '<div class="ga-section-label">預覽</div>',
    '<div class="ga-preview-area"><div id="ga-preview-elem"></div></div>',
    '<div class="ga-section-label">CSS 輸出</div>',
    '<div class="ga-css-output">',
    '<div class="ga-css-code" id="ga-css-code"></div>',
    '<div class="ga-copy-row"><button class="ga-copy" id="ga-copy-btn">複製</button></div>',
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
  var mode = 'linear';
  var stops = [
    { color: '#667eea', pct: 0 },
    { color: '#764ba2', pct: 100 }
  ];

  function buildGradient() {
    var stopStr = stops.map(function(s) { return s.color + ' ' + s.pct + '%'; }).join(', ');
    if (mode === 'linear') {
      return 'linear-gradient(' + $id('ga-angle').value + 'deg, ' + stopStr + ')';
    } else if (mode === 'radial') {
      var shape = $id('ga-radial-type').value;
      var pos = $id('ga-radial-pos').value;
      return 'radial-gradient(' + shape + ' at ' + pos + ', ' + stopStr + ')';
    } else if (mode === 'conic') {
      var from = $id('ga-conic-angle').value;
      var pos = $id('ga-conic-pos').value;
      return 'conic-gradient(from ' + from + 'deg at ' + pos + ', ' + stopStr + ')';
    } else {
      var angle = $id('ga-angle').value;
      return 'repeating-linear-gradient(' + angle + 'deg, ' + stopStr + ')';
    }
  }

  function apply() {
    var g = buildGradient();
    $id('ga-preview-elem').style.background = g;
    $id('ga-css-code').textContent = 'background: ' + g + ';';
  }

  function renderStops() {
    var html = '';
    stops.forEach(function(s, i) {
      html += '<div class="ga-stop" data-idx="' + i + '">' +
        '<input type="color" value="' + s.color + '" data-idx="' + i + '">' +
        '<input type="range" min="0" max="100" value="' + s.pct + '" data-idx="' + i + '">' +
        '<span class="ga-stop-pct">' + s.pct + '%</span>' +
        (stops.length > 2 ? '<button class="ga-stop-del" data-idx="' + i + '">×</button>' : '') +
        '</div>';
    });
    $id('ga-stops').innerHTML = html;

    $id('ga-stops').querySelectorAll('input[type=color]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        stops[parseInt(inp.dataset.idx)].color = inp.value;
        apply();
      });
    });
    $id('ga-stops').querySelectorAll('input[type=range]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        var i = parseInt(inp.dataset.idx);
        stops[i].pct = parseInt(inp.value);
        inp.previousElementSibling.textContent = inp.value + '%';
        apply();
      });
    });
    $id('ga-stops').querySelectorAll('.ga-stop-del').forEach(function(btn) {
      btn.addEventListener('click', function() {
        stops.splice(parseInt(btn.dataset.idx), 1);
        renderStops();
        apply();
      });
    });
  }

  function init() {
    document.querySelectorAll('.ga-mode-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.ga-mode-tab').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        mode = btn.dataset.mode;
        $id('ga-linear-ctrl').style.display = (mode === 'linear' || mode === 'repeating-linear') ? '' : 'none';
        $id('ga-radial-ctrl').style.display = mode === 'radial' ? '' : 'none';
        $id('ga-conic-ctrl').style.display = mode === 'conic' ? '' : 'none';
        apply();
      });
    });

    $id('ga-angle').addEventListener('input', function() {
      $id('ga-angle-v').textContent = this.value + 'deg';
      apply();
    });
    $id('ga-conic-angle').addEventListener('input', function() {
      $id('ga-conic-angle-v').textContent = this.value + 'deg';
      apply();
    });
    $id('ga-radial-type').addEventListener('change', apply);
    $id('ga-radial-pos').addEventListener('change', apply);
    $id('ga-conic-pos').addEventListener('change', apply);

    $id('ga-add-stop').addEventListener('click', function() {
      var lastColor = stops[stops.length - 1].color;
      stops.push({ color: lastColor, pct: 100 });
      renderStops();
      apply();
    });

    document.querySelectorAll('.ga-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var g = btn.dataset.g;
        var parts = g.split(':');
        var type = parts[0];
        var args = parts[1];
        if (type === 'linear') {
          var angle = parseInt(args.split(',')[0]);
          var newStops = args.split(',').slice(1).map(function(s, i) {
            var color = s.trim().split(' ')[0];
            var pct = s.trim().split(' ')[1] || (i === 0 ? '0%' : '100%');
            return { color: color, pct: parseInt(pct) };
          });
          mode = 'linear';
          stops = newStops;
          $id('ga-angle').value = angle;
          $id('ga-angle-v').textContent = angle + 'deg';
          document.querySelectorAll('.ga-mode-tab').forEach(function(b) { b.classList.remove('active'); });
          document.querySelector('[data-mode="linear"]').classList.add('active');
        } else if (type === 'radial') {
          var newStops = args.split(',').map(function(s, i) {
            return { color: s.trim().split(' ')[0], pct: parseInt(s.trim().split(' ')[1]) };
          });
          mode = 'radial';
          stops = newStops;
          document.querySelectorAll('.ga-mode-tab').forEach(function(b) { b.classList.remove('active'); });
          document.querySelector('[data-mode="radial"]').classList.add('active');
        } else if (type === 'conic') {
          stops = args.split(',').map(function(s, i) {
            return { color: s.trim(), pct: Math.round(i * 100 / (args.split(',').length - 1)) };
          });
          mode = 'conic';
          document.querySelectorAll('.ga-mode-tab').forEach(function(b) { b.classList.remove('active'); });
          document.querySelector('[data-mode="conic"]').classList.add('active');
        } else if (type === 'repeating') {
          var angle = parseInt(args.split(',')[0]);
          var newStops = args.split(',').slice(1).map(function(s, i) {
            return { color: s.trim().split(' ')[0], pct: parseInt(s.trim().split(' ')[1]) };
          });
          mode = 'repeating-linear';
          stops = newStops;
          $id('ga-angle').value = angle;
          $id('ga-angle-v').textContent = angle + 'deg';
          document.querySelectorAll('.ga-mode-tab').forEach(function(b) { b.classList.remove('active'); });
          document.querySelector('[data-mode="repeating-linear"]').classList.add('active');
        }
        renderStops();
        apply();
      });
    });

    $id('ga-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText('background: ' + buildGradient() + ';').then(function() {
        $id('ga-copy-btn').classList.add('copied');
        $id('ga-copy-btn').textContent = '已複製!';
        setTimeout(function() { $id('ga-copy-btn').classList.remove('copied'); $id('ga-copy-btn').textContent = '複製'; }, 1500);
      });
    });

    renderStops();
    apply();
  }

  function tryInit() {
    var panel = $id('panel-gradient-advanced');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
