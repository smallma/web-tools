(function() {
  var CSS = [
    '#br-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#br-app *,*::before,*::after{box-sizing:border-box}',
    '#br-hdr{text-align:center}',
    '#br-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#br-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#br-main{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}',
    '@media(max-width:700px){#br-main{grid-template-columns:1fr}}',
    '.br-col{display:flex;flex-direction:column;gap:14px}',
    '#br-preview-box{width:100%;aspect-ratio:1;max-width:220px;margin:0 auto;background:rgba(139,92,246,0.2);border:1px solid rgba(139,92,246,0.4);transition:border-radius 0.05s}',
    '.br-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-top:4px}',
    '.br-inputs{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
    '.br-input-grp{display:flex;flex-direction:column;gap:4px}',
    '.br-input-grp label{font-size:0.72rem;color:var(--c-text-sec);font-weight:600}',
    '.br-input-row{display:flex;align-items:center;gap:6px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:7px 10px;transition:border-color 0.2s}',
    '.br-input-row:focus-within{border-color:var(--c-accent)}',
    '.br-input-row input{background:transparent;border:none;outline:none;color:var(--c-text);font-family:var(--c-mono);font-size:0.9rem;width:100%;text-align:right}',
    '.br-input-row span{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);flex-shrink:0}',
    '.br-unit-toggle{display:flex;gap:4px}',
    '.br-unit-btn{flex:1;padding:6px;border:1px solid var(--c-border);border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.75rem;font-weight:700;cursor:pointer;transition:all 0.18s}',
    '.br-unit-btn:hover{background:rgba(255,255,255,0.05)}',
    '.br-unit-btn.active{background:var(--c-accent);color:#fff;border-color:var(--c-accent)}',
    '.br-link-btn{width:100%;padding:8px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.18s;display:flex;align-items:center;justify-content:center;gap:6px}',
    '.br-link-btn:hover{border-color:var(--c-accent);color:var(--c-accent)}',
    '.br-link-btn.linked{background:rgba(139,92,246,0.15);border-color:var(--c-accent);color:var(--c-accent)}',
    '.br-presets{display:flex;gap:6px;flex-wrap:wrap}',
    '.br-preset{padding:5px 10px;border:1px solid var(--c-border);border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;cursor:pointer;transition:all 0.18s}',
    '.br-preset:hover{border-color:var(--c-accent);color:var(--c-accent)}',
    '.br-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);font-size:0.82rem;color:var(--c-text);line-height:1.6;word-break:break-all;min-height:60px;display:flex;flex-direction:column;gap:6px}',
    '.br-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:2px}',
    '.br-css-code{flex:1;color:#e6edf3}',
    '.br-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 10px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s;align-self:flex-start}',
    '.br-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.br-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '#br-slider-visual{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:4px}',
    '.br-slider-half{display:flex;flex-direction:column;gap:4px;align-items:center}',
    '#br-slider-track{width:100%;height:60px;background:rgba(0,0,0,0.2);border-radius:30px;border:1px solid var(--c-border);position:relative;overflow:hidden}',
    '#br-slider-thumb{position:absolute;width:100%;background:rgba(139,92,246,0.5);transition:border-radius 0.05s}'
  ].join('');

  var HTML = [
    '<div id="br-app">',
    '<div id="br-hdr"><h1>Border Radius Editor</h1><p>即時預覽 · CSS 輸出</p></div>',
    '<div id="br-main">',
    '<div class="br-col">',
    '<div id="br-preview-box"></div>',
    '<div class="br-section-label">預設</div>',
    '<div class="br-presets">',
    '<button class="br-preset" data-tl="50" data-tr="50" data-br="50" data-bl="50">圓形</button>',
    '<button class="br-preset" data-tl="50" data-tr="50" data-br="50" data-bl="50" data-unit="%">膠囊</button>',
    '<button class="br-preset" data-tl="12" data-tr="12" data-br="12" data-bl="12">按鈕</button>',
    '<button class="br-preset" data-tl="8" data-tr="8" data-br="0" data-bl="0">卡片</button>',
    '<button class="br-preset" data-tl="50" data-tr="8" data-br="50" data-bl="8">不對稱</button>',
    '</div>',
    '<div class="br-section-label">連動</div>',
    '<button class="br-link-btn linked" id="br-link-btn">',
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    '<span id="br-link-label">四角連動</span>',
    '</button>',
    '<div class="br-unit-toggle">',
    '<button class="br-unit-btn active" data-unit="px">px</button>',
    '<button class="br-unit-btn" data-unit="%">%</button>',
    '</div>',
    '<div class="br-inputs">',
    '<div class="br-input-grp"><label>左上</label>',
    '<div class="br-input-row"><input type="number" id="br-tl" value="20" min="0" max="500"><span id="br-tl-unit">px</span></div></div>',
    '<div class="br-input-grp"><label>右上</label>',
    '<div class="br-input-row"><input type="number" id="br-tr" value="20" min="0" max="500"><span id="br-tr-unit">px</span></div></div>',
    '<div class="br-input-grp"><label>右下</label>',
    '<div class="br-input-row"><input type="number" id="br-br" value="20" min="0" max="500"><span id="br-br-unit">px</span></div></div>',
    '<div class="br-input-grp"><label>左下</label>',
    '<div class="br-input-row"><input type="number" id="br-bl" value="20" min="0" max="500"><span id="br-bl-unit">px</span></div></div>',
    '</div>',
    '</div>',
    '<div class="br-col">',
    '<div class="br-section-label">CSS 輸出</div>',
    '<div class="br-css-output">',
    '<div class="br-css-label">border-radius</div>',
    '<div class="br-css-code" id="br-css-code">border-radius: 20px 20px 20px 20px;</div>',
    '<button class="br-copy" id="br-copy-btn">複製</button>',
    '</div>',
    '<div class="br-section-label">快捷語法</div>',
    '<div class="br-css-output" style="font-size:0.78rem">',
    '<div class="br-css-label">斜線語法</div>',
    '<div class="br-css-code" id="br-css-shorthand">border-radius: 20px / 20px 20px 20px 20px;</div>',
    '</div>',
    '<div class="br-section-label">說明</div>',
    '<div style="font-size:0.78rem;color:var(--c-text-sec);line-height:1.6">',
    '<p><strong>四角語法：</strong>top-left top-right bottom-right bottom-left（順時針）</p>',
    '<p style="margin-top:6px"><strong>斜線語法：</strong>水平半徑 / 垂直半徑（適用橢圓形）</p>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('border-radius-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var unit = 'px';
  var linked = true;
  var tl = 20, tr = 20, br = 20, bl = 20;

  function $(id) { return document.getElementById(id); }

  function updatePreview() {
    var preview = $('br-preview-box');
    var cssVal = unit === '%' ?
      tl + '% ' + tr + '% ' + br + '% ' + bl + '%' :
      tl + 'px ' + tr + 'px ' + br + 'px ' + bl + 'px';
    preview.style.borderRadius = cssVal;
  }

  function updateCSS() {
    var t = unit === 'px' ? 'px' : '%';
    var shorthand = tl === tr && tr === br && br === bl ?
      'border-radius: ' + tl + t + ';' :
      'border-radius: ' + tl + t + ' ' + tr + t + ' ' + br + t + ' ' + bl + t + ';';
    var slash = 'border-radius: ' + tl + t + ' / ' + tl + t + ' ' + tr + t + ' ' + br + t + ' ' + bl + t + ';';
    $('br-css-code').textContent = shorthand;
    $('br-css-shorthand').textContent = slash;
  }

  function updateUnits() {
    ['tl','tr','br','bl'].forEach(function(corner) {
      $(corner + '-unit').textContent = unit;
    });
  }

  function syncAll(from) {
    if (!linked) return;
    var val = parseInt($('br-' + from).value) || 0;
    tl = from === 'tl' ? val : (linked ? val : tl);
    tr = from === 'tr' ? val : (linked ? val : tr);
    br = from === 'br' ? val : (linked ? val : br);
    bl = from === 'bl' ? val : (linked ? val : bl);
    if (linked) {
      ['tl','tr','br','bl'].forEach(function(c) {
        $('br-' + c).value = val;
      });
    }
  }

  function applyAll(vals) {
    tl = vals.tl; tr = vals.tr; br = vals.br; bl = vals.bl;
    $('br-tl').value = tl;
    $('br-tr').value = tr;
    $('br-br').value = br;
    $('br-bl').value = bl;
    updatePreview();
    updateCSS();
  }

  function init() {
    // Link toggle
    $('br-link-btn').addEventListener('click', function() {
      linked = !linked;
      $('br-link-btn').classList.toggle('linked', linked);
      $('br-link-label').textContent = linked ? '四角連動' : '四角獨立';
      if (linked) {
        var v = parseInt($('br-tl').value) || 0;
        ['tr','br','bl'].forEach(function(c) { $('br-' + c).value = v; });
        syncAll('tl');
      }
    });

    // Unit toggle
    document.querySelectorAll('.br-unit-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.br-unit-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        unit = btn.dataset.unit;
        updateUnits();
        updatePreview();
        updateCSS();
      });
    });

    // Inputs
    ['tl','tr','br','bl'].forEach(function(corner) {
      var input = $('br-' + corner);
      input.addEventListener('input', function() {
        syncAll(corner);
        // Update state from all inputs
        tl = parseInt($('br-tl').value) || 0;
        tr = parseInt($('br-tr').value) || 0;
        br = parseInt($('br-br').value) || 0;
        bl = parseInt($('br-bl').value) || 0;
        updatePreview();
        updateCSS();
      });
    });

    // Presets
    document.querySelectorAll('.br-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var presetUnit = btn.dataset.unit || unit;
        // Switch unit if preset has different unit
        if (presetUnit !== unit) {
          unit = presetUnit;
          document.querySelectorAll('.br-unit-btn').forEach(function(b) {
            b.classList.toggle('active', b.dataset.unit === unit);
          });
          updateUnits();
        }
        applyAll({
          tl: parseInt(btn.dataset.tl) || 0,
          tr: parseInt(btn.dataset.tr) || 0,
          br: parseInt(btn.dataset.br) || 0,
          bl: parseInt(btn.dataset.bl) || 0
        });
      });
    });

    // Copy
    $('br-copy-btn').addEventListener('click', function() {
      var text = $('br-css-code').textContent;
      navigator.clipboard.writeText(text).then(function() {
        $('br-copy-btn').classList.add('copied');
        $('br-copy-btn').textContent = '已複製!';
        setTimeout(function() {
          $('br-copy-btn').classList.remove('copied');
          $('br-copy-btn').textContent = '複製';
        }, 1500);
      });
    });

    updatePreview();
    updateCSS();
  }

  // Defer until visible
  function tryInit() {
    var panel = $('panel-border-radius');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
