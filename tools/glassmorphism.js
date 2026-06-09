(function() {
  var CSS = [
    '#gm-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#gm-app *,*::before,*::after{box-sizing:border-box}',
    '#gm-hdr{text-align:center}',
    '#gm-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#gm-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#gm-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#gm-main{grid-template-columns:1fr}}',
    '.gm-col{display:flex;flex-direction:column;gap:14px}',
    '.gm-section{display:flex;flex-direction:column;gap:8px}',
    '.gm-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:2px}',
    '.gm-presets{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:4px}',
    '.gm-preset-btn{background:rgba(139,92,246,0.08);border:1px solid var(--c-border);border-radius:6px;padding:4px 10px;cursor:pointer;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;transition:all 0.18s;white-space:nowrap}',
    '.gm-preset-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.15)}',
    '.gm-preset-btn.active{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.18)}',
    '.gm-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.gm-ctrl-row label{font-size:0.8rem;color:var(--c-text-sec);width:68px;flex-shrink:0}',
    '.gm-ctrl-row input[type=range]{flex:1;-webkit-appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.gm-ctrl-row input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.gm-ctrl-row input[type=range]:focus::-webkit-slider-thumb{outline:2px solid var(--c-accent);outline-offset:2px}',
    '.gm-ctrl-row input[type=range]:focus{outline:none}',
    '.gm-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:48px;text-align:right;flex-shrink:0}',
    '.gm-ctrl-row input[type=color]{width:36px;height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;background:transparent;padding:2px}',
    '.gm-ctrl-row input[type=color]::-webkit-color-swatch-wrapper{padding:0}',
    '.gm-ctrl-row input[type=color]::-webkit-color-swatch{border:none;border-radius:4px}',
    '.gm-preview-area{background:var(--bg,#1a1a2e);border:1px solid var(--c-border);border-radius:12px;padding:40px;display:flex;align-items:center;justify-content:center;min-height:200px;transition:all 0.15s;position:relative;overflow:hidden}',
    '.gm-bg-options{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}',
    '.gm-bg-btn{height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;transition:all 0.15s;position:relative}',
    '.gm-bg-btn:hover{border-color:var(--c-accent)}',
    '.gm-bg-btn.active,.gm-bg-btn[aria-pressed=true]{border-color:var(--c-accent);box-shadow:0 0 0 2px var(--c-accent)}',
    '.gm-bg-btn:focus{outline:2px solid var(--c-accent);outline-offset:2px}',
    '.gm-preview-elem{width:140px;height:140px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:16px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;transition:all 0.1s}',
    '.gm-preview-elem-inner{font-size:0.75rem;color:rgba(255,255,255,0.8);text-align:center;padding:12px}',
    '.gm-preview-text{font-size:0.85rem;font-weight:600;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.3)}',
    '.gm-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.gm-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.gm-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:180px;overflow-y:auto}',
    '.gm-copy-row{display:flex;align-items:center;justify-content:flex-end;gap:10px;padding-top:4px}',
    '.gm-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.gm-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.gm-copy:focus{outline:2px solid var(--c-accent);outline-offset:2px}',
    '.gm-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="gm-app">',
    '<div id="gm-hdr"><h1>Glassmorphism Generator</h1><p>Backdrop Filter · 半透明玻璃態效果</p></div>',
    '<div id="gm-main">',

    '<!-- 左欄：控制 -->',
    '<div class="gm-col">',

    '<!-- 預設 -->',
    '<div class="gm-section">',
    '<div class="gm-section-label">快速預設</div>',
    '<div class="gm-presets">',
    '<button class="gm-preset-btn" data-preset="frosted" aria-label="預設：Frosted">Frosted</button>',
    '<button class="gm-preset-btn" data-preset="light" aria-label="預設：Light">Light</button>',
    '<button class="gm-preset-btn" data-preset="dark" aria-label="預設：Dark">Dark</button>',
    '<button class="gm-preset-btn" data-preset="vivid" aria-label="預設：Vivid">Vivid</button>',
    '<button class="gm-preset-btn" data-preset="subtle" aria-label="預設：Subtle">Subtle</button>',
    '</div>',
    '</div>',

    '<!-- 效果區 -->',
    '<div class="gm-section">',
    '<div class="gm-section-label">Backdrop 效果</div>',
    '<div class="gm-ctrl-row"><label for="gm-blur">模糊</label><input type="range" id="gm-blur" min="0" max="60" value="20" aria-label="模糊強度" aria-valuemin="0" aria-valuemax="60" aria-valuenow="20"><span class="gm-val" id="gm-blur-v">20px</span></div>',
    '<div class="gm-ctrl-row"><label for="gm-bright">亮度</label><input type="range" id="gm-bright" min="0" max="200" value="100" aria-label="亮度" aria-valuemin="0" aria-valuemax="200" aria-valuenow="100"><span class="gm-val" id="gm-bright-v">100%</span></div>',
    '<div class="gm-ctrl-row"><label for="gm-saturate">飽和</label><input type="range" id="gm-saturate" min="0" max="300" value="180" aria-label="飽和度" aria-valuemin="0" aria-valuemax="300" aria-valuenow="180"><span class="gm-val" id="gm-saturate-v">180%</span></div>',
    '<div class="gm-ctrl-row"><label for="gm-contrast">對比</label><input type="range" id="gm-contrast" min="50" max="200" value="120" aria-label="對比度" aria-valuemin="50" aria-valuemax="200" aria-valuenow="120"><span class="gm-val" id="gm-contrast-v">120%</span></div>',
    '</div>',

    '<!-- 背景區 -->',
    '<div class="gm-section">',
    '<div class="gm-section-label">背景色</div>',
    '<div class="gm-ctrl-row"><label for="gm-color">顏色</label><input type="color" id="gm-color" value="#8b5cf6" aria-label="背景顏色"></div>',
    '<div class="gm-ctrl-row"><label for="gm-alpha">透明度</label><input type="range" id="gm-alpha" min="0" max="100" value="15" aria-label="背景透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="15"><span class="gm-val" id="gm-alpha-v">15%</span></div>',
    '</div>',

    '<!-- 邊框區 -->',
    '<div class="gm-section">',
    '<div class="gm-section-label">邊框</div>',
    '<div class="gm-ctrl-row"><label for="gm-border-width">寬度</label><input type="range" id="gm-border-width" min="0" max="4" value="1" step="0.5" aria-label="邊框寬度" aria-valuemin="0" aria-valuemax="4" aria-valuenow="1"><span class="gm-val" id="gm-border-width-v">1px</span></div>',
    '<div class="gm-ctrl-row"><label for="gm-border-alpha">透明度</label><input type="range" id="gm-border-alpha" min="0" max="100" value="20" aria-label="邊框透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"><span class="gm-val" id="gm-border-alpha-v">20%</span></div>',
    '</div>',

    '<!-- 陰影區 -->',
    '<div class="gm-section">',
    '<div class="gm-section-label">陰影</div>',
    '<div class="gm-ctrl-row"><label for="gm-shadow-blur">模糊</label><input type="range" id="gm-shadow-blur" min="0" max="80" value="30" aria-label="陰影模糊" aria-valuemin="0" aria-valuemax="80" aria-valuenow="30"><span class="gm-val" id="gm-shadow-blur-v">30px</span></div>',
    '<div class="gm-ctrl-row"><label for="gm-shadow-x">X 位移</label><input type="range" id="gm-shadow-x" min="-40" max="40" value="0" aria-label="陰影水平位移" aria-valuemin="-40" aria-valuemax="40" aria-valuenow="0"><span class="gm-val" id="gm-shadow-x-v">0px</span></div>',
    '<div class="gm-ctrl-row"><label for="gm-shadow-y">Y 位移</label><input type="range" id="gm-shadow-y" min="-40" max="40" value="10" aria-label="陰影垂直位移" aria-valuemin="-40" aria-valuemax="40" aria-valuenow="10"><span class="gm-val" id="gm-shadow-y-v">10px</span></div>',
    '<div class="gm-ctrl-row"><label for="gm-shadow-color">顏色</label><input type="color" id="gm-shadow-color" value="#000000" aria-label="陰影顏色"></div>',
    '<div class="gm-ctrl-row"><label for="gm-shadow-alpha">透明度</label><input type="range" id="gm-shadow-alpha" min="0" max="100" value="30" aria-label="陰影透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30"><span class="gm-val" id="gm-shadow-alpha-v">30%</span></div>',
    '</div>',

    '</div>', // end left col

    '<!-- 右欄：預覽 + 輸出 -->',
    '<div class="gm-col">',

    '<div class="gm-section">',
    '<div class="gm-section-label">預覽背景</div>',
    '<div class="gm-bg-options" role="group" aria-label="選擇預覽背景">',
    '<button class="gm-bg-btn active" data-bg="#1a1a2e" style="background:#1a1a2e" aria-label="預覽背景：深藍" aria-pressed="true"></button>',
    '<button class="gm-bg-btn" data-bg="#0f3460" style="background:#0f3460" aria-label="預覽背景：深海藍" aria-pressed="false"></button>',
    '<button class="gm-bg-btn" data-bg="linear-gradient(135deg,#667eea,#764ba2)" style="background:linear-gradient(135deg,#667eea,#764ba2)" aria-label="預覽背景：漸層紫" aria-pressed="false"></button>',
    '<button class="gm-bg-btn" data-bg="linear-gradient(135deg,#f093fb,#f5576c)" style="background:linear-gradient(135deg,#f093fb,#f5576c)" aria-label="預覽背景：粉紅漸層" aria-pressed="false"></button>',
    '<button class="gm-bg-btn" data-bg="linear-gradient(135deg,#4facfe,#00f2fe)" style="background:linear-gradient(135deg,#4facfe,#00f2fe)" aria-label="預覽背景：青藍漸層" aria-pressed="false"></button>',
    '</div>',
    '</div>',

    '<div class="gm-section">',
    '<div class="gm-section-label">預覽</div>',
    '<div class="gm-preview-area" id="gm-area" role="img" aria-label="玻璃態效果預覽">',
    '<div class="gm-preview-elem" id="gm-elem" aria-hidden="true">',
    '<div class="gm-preview-text">Glass Card</div>',
    '<div class="gm-preview-elem-inner">Backdrop blur<br>effect preview</div>',
    '</div>',
    '</div>',
    '</div>',

    '<div class="gm-section">',
    '<div class="gm-section-label">CSS 輸出</div>',
    '<div class="gm-css-output">',
    '<div class="gm-css-code" id="gm-css-code" aria-label="產生的 CSS 程式碼"></div>',
    '<div class="gm-copy-row">',
    '<div role="status" aria-live="polite" aria-atomic="true" id="gm-copy-status" style="font-size:0.75rem;color:var(--c-success);opacity:0;transition:opacity 0.2s"></div>',
    '<button class="gm-copy" id="gm-copy-btn" aria-label="複製 CSS 程式碼">複製</button>',
    '</div>',
    '</div>',
    '</div>',

    '</div>', // end right col
    '</div>', // end gm-main
    '</div>'  // end gm-app
  ].join('');

  var PRESETS = {
    frosted: { blur: 20, bright: 100, saturate: 180, contrast: 120, color: '#ffffff', alpha: 15, borderWidth: 1, borderAlpha: 20, shadowBlur: 30, shadowX: 0, shadowY: 10, shadowColor: '#000000', shadowAlpha: 30 },
    light:   { blur: 12, bright: 120, saturate: 120, contrast: 100, color: '#ffffff', alpha: 30, borderWidth: 1, borderAlpha: 40, shadowBlur: 20, shadowX: 0, shadowY: 6,  shadowColor: '#000000', shadowAlpha: 15 },
    dark:    { blur: 30, bright: 60,  saturate: 150, contrast: 140, color: '#000000', alpha: 35, borderWidth: 1, borderAlpha: 15, shadowBlur: 50, shadowX: 0, shadowY: 20, shadowColor: '#000000', shadowAlpha: 50 },
    vivid:   { blur: 16, bright: 110, saturate: 250, contrast: 115, color: '#8b5cf6', alpha: 20, borderWidth: 1, borderAlpha: 30, shadowBlur: 40, shadowX: 0, shadowY: 12, shadowColor: '#8b5cf6', shadowAlpha: 40 },
    subtle:  { blur: 6,  bright: 105, saturate: 110, contrast: 105, color: '#ffffff', alpha: 8,  borderWidth: 1, borderAlpha: 12, shadowBlur: 12, shadowX: 0, shadowY: 4,  shadowColor: '#000000', shadowAlpha: 10 }
  };

  var container = document.getElementById('glassmorphism-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };

  function rgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha / 100).toFixed(2) + ')';
  }

  function setVal(id, val) {
    var el = $id(id);
    if (!el) return;
    el.value = val;
    el.setAttribute('aria-valuenow', val);
  }

  function apply() {
    var blur        = $id('gm-blur').value;
    var bright      = $id('gm-bright').value;
    var sat         = $id('gm-saturate').value;
    var con         = $id('gm-contrast').value;
    var alpha       = $id('gm-alpha').value;
    var color       = $id('gm-color').value;
    var borderAlpha = $id('gm-border-alpha').value;
    var borderWidth = $id('gm-border-width').value;
    var shadowBlur  = $id('gm-shadow-blur').value;
    var shadowX     = $id('gm-shadow-x').value;
    var shadowY     = $id('gm-shadow-y').value;
    var shadowColor = $id('gm-shadow-color').value;
    var shadowAlpha = $id('gm-shadow-alpha').value;

    var filterStr = 'blur(' + blur + 'px) brightness(' + bright + '%) saturate(' + sat + '%) contrast(' + con + '%)';
    var elem = $id('gm-elem');
    elem.style.backdropFilter = filterStr;
    elem.style.webkitBackdropFilter = filterStr;
    elem.style.background = rgba(color, alpha);
    elem.style.border = borderWidth + 'px solid ' + rgba('#ffffff', borderAlpha);
    elem.style.boxShadow = shadowX + 'px ' + shadowY + 'px ' + shadowBlur + 'px ' + rgba(shadowColor, shadowAlpha);

    $id('gm-blur-v').textContent         = blur + 'px';
    $id('gm-bright-v').textContent       = bright + '%';
    $id('gm-saturate-v').textContent     = sat + '%';
    $id('gm-contrast-v').textContent     = con + '%';
    $id('gm-alpha-v').textContent        = alpha + '%';
    $id('gm-border-alpha-v').textContent = borderAlpha + '%';
    $id('gm-border-width-v').textContent = borderWidth + 'px';
    $id('gm-shadow-blur-v').textContent  = shadowBlur + 'px';
    $id('gm-shadow-x-v').textContent     = shadowX + 'px';
    $id('gm-shadow-y-v').textContent     = shadowY + 'px';
    $id('gm-shadow-alpha-v').textContent = shadowAlpha + '%';

    // 同步 aria-valuenow
    ['gm-blur','gm-bright','gm-saturate','gm-contrast','gm-alpha',
     'gm-border-alpha','gm-border-width','gm-shadow-blur',
     'gm-shadow-x','gm-shadow-y','gm-shadow-alpha'].forEach(function(id) {
      var el = $id(id);
      if (el) el.setAttribute('aria-valuenow', el.value);
    });

    var css = '.glass {\n' +
      '  background: ' + rgba(color, alpha) + ';\n' +
      '  backdrop-filter: ' + filterStr + ';\n' +
      '  -webkit-backdrop-filter: ' + filterStr + ';\n' +
      '  border: ' + borderWidth + 'px solid ' + rgba('#ffffff', borderAlpha) + ';\n' +
      '  box-shadow: ' + shadowX + 'px ' + shadowY + 'px ' + shadowBlur + 'px ' + rgba(shadowColor, shadowAlpha) + ';\n' +
      '}';
    $id('gm-css-code').textContent = css;
  }

  function applyPreset(name) {
    var p = PRESETS[name];
    if (!p) return;
    setVal('gm-blur', p.blur);
    setVal('gm-bright', p.bright);
    setVal('gm-saturate', p.saturate);
    setVal('gm-contrast', p.contrast);
    $id('gm-color').value = p.color;
    setVal('gm-alpha', p.alpha);
    setVal('gm-border-width', p.borderWidth);
    setVal('gm-border-alpha', p.borderAlpha);
    setVal('gm-shadow-blur', p.shadowBlur);
    setVal('gm-shadow-x', p.shadowX);
    setVal('gm-shadow-y', p.shadowY);
    $id('gm-shadow-color').value = p.shadowColor;
    setVal('gm-shadow-alpha', p.shadowAlpha);
    apply();

    // 更新 active 狀態
    document.querySelectorAll('.gm-preset-btn').forEach(function(b) {
      var isActive = b.dataset.preset === name;
      b.classList.toggle('active', isActive);
    });
  }

  function init() {
    // 所有 range 和 color 輸入
    document.querySelectorAll('#gm-app input[type=range], #gm-app input[type=color]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        // 清除預設 active 狀態（使用者手動調整時）
        document.querySelectorAll('.gm-preset-btn').forEach(function(b) { b.classList.remove('active'); });
        apply();
      });
    });

    // 預覽背景按鈕
    document.querySelectorAll('.gm-bg-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.gm-bg-btn').forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        $id('gm-area').style.background = btn.dataset.bg;
      });
    });

    // 預設按鈕
    document.querySelectorAll('.gm-preset-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        applyPreset(btn.dataset.preset);
      });
    });

    // 複製按鈕
    $id('gm-copy-btn').addEventListener('click', function() {
      var code = $id('gm-css-code').textContent;
      var copyBtn = $id('gm-copy-btn');
      var statusEl = $id('gm-copy-status');
      navigator.clipboard.writeText(code).then(function() {
        copyBtn.classList.add('copied');
        copyBtn.textContent = '已複製!';
        statusEl.textContent = 'CSS 已複製到剪貼簿';
        statusEl.style.opacity = '1';
        setTimeout(function() {
          copyBtn.classList.remove('copied');
          copyBtn.textContent = '複製';
          statusEl.style.opacity = '0';
          setTimeout(function() { statusEl.textContent = ''; }, 300);
        }, 1500);
      }).catch(function() {
        // fallback
        var ta = document.createElement('textarea');
        ta.value = code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        copyBtn.classList.add('copied');
        copyBtn.textContent = '已複製!';
        statusEl.textContent = 'CSS 已複製到剪貼簿';
        statusEl.style.opacity = '1';
        setTimeout(function() {
          copyBtn.classList.remove('copied');
          copyBtn.textContent = '複製';
          statusEl.style.opacity = '0';
          setTimeout(function() { statusEl.textContent = ''; }, 300);
        }, 1500);
      });
    });

    apply();
  }

  function tryInit() {
    var panel = $id('panel-glassmorphism');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
