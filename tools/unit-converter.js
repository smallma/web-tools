(function() {
  const CSS = `
#uc-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--c-mono:'JetBrains Mono','Fira Code',monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}
#uc-app *,#uc-app *::before,#uc-app *::after{box-sizing:border-box}
#uc-hdr{text-align:center}
#uc-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}
#uc-hdr p{font-size:0.85rem;color:var(--c-text-sec)}
#uc-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:12px;padding:5px;flex-wrap:wrap}
.uc-tab{flex:1;min-width:90px;padding:8px 6px;border:none;border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.18s;white-space:nowrap}
.uc-tab:hover{background:rgba(255,255,255,0.05);color:var(--c-text)}
.uc-tab.active{background:var(--c-accent);color:#fff;box-shadow:0 2px 8px rgba(139,92,246,0.35)}
.uc-tab:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
.uc-panel{display:none;flex-direction:column;gap:16px}
.uc-panel.active{display:flex}
.uc-input-row{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:end;background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:16px}
@media(max-width:600px){.uc-input-row{grid-template-columns:1fr}}
.uc-input-group{display:flex;flex-direction:column;gap:6px}
.uc-input-group label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec)}
.uc-input-group input,.uc-input-group select{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;color:var(--c-text);font-family:var(--c-mono);font-size:0.95rem;padding:9px 12px;outline:none;transition:border-color 0.18s;width:100%}
.uc-input-group input:focus,.uc-input-group select:focus{border-color:var(--c-accent)}
.uc-input-group select option{background:#1a1a2a;color:var(--c-text)}
.uc-meta-row{display:flex;gap:12px;flex-wrap:wrap}
.uc-meta-group{display:flex;flex-direction:column;gap:5px}
.uc-meta-group label{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--c-text-sec)}
.uc-meta-group input{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:7px;color:var(--c-text);font-family:var(--c-mono);font-size:0.85rem;padding:7px 10px;outline:none;width:120px;transition:border-color 0.18s}
.uc-meta-group input:focus{border-color:var(--c-accent)}
.uc-table-wrap{background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;overflow:hidden}
.uc-table-title{padding:12px 16px;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);border-bottom:1px solid var(--c-border)}
.uc-table{width:100%;border-collapse:collapse}
.uc-table th{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--c-text-sec);text-align:left;padding:10px 16px;background:rgba(0,0,0,0.2);border-bottom:1px solid var(--c-border)}
.uc-table th:last-child{width:80px;text-align:center}
.uc-table td{padding:10px 16px;font-size:0.85rem;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle}
.uc-table tr:last-child td{border-bottom:none}
.uc-table tr.uc-highlight td{background:rgba(139,92,246,0.1)}
.uc-unit-label{font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text-sec);font-weight:700}
.uc-unit-name{font-size:0.78rem;color:var(--c-text-sec)}
.uc-value{font-family:var(--c-mono);font-size:0.92rem;color:var(--c-text)}
.uc-formula{font-size:0.72rem;color:var(--c-accent2);font-family:var(--c-mono)}
.uc-copy-cell{text-align:center}
.uc-copy-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:1px solid var(--c-border);border-radius:6px;background:transparent;color:var(--c-text-sec);cursor:pointer;transition:all 0.18s}
.uc-copy-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.08)}
.uc-copy-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.08)}
.uc-copy-btn:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
  `;

  const HTML = `
<div id="uc-app">
  <div id="uc-hdr">
    <h1>Unit Converter</h1>
    <p>CSS Units · Length · Temperature · Weight · Digital Storage</p>
  </div>
  <div id="uc-tabs" role="tablist">
    <button class="uc-tab active" data-tab="css" role="tab" aria-selected="true">CSS Units</button>
    <button class="uc-tab" data-tab="length" role="tab" aria-selected="false">Length</button>
    <button class="uc-tab" data-tab="temperature" role="tab" aria-selected="false">Temperature</button>
    <button class="uc-tab" data-tab="weight" role="tab" aria-selected="false">Weight</button>
    <button class="uc-tab" data-tab="storage" role="tab" aria-selected="false">Digital Storage</button>
  </div>

  <!-- CSS Units Panel -->
  <div class="uc-panel active" id="uc-panel-css">
    <div class="uc-input-row">
      <div class="uc-input-group">
        <label for="uc-css-val">Value</label>
        <input type="number" id="uc-css-val" value="16" step="any" aria-label="CSS value" />
      </div>
      <div class="uc-input-group">
        <label for="uc-css-unit">From Unit</label>
        <select id="uc-css-unit" aria-label="Source CSS unit">
          <option value="px">px</option>
          <option value="em">em</option>
          <option value="rem">rem</option>
          <option value="vw">vw</option>
          <option value="vh">vh</option>
          <option value="percent">%</option>
          <option value="pt">pt</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
        </select>
      </div>
    </div>
    <div class="uc-meta-row">
      <div class="uc-meta-group">
        <label for="uc-css-fs">Base Font Size (px)</label>
        <input type="number" id="uc-css-fs" value="16" step="0.5" min="1" aria-label="Base font size in px" />
      </div>
      <div class="uc-meta-group">
        <label for="uc-css-vw">Viewport Width (px)</label>
        <input type="number" id="uc-css-vw" value="1440" step="1" min="1" aria-label="Viewport width in px" />
      </div>
      <div class="uc-meta-group">
        <label for="uc-css-vh">Viewport Height (px)</label>
        <input type="number" id="uc-css-vh" value="900" step="1" min="1" aria-label="Viewport height in px" />
      </div>
      <div class="uc-meta-group">
        <label for="uc-css-parent">Parent Size (px) for %</label>
        <input type="number" id="uc-css-parent" value="1440" step="1" min="1" aria-label="Parent element size in px for percent" />
      </div>
    </div>
    <div class="uc-table-wrap">
      <div class="uc-table-title">Conversion Table</div>
      <table class="uc-table" id="uc-css-table" aria-label="CSS unit conversion results">
        <thead><tr><th>Unit</th><th>Value</th><th>Notes</th><th>Copy</th></tr></thead>
        <tbody id="uc-css-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Length Panel -->
  <div class="uc-panel" id="uc-panel-length">
    <div class="uc-input-row">
      <div class="uc-input-group">
        <label for="uc-len-val">Value</label>
        <input type="number" id="uc-len-val" value="1" step="any" aria-label="Length value" />
      </div>
      <div class="uc-input-group">
        <label for="uc-len-unit">From Unit</label>
        <select id="uc-len-unit" aria-label="Source length unit">
          <option value="mm">mm</option>
          <option value="cm">cm</option>
          <option value="m">m</option>
          <option value="km">km</option>
          <option value="in">in (inch)</option>
          <option value="ft">ft (foot)</option>
          <option value="yd">yd (yard)</option>
          <option value="mi">mi (mile)</option>
        </select>
      </div>
    </div>
    <div class="uc-table-wrap">
      <div class="uc-table-title">Conversion Table</div>
      <table class="uc-table" id="uc-len-table" aria-label="Length conversion results">
        <thead><tr><th>Unit</th><th>Name</th><th>Value</th><th>Copy</th></tr></thead>
        <tbody id="uc-len-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Temperature Panel -->
  <div class="uc-panel" id="uc-panel-temperature">
    <div class="uc-input-row">
      <div class="uc-input-group">
        <label for="uc-temp-val">Value</label>
        <input type="number" id="uc-temp-val" value="100" step="any" aria-label="Temperature value" />
      </div>
      <div class="uc-input-group">
        <label for="uc-temp-unit">From Unit</label>
        <select id="uc-temp-unit" aria-label="Source temperature unit">
          <option value="C">°C (Celsius)</option>
          <option value="F">°F (Fahrenheit)</option>
          <option value="K">K (Kelvin)</option>
        </select>
      </div>
    </div>
    <div class="uc-table-wrap">
      <div class="uc-table-title">Conversion Table</div>
      <table class="uc-table" id="uc-temp-table" aria-label="Temperature conversion results">
        <thead><tr><th>Unit</th><th>Name</th><th>Value</th><th>Formula</th><th>Copy</th></tr></thead>
        <tbody id="uc-temp-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Weight Panel -->
  <div class="uc-panel" id="uc-panel-weight">
    <div class="uc-input-row">
      <div class="uc-input-group">
        <label for="uc-wt-val">Value</label>
        <input type="number" id="uc-wt-val" value="1" step="any" aria-label="Weight value" />
      </div>
      <div class="uc-input-group">
        <label for="uc-wt-unit">From Unit</label>
        <select id="uc-wt-unit" aria-label="Source weight unit">
          <option value="g">g (gram)</option>
          <option value="kg">kg (kilogram)</option>
          <option value="oz">oz (ounce)</option>
          <option value="lb">lb (pound)</option>
        </select>
      </div>
    </div>
    <div class="uc-table-wrap">
      <div class="uc-table-title">Conversion Table</div>
      <table class="uc-table" id="uc-wt-table" aria-label="Weight conversion results">
        <thead><tr><th>Unit</th><th>Name</th><th>Value</th><th>Copy</th></tr></thead>
        <tbody id="uc-wt-tbody"></tbody>
      </table>
    </div>
  </div>

  <!-- Digital Storage Panel -->
  <div class="uc-panel" id="uc-panel-storage">
    <div class="uc-input-row">
      <div class="uc-input-group">
        <label for="uc-ds-val">Value</label>
        <input type="number" id="uc-ds-val" value="1" step="any" min="0" aria-label="Storage value" />
      </div>
      <div class="uc-input-group">
        <label for="uc-ds-unit">From Unit</label>
        <select id="uc-ds-unit" aria-label="Source storage unit">
          <option value="B">B (Byte)</option>
          <option value="KB">KB (Kilobyte)</option>
          <option value="MB">MB (Megabyte)</option>
          <option value="GB" selected>GB (Gigabyte)</option>
          <option value="TB">TB (Terabyte)</option>
        </select>
      </div>
    </div>
    <div class="uc-table-wrap">
      <div class="uc-table-title">Conversion Table</div>
      <table class="uc-table" id="uc-ds-table" aria-label="Digital storage conversion results">
        <thead><tr><th>Unit</th><th>Name</th><th>Value</th><th>Copy</th></tr></thead>
        <tbody id="uc-ds-tbody"></tbody>
      </table>
    </div>
  </div>
</div>
  `;

  const container = document.getElementById('unit-converter-app');
  if (!container) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  // --- Helpers ---
  const COPY_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const CHECK_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';

  function fmt(n) {
    if (n === null || isNaN(n)) return '—';
    if (Math.abs(n) === 0) return '0';
    if (Math.abs(n) >= 0.001 && Math.abs(n) < 1e12) {
      // Use up to 6 significant digits
      const s = parseFloat(n.toPrecision(7)).toString();
      return s;
    }
    return n.toExponential(4);
  }

  function makeCopyBtn(value) {
    return `<td class="uc-copy-cell"><button class="uc-copy-btn" aria-label="Copy ${value}" data-val="${value}">${COPY_SVG}</button></td>`;
  }

  function attachCopyBtns(tbody) {
    tbody.querySelectorAll('.uc-copy-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const val = this.dataset.val;
        navigator.clipboard.writeText(val).then(() => {
          this.classList.add('copied');
          this.innerHTML = CHECK_SVG;
          setTimeout(() => {
            this.classList.remove('copied');
            this.innerHTML = COPY_SVG;
          }, 2000);
        });
      });
    });
  }

  // --- CSS Units ---
  function toPx(val, unit, fs, vw, vh, parent) {
    switch (unit) {
      case 'px': return val;
      case 'em': return val * fs;
      case 'rem': return val * fs;
      case 'vw': return val * vw / 100;
      case 'vh': return val * vh / 100;
      case 'percent': return val * parent / 100;
      case 'pt': return val * (96 / 72);
      case 'cm': return val * (96 / 2.54);
      case 'mm': return val * (96 / 25.4);
      default: return null;
    }
  }

  function fromPx(px, unit, fs, vw, vh, parent) {
    switch (unit) {
      case 'px': return px;
      case 'em': return px / fs;
      case 'rem': return px / fs;
      case 'vw': return px / vw * 100;
      case 'vh': return px / vh * 100;
      case 'percent': return px / parent * 100;
      case 'pt': return px * (72 / 96);
      case 'cm': return px * (2.54 / 96);
      case 'mm': return px * (25.4 / 96);
      default: return null;
    }
  }

  const CSS_UNITS = [
    { key: 'px', label: 'px', name: 'Pixel', note: 'Absolute' },
    { key: 'em', label: 'em', name: 'em', note: 'Relative to parent font-size' },
    { key: 'rem', label: 'rem', name: 'rem', note: 'Relative to root font-size' },
    { key: 'vw', label: 'vw', name: 'Viewport Width', note: '1vw = 1% viewport width' },
    { key: 'vh', label: 'vh', name: 'Viewport Height', note: '1vh = 1% viewport height' },
    { key: 'percent', label: '%', name: 'Percent', note: 'Relative to parent' },
    { key: 'pt', label: 'pt', name: 'Point', note: '1pt = 1/72 inch' },
    { key: 'cm', label: 'cm', name: 'Centimeter', note: 'Physical unit' },
    { key: 'mm', label: 'mm', name: 'Millimeter', note: 'Physical unit' },
  ];

  function updateCss() {
    const val = parseFloat(document.getElementById('uc-css-val').value);
    const unit = document.getElementById('uc-css-unit').value;
    const fs = parseFloat(document.getElementById('uc-css-fs').value) || 16;
    const vw = parseFloat(document.getElementById('uc-css-vw').value) || 1440;
    const vh = parseFloat(document.getElementById('uc-css-vh').value) || 900;
    const parent = parseFloat(document.getElementById('uc-css-parent').value) || 1440;

    if (isNaN(val)) return;
    const px = toPx(val, unit, fs, vw, vh, parent);
    const tbody = document.getElementById('uc-css-tbody');
    let rows = '';
    for (const u of CSS_UNITS) {
      const converted = fromPx(px, u.key, fs, vw, vh, parent);
      const display = fmt(converted);
      const fullVal = `${display}${u.label}`;
      const isSource = u.key === unit;
      rows += `<tr${isSource ? ' class="uc-highlight"' : ''}>
        <td class="uc-unit-label">${u.label}${isSource ? ' <span style="font-size:0.65rem;color:var(--c-accent);font-weight:700">← source</span>' : ''}</td>
        <td class="uc-value">${display}</td>
        <td class="uc-unit-name">${u.note}</td>
        ${makeCopyBtn(fullVal)}
      </tr>`;
    }
    tbody.innerHTML = rows;
    attachCopyBtns(tbody);
  }

  ['uc-css-val','uc-css-unit','uc-css-fs','uc-css-vw','uc-css-vh','uc-css-parent'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateCss);
  });

  // --- Length ---
  // All to meters
  const LEN_UNITS = [
    { key: 'mm', label: 'mm', name: 'Millimeter', toM: 0.001 },
    { key: 'cm', label: 'cm', name: 'Centimeter', toM: 0.01 },
    { key: 'm', label: 'm', name: 'Meter', toM: 1 },
    { key: 'km', label: 'km', name: 'Kilometer', toM: 1000 },
    { key: 'in', label: 'in', name: 'Inch', toM: 0.0254 },
    { key: 'ft', label: 'ft', name: 'Foot', toM: 0.3048 },
    { key: 'yd', label: 'yd', name: 'Yard', toM: 0.9144 },
    { key: 'mi', label: 'mi', name: 'Mile', toM: 1609.344 },
  ];

  function updateLength() {
    const val = parseFloat(document.getElementById('uc-len-val').value);
    const unit = document.getElementById('uc-len-unit').value;
    if (isNaN(val)) return;
    const src = LEN_UNITS.find(u => u.key === unit);
    if (!src) return;
    const meters = val * src.toM;
    const tbody = document.getElementById('uc-len-tbody');
    let rows = '';
    for (const u of LEN_UNITS) {
      const converted = meters / u.toM;
      const display = fmt(converted);
      const isSource = u.key === unit;
      rows += `<tr${isSource ? ' class="uc-highlight"' : ''}>
        <td class="uc-unit-label">${u.label}${isSource ? ' <span style="font-size:0.65rem;color:var(--c-accent);font-weight:700">← source</span>' : ''}</td>
        <td class="uc-unit-name">${u.name}</td>
        <td class="uc-value">${display}</td>
        ${makeCopyBtn(display + ' ' + u.label)}
      </tr>`;
    }
    tbody.innerHTML = rows;
    attachCopyBtns(tbody);
  }

  ['uc-len-val','uc-len-unit'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateLength);
  });

  // --- Temperature ---
  const TEMP_UNITS = [
    {
      key: 'C', label: '°C', name: 'Celsius',
      fromC: c => c,
      formula: from => from === 'C' ? '—' : from === 'F' ? '(°F − 32) × 5/9' : 'K − 273.15'
    },
    {
      key: 'F', label: '°F', name: 'Fahrenheit',
      fromC: c => c * 9/5 + 32,
      formula: from => from === 'F' ? '—' : from === 'C' ? '(°C × 9/5) + 32' : '(K − 273.15) × 9/5 + 32'
    },
    {
      key: 'K', label: 'K', name: 'Kelvin',
      fromC: c => c + 273.15,
      formula: from => from === 'K' ? '—' : from === 'C' ? '°C + 273.15' : '(°F − 32) × 5/9 + 273.15'
    },
  ];

  function toC(val, unit) {
    if (unit === 'C') return val;
    if (unit === 'F') return (val - 32) * 5 / 9;
    if (unit === 'K') return val - 273.15;
  }

  function updateTemp() {
    const val = parseFloat(document.getElementById('uc-temp-val').value);
    const unit = document.getElementById('uc-temp-unit').value;
    if (isNaN(val)) return;
    const celsius = toC(val, unit);
    const tbody = document.getElementById('uc-temp-tbody');
    let rows = '';
    for (const u of TEMP_UNITS) {
      const converted = u.fromC(celsius);
      const display = fmt(converted);
      const isSource = u.key === unit;
      rows += `<tr${isSource ? ' class="uc-highlight"' : ''}>
        <td class="uc-unit-label">${u.label}${isSource ? ' <span style="font-size:0.65rem;color:var(--c-accent);font-weight:700">← source</span>' : ''}</td>
        <td class="uc-unit-name">${u.name}</td>
        <td class="uc-value">${display}</td>
        <td class="uc-formula">${isSource ? '—' : u.formula(unit)}</td>
        ${makeCopyBtn(display + u.label)}
      </tr>`;
    }
    tbody.innerHTML = rows;
    attachCopyBtns(tbody);
  }

  ['uc-temp-val','uc-temp-unit'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateTemp);
  });

  // --- Weight ---
  const WT_UNITS = [
    { key: 'g',  label: 'g',  name: 'Gram',     toG: 1 },
    { key: 'kg', label: 'kg', name: 'Kilogram',  toG: 1000 },
    { key: 'oz', label: 'oz', name: 'Ounce',     toG: 28.3495 },
    { key: 'lb', label: 'lb', name: 'Pound',     toG: 453.592 },
  ];

  function updateWeight() {
    const val = parseFloat(document.getElementById('uc-wt-val').value);
    const unit = document.getElementById('uc-wt-unit').value;
    if (isNaN(val)) return;
    const src = WT_UNITS.find(u => u.key === unit);
    if (!src) return;
    const grams = val * src.toG;
    const tbody = document.getElementById('uc-wt-tbody');
    let rows = '';
    for (const u of WT_UNITS) {
      const converted = grams / u.toG;
      const display = fmt(converted);
      const isSource = u.key === unit;
      rows += `<tr${isSource ? ' class="uc-highlight"' : ''}>
        <td class="uc-unit-label">${u.label}${isSource ? ' <span style="font-size:0.65rem;color:var(--c-accent);font-weight:700">← source</span>' : ''}</td>
        <td class="uc-unit-name">${u.name}</td>
        <td class="uc-value">${display}</td>
        ${makeCopyBtn(display + ' ' + u.label)}
      </tr>`;
    }
    tbody.innerHTML = rows;
    attachCopyBtns(tbody);
  }

  ['uc-wt-val','uc-wt-unit'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateWeight);
  });

  // --- Digital Storage ---
  const DS_UNITS = [
    { key: 'B',  label: 'B',  name: 'Byte',      toB: 1 },
    { key: 'KB', label: 'KB', name: 'Kilobyte',  toB: 1024 },
    { key: 'MB', label: 'MB', name: 'Megabyte',  toB: 1024 ** 2 },
    { key: 'GB', label: 'GB', name: 'Gigabyte',  toB: 1024 ** 3 },
    { key: 'TB', label: 'TB', name: 'Terabyte',  toB: 1024 ** 4 },
  ];

  function updateStorage() {
    const val = parseFloat(document.getElementById('uc-ds-val').value);
    const unit = document.getElementById('uc-ds-unit').value;
    if (isNaN(val)) return;
    const src = DS_UNITS.find(u => u.key === unit);
    if (!src) return;
    const bytes = val * src.toB;
    const tbody = document.getElementById('uc-ds-tbody');
    let rows = '';
    for (const u of DS_UNITS) {
      const converted = bytes / u.toB;
      const display = fmt(converted);
      const isSource = u.key === unit;
      rows += `<tr${isSource ? ' class="uc-highlight"' : ''}>
        <td class="uc-unit-label">${u.label}${isSource ? ' <span style="font-size:0.65rem;color:var(--c-accent);font-weight:700">← source</span>' : ''}</td>
        <td class="uc-unit-name">${u.name}</td>
        <td class="uc-value">${display}</td>
        ${makeCopyBtn(display + ' ' + u.label)}
      </tr>`;
    }
    tbody.innerHTML = rows;
    attachCopyBtns(tbody);
  }

  ['uc-ds-val','uc-ds-unit'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateStorage);
  });

  // --- Tab switching ---
  const updateFns = { css: updateCss, length: updateLength, temperature: updateTemp, weight: updateWeight, storage: updateStorage };

  document.querySelectorAll('#uc-app .uc-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('#uc-app .uc-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('#uc-app .uc-panel').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      const key = this.dataset.tab;
      document.getElementById('uc-panel-' + key).classList.add('active');
      if (updateFns[key]) updateFns[key]();
    });
  });

  // Initial render
  updateCss();
  updateLength();
  updateTemp();
  updateWeight();
  updateStorage();
})();
