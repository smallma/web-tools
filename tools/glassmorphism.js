(function() {
  var CSS = [
    '#gm-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#gm-app *,*::before,*::after{box-sizing:border-box}',
    '#gm-hdr{text-align:center}',
    '#gm-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#gm-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#gm-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#gm-main{grid-template-columns:1fr}}',
    '.gm-col{display:flex;flex-direction:column;gap:12px}',
    '.gm-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.gm-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.gm-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.gm-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:48px;flex-shrink:0}',
    '.gm-ctrl input[type=range]{flex:1;-webkit-appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.gm-ctrl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.gm-ctrl .gm-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:48px;text-align:right;flex-shrink:0}',
    '.gm-ctrl-row input[type=color]{width:36px;height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;background:transparent;padding:2px}',
    '.gm-ctrl-row input[type=color]::-webkit-color-swatch-wrapper{padding:0}',
    '.gm-ctrl-row input[type=color]::-webkit-color-swatch{border:none;border-radius:4px}',
    '.gm-preview-area{background:var(--bg,#1a1a2e);border:1px solid var(--c-border);border-radius:12px;padding:40px;display:flex;align-items:center;justify-content:center;min-height:200px;transition:all 0.15s;position:relative;overflow:hidden}',
    '.gm-bg-options{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}',
    '.gm-bg-btn{height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;transition:all 0.15s}',
    '.gm-bg-btn:hover{border-color:var(--c-accent)}',
    '.gm-bg-btn.active{border-color:var(--c-accent);box-shadow:0 0 0 2px var(--c-accent)}',
    '.gm-preview-elem{width:140px;height:140px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:16px;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;transition:all 0.15s}',
    '.gm-preview-elem-inner{font-size:0.75rem;color:rgba(255,255,255,0.8);text-align:center;padding:12px}',
    '.gm-preview-text{font-size:0.85rem;font-weight:600;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.3)}',
    '.gm-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.gm-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.gm-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:180px;overflow-y:auto}',
    '.gm-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.gm-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.gm-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.gm-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="gm-app">',
    '<div id="gm-hdr"><h1>Glassmorphism Generator</h1><p>Backdrop Filter · 半透明效果</p></div>',
    '<div id="gm-main">',
    '<div class="gm-col">',
    '<div class="gm-section-label">Blur</div>',
    '<div class="gm-ctrl">',
    '<div class="gm-ctrl-row"><label>Blur</label><input type=range id=gm-blur min=0 max=60 value=20><span class=gm-val id=gm-blur-v>20px</span></div>',
    '<div class="gm-ctrl-row"><label>Bright</label><input type=range id=gm-bright min=0 max=100 value=100><span class=gm-val id=gm-bright-v>100%</span></div>',
    '<div class="gm-ctrl-row"><label>Saturate</label><input type=range id=gm-saturate min=0 max=300 value=180><span class=gm-val id=gm-saturate-v>180%</span></div>',
    '<div class="gm-ctrl-row"><label>Contrast</label><input type=range id=gm-contrast min=50 max=200 value=120><span class=gm-val id=gm-contrast-v>120%</span></div>',
    '</div>',
    '<div class="gm-section-label">Background</div>',
    '<div class="gm-ctrl">',
    '<div class="gm-ctrl-row"><label>Color</label><input type=color id=gm-color value="#8b5cf6"></div>',
    '<div class="gm-ctrl-row"><label>Alpha</label><input type=range id=gm-alpha min=0 max=100 value=15><span class=gm-val id=gm-alpha-v>15%</span></div>',
    '</div>',
    '<div class="gm-section-label">Border</div>',
    '<div class="gm-ctrl">',
    '<div class="gm-ctrl-row"><label>Alpha</label><input type=range id=gm-border-alpha min=0 max=100 value=20><span class=gm-val id=gm-border-alpha-v>20%</span></div>',
    '<div class="gm-ctrl-row"><label>Width</label><input type=range id=gm-border-width min=0 max=4 value=1 step=0.5><span class=gm-val id=gm-border-width-v>1px</span></div>',
    '</div>',
    '<div class="gm-section-label">Shadow</div>',
    '<div class="gm-ctrl">',
    '<div class="gm-ctrl-row"><label>Blur</label><input type=range id=gm-shadow-blur min=0 max=80 value=30><span class=gm-val id=gm-shadow-blur-v>30px</span></div>',
    '<div class="gm-ctrl-row"><label>X</label><input type=range id=gm-shadow-x min=-40 max=40 value=0><span class=gm-val id=gm-shadow-x-v>0px</span></div>',
    '<div class="gm-ctrl-row"><label>Y</label><input type=range id=gm-shadow-y min=-40 max=40 value=10><span class=gm-val id=gm-shadow-y-v>10px</span></div>',
    '<div class="gm-ctrl-row"><label>Color</label><input type=color id=gm-shadow-color value="#000000"></div>',
    '<div class="gm-ctrl-row"><label>Alpha</label><input type=range id=gm-shadow-alpha min=0 max=100 value=30><span class=gm-val id=gm-shadow-alpha-v>30%</span></div>',
    '</div>',
    '</div>',
    '<div class="gm-col">',
    '<div class="gm-section-label">預覽背景</div>',
    '<div class="gm-bg-options">',
    '<button class="gm-bg-btn active" data-bg="#1a1a2e" style="background:#1a1a2e" title="#1a1a2e"></button>',
    '<button class="gm-bg-btn" data-bg="#0f3460" style="background:#0f3460" title="#0f3460"></button>',
    '<button class="gm-bg-btn" data-bg="linear-gradient(135deg,#667eea,#764ba2)" style="background:linear-gradient(135deg,#667eea,#764ba2)" title="Gradient"></button>',
    '<button class="gm-bg-btn" data-bg="linear-gradient(135deg,#f093fb,#f5576c)" style="background:linear-gradient(135deg,#f093fb,#f5576c)" title="Pink"></button>',
    '<button class="gm-bg-btn" data-bg="linear-gradient(135deg,#4facfe,#00f2fe)" style="background:linear-gradient(135deg,#4facfe,#00f2fe)" title="Cyan"></button>',
    '</div>',
    '<div class="gm-section-label">預覽</div>',
    '<div class="gm-preview-area" id="gm-area">',
    '<div class="gm-preview-elem" id="gm-elem">',
    '<div class="gm-preview-text">Glass Card</div>',
    '<div class="gm-preview-elem-inner">Backdrop blur<br>effect preview</div>',
    '</div>',
    '</div>',
    '<div class="gm-section-label">CSS 輸出</div>',
    '<div class="gm-css-output">',
    '<div class="gm-css-code" id="gm-css-code"></div>',
    '<div class="gm-copy-row"><button class="gm-copy" id="gm-copy-btn">複製</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('glassmorphism-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };

  function hexAlpha(hex, alpha) {
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha / 100).toFixed(2) + ')';
  }

  function rgba(hex, alpha) {
    var r = parseInt(hex.slice(1,3), 16);
    var g = parseInt(hex.slice(3,5), 16);
    var b = parseInt(hex.slice(5,7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha / 100).toFixed(2) + ')';
  }

  function apply() {
    var blur = $id('gm-blur').value;
    var bright = $id('gm-bright').value;
    var sat = $id('gm-saturate').value;
    var con = $id('gm-contrast').value;
    var alpha = $id('gm-alpha').value;
    var color = $id('gm-color').value;
    var borderAlpha = $id('gm-border-alpha').value;
    var borderWidth = $id('gm-border-width').value;
    var shadowBlur = $id('gm-shadow-blur').value;
    var shadowX = $id('gm-shadow-x').value;
    var shadowY = $id('gm-shadow-y').value;
    var shadowColor = $id('gm-shadow-color').value;
    var shadowAlpha = $id('gm-shadow-alpha').value;

    var elem = $id('gm-elem');
    elem.style.backdropFilter = 'blur(' + blur + 'px) brightness(' + bright + '%) saturate(' + sat + '%) contrast(' + con + '%)';
    elem.style.webkitBackdropFilter = 'blur(' + blur + 'px) brightness(' + bright + '%) saturate(' + sat + '%) contrast(' + con + '%)';
    elem.style.background = hexAlpha(color, alpha);
    elem.style.border = borderWidth + 'px solid ' + rgba('#ffffff', borderAlpha);
    elem.style.boxShadow = shadowX + 'px ' + shadowY + 'px ' + shadowBlur + 'px ' + rgba(shadowColor, shadowAlpha);

    $id('gm-blur-v').textContent = blur + 'px';
    $id('gm-bright-v').textContent = bright + '%';
    $id('gm-saturate-v').textContent = sat + '%';
    $id('gm-contrast-v').textContent = con + '%';
    $id('gm-alpha-v').textContent = alpha + '%';
    $id('gm-border-alpha-v').textContent = borderAlpha + '%';
    $id('gm-border-width-v').textContent = borderWidth + 'px';
    $id('gm-shadow-blur-v').textContent = shadowBlur + 'px';
    $id('gm-shadow-x-v').textContent = shadowX + 'px';
    $id('gm-shadow-y-v').textContent = shadowY + 'px';
    $id('gm-shadow-alpha-v').textContent = shadowAlpha + '%';

    var css = '.glass {\n' +
      '  background: ' + hexAlpha(color, alpha) + ';\n' +
      '  backdrop-filter: blur(' + blur + 'px) brightness(' + bright + '%) saturate(' + sat + '%) contrast(' + con + '%);\n' +
      '  -webkit-backdrop-filter: blur(' + blur + 'px) brightness(' + bright + '%) saturate(' + sat + '%) contrast(' + con + '%);\n' +
      '  border: ' + borderWidth + 'px solid ' + rgba('#ffffff', borderAlpha) + ';\n' +
      '  box-shadow: ' + shadowX + 'px ' + shadowY + 'px ' + shadowBlur + 'px ' + rgba(shadowColor, shadowAlpha) + ';\n' +
      '}';
    $id('gm-css-code').textContent = css;
  }

  function init() {
    document.querySelectorAll('.gm-ctrl-row input[type=range]').forEach(function(inp) {
      inp.addEventListener('input', apply);
    });
    $id('gm-color').addEventListener('input', apply);
    $id('gm-shadow-color').addEventListener('input', apply);

    document.querySelectorAll('.gm-bg-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.gm-bg-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        $id('gm-area').style.background = btn.dataset.bg;
      });
    });

    $id('gm-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText($id('gm-css-code').textContent).then(function() {
        $id('gm-copy-btn').classList.add('copied');
        $id('gm-copy-btn').textContent = '已複製!';
        setTimeout(function() {
          $id('gm-copy-btn').classList.remove('copied');
          $id('gm-copy-btn').textContent = '複製';
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
