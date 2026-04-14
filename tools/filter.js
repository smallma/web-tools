(function() {
  var CSS = [
    '#fl-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#fl-app *,*::before,*::after{box-sizing:border-box}',
    '#fl-hdr{text-align:center}',
    '#fl-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#fl-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#fl-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#fl-main{grid-template-columns:1fr}}',
    '.fl-col{display:flex;flex-direction:column;gap:12px}',
    '.fl-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.fl-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.fl-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.fl-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:68px;flex-shrink:0}',
    '.fl-ctrl input[type=range]{flex:1;-webkit-appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.fl-ctrl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.fl-ctrl .fl-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:52px;text-align:right;flex-shrink:0}',
    '.fl-toggle{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.8rem;color:var(--c-text-sec);padding:6px 0}',
    '.fl-toggle input{width:16px;height:16px;cursor:pointer;accent-color:var(--c-accent)}',
    '.fl-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:32px;display:flex;align-items:center;justify-content:center;min-height:200px}',
    '#fl-preview-img{max-width:200px;max-height:150px;border-radius:8px;transition:filter 0.08s;display:block}',
    '.fl-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}',
    '.fl-preset{padding:6px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.fl-preset:hover{border-color:var(--c-accent);color:var(--c-accent)}',
    '.fl-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.fl-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.fl-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto}',
    '.fl-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.fl-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.fl-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.fl-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="fl-app">',
    '<div id="fl-hdr"><h1>CSS Filter Generator</h1><p>Blur · Brightness · Grayscale · and more</p></div>',
    '<div id="fl-main">',
    '<div class="fl-col">',
    '<div class="fl-section-label">Adjustments</div>',
    '<div class="fl-ctrl">',
    '<div class="fl-ctrl-row"><label>Blur</label><input type=range id=fl-blur min=0 max=20 step=0.5 value=0><span class=fl-val id=fl-blur-v>0px</span></div>',
    '<div class="fl-ctrl-row"><label>Bright</label><input type=range id=fl-bright min=0 max=300 value=100><span class=fl-val id=fl-bright-v>100%</span></div>',
    '<div class="fl-ctrl-row"><label>Contrast</label><input type=range id=fl-contrast min=0 max=300 value=100><span class=fl-val id=fl-contrast-v>100%</span></div>',
    '<div class="fl-ctrl-row"><label>Grayscale</label><input type=range id=fl-gray min=0 max=100 value=0><span class=fl-val id=fl-gray-v>0%</span></div>',
    '<div class="fl-ctrl-row"><label>Sepia</label><input type=range id=fl-sepia min=0 max=100 value=0><span class=fl-val id=fl-sepia-v>0%</span></div>',
    '<div class="fl-ctrl-row"><label>Hue Rotate</label><input type=range id=fl-hue min=0 max=360 value=0><span class=fl-val id=fl-hue-v>0deg</span></div>',
    '<div class="fl-ctrl-row"><label>Saturate</label><input type=range id=fl-sat min=0 max=300 value=100><span class=fl-val id=fl-sat-v>100%</span></div>',
    '<div class="fl-ctrl-row"><label>Opacity</label><input type=range id=fl-opacity min=0 max=100 value=100><span class=fl-val id=fl-opacity-v>100%</span></div>',
    '<div class="fl-ctrl-row"><label>Invert</label><input type=range id=fl-invert min=0 max=100 value=0><span class=fl-val id=fl-invert-v>0%</span></div>',
    '</div>',
    '<div class="fl-section-label" style="margin-top:4px">Presets</div>',
    '<div class="fl-presets">',
    '<button class="fl-preset" data-f="none">Normal</button>',
    '<button class="fl-preset" data-f="blur:2">Blur</button>',
    '<button class="fl-preset" data-f="gray:100">Grayscale</button>',
    '<button class="fl-preset" data-f="sepia:100">Sepia</button>',
    '<button class="fl-preset" data-f="bright:150 contrast:120">Vivid</button>',
    '<button class="fl-preset" data-f="hue:180 saturate:200">Neon</button>',
    '<button class="fl-preset" data-f="bright:80 contrast:140 saturate:120">Dramatic</button>',
    '<button class="fl-preset" data-f="invert:100">Invert</button>',
    '</div>',
    '</div>',
    '<div class="fl-col">',
    '<div class="fl-section-label">預覽（使用內建圖片）</div>',
    '<div class="fl-preview-area">',
    '<img id="fl-preview-img" src="https://picsum.photos/seed/webtools/400/300" alt="preview" crossorigin="anonymous" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%238b5cf6%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2240%22%3EWeb Tools%3C/text%3E%3C/svg%3E\'">',
    '</div>',
    '<div class="fl-section-label">CSS 輸出</div>',
    '<div class="fl-css-output">',
    '<div class="fl-css-code" id="fl-css-code"></div>',
    '<div class="fl-copy-row"><button class="fl-copy" id="fl-copy-btn">複製</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('filter-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };

  function apply() {
    var blur = $id('fl-blur').value;
    var bright = $id('fl-bright').value;
    var contrast = $id('fl-contrast').value;
    var gray = $id('fl-gray').value;
    var sepia = $id('fl-sepia').value;
    var hue = $id('fl-hue').value;
    var sat = $id('fl-sat').value;
    var opacity = $id('fl-opacity').value;
    var invert = $id('fl-invert').value;

    var filter = 'blur(' + blur + 'px) brightness(' + bright + '%) contrast(' + contrast + '%) grayscale(' + gray + '%) sepia(' + sepia + '%) hue-rotate(' + hue + 'deg) saturate(' + sat + '%) opacity(' + opacity + '%) invert(' + invert + '%)';
    $id('fl-preview-img').style.filter = filter;
    $id('fl-blur-v').textContent = blur + 'px';
    $id('fl-bright-v').textContent = bright + '%';
    $id('fl-contrast-v').textContent = contrast + '%';
    $id('fl-gray-v').textContent = gray + '%';
    $id('fl-sepia-v').textContent = sepia + '%';
    $id('fl-hue-v').textContent = hue + 'deg';
    $id('fl-sat-v').textContent = sat + '%';
    $id('fl-opacity-v').textContent = opacity + '%';
    $id('fl-invert-v').textContent = invert + '%';
    $id('fl-css-code').textContent = 'filter:\n  ' + filter + ';';
  }

  function init() {
    var sliders = ['blur','bright','contrast','gray','sepia','hue','sat','opacity','invert'];
    sliders.forEach(function(key) {
      $id('fl-' + key).addEventListener('input', apply);
    });

    document.querySelectorAll('.fl-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var f = btn.dataset.f;
        if (f === 'none') {
          sliders.forEach(function(key) { $id('fl-' + key).value = key === 'blur' || key === 'gray' || key === 'sepia' || key === 'hue' || key === 'invert' ? 0 : 100; });
        } else {
          f.split(' ').forEach(function(part) {
            var kv = part.split(':');
            var k = kv[0], v = kv[1];
            if (k === 'blur') $id('fl-blur').value = parseFloat(v);
            else if (k === 'bright') $id('fl-bright').value = parseFloat(v);
            else if (k === 'contrast') $id('fl-contrast').value = parseFloat(v);
            else if (k === 'gray') $id('fl-gray').value = parseFloat(v);
            else if (k === 'sepia') $id('fl-sepia').value = parseFloat(v);
            else if (k === 'hue') $id('fl-hue').value = parseFloat(v);
            else if (k === 'saturate') $id('fl-sat').value = parseFloat(v);
            else if (k === 'invert') $id('fl-invert').value = parseFloat(v);
          });
        }
        apply();
      });
    });

    $id('fl-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText('filter: ' + $id('fl-css-code').textContent.replace('filter:\n  ', '') + ';').then(function() {
        $id('fl-copy-btn').classList.add('copied');
        $id('fl-copy-btn').textContent = '已複製!';
        setTimeout(function() { $id('fl-copy-btn').classList.remove('copied'); $id('fl-copy-btn').textContent = '複製'; }, 1500);
      });
    });

    apply();
  }

  function tryInit() {
    var panel = $id('panel-filter');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
