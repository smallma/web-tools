(function() {
  var CSS = [
    '#bd-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#bd-app *,*::before,*::after{box-sizing:border-box}',
    '#bd-hdr{text-align:center}',
    '#bd-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#bd-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#bd-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#bd-main{grid-template-columns:1fr}}',
    '.bd-col{display:flex;flex-direction:column;gap:12px}',
    '.bd-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.bd-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.bd-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.bd-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:52px;flex-shrink:0}',
    '.bd-ctrl input[type=range]{flex:1;-webkit-appearance:none;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}',
    '.bd-ctrl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);cursor:grab}',
    '.bd-ctrl .bd-val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:52px;text-align:right;flex-shrink:0}',
    '.bd-ctrl select{flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:6px;color:var(--c-text);font-family:var(--c-mono);font-size:0.8rem;padding:4px 6px;outline:none;cursor:pointer}',
    '.bd-ctrl input[type=color]{width:36px;height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;background:transparent;padding:2px}',
    '.bd-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:40px;display:flex;align-items:center;justify-content:center;min-height:200px}',
    '#bd-preview-elem{width:180px;height:100px;background:rgba(139,92,246,0.1);transition:all 0.15s}',
    '.bd-sides{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:6px}',
    '.bd-side{display:flex;flex-direction:column;gap:3px;background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:8px;padding:8px;text-align:center}',
    '.bd-side-label{font-size:0.65rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.bd-presets{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}',
    '.bd-preset{height:32px;border:1px solid var(--c-border);border-radius:6px;cursor:pointer;transition:all 0.15s;font-size:0}',
    '.bd-preset:hover{border-color:var(--c-accent)}',
    '.bd-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.bd-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.bd-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:160px;overflow-y:auto}',
    '.bd-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.bd-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.bd-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.bd-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="bd-app">',
    '<div id="bd-hdr"><h1>Border Generator</h1><p>Style · Width · Color · Per-side</p></div>',
    '<div id="bd-main">',
    '<div class="bd-col">',
    '<div class="bd-section-label">Style</div>',
    '<div class="bd-ctrl">',
    '<div class="bd-ctrl-row"><label>Style</label><select id=bd-style><option>solid</option><option>dashed</option><option>dotted</option><option>double</option><option>groove</option><option>ridge</option><option>inset</option><option>outset</option></select></div>',
    '<div class="bd-ctrl-row"><label>Width</label><input type=range id=bd-width min=1 max=20 value=2><span class=bd-val id=bd-width-v>2px</span></div>',
    '<div class="bd-ctrl-row"><label>Color</label><input type=color id=bd-color value="#8b5cf6"></div>',
    '</div>',
    '<div class="bd-section-label">Apply to</div>',
    '<div class="bd-sides">',
    '<div class="bd-side"><span class=bd-side-label>Top</span><input type=checkbox id=bd-top checked></div>',
    '<div class="bd-side"><span class=bd-side-label>Right</span><input type=checkbox id=bd-right checked></div>',
    '<div class="bd-side"><span class=bd-side-label>Bottom</span><input type=checkbox id=bd-bottom checked></div>',
    '<div class="bd-side"><span class=bd-side-label>Left</span><input type=checkbox id=bd-left checked></div>',
    '</div>',
    '<div class="bd-section-label" style="margin-top:8px">Presets</div>',
    '<div class="bd-presets">',
    '<button class="bd-preset" data-p="solid:2:#8b5cf6" style="background:#8b5cf6"></button>',
    '<button class="bd-preset" data-p="dashed:2:#06b6d4" style="background:transparent;border:2px dashed #06b6d4"></button>',
    '<button class="bd-preset" data-p="dotted:3:#34d399" style="background:transparent;border:3px dotted #34d399"></button>',
    '<button class="bd-preset" data-p="double:4:#f59e0b" style="background:transparent;border:4px double #f59e0b"></button>',
    '<button class="bd-preset" data-p="gradient:3" style="background:linear-gradient(90deg,#8b5cf6,#06b6d4,#ec4899)"></button>',
    '</div>',
    '</div>',
    '<div class="bd-col">',
    '<div class="bd-section-label">預覽</div>',
    '<div class="bd-preview-area"><div id="bd-preview-elem"></div></div>',
    '<div class="bd-section-label">CSS 輸出</div>',
    '<div class="bd-css-output">',
    '<div class="bd-css-code" id="bd-css-code"></div>',
    '<div class="bd-copy-row"><button class="bd-copy" id="bd-copy-btn">複製</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('border-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };

  function apply() {
    var style = $id('bd-style').value;
    var width = $id('bd-width').value;
    var color = $id('bd-color').value;
    var top = $id('bd-top').checked;
    var right = $id('bd-right').checked;
    var bottom = $id('bd-bottom').checked;
    var left = $id('bd-left').checked;

    var sides = [
      top ? width + 'px ' + style + ' ' + color : '0',
      right ? width + 'px ' + style + ' ' + color : '0',
      bottom ? width + 'px ' + style + ' ' + color : '0',
      left ? width + 'px ' + style + ' ' + color : '0'
    ].join(' ');

    $id('bd-preview-elem').style.border = sides;
    $id('bd-width-v').textContent = width + 'px';

    var shorthand = (top && right && bottom && left);
    var css;
    if (shorthand) {
      css = 'border: ' + width + 'px ' + style + ' ' + color + ';';
    } else {
      css = 'border-top: ' + sides.split(' ')[0] + ';\nborder-right: ' + sides.split(' ')[1] + ';\nborder-bottom: ' + sides.split(' ')[2] + ';\nborder-left: ' + sides.split(' ')[3] + ';';
    }
    $id('bd-css-code').textContent = css;
  }

  function init() {
    $id('bd-style').addEventListener('change', apply);
    $id('bd-width').addEventListener('input', apply);
    $id('bd-color').addEventListener('input', apply);
    ['top','right','bottom','left'].forEach(function(side) {
      $id('bd-' + side).addEventListener('change', apply);
    });

    document.querySelectorAll('.bd-preset').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var p = btn.dataset.p;
        var parts = p.split(':');
        if (parts[0] === 'gradient') {
          $id('bd-preview-elem').style.border = 'none';
          $id('bd-preview-elem').style.background = 'linear-gradient(90deg,#8b5cf6,#06b6d4,#ec4899)';
          $id('bd-preview-elem').style.backgroundClip = 'padding-box';
          var w = parts[1] || 3;
          $id('bd-css-code').textContent = '/* Gradient border trick */\nborder: ' + w + 'px solid transparent;\nborder-radius: 8px;\nbackground: linear-gradient(#0d0d12, #0d0d12) padding-box,\n            linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899) border-box;';
        } else {
          $id('bd-style').value = parts[0];
          $id('bd-width').value = parseInt(parts[1]);
          $id('bd-color').value = parts[2];
          $id('bd-preview-elem').style.background = 'rgba(139,92,246,0.1)';
          apply();
        }
      });
    });

    $id('bd-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText($id('bd-css-code').textContent).then(function() {
        $id('bd-copy-btn').classList.add('copied');
        $id('bd-copy-btn').textContent = '已複製!';
        setTimeout(function() { $id('bd-copy-btn').classList.remove('copied'); $id('bd-copy-btn').textContent = '複製'; }, 1500);
      });
    });

    apply();
  }

  function tryInit() {
    var panel = $id('panel-border');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
