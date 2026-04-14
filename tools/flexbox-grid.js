(function() {
  var CSS = [
    '#fg-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;height:100%;overflow-y:auto}',
    '#fg-app *,*::before,*::after{box-sizing:border-box}',
    '#fg-hdr{text-align:center}',
    '#fg-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}',
    '#fg-hdr p{font-size:0.85rem;color:var(--c-text-sec)}',
    '#fg-mode-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:4px;width:fit-content}',
    '.fg-mode-tab{padding:7px 16px;border:none;border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.18s}',
    '.fg-mode-tab:hover{background:rgba(255,255,255,0.05);color:var(--c-text)}',
    '.fg-mode-tab.active{background:var(--c-accent);color:#fff}',
    '#fg-main{display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#fg-main{grid-template-columns:1fr}}',
    '.fg-col{display:flex;flex-direction:column;gap:12px}',
    '.fg-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.fg-ctrl{display:flex;flex-direction:column;gap:6px}',
    '.fg-ctrl-row{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '.fg-ctrl label{font-size:0.8rem;color:var(--c-text-sec);width:60px;flex-shrink:0;text-align:right}',
    '.fg-ctrl select{flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:6px;color:var(--c-text);font-family:var(--c-mono);font-size:0.8rem;padding:4px 6px;outline:none;cursor:pointer}',
    '.fg-ctrl select:focus{border-color:var(--c-accent)}',
    '.fg-preview-area{background:rgba(0,0,0,0.2);border:1px solid var(--c-border);border-radius:12px;padding:16px;min-height:240px;transition:all 0.15s}',
    '#fg-flex-container{display:flex;gap:8px;min-height:180px;align-items:flex-start;flex-wrap:nowrap}',
    '#fg-flex-container.wrap{flex-wrap:wrap}',
    '#fg-flex-container.wrap-reverse{flex-wrap:wrap-reverse}',
    '.fg-item{width:60px;height:60px;background:rgba(139,92,246,0.3);border:1px solid rgba(139,92,246,0.6);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text);transition:all 0.15s;flex-shrink:0}',
    '.fg-item:hover{background:rgba(139,92,246,0.5)}',
    '#fg-grid-container{display:grid;gap:8px;min-height:180px}',
    '.fg-grid-item{background:rgba(139,92,246,0.3);border:1px solid rgba(139,92,246,0.6);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text);min-height:60px;transition:all 0.15s}',
    '#fg-item-count{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:8px;padding:8px 12px}',
    '#fg-item-count label{font-size:0.8rem;color:var(--c-text-sec);flex-shrink:0}',
    '#fg-item-count input{background:transparent;border:none;outline:none;color:var(--c-text);font-family:var(--c-mono);font-size:0.9rem;width:40px;text-align:center}',
    '.fg-css-output{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px;font-family:var(--c-mono);display:flex;flex-direction:column;gap:6px}',
    '.fg-css-label{font-size:0.68rem;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}',
    '.fg-css-code{color:#e6edf3;white-space:pre-wrap;line-height:1.7;font-size:0.8rem}',
    '.fg-copy-row{display:flex;justify-content:flex-end;padding-top:4px}',
    '.fg-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:5px 12px;cursor:pointer;color:var(--c-text-sec);font-size:0.75rem;font-weight:600;transition:all 0.18s}',
    '.fg-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.fg-copy.copied{color:var(--c-success);border-color:var(--c-success)}'
  ].join('');

  var HTML = [
    '<div id="fg-app">',
    '<div id="fg-hdr"><h1>Flexbox & Grid Generator</h1><p>即時預覽 · CSS 輸出</p></div>',
    '<div id="fg-mode-tabs">',
    '<button class="fg-mode-tab active" data-mode="flex">Flexbox</button>',
    '<button class="fg-mode-tab" data-mode="grid">CSS Grid</button>',
    '</div>',
    '<div id="fg-main">',
    '<div class="fg-col" id="fg-controls">',
    '<div class="fg-section-label">Container</div>',
    '<div id="fg-container-ctrl"></div>',
    '<div id="fg-item-count"><label>Items</label><input type=number id=fg-count min=1 max=12 value=4></div>',
    '<div class="fg-section-label">CSS 輸出</div>',
    '</div>',
    '<div class="fg-col">',
    '<div class="fg-section-label">預覽</div>',
    '<div class="fg-preview-area" id="fg-preview-area"></div>',
    '<div class="fg-css-output">',
    '<div class="fg-css-code" id="fg-css-code"></div>',
    '<div class="fg-copy-row"><button class="fg-copy" id="fg-copy-btn">複製</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('flexbox-grid-app');
  if (!container) return;

  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };
  var mode = 'flex';
  var itemCount = 4;

  var flexControls = [
    { key: 'flex-direction', label: 'Direction', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
    { key: 'flex-wrap', label: 'Wrap', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    { key: 'justify-content', label: 'Justify', options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] },
    { key: 'align-items', label: 'Align Items', options: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] },
    { key: 'align-content', label: 'Align Content', options: ['normal', 'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'stretch'] },
    { key: 'gap', label: 'Gap', options: ['0px', '4px', '8px', '12px', '16px', '24px'] }
  ];

  var gridControls = [
    { key: 'grid-template-columns', label: 'Columns', options: ['repeat(1,1fr)', 'repeat(2,1fr)', 'repeat(3,1fr)', 'repeat(4,1fr)', 'repeat(auto-fit,minmax(120px,1fr))', 'repeat(12,1fr)'] },
    { key: 'grid-template-rows', label: 'Rows', options: ['auto', '100px', '150px', '1fr', 'repeat(3,1fr)'] },
    { key: 'justify-items', label: 'Justify Items', options: ['stretch', 'start', 'center', 'end'] },
    { key: 'align-items', label: 'Align Items', options: ['stretch', 'start', 'center', 'end', 'baseline'] },
    { key: 'justify-content', label: 'Justify Content', options: ['start', 'center', 'end', 'space-between', 'space-around', 'stretch'] },
    { key: 'align-content', label: 'Align Content', options: ['start', 'center', 'end', 'space-between', 'space-around', 'stretch'] },
    { key: 'gap', label: 'Gap', options: ['0px', '4px', '8px', '12px', '16px', '24px'] }
  ];

  var flexValues = { 'flex-direction': 'row', 'flex-wrap': 'nowrap', 'justify-content': 'flex-start', 'align-items': 'stretch', 'align-content': 'normal', 'gap': '8px' };
  var gridValues = { 'grid-template-columns': 'repeat(3,1fr)', 'grid-template-rows': 'auto', 'justify-items': 'stretch', 'align-items': 'stretch', 'justify-content': 'start', 'align-content': 'start', 'gap': '8px' };

  function buildControls(controls, values) {
    var html = '<div class="fg-ctrl">';
    controls.forEach(function(c) {
      var opts = c.options.map(function(o) {
        return '<option value="' + o + '"' + (values[c.key] === o ? ' selected' : '') + '>' + o + '</option>';
      }).join('');
      html += '<div class="fg-ctrl-row"><label>' + c.label + '</label><select id="fg-sel-' + c.key + '">' + opts + '</select></div>';
    });
    html += '</div>';
    return html;
  }

  function renderFlexContainer() {
    var style = Object.keys(flexValues).map(function(k) { return k + ': ' + flexValues[k]; }).join('; ');
    $id('fg-flex-container').style.cssText = style;
  }

  function renderGridContainer() {
    var style = Object.keys(gridValues).map(function(k) { return k + ': ' + gridValues[k]; }).join('; ');
    $id('fg-grid-container').style.cssText = style;
  }

  function buildCSS() {
    if (mode === 'flex') {
      var containerCss = Object.keys(flexValues).map(function(k) { return k + ': ' + flexValues[k]; }).join(';\n  ');
      return '.container {\n  display: flex;\n  ' + containerCss + ';\n}';
    } else {
      var containerCss = Object.keys(gridValues).map(function(k) { return k + ': ' + gridValues[k]; }).join(';\n  ');
      return '.container {\n  display: grid;\n  ' + containerCss + ';\n}';
    }
  }

  function renderItems() {
    if (mode === 'flex') {
      var html = '';
      for (var i = 0; i < itemCount; i++) html += '<div class="fg-item">' + (i+1) + '</div>';
      $id('fg-preview-area').innerHTML = '<div id="fg-flex-container" style="flex-wrap:' + flexValues['flex-wrap'] + ';gap:' + flexValues['gap'] + ';justify-content:' + flexValues['justify-content'] + ';align-items:' + flexValues['align-items'] + ';align-content:' + flexValues['align-content'] + ';flex-direction:' + flexValues['flex-direction'] + '">' + html + '</div>';
    } else {
      var html = '';
      for (var i = 0; i < itemCount; i++) html += '<div class="fg-grid-item">' + (i+1) + '</div>';
      $id('fg-preview-area').innerHTML = '<div id="fg-grid-container" style="grid-template-columns:' + gridValues['grid-template-columns'] + ';grid-template-rows:' + gridValues['grid-template-rows'] + ';gap:' + gridValues['gap'] + ';justify-items:' + gridValues['justify-items'] + ';align-items:' + gridValues['align-items'] + ';justify-content:' + gridValues['justify-content'] + ';align-content:' + gridValues['align-content'] + '">' + html + '</div>';
    }
    $id('fg-css-code').textContent = buildCSS();
  }

  function init() {
    // Render initial
    $id('fg-controls').innerHTML = buildControls(flexControls, flexValues);
    renderItems();

    // Mode switch
    document.querySelectorAll('.fg-mode-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.fg-mode-tab').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        mode = btn.dataset.mode;
        if (mode === 'flex') {
          $id('fg-controls').innerHTML = '<div class="fg-section-label">Container</div>' + buildControls(flexControls, flexValues);
        } else {
          $id('fg-controls').innerHTML = '<div class="fg-section-label">Container</div>' + buildControls(gridControls, gridValues);
        }
        renderItems();
        attachControlListeners();
      });
    });

    attachControlListeners();

    // Item count
    $id('fg-count').addEventListener('input', function() {
      itemCount = Math.max(1, Math.min(12, parseInt(this.value) || 4));
      this.value = itemCount;
      renderItems();
    });

    // Copy
    $id('fg-copy-btn').addEventListener('click', function() {
      navigator.clipboard.writeText(buildCSS()).then(function() {
        $id('fg-copy-btn').classList.add('copied');
        $id('fg-copy-btn').textContent = '已複製!';
        setTimeout(function() {
          $id('fg-copy-btn').classList.remove('copied');
          $id('fg-copy-btn').textContent = '複製';
        }, 1500);
      });
    });
  }

  function attachControlListeners() {
    var controls = mode === 'flex' ? flexControls : gridControls;
    var values = mode === 'flex' ? flexValues : gridValues;
    controls.forEach(function(c) {
      var sel = $id('fg-sel-' + c.key);
      if (!sel) return;
      sel.addEventListener('change', function() {
        values[c.key] = this.value;
        renderItems();
        $id('fg-css-code').textContent = buildCSS();
      });
    });
  }

  function tryInit() {
    var panel = $id('panel-flexbox-grid');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
