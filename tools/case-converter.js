(function() {
  const CSS = `
#cc-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--c-mono:'JetBrains Mono','Fira Code',monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}
#cc-app *,#cc-app *::before,#cc-app *::after{box-sizing:border-box}
#cc-hdr{text-align:center}
#cc-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}
#cc-hdr p{font-size:0.85rem;color:var(--c-text-sec)}
#cc-input-wrap{position:relative}
#cc-input{width:100%;min-height:100px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:12px;color:var(--c-text);font-family:var(--c-mono);font-size:0.88rem;line-height:1.6;padding:14px 16px;resize:vertical;outline:none;transition:border-color 0.18s}
#cc-input::placeholder{color:var(--c-text-sec);opacity:0.6}
#cc-input:focus{border-color:var(--c-accent)}
#cc-input-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
#cc-input-toolbar .cc-lbl{font-size:0.75rem;font-weight:700;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}
#cc-clear-btn{padding:5px 12px;border:1px solid var(--c-border);border-radius:6px;background:transparent;color:var(--c-text-sec);font-size:0.75rem;cursor:pointer;transition:all 0.18s}
#cc-clear-btn:hover{border-color:#ef4444;color:#ef4444;background:rgba(239,68,68,0.08)}
#cc-clear-btn:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
#cc-results{display:grid;grid-template-columns:1fr 1fr;gap:10px}
@media(max-width:600px){#cc-results{grid-template-columns:1fr}}
.cc-item{background:var(--c-card);border:1px solid var(--c-border);border-radius:12px;padding:13px 15px;display:flex;flex-direction:column;gap:7px;transition:border-color 0.18s}
.cc-item:hover{border-color:rgba(139,92,246,0.35)}
.cc-item-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.cc-item-name{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec)}
.cc-copy{display:flex;align-items:center;gap:5px;padding:4px 10px;border:1px solid var(--c-border);border-radius:6px;background:transparent;color:var(--c-text-sec);font-size:0.72rem;font-weight:600;cursor:pointer;transition:all 0.18s;white-space:nowrap}
.cc-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.08)}
.cc-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.08)}
.cc-copy:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
.cc-value{font-family:var(--c-mono);font-size:0.85rem;color:var(--c-text);word-break:break-all;line-height:1.5;min-height:20px}
.cc-value.empty{color:var(--c-text-sec);opacity:0.4;font-style:italic;font-size:0.78rem}
  `;

  const HTML = `
<div id="cc-app">
  <div id="cc-hdr">
    <h1>Case Converter</h1>
    <p>Convert text between all common naming conventions in real-time</p>
  </div>
  <div id="cc-input-section">
    <div id="cc-input-toolbar">
      <span class="cc-lbl">Input</span>
      <button id="cc-clear-btn">Clear</button>
    </div>
    <div id="cc-input-wrap">
      <textarea id="cc-input" placeholder="Type or paste your text here…" aria-label="Input text to convert" rows="4"></textarea>
    </div>
  </div>
  <div id="cc-results" aria-live="polite" aria-label="Conversion results">
    <div class="cc-item" data-case="camel">
      <div class="cc-item-top">
        <span class="cc-item-name">camelCase</span>
        <button class="cc-copy" aria-label="Copy camelCase">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="pascal">
      <div class="cc-item-top">
        <span class="cc-item-name">PascalCase</span>
        <button class="cc-copy" aria-label="Copy PascalCase">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="snake">
      <div class="cc-item-top">
        <span class="cc-item-name">snake_case</span>
        <button class="cc-copy" aria-label="Copy snake_case">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="screaming">
      <div class="cc-item-top">
        <span class="cc-item-name">SCREAMING_SNAKE_CASE</span>
        <button class="cc-copy" aria-label="Copy SCREAMING_SNAKE_CASE">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="kebab">
      <div class="cc-item-top">
        <span class="cc-item-name">kebab-case</span>
        <button class="cc-copy" aria-label="Copy kebab-case">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="upperkebab">
      <div class="cc-item-top">
        <span class="cc-item-name">UPPER-KEBAB-CASE</span>
        <button class="cc-copy" aria-label="Copy UPPER-KEBAB-CASE">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="title">
      <div class="cc-item-top">
        <span class="cc-item-name">Title Case</span>
        <button class="cc-copy" aria-label="Copy Title Case">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="upper">
      <div class="cc-item-top">
        <span class="cc-item-name">UPPERCASE</span>
        <button class="cc-copy" aria-label="Copy UPPERCASE">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="lower">
      <div class="cc-item-top">
        <span class="cc-item-name">lowercase</span>
        <button class="cc-copy" aria-label="Copy lowercase">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
    <div class="cc-item" data-case="sentence">
      <div class="cc-item-top">
        <span class="cc-item-name">Sentence case</span>
        <button class="cc-copy" aria-label="Copy Sentence case">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <div class="cc-value empty" data-output>Type something above…</div>
    </div>
  </div>
</div>
  `;

  const container = document.getElementById('case-converter-app');
  if (!container) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  // --- Conversion functions ---
  function tokenize(text) {
    // Split on whitespace, punctuation, camelCase boundaries, underscores, hyphens
    return text
      .replace(/([a-z])([A-Z])/g, '$1 $2')   // camelCase → camel Case
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // ABCDef → ABC Def
      .split(/[\s\-_\/\\.,;:!?'"()\[\]{}<>|@#$%^&*+=~`]+/)
      .map(w => w.trim())
      .filter(Boolean);
  }

  const converters = {
    camel: (words) => words.map((w, i) => i === 0 ? w.toLowerCase() : cap(w)).join(''),
    pascal: (words) => words.map(w => cap(w)).join(''),
    snake: (words) => words.map(w => w.toLowerCase()).join('_'),
    screaming: (words) => words.map(w => w.toUpperCase()).join('_'),
    kebab: (words) => words.map(w => w.toLowerCase()).join('-'),
    upperkebab: (words) => words.map(w => w.toUpperCase()).join('-'),
    title: (words) => words.map(w => cap(w)).join(' '),
    upper: (words) => words.join(' ').toUpperCase(),
    lower: (words) => words.join(' ').toLowerCase(),
    sentence: (words) => {
      const joined = words.join(' ').toLowerCase();
      return joined.charAt(0).toUpperCase() + joined.slice(1);
    }
  };

  function cap(w) {
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }

  function convert(text) {
    if (!text.trim()) return null;
    const words = tokenize(text);
    if (!words.length) return null;
    const results = {};
    for (const key in converters) {
      results[key] = converters[key](words);
    }
    return results;
  }

  const COPY_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const CHECK_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';

  function updateResults(text) {
    const results = convert(text);
    document.querySelectorAll('#cc-app .cc-item').forEach(item => {
      const key = item.dataset.case;
      const output = item.querySelector('[data-output]');
      if (!results) {
        output.textContent = 'Type something above…';
        output.classList.add('empty');
      } else {
        output.textContent = results[key] || '';
        output.classList.remove('empty');
      }
    });
  }

  document.getElementById('cc-input').addEventListener('input', function() {
    updateResults(this.value);
  });

  document.getElementById('cc-clear-btn').addEventListener('click', function() {
    document.getElementById('cc-input').value = '';
    updateResults('');
  });

  // Copy buttons
  document.querySelectorAll('#cc-app .cc-copy').forEach(btn => {
    btn.addEventListener('click', function() {
      const output = this.closest('.cc-item').querySelector('[data-output]');
      const text = output.textContent;
      if (!text || output.classList.contains('empty')) return;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = CHECK_SVG + ' Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = COPY_SVG + ' Copy';
        }, 2000);
      });
    });
  });
})();
