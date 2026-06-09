(function() {
  var CSS = [
    '#b64-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-error:#f87171;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#b64-app *,*::before,*::after{box-sizing:border-box}',
    '#b64-hdr{text-align:center}',
    '#b64-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#b64-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.b64-tabs{display:flex;gap:6px;border-bottom:1px solid var(--c-border);padding-bottom:0}',
    '.b64-tab{padding:7px 20px;border-radius:8px 8px 0 0;border:1px solid transparent;border-bottom:none;background:transparent;color:var(--c-text-sec);font-size:0.82rem;font-weight:600;cursor:pointer;transition:all 0.18s;margin-bottom:-1px}',
    '.b64-tab:hover{color:var(--c-accent)}',
    '.b64-tab.active{background:rgba(139,92,246,0.12);border-color:var(--c-border);border-bottom-color:var(--c-bg);color:var(--c-accent)}',
    '.b64-panel{display:none}',
    '.b64-panel.active{display:flex;flex-direction:column;gap:16px}',
    '#b64-main{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#b64-main{grid-template-columns:1fr}}',
    '.b64-col{display:flex;flex-direction:column;gap:10px}',
    '.b64-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec)}',
    '.b64-textarea{width:100%;min-height:240px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text);resize:vertical;outline:none;transition:border-color 0.2s;line-height:1.7}',
    '.b64-textarea:focus{border-color:var(--c-accent)}',
    '.b64-textarea::placeholder{color:rgba(170,176,204,0.4)}',
    '.b64-textarea[readonly]{background:rgba(0,0,0,0.2);cursor:default}',
    '.b64-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}',
    '.b64-charcount{font-size:0.72rem;color:var(--c-text-sec)}',
    '.b64-charcount span{color:var(--c-accent2);font-family:var(--c-mono);font-weight:600}',
    '.b64-opts{display:flex;align-items:center;gap:14px;flex-wrap:wrap}',
    '.b64-opt{display:flex;align-items:center;gap:6px;font-size:0.78rem;color:var(--c-text-sec);cursor:pointer;user-select:none}',
    '.b64-opt input[type=checkbox]{width:15px;height:15px;accent-color:var(--c-accent);cursor:pointer}',
    '.b64-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.b64-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.18s}',
    '.b64-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.b64-btn.danger{color:#f87171;border-color:rgba(248,113,113,0.3)}',
    '.b64-btn.danger:hover{background:rgba(248,113,113,0.1);border-color:#f87171}',
    '.b64-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:4px 11px;cursor:pointer;color:var(--c-text-sec);font-size:0.73rem;font-weight:600;transition:all 0.18s}',
    '.b64-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}',
    '.b64-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.b64-error{padding:10px 14px;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:8px;color:var(--c-error);font-size:0.78rem;font-family:var(--c-mono);display:none}',
    '.b64-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
  ].join('');

  var HTML = [
    '<div id="b64-app">',
    '<div id="b64-hdr"><h1>Base64 Encoder / Decoder</h1><p>Encode text to Base64 or decode Base64 to text</p></div>',

    '<div class="b64-tabs" role="tablist" aria-label="Mode">',
    '<button class="b64-tab active" data-tab="encode" role="tab" aria-selected="true" aria-controls="b64-panel-encode">Encode</button>',
    '<button class="b64-tab" data-tab="decode" role="tab" aria-selected="false" aria-controls="b64-panel-decode">Decode</button>',
    '</div>',

    // ENCODE panel
    '<div class="b64-panel active" id="b64-panel-encode" role="tabpanel">',
    '<div id="b64-main">',

    '<div class="b64-col">',
    '<div class="b64-label">Plain Text</div>',
    '<textarea class="b64-textarea" id="b64-enc-input" placeholder="Enter text to encode..." spellcheck="false" aria-label="Text to encode"></textarea>',
    '<div class="b64-footer">',
    '<div class="b64-charcount">Chars: <span id="b64-enc-in-len">0</span></div>',
    '<div class="b64-btn-row">',
    '<button class="b64-btn danger" id="b64-enc-clr">Clear</button>',
    '</div>',
    '</div>',
    '</div>',

    '<div class="b64-col">',
    '<div class="b64-label">Base64 Output</div>',
    '<textarea class="b64-textarea" id="b64-enc-output" readonly spellcheck="false" aria-label="Base64 output" aria-readonly="true"></textarea>',
    '<div class="b64-footer">',
    '<div class="b64-opts">',
    '<label class="b64-opt"><input type="checkbox" id="b64-enc-urlsafe"> URL-safe</label>',
    '</div>',
    '<div class="b64-charcount">Chars: <span id="b64-enc-out-len">0</span> &nbsp; <button class="b64-copy" id="b64-enc-copy" aria-label="Copy Base64 output">Copy</button></div>',
    '</div>',
    '</div>',

    '</div>',
    '</div>',

    // DECODE panel
    '<div class="b64-panel" id="b64-panel-decode" role="tabpanel">',
    '<div id="b64-main2" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start">',

    '<div class="b64-col">',
    '<div class="b64-label">Base64 Input</div>',
    '<textarea class="b64-textarea" id="b64-dec-input" placeholder="Enter Base64 to decode..." spellcheck="false" aria-label="Base64 to decode"></textarea>',
    '<div class="b64-footer">',
    '<div class="b64-charcount">Chars: <span id="b64-dec-in-len">0</span></div>',
    '<div class="b64-btn-row">',
    '<button class="b64-btn danger" id="b64-dec-clr">Clear</button>',
    '</div>',
    '</div>',
    '</div>',

    '<div class="b64-col">',
    '<div class="b64-label">Decoded Text</div>',
    '<div class="b64-error" id="b64-dec-error" role="alert" aria-live="polite"></div>',
    '<textarea class="b64-textarea" id="b64-dec-output" readonly spellcheck="false" aria-label="Decoded text output" aria-readonly="true"></textarea>',
    '<div class="b64-footer">',
    '<div class="b64-opts">',
    '<label class="b64-opt"><input type="checkbox" id="b64-dec-urlsafe"> URL-safe input</label>',
    '</div>',
    '<div class="b64-charcount">Chars: <span id="b64-dec-out-len">0</span> &nbsp; <button class="b64-copy" id="b64-dec-copy" aria-label="Copy decoded text">Copy</button></div>',
    '</div>',
    '</div>',

    '</div>',
    '</div>',

    '<div id="b64-announce" class="b64-sr-only" role="status" aria-live="polite"></div>',
    '</div>'
  ].join('');

  var container = document.getElementById('base64-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };
  var announce = $id('b64-announce');

  // Tab switching
  var tabs = document.querySelectorAll('#b64-app .b64-tab');
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('#b64-app .b64-panel').forEach(function(p) { p.classList.remove('active'); });
      $id('b64-panel-' + target).classList.add('active');
    });
  });

  // Fix responsive grid in decode panel
  var style2 = $id('b64-main2');
  if (style2) {
    function checkWidth2() {
      style2.style.gridTemplateColumns = window.innerWidth <= 800 ? '1fr' : '1fr 1fr';
    }
    checkWidth2();
    window.addEventListener('resize', checkWidth2);
  }

  // ENCODE logic
  function doEncode() {
    var text = $id('b64-enc-input').value;
    $id('b64-enc-in-len').textContent = text.length;
    if (!text) { $id('b64-enc-output').value = ''; $id('b64-enc-out-len').textContent = '0'; return; }
    try {
      var urlSafe = $id('b64-enc-urlsafe').checked;
      var encoded = btoa(unescape(encodeURIComponent(text)));
      if (urlSafe) encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      $id('b64-enc-output').value = encoded;
      $id('b64-enc-out-len').textContent = encoded.length;
    } catch(e) {
      $id('b64-enc-output').value = 'Error: ' + e.message;
      $id('b64-enc-out-len').textContent = '0';
    }
  }

  $id('b64-enc-input').addEventListener('input', doEncode);
  $id('b64-enc-urlsafe').addEventListener('change', doEncode);
  $id('b64-enc-clr').addEventListener('click', function() {
    $id('b64-enc-input').value = '';
    $id('b64-enc-output').value = '';
    $id('b64-enc-in-len').textContent = '0';
    $id('b64-enc-out-len').textContent = '0';
    announce.textContent = 'Cleared.';
  });

  $id('b64-enc-copy').addEventListener('click', function() {
    var text = $id('b64-enc-output').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function() {
      var btn = $id('b64-enc-copy');
      btn.textContent = 'Copied!'; btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      announce.textContent = 'Copied to clipboard.';
    }).catch(function() { $id('b64-enc-output').select(); document.execCommand('copy'); });
  });

  // DECODE logic
  function doDecode() {
    var text = $id('b64-dec-input').value;
    $id('b64-dec-in-len').textContent = text.length;
    var errorEl = $id('b64-dec-error');
    if (!text) { $id('b64-dec-output').value = ''; $id('b64-dec-out-len').textContent = '0'; errorEl.style.display='none'; return; }
    try {
      var urlSafe = $id('b64-dec-urlsafe').checked;
      var normalized = text;
      if (urlSafe) {
        normalized = text.replace(/-/g, '+').replace(/_/g, '/');
        // re-pad
        while (normalized.length % 4) normalized += '=';
      }
      var decoded = decodeURIComponent(escape(atob(normalized)));
      $id('b64-dec-output').value = decoded;
      $id('b64-dec-out-len').textContent = decoded.length;
      errorEl.style.display = 'none';
    } catch(e) {
      errorEl.textContent = 'Invalid Base64: ' + e.message;
      errorEl.style.display = 'block';
      $id('b64-dec-output').value = '';
      $id('b64-dec-out-len').textContent = '0';
    }
  }

  $id('b64-dec-input').addEventListener('input', doDecode);
  $id('b64-dec-urlsafe').addEventListener('change', doDecode);
  $id('b64-dec-clr').addEventListener('click', function() {
    $id('b64-dec-input').value = '';
    $id('b64-dec-output').value = '';
    $id('b64-dec-in-len').textContent = '0';
    $id('b64-dec-out-len').textContent = '0';
    $id('b64-dec-error').style.display = 'none';
    announce.textContent = 'Cleared.';
  });

  $id('b64-dec-copy').addEventListener('click', function() {
    var text = $id('b64-dec-output').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function() {
      var btn = $id('b64-dec-copy');
      btn.textContent = 'Copied!'; btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      announce.textContent = 'Copied to clipboard.';
    }).catch(function() { $id('b64-dec-output').select(); document.execCommand('copy'); });
  });
})();
