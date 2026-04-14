(function() {
  var CSS = [
    '#ts-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#ts-app *,*::before,*::after{box-sizing:border-box}',
    '#ts-hdr{text-align:center}',
    '#ts-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#ts-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#ts-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#ts-main{grid-template-columns:1fr}}',
    '.ts-col{display:flex;flex-direction:column;gap:14px}',
    '.ts-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.ts-input-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:9px 14px;transition:border-color 0.2s}',
    '.ts-input-row:focus-within{border-color:var(--c-accent)}',
    '.ts-input-row label{font-size:0.85rem;color:var(--c-text-sec);flex-shrink:0}',
    '.ts-input-row input{background:transparent;border:none;outline:none;color:var(--c-text);font-family:var(--c-mono);font-size:0.95rem;width:100%;text-align:right}',
    '.ts-input-row span{font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text-sec);flex-shrink:0}',
    '.ts-ratio-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}',
    '.ts-ratio-btn{padding:8px 6px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:center}',
    '.ts-ratio-btn:hover{border-color:var(--c-accent);color:var(--c-accent)}',
    '.ts-ratio-btn.active{background:rgba(139,92,246,0.15);border-color:var(--c-accent);color:var(--c-accent)}',
    '.ts-ratio-btn .ts-ratio-name{display:block;font-size:0.9rem;font-weight:700}',
    '.ts-ratio-btn .ts-ratio-val{display:block;font-size:0.68rem;color:var(--c-text-sec);margin-top:2px}',
    '.ts-ratio-btn.active .ts-ratio-val{color:var(--c-accent)}',
    '.ts-custom{display:flex;align-items:center;gap:8px}',
    '.ts-custom input{flex:1;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px;color:var(--c-text);font-family:var(--c-mono);font-size:0.9rem;outline:none;text-align:right}',
    '.ts-custom input:focus{border-color:var(--c-accent)}',
    '.ts-custom span{font-size:0.8rem;color:var(--c-text-sec)}',
    '#ts-preview{background:var(--c-card);border:1px solid var(--c-border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:10px}',
    '.ts-scale-row{display:flex;align-items:baseline;gap:12px;border-bottom:1px solid var(--c-border);padding-bottom:8px}',
    '.ts-scale-row:last-child{border-bottom:none;padding-bottom:0}',
    '.ts-scale-name{font-family:var(--c-mono);font-size:0.72rem;color:var(--c-text-sec);width:40px;flex-shrink:0}',
    '.ts-scale-size{font-family:var(--c-mono);font-size:0.8rem;color:var(--c-accent2);width:60px;flex-shrink:0;text-align:right}',
    '.ts-scale-bar{flex:1;height:8px;background:rgba(139,92,246,0.2);border-radius:4px;overflow:hidden;min-width:4px;max-width:200px}',
    '.ts-scale-bar-fill{height:100%;background:var(--c-accent);border-radius:4px;transition:width 0.2s}',
    '.ts-scale-sample{flex:1;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ts-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);font-size:0.78rem;color:var(--c-text);display:flex;flex-direction:column;gap:6px}',
    '.ts-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.ts-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem;max-height:200px;overflow-y:auto}',
    '.ts-copy-row{display:flex;justify-content:flex-end}',
    '.ts-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.ts-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.ts-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '#ts-custom-css{font-size:0.78rem}'
  ].join('');

  var HTML = [
    '<div id="ts-app">',
    '<div id="ts-hdr"><h1>Typography Scale Generator</h1><p>Modular Scale · CSS Custom Properties</p></div>',
    '<div id="ts-main">',
    '<div class="ts-col">',
    '<div class="ts-section-label">Base Size</div>',
    '<div class="ts-input-row">',
    '<label>font-size</label>',
    '<input type="number" id="ts-base" value="16" min="8" max="100">',
    '<span>px</span>',
    '</div>',
    '<div class="ts-section-label">Scale Ratio</div>',
    '<div class="ts-ratio-grid">',
    '<button class="ts-ratio-btn" data-ratio="1.067"><span class="ts-ratio-name">Minor Second</span><span class="ts-ratio-val">1.067</span></button>',
    '<button class="ts-ratio-btn active" data-ratio="1.25"><span class="ts-ratio-name">Major Third</span><span class="ts-ratio-val">1.25</span></button>',
    '<button class="ts-ratio-btn" data-ratio="1.333"><span class="ts-ratio-name">Perfect Fourth</span><span class="ts-ratio-val">1.333</span></button>',
    '<button class="ts-ratio-btn" data-ratio="1.5"><span class="ts-ratio-name">Perfect Fifth</span><span class="ts-ratio-val">1.5</span></button>',
    '<button class="ts-ratio-btn" data-ratio="1.618"><span class="ts-ratio-name">Golden Ratio</span><span class="ts-ratio-val">1.618</span></button>',
    '<button class="ts-ratio-btn" data-ratio="2"><span class="ts-ratio-name">Octave</span><span class="ts-ratio-val">2.0</span></button>',
    '</div>',
    '<div class="ts-section-label">Custom Ratio</div>',
    '<div class="ts-custom">',
    '<input type="number" id="ts-custom-ratio" placeholder="e.g. 1.414" step="0.001" min="1" max="3">',
    '<span>×</span>',
    '</div>',
    '</div>',
    '<div class="ts-col">',
    '<div class="ts-section-label">Scale Preview</div>',
    '<div id="ts-preview"></div>',
    '<div class="ts-section-label">CSS Output</div>',
    '<div class="ts-css-output">',
    '<div class="ts-css-label">Custom Properties</div>',
    '<div class="ts-css-code" id="ts-css-code"></div>',
    '<div class="ts-copy-row"><button class="ts-copy" id="ts-copy-btn">複製 CSS</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('typography-scale-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var base = 16;
  var ratio = 1.25;
  var steps = [
    { name: '3xs', label: '3xs', delta: -3 },
    { name: '2xs', label: '2xs', delta: -2 },
    { name: 'xs',  label: 'xs',  delta: -1 },
    { name: 'sm',  label: 'sm',  delta: -0.5 },
    { name: 'base',label: 'Base',delta: 0 },
    { name: 'lg',  label: 'lg',  delta: 0.5 },
    { name: 'xl',  label: 'xl',  delta: 1 },
    { name: '2xl', label: '2xl', delta: 2 },
    { name: '3xl', label: '3xl', delta: 3 },
    { name: '4xl', label: '4xl', delta: 4 },
    { name: '5xl', label: '5xl', delta: 5 },
    { name: '6xl', label: '6xl', delta: 6 }
  ];

  function $id(id) { return document.getElementById(id); }

  function calcSize(delta) {
    if (delta === 0) return base;
    if (delta < 0) return parseFloat((base / Math.pow(ratio, Math.abs(delta))).toFixed(2));
    return parseFloat((base * Math.pow(ratio, delta)).toFixed(2));
  }

  function generateCSS() {
    var props = steps.map(function(s) {
      var size = calcSize(s.delta);
      return '  --ts-' + s.name + ': ' + size + 'px;';
    }).join('\n');
    return ':root {\n' + props + '\n}';
  }

  function getMaxSize() {
    return calcSize(6);
  }

  function renderPreview() {
    var maxSize = getMaxSize();
    var preview = $id('ts-preview');
    var html = '';
    steps.forEach(function(s) {
      var size = calcSize(s.delta);
      var barWidth = Math.round((size / maxSize) * 100);
      // Chinese-friendly sample text
      var sample = size < 12 ? '微小文字' : size < 16 ? '標準內文' : size < 24 ? '標題文字' : size < 36 ? '大標題' : '巨型標題';
      html += [
        '<div class="ts-scale-row">',
        '<span class="ts-scale-name">' + s.label + '</span>',
        '<span class="ts-scale-size">' + size + 'px</span>',
        '<div class="ts-scale-bar"><div class="ts-scale-bar-fill" style="width:' + barWidth + '%"></div></div>',
        '<span class="ts-scale-sample" style="font-size:' + size + 'px">' + sample + '</span>',
        '</div>'
      ].join('');
    });
    preview.innerHTML = html;
    $id('ts-css-code').textContent = generateCSS();
  }

  function init() {
    // Base input
    $id('ts-base').addEventListener('input', function() {
      base = parseFloat(this.value) || 16;
      renderPreview();
    });

    // Ratio buttons
    document.querySelectorAll('.ts-ratio-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.ts-ratio-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        ratio = parseFloat(btn.dataset.ratio);
        $id('ts-custom-ratio').value = '';
        renderPreview();
      });
    });

    // Custom ratio input
    $id('ts-custom-ratio').addEventListener('input', function() {
      var val = parseFloat(this.value);
      if (val && val > 1 && val < 5) {
        document.querySelectorAll('.ts-ratio-btn').forEach(function(b) { b.classList.remove('active'); });
        ratio = val;
        renderPreview();
      }
    });

    // Copy
    $id('ts-copy-btn').addEventListener('click', function() {
      var css = generateCSS();
      navigator.clipboard.writeText(css).then(function() {
        $id('ts-copy-btn').classList.add('copied');
        $id('ts-copy-btn').textContent = '已複製!';
        setTimeout(function() {
          $id('ts-copy-btn').classList.remove('copied');
          $id('ts-copy-btn').textContent = '複製 CSS';
        }, 1500);
      });
    });

    renderPreview();
  }

  function tryInit() {
    var panel = $id('panel-typography-scale');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
