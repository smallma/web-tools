(function() {
  var CSS = [
    '#tf-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#tf-app *,*::before,*::after{box-sizing:border-box}',
    '#tf-hdr{text-align:center}',
    '#tf-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#tf-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#tf-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#tf-main{grid-template-columns:1fr}}',
    '.tf-col{display:flex;flex-direction:column;gap:12px}',
    '.tf-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.tf-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.tf-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.tf-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:52px;flex-shrink:0}',
    '.tf-ctrl input[type=range]{flex:1;-webkit-appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.tf-ctrl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.tf-ctrl .tf-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:52px;text-align:right;flex-shrink:0}',
    '.tf-toggle{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.8rem;color:var(--c-text-sec);padding:6px 0}',
    '.tf-toggle input{width:16px;height:16px;cursor:pointer;accent-color:var(--c-accent)}',
    '.tf-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:40px;display:flex;align-items:center;justify-content:center;min-height:200px}',
    '#tf-preview-elem{width:100px;height:100px;background:rgba(139,92,246,0.4);border:2px solid rgba(139,92,246,0.8);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1.2rem;transition:transform 0.05s}',
    '.tf-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}',
    '.tf-preset{padding:6px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.tf-preset:hover{border-color:var(--c-accent);color:var(--c-accent)}',
    '.tf-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.tf-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.tf-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto}',
    '.tf-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.tf-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.tf-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.tf-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="tf-app">',
    '<div id="tf-hdr"><h1>Transform Generator</h1><p>Rotate · Scale · Skew · Translate</p></div>',
    '<div id="tf-main">',
    '<div class="tf-col">',
    '<div class="tf-section-label">Rotate</div>',
    '<div class="tf-ctrl">',
    '<div class="tf-ctrl-row"><label>Rotate</label><input type=range id=tf-rotate min=-180 max=180 value=0><span class=tf-val id=tf-rotate-v>0deg</span></div>',
    '</div>',
    '<div class="tf-section-label">Scale</div>',
    '<div class="tf-ctrl">',
    '<div class="tf-ctrl-row"><label>X</label><input type=range id=tf-sx min=0 max=3 step=0.05 value=1><span class=tf-val id=tf-sx-v>1</span></div>',
    '<div class="tf-ctrl-row"><label>Y</label><input type=range id=tf-sy min=0 max=3 step=0.05 value=1><span class=tf-val id=tf-sy-v>1</span></div>',
    '<div class="tf-toggle"><input type=checkbox id=tf-uniform checked><span>Uniform scale</span></div>',
    '</div>',
    '<div class="tf-section-label">Skew</div>',
    '<div class="tf-ctrl">',
    '<div class="tf-ctrl-row"><label>X</label><input type=range id=tf-kx min=-90 max=90 value=0><span class=tf-val id=tf-kx-v>0deg</span></div>',
    '<div class="tf-ctrl-row"><label>Y</label><input type=range id=tf-ky min=-90 max=90 value=0><span class=tf-val id=tf-ky-v>0deg</span></div>',
    '</div>',
    '<div class="tf-section-label">Translate</div>',
    '<div class="tf-ctrl">',
    '<div class="tf-ctrl-row"><label>X</label><input type=range id=tf-tx min=-200 max=200 value=0><span class=tf-val id=tf-tx-v>0px</span></div>',
    '<div class="tf-ctrl-row"><label>Y</label><input type=range id=tf-ty min=-200 max=200 value=0><span class=tf-val id=tf-ty-v>0px</span></div>',
    '</div>',
    '<div class="tf-section-label">Presets</div>',
    '<div class="tf-presets">',
    '<button class="tf-preset" data-t="rotate:45">Rotate 45</button>',
    '<button class="tf-preset" data-t="rotate:-15 skewX:10">Tilt</button>',
    '<button class="tf-preset" data-t="scale:1.2">Zoom In</button>',
    '<button class="tf-preset" data-t="scale:0.9">Zoom Out</button>',
    '<button class="tf-preset" data-t="rotate:180">Flip H</button>',
    '<button class="tf-preset" data-t="scaleX:-1">Mirror</button>',
    '<button class="tf-preset" data-t="tx:30 ty:-20">Slide</button>',
    '<button class="tf-preset" data-t="reset">Reset</button>',
    '</div>',
    '</div>',
    '<div class="tf-col">',
    '<div class="tf-section-label">預覽</div>',
    '<div class="tf-preview-area"><div id="tf-preview-elem">T</div></div>',
    '<div class="tf-section-label">CSS 輸出</div>',
    '<div class="tf-css-output">',
    '<div class="tf-css-code" id="tf-css-code"></div>',
    '<div class="tf-copy-row"><button class="tf-copy" id="tf-copy-btn">複製</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('transform-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };
  var uniform = true;
  var sx = 1, sy = 1;

  function apply() {
    var r = $id('tf-rotate').value;
    var kx = $id('tf-kx').value;
    var ky = $id('tf-ky').value;
    var tx = $id('tf-tx').value;
    var ty = $id('tf-ty').value;
    var val = 'rotate(' + r + 'deg) scale(' + sx + ',' + sy + ') skew(' + kx + 'deg,' + ky + 'deg) translate(' + tx + 'px,' + ty + 'px)';
    $id('tf-preview-elem').style.transform = val;
    $id('tf-css-code').textContent = 'transform:\n  ' + val + ';';
    $id('tf-rotate-v').textContent = r + 'deg';
    $id('tf-sx-v').textContent = sx.toFixed(2);
    $id('tf-sy-v').textContent = sy.toFixed(2);
    $id('tf-kx-v').textContent = kx + 'deg';
    $id('tf-ky-v').textContent = ky + 'deg';
    $id('tf-tx-v').textContent = tx + 'px';
    $id('tf-ty-v').textContent = ty + 'px';
  }

  function init() {
    $id('tf-rotate').addEventListener('input', apply);
    $id('tf-sx').addEventListener('input', function() {
      sx = parseFloat(this.value);
      if (uniform) { sy = sx; $id('tf-sy').value = sx; }
      apply();
    });
    $id('tf-sy').addEventListener('input', function() {
      sy = parseFloat(this.value);
      if (uniform) { sx = sy; $id('tf-sx').value = sy; }
      apply();
    });
    $id('tf-uniform').addEventListener('change', function() {
      uniform = this.checked;
      if (uniform) { sy = sx; $id('tf-sy').value = sx; apply(); }
    });
    $id('tf-kx').addEventListener('input', apply);
    $id('tf-ky').addEventListener('input', apply);
    $id('tf-tx').addEventListener('input', apply);
    $id('tf-ty').addEventListener('input', apply);

    document.querySelectorAll('.tf-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var t = btn.dataset.t;
        if (t === 'reset') {
          $id('tf-rotate').value = 0; sx = 1; sy = 1;
          $id('tf-sx').value = 1; $id('tf-sy').value = 1;
          $id('tf-kx').value = 0; $id('tf-ky').value = 0;
          $id('tf-tx').value = 0; $id('tf-ty').value = 0;
        } else {
          var parts = t.split(' ');
          parts.forEach(function(p) {
            var kv = p.split(':');
            var k = kv[0], v = kv[1];
            if (k === 'rotate') { $id('tf-rotate').value = parseInt(v); }
            else if (k === 'scale') { sx = parseFloat(v); sy = parseFloat(v); $id('tf-sx').value = sx; $id('tf-sy').value = sy; }
            else if (k === 'scaleX') { sx = parseFloat(v); $id('tf-sx').value = sx; }
            else if (k === 'skewX') { $id('tf-kx').value = parseInt(v); }
            else if (k === 'tx') { $id('tf-tx').value = parseInt(v); }
            else if (k === 'ty') { $id('tf-ty').value = parseInt(v); }
          });
        }
        apply();
      });
    });

    $id('tf-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText('transform: ' + $id('tf-css-code').textContent.replace('transform:\n  ', '') + ';').then(function() {
        $id('tf-copy-btn').classList.add('copied');
        $id('tf-copy-btn').textContent = '已複製!';
        setTimeout(function() { $id('tf-copy-btn').classList.remove('copied'); $id('tf-copy-btn').textContent = '複製'; }, 1500);
      });
    });

    apply();
  }

  function tryInit() {
    var panel = $id('panel-transform');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
