(function() {
  var CSS = [
    '#jf-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-error:#f87171;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#jf-app *,*::before,*::after{box-sizing:border-box}',
    '#jf-hdr{text-align:center}',
    '#jf-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#jf-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '#jf-main{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#jf-main{grid-template-columns:1fr}}',
    '.jf-col{display:flex;flex-direction:column;gap:10px}',
    '.jf-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec)}',
    '.jf-textarea{width:100%;min-height:340px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text);resize:vertical;outline:none;transition:border-color 0.2s;line-height:1.7}',
    '.jf-textarea:focus{border-color:var(--c-accent)}',
    '.jf-textarea::placeholder{color:rgba(170,176,204,0.4)}',
    '.jf-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.jf-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s}',
    '.jf-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.jf-btn.primary{background:linear-gradient(130deg,rgba(139,92,246,0.25),rgba(6,182,212,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.jf-btn.primary:hover{background:linear-gradient(130deg,rgba(139,92,246,0.4),rgba(6,182,212,0.25))}',
    '.jf-btn.danger{color:#f87171;border-color:rgba(248,113,113,0.3)}',
    '.jf-btn.danger:hover{background:rgba(248,113,113,0.1);border-color:#f87171}',
    '.jf-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.jf-output-wrap{position:relative;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.jf-output-wrap.valid{border-color:rgba(52,211,153,0.35)}',
    '.jf-output-wrap.error{border-color:rgba(248,113,113,0.4)}',
    '#jf-output{width:100%;min-height:340px;padding:14px;font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text);white-space:pre;overflow:auto;line-height:1.7;outline:none;background:transparent;border:none;resize:none}',
    '#jf-error{padding:10px 14px;background:rgba(248,113,113,0.1);border-bottom:1px solid rgba(248,113,113,0.3);color:var(--c-error);font-size:0.78rem;font-family:var(--c-mono);display:none}',
    '.jf-output-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-top:1px solid var(--c-border);background:rgba(0,0,0,0.2)}',
    '.jf-stats{display:flex;gap:16px;flex-wrap:wrap}',
    '.jf-stat{font-size:0.72rem;color:var(--c-text-sec)}',
    '.jf-stat span{color:var(--c-accent2);font-weight:600;font-family:var(--c-mono)}',
    '.jf-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:4px 11px;cursor:pointer;color:var(--c-text-sec);font-size:0.73rem;font-weight:600;transition:all 0.18s}',
    '.jf-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.jf-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.jf-token-key{color:#79c0ff}',
    '.jf-token-str{color:#a5d6ff}',
    '.jf-token-num{color:#f2cc60}',
    '.jf-token-bool{color:#ff7b72}',
    '.jf-token-null{color:#888}',
    '.jf-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
  ].join('');

  var HTML = [
    '<div id="jf-app">',
    '<div id="jf-hdr"><h1>JSON Formatter</h1><p>Format · Minify · Validate · Inspect</p></div>',
    '<div id="jf-main">',

    '<div class="jf-col">',
    '<div class="jf-label">Input</div>',
    '<textarea class="jf-textarea" id="jf-input" placeholder=\'Paste JSON here...\' spellcheck="false" aria-label="JSON Input"></textarea>',
    '<div class="jf-btn-row">',
    '<button class="jf-btn primary" id="jf-fmt-btn">Format / Beautify</button>',
    '<button class="jf-btn" id="jf-min-btn">Minify</button>',
    '<button class="jf-btn" id="jf-val-btn">Validate</button>',
    '<button class="jf-btn danger" id="jf-clr-btn">Clear</button>',
    '</div>',
    '</div>',

    '<div class="jf-col">',
    '<div class="jf-label">Output</div>',
    '<div class="jf-output-wrap" id="jf-output-wrap">',
    '<div id="jf-error" role="alert" aria-live="polite"></div>',
    '<textarea id="jf-output" readonly spellcheck="false" aria-label="JSON Output" aria-readonly="true"></textarea>',
    '<div class="jf-output-footer">',
    '<div class="jf-stats">',
    '<div class="jf-stat">Keys: <span id="jf-stat-keys">—</span></div>',
    '<div class="jf-stat">Depth: <span id="jf-stat-depth">—</span></div>',
    '<div class="jf-stat">Size: <span id="jf-stat-size">—</span></div>',
    '</div>',
    '<button class="jf-copy" id="jf-copy-btn" aria-label="Copy output JSON">Copy</button>',
    '</div>',
    '</div>',
    '</div>',

    '</div>',
    '<div id="jf-announce" class="jf-sr-only" role="status" aria-live="polite"></div>',
    '</div>'
  ].join('');

  var container = document.getElementById('json-formatter-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };
  var input = $id('jf-input');
  var output = $id('jf-output');
  var errorEl = $id('jf-error');
  var wrapEl = $id('jf-output-wrap');
  var announce = $id('jf-announce');

  function countKeys(obj) {
    if (typeof obj !== 'object' || obj === null) return 0;
    var count = 0;
    if (Array.isArray(obj)) {
      obj.forEach(function(v) { count += countKeys(v); });
    } else {
      Object.keys(obj).forEach(function(k) { count += 1 + countKeys(obj[k]); });
    }
    return count;
  }

  function maxDepth(obj, d) {
    d = d || 0;
    if (typeof obj !== 'object' || obj === null) return d;
    var max = d;
    var vals = Array.isArray(obj) ? obj : Object.values(obj);
    vals.forEach(function(v) {
      var nd = maxDepth(v, d + 1);
      if (nd > max) max = nd;
    });
    return max;
  }

  function formatBytes(n) {
    if (n < 1024) return n + ' B';
    return (n / 1024).toFixed(1) + ' KB';
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    wrapEl.className = 'jf-output-wrap error';
  }

  function clearError() {
    errorEl.style.display = 'none';
    wrapEl.className = 'jf-output-wrap';
  }

  function setStats(json, parsed) {
    try {
      $id('jf-stat-keys').textContent = countKeys(parsed);
      $id('jf-stat-depth').textContent = maxDepth(parsed);
      $id('jf-stat-size').textContent = formatBytes(new TextEncoder().encode(json).length);
    } catch(e) {
      $id('jf-stat-keys').textContent = '—';
      $id('jf-stat-depth').textContent = '—';
      $id('jf-stat-size').textContent = '—';
    }
  }

  function resetStats() {
    $id('jf-stat-keys').textContent = '—';
    $id('jf-stat-depth').textContent = '—';
    $id('jf-stat-size').textContent = '—';
  }

  function parseWithError(text) {
    try {
      return { ok: true, val: JSON.parse(text) };
    } catch(e) {
      var msg = e.message || 'Invalid JSON';
      var lineMatch = msg.match(/position (\d+)/);
      if (lineMatch) {
        var pos = parseInt(lineMatch[1], 10);
        var lines = text.substring(0, pos).split('\n');
        msg = 'Error at line ' + lines.length + ', col ' + lines[lines.length - 1].length + ': ' + msg;
      }
      return { ok: false, msg: msg };
    }
  }

  $id('jf-fmt-btn').addEventListener('click', function() {
    var text = input.value.trim();
    if (!text) { output.value = ''; clearError(); resetStats(); return; }
    var r = parseWithError(text);
    if (!r.ok) { showError(r.msg); output.value = ''; resetStats(); return; }
    clearError();
    var formatted = JSON.stringify(r.val, null, 2);
    output.value = formatted;
    wrapEl.className = 'jf-output-wrap valid';
    setStats(formatted, r.val);
    announce.textContent = 'Formatted. ' + countKeys(r.val) + ' keys.';
  });

  $id('jf-min-btn').addEventListener('click', function() {
    var text = input.value.trim();
    if (!text) { output.value = ''; clearError(); resetStats(); return; }
    var r = parseWithError(text);
    if (!r.ok) { showError(r.msg); output.value = ''; resetStats(); return; }
    clearError();
    var minified = JSON.stringify(r.val);
    output.value = minified;
    wrapEl.className = 'jf-output-wrap valid';
    setStats(minified, r.val);
    announce.textContent = 'Minified.';
  });

  $id('jf-val-btn').addEventListener('click', function() {
    var text = input.value.trim();
    if (!text) { clearError(); resetStats(); output.value = ''; return; }
    var r = parseWithError(text);
    if (!r.ok) {
      showError(r.msg);
      output.value = '';
      resetStats();
      announce.textContent = 'Invalid JSON: ' + r.msg;
    } else {
      clearError();
      wrapEl.className = 'jf-output-wrap valid';
      output.value = 'Valid JSON ✓';
      setStats(text, r.val);
      announce.textContent = 'Valid JSON.';
    }
  });

  $id('jf-clr-btn').addEventListener('click', function() {
    input.value = '';
    output.value = '';
    clearError();
    resetStats();
    wrapEl.className = 'jf-output-wrap';
    announce.textContent = 'Cleared.';
  });

  $id('jf-copy-btn').addEventListener('click', function() {
    var text = output.value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function() {
      var btn = $id('jf-copy-btn');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      announce.textContent = 'Copied to clipboard.';
    }).catch(function() {
      output.select();
      document.execCommand('copy');
    });
  });

  // Auto-format on paste if content looks like JSON
  input.addEventListener('input', function() {
    clearError();
    wrapEl.className = 'jf-output-wrap';
  });
})();
