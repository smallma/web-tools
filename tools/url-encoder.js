(function() {
  var CSS = [
    '#ue-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-error:#f87171;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#ue-app *,*::before,*::after{box-sizing:border-box}',
    '#ue-hdr{text-align:center}',
    '#ue-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#ue-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.ue-tabs{display:flex;gap:6px;border-bottom:1px solid var(--c-border);padding-bottom:0}',
    '.ue-tab{padding:7px 20px;border-radius:8px 8px 0 0;border:1px solid transparent;border-bottom:none;background:transparent;color:var(--c-text-sec);font-size:0.82rem;font-weight:600;cursor:pointer;transition:all 0.18s;margin-bottom:-1px}',
    '.ue-tab:hover{color:var(--c-accent)}',
    '.ue-tab.active{background:rgba(139,92,246,0.12);border-color:var(--c-border);border-bottom-color:#0d0d12;color:var(--c-accent)}',
    '.ue-panel{display:none}',
    '.ue-panel.active{display:block}',
    '.ue-two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){.ue-two-col{grid-template-columns:1fr}}',
    '.ue-col{display:flex;flex-direction:column;gap:10px}',
    '.ue-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec)}',
    '.ue-textarea{width:100%;min-height:220px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text);resize:vertical;outline:none;transition:border-color 0.2s;line-height:1.7}',
    '.ue-textarea:focus{border-color:var(--c-accent)}',
    '.ue-textarea::placeholder{color:rgba(170,176,204,0.4)}',
    '.ue-textarea[readonly]{background:rgba(0,0,0,0.2);cursor:default}',
    '.ue-opts{display:flex;gap:10px;flex-wrap:wrap;align-items:center}',
    '.ue-opt{display:flex;align-items:center;gap:6px;font-size:0.78rem;color:var(--c-text-sec);cursor:pointer;user-select:none}',
    '.ue-opt input[type=radio]{width:14px;height:14px;accent-color:var(--c-accent);cursor:pointer}',
    '.ue-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}',
    '.ue-charcount{font-size:0.72rem;color:var(--c-text-sec)}',
    '.ue-charcount span{color:var(--c-accent2);font-family:var(--c-mono);font-weight:600}',
    '.ue-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:4px 11px;cursor:pointer;color:var(--c-text-sec);font-size:0.73rem;font-weight:600;transition:all 0.18s}',
    '.ue-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.ue-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.ue-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.ue-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s}',
    '.ue-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.ue-btn.danger{color:#f87171;border-color:rgba(248,113,113,0.3)}',
    '.ue-btn.danger:hover{background:rgba(248,113,113,0.1);border-color:#f87171}',
    '.ue-error{padding:8px 12px;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:8px;color:var(--c-error);font-size:0.78rem;font-family:var(--c-mono);display:none}',
    // Parse panel
    '.ue-parse-input-wrap{display:flex;flex-direction:column;gap:10px}',
    '.ue-url-input{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px 14px;font-family:var(--c-mono);font-size:0.82rem;color:var(--c-text);outline:none;transition:border-color 0.2s}',
    '.ue-url-input:focus{border-color:var(--c-accent)}',
    '.ue-url-input::placeholder{color:rgba(170,176,204,0.4)}',
    '.ue-parse-result{display:flex;flex-direction:column;gap:14px}',
    '.ue-parse-section{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.ue-parse-section-title{padding:8px 14px;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);background:rgba(0,0,0,0.2);border-bottom:1px solid var(--c-border)}',
    '.ue-parse-table{width:100%;border-collapse:collapse}',
    '.ue-parse-table td{padding:7px 14px;font-family:var(--c-mono);font-size:0.8rem;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:top}',
    '.ue-parse-table tr:last-child td{border-bottom:none}',
    '.ue-parse-table tr:hover td{background:rgba(139,92,246,0.06)}',
    '.ue-parse-table .pk{color:var(--c-text-sec);width:140px;font-size:0.75rem}',
    '.ue-parse-table .pv{color:var(--c-text);word-break:break-all}',
    '.ue-parse-table .pv.empty{color:rgba(170,176,204,0.3);font-style:italic}',
    '.ue-params-header{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-bottom:1px solid var(--c-border)}',
    '.ue-params-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec)}',
    '.ue-empty-msg{padding:20px;text-align:center;color:var(--c-text-sec);font-size:0.8rem}',
    '.ue-parse-placeholder{padding:32px;text-align:center;color:rgba(170,176,204,0.35);font-size:0.82rem}',
    '.ue-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
  ].join('');

  var HTML = [
    '<div id="ue-app">',
    '<div id="ue-hdr"><h1>URL Encoder / Decoder</h1><p>Encode · Decode · Parse URLs</p></div>',

    '<div class="ue-tabs" role="tablist" aria-label="Mode">',
    '<button class="ue-tab active" data-tab="encode" role="tab" aria-selected="true">Encode</button>',
    '<button class="ue-tab" data-tab="decode" role="tab" aria-selected="false">Decode</button>',
    '<button class="ue-tab" data-tab="parse" role="tab" aria-selected="false">Parse URL</button>',
    '</div>',

    // ENCODE panel
    '<div class="ue-panel active" id="ue-panel-encode" role="tabpanel">',
    '<div class="ue-two-col">',

    '<div class="ue-col">',
    '<div class="ue-label">Plain Text</div>',
    '<textarea class="ue-textarea" id="ue-enc-input" placeholder="Enter text to URL encode..." spellcheck="false" aria-label="Text to encode"></textarea>',
    '<div class="ue-opts" role="group" aria-label="Encoding function">',
    '<label class="ue-opt"><input type="radio" name="ue-enc-fn" value="component" checked> encodeURIComponent</label>',
    '<label class="ue-opt"><input type="radio" name="ue-enc-fn" value="uri"> encodeURI</label>',
    '</div>',
    '<div class="ue-footer">',
    '<div class="ue-charcount">Chars: <span id="ue-enc-in-len">0</span></div>',
    '<button class="ue-btn danger" id="ue-enc-clr">Clear</button>',
    '</div>',
    '</div>',

    '<div class="ue-col">',
    '<div class="ue-label">Encoded Output</div>',
    '<textarea class="ue-textarea" id="ue-enc-output" readonly spellcheck="false" aria-label="URL encoded output" aria-readonly="true"></textarea>',
    '<div class="ue-footer">',
    '<div class="ue-charcount">Chars: <span id="ue-enc-out-len">0</span></div>',
    '<button class="ue-copy" id="ue-enc-copy" aria-label="Copy encoded output">Copy</button>',
    '</div>',
    '</div>',

    '</div>',
    '</div>',

    // DECODE panel
    '<div class="ue-panel" id="ue-panel-decode" role="tabpanel">',
    '<div class="ue-two-col">',

    '<div class="ue-col">',
    '<div class="ue-label">URL Encoded Input</div>',
    '<textarea class="ue-textarea" id="ue-dec-input" placeholder="Enter URL encoded text to decode..." spellcheck="false" aria-label="URL encoded text to decode"></textarea>',
    '<div class="ue-opts" role="group" aria-label="Decoding function">',
    '<label class="ue-opt"><input type="radio" name="ue-dec-fn" value="component" checked> decodeURIComponent</label>',
    '<label class="ue-opt"><input type="radio" name="ue-dec-fn" value="uri"> decodeURI</label>',
    '</div>',
    '<div class="ue-footer">',
    '<div class="ue-charcount">Chars: <span id="ue-dec-in-len">0</span></div>',
    '<button class="ue-btn danger" id="ue-dec-clr">Clear</button>',
    '</div>',
    '</div>',

    '<div class="ue-col">',
    '<div class="ue-label">Decoded Output</div>',
    '<div class="ue-error" id="ue-dec-error" role="alert" aria-live="polite"></div>',
    '<textarea class="ue-textarea" id="ue-dec-output" readonly spellcheck="false" aria-label="Decoded output" aria-readonly="true"></textarea>',
    '<div class="ue-footer">',
    '<div class="ue-charcount">Chars: <span id="ue-dec-out-len">0</span></div>',
    '<button class="ue-copy" id="ue-dec-copy" aria-label="Copy decoded output">Copy</button>',
    '</div>',
    '</div>',

    '</div>',
    '</div>',

    // PARSE panel
    '<div class="ue-panel" id="ue-panel-parse" role="tabpanel">',
    '<div class="ue-parse-input-wrap">',
    '<div class="ue-label">Full URL</div>',
    '<input class="ue-url-input" id="ue-parse-input" type="text" placeholder="https://example.com/path?key=value&foo=bar#section" spellcheck="false" aria-label="URL to parse">',
    '<div class="ue-footer">',
    '<div class="ue-charcount">Chars: <span id="ue-parse-in-len">0</span></div>',
    '<div style="display:flex;gap:8px">',
    '<button class="ue-btn danger" id="ue-parse-clr">Clear</button>',
    '</div>',
    '</div>',
    '</div>',
    '<div id="ue-parse-result">',
    '<div class="ue-parse-placeholder">Paste a URL above to see its breakdown</div>',
    '</div>',
    '</div>',

    '<div id="ue-announce" class="ue-sr-only" role="status" aria-live="polite"></div>',
    '</div>'
  ].join('');

  var container = document.getElementById('url-encoder-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };
  var announce = $id('ue-announce');

  // Tab switching
  var tabs = document.querySelectorAll('#ue-app .ue-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('#ue-app .ue-panel').forEach(function(p) { p.classList.remove('active'); });
      $id('ue-panel-' + target).classList.add('active');
    });
  });

  // Encode logic
  function doEncode() {
    var text = $id('ue-enc-input').value;
    $id('ue-enc-in-len').textContent = text.length;
    if (!text) { $id('ue-enc-output').value = ''; $id('ue-enc-out-len').textContent = '0'; return; }
    var fn = document.querySelector('#ue-app input[name="ue-enc-fn"]:checked').value;
    var encoded = fn === 'component' ? encodeURIComponent(text) : encodeURI(text);
    $id('ue-enc-output').value = encoded;
    $id('ue-enc-out-len').textContent = encoded.length;
  }

  $id('ue-enc-input').addEventListener('input', doEncode);
  document.querySelectorAll('#ue-app input[name="ue-enc-fn"]').forEach(function(r) {
    r.addEventListener('change', doEncode);
  });
  $id('ue-enc-clr').addEventListener('click', function() {
    $id('ue-enc-input').value = '';
    $id('ue-enc-output').value = '';
    $id('ue-enc-in-len').textContent = '0';
    $id('ue-enc-out-len').textContent = '0';
    announce.textContent = 'Cleared.';
  });
  $id('ue-enc-copy').addEventListener('click', function() {
    var text = $id('ue-enc-output').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function() {
      var btn = $id('ue-enc-copy');
      btn.textContent = 'Copied!'; btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      announce.textContent = 'Copied to clipboard.';
    }).catch(function() { $id('ue-enc-output').select(); document.execCommand('copy'); });
  });

  // Decode logic
  function doDecode() {
    var text = $id('ue-dec-input').value;
    $id('ue-dec-in-len').textContent = text.length;
    var errorEl = $id('ue-dec-error');
    if (!text) { $id('ue-dec-output').value = ''; $id('ue-dec-out-len').textContent = '0'; errorEl.style.display='none'; return; }
    try {
      var fn = document.querySelector('#ue-app input[name="ue-dec-fn"]:checked').value;
      var decoded = fn === 'component' ? decodeURIComponent(text) : decodeURI(text);
      $id('ue-dec-output').value = decoded;
      $id('ue-dec-out-len').textContent = decoded.length;
      errorEl.style.display = 'none';
    } catch(e) {
      errorEl.textContent = 'Decode error: ' + e.message;
      errorEl.style.display = 'block';
      $id('ue-dec-output').value = '';
      $id('ue-dec-out-len').textContent = '0';
    }
  }

  $id('ue-dec-input').addEventListener('input', doDecode);
  document.querySelectorAll('#ue-app input[name="ue-dec-fn"]').forEach(function(r) {
    r.addEventListener('change', doDecode);
  });
  $id('ue-dec-clr').addEventListener('click', function() {
    $id('ue-dec-input').value = '';
    $id('ue-dec-output').value = '';
    $id('ue-dec-in-len').textContent = '0';
    $id('ue-dec-out-len').textContent = '0';
    $id('ue-dec-error').style.display = 'none';
    announce.textContent = 'Cleared.';
  });
  $id('ue-dec-copy').addEventListener('click', function() {
    var text = $id('ue-dec-output').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function() {
      var btn = $id('ue-dec-copy');
      btn.textContent = 'Copied!'; btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      announce.textContent = 'Copied to clipboard.';
    }).catch(function() { $id('ue-dec-output').select(); document.execCommand('copy'); });
  });

  // Parse logic
  function escapeHTML(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function parseCopyBtn(text, label) {
    return '<button class="ue-copy" onclick="(function(b,t){navigator.clipboard.writeText(t).then(function(){b.textContent=\'Copied!\';b.classList.add(\'copied\');setTimeout(function(){b.textContent=\'Copy\';b.classList.remove(\'copied\');},2000);});})(this,\'' + text.replace(/'/g,"\\'").replace(/\n/g,'\\n') + '\')" aria-label="Copy ' + label + '">Copy</button>';
  }

  function doParseURL() {
    var raw = $id('ue-parse-input').value.trim();
    $id('ue-parse-in-len').textContent = raw.length;
    var resultEl = $id('ue-parse-result');
    if (!raw) {
      resultEl.innerHTML = '<div class="ue-parse-placeholder">Paste a URL above to see its breakdown</div>';
      return;
    }

    var url;
    try {
      url = new URL(raw);
    } catch(e) {
      // Try prepending https://
      try { url = new URL('https://' + raw); } catch(e2) {
        resultEl.innerHTML = '<div class="ue-parse-placeholder" style="color:var(--c-error)">Invalid URL: ' + escapeHTML(e.message) + '</div>';
        return;
      }
    }

    function row(key, val) {
      var empty = val === '' || val === null || val === undefined;
      return '<tr><td class="pk">' + escapeHTML(key) + '</td><td class="pv' + (empty ? ' empty' : '') + '">' + (empty ? 'empty' : escapeHTML(val)) + '</td></tr>';
    }

    var componentsHTML = '<table class="ue-parse-table">' +
      row('Protocol', url.protocol) +
      row('Username', url.username) +
      row('Password', url.password) +
      row('Host', url.host) +
      row('Hostname', url.hostname) +
      row('Port', url.port) +
      row('Pathname', url.pathname) +
      row('Search', url.search) +
      row('Hash', url.hash) +
      '</table>';

    // Query params
    var params = [];
    url.searchParams.forEach(function(val, key) { params.push({ key: key, val: val }); });

    var paramsHTML;
    if (params.length === 0) {
      paramsHTML = '<div class="ue-empty-msg">No query parameters</div>';
    } else {
      paramsHTML = '<table class="ue-parse-table"><thead><tr><th style="padding:7px 14px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--c-text-sec);text-align:left;border-bottom:1px solid var(--c-border)">Key</th><th style="padding:7px 14px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--c-text-sec);text-align:left;border-bottom:1px solid var(--c-border)">Value</th><th style="padding:7px 14px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--c-text-sec);text-align:left;border-bottom:1px solid var(--c-border)">Decoded</th></tr></thead><tbody>';
      params.forEach(function(p) {
        var decoded;
        try { decoded = decodeURIComponent(p.val); } catch(e) { decoded = p.val; }
        paramsHTML += '<tr><td style="padding:7px 14px;font-family:var(--c-mono);font-size:0.78rem;border-bottom:1px solid rgba(255,255,255,0.04);color:var(--c-accent2)">' + escapeHTML(p.key) + '</td><td style="padding:7px 14px;font-family:var(--c-mono);font-size:0.78rem;border-bottom:1px solid rgba(255,255,255,0.04);color:var(--c-text);word-break:break-all">' + escapeHTML(p.val) + '</td><td style="padding:7px 14px;font-family:var(--c-mono);font-size:0.78rem;border-bottom:1px solid rgba(255,255,255,0.04);color:var(--c-success);word-break:break-all">' + escapeHTML(decoded) + '</td></tr>';
      });
      paramsHTML += '</tbody></table>';
    }

    resultEl.innerHTML = [
      '<div class="ue-parse-section">',
      '<div class="ue-parse-section-title">URL Components</div>',
      componentsHTML,
      '</div>',
      '<div class="ue-parse-section">',
      '<div class="ue-params-header">',
      '<div class="ue-params-title">Query Parameters <span style="color:var(--c-accent2);font-family:var(--c-mono)">(' + params.length + ')</span></div>',
      params.length > 0 ? parseCopyBtn(params.map(function(p){return p.key+'='+p.val;}).join('\n'), 'query params') : '',
      '</div>',
      paramsHTML,
      '</div>'
    ].join('');
  }

  $id('ue-parse-input').addEventListener('input', doParseURL);
  $id('ue-parse-clr').addEventListener('click', function() {
    $id('ue-parse-input').value = '';
    $id('ue-parse-in-len').textContent = '0';
    $id('ue-parse-result').innerHTML = '<div class="ue-parse-placeholder">Paste a URL above to see its breakdown</div>';
    announce.textContent = 'Cleared.';
  });
})();
