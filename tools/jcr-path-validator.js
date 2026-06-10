(function () {
  var CSS = [
    '#jpv-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-warn:#facc15;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#jpv-app *{box-sizing:border-box}',
    '#jpv-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#jpv-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.jpv-layout{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){.jpv-layout{grid-template-columns:1fr}}',
    '.jpv-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.jpv-textarea{width:100%;min-height:220px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text);resize:vertical;outline:none;transition:border-color .2s;line-height:1.7}',
    '.jpv-textarea:focus{border-color:var(--c-accent)}',
    '.jpv-textarea::placeholder{color:rgba(170,176,204,0.4)}',
    '.jpv-btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}',
    '.jpv-btn{padding:8px 18px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.jpv-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.jpv-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.jpv-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.jpv-result-list{display:flex;flex-direction:column;gap:8px}',
    '.jpv-result-item{background:var(--c-card);border:1px solid var(--c-border);border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:6px}',
    '.jpv-result-item.valid{border-color:rgba(52,211,153,0.35)}',
    '.jpv-result-item.warn{border-color:rgba(250,204,21,0.35)}',
    '.jpv-result-item.invalid{border-color:rgba(248,113,113,0.4)}',
    '.jpv-ri-top{display:flex;align-items:center;justify-content:space-between;gap:8px}',
    '.jpv-ri-path{font-family:var(--c-mono);font-size:0.8rem;word-break:break-all;flex:1}',
    '.jpv-badge{padding:2px 10px;border-radius:20px;font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;white-space:nowrap}',
    '.jpv-badge.valid{background:rgba(52,211,153,0.15);color:var(--c-success);border:1px solid rgba(52,211,153,0.3)}',
    '.jpv-badge.warn{background:rgba(250,204,21,0.12);color:var(--c-warn);border:1px solid rgba(250,204,21,0.3)}',
    '.jpv-badge.invalid{background:rgba(248,113,113,0.12);color:var(--c-error);border:1px solid rgba(248,113,113,0.3)}',
    '.jpv-issues{display:flex;flex-direction:column;gap:4px}',
    '.jpv-issue{font-size:0.76rem;padding:4px 10px;border-radius:6px;display:flex;align-items:flex-start;gap:6px}',
    '.jpv-issue.error{background:rgba(248,113,113,0.08);color:var(--c-error)}',
    '.jpv-issue.warn{background:rgba(250,204,21,0.08);color:var(--c-warn)}',
    '.jpv-issue.info{background:rgba(249,115,22,0.08);color:var(--c-accent2)}',
    '.jpv-suggestion{font-size:0.75rem;margin-top:4px;color:var(--c-text-sec)}',
    '.jpv-suggestion span{font-family:var(--c-mono);color:var(--c-success);background:rgba(52,211,153,0.1);padding:1px 7px;border-radius:4px}',
    '.jpv-summary{display:flex;gap:16px;padding:10px 0;flex-wrap:wrap}',
    '.jpv-sum-item{font-size:0.78rem;color:var(--c-text-sec)}',
    '.jpv-sum-item b{color:var(--c-text)}',
    '.jpv-rules{background:var(--c-card);border:1px solid var(--c-border);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:8px}',
    '.jpv-rules-title{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-sec)}',
    '.jpv-rule-item{font-size:0.77rem;color:var(--c-text-sec);display:flex;align-items:baseline;gap:8px;line-height:1.5}',
    '.jpv-rule-item .dot{color:var(--c-accent);font-size:0.6rem}',
    '.jpv-rule-item code{font-family:var(--c-mono);font-size:0.72rem;color:var(--c-accent2);background:rgba(251,146,60,0.1);padding:1px 6px;border-radius:4px}'
  ].join('');

  var HTML = [
    '<div id="jpv-app">',
    '<div id="jpv-hdr"><h1>JCR Path Validator</h1><p>Validate JCR node names and paths against AEM naming rules</p></div>',
    '<div class="jpv-layout">',

    '<div>',
    '<div class="jpv-label">Paths or Node Names to Validate (one per line)</div>',
    '<textarea class="jpv-textarea" id="jpv-input" placeholder="/content/mysite/en/home&#10;my-component&#10;/apps/mysite/components/text&#10;bad node name!&#10;camelCaseNode&#10;node with spaces"></textarea>',
    '<div class="jpv-btn-row">',
    '<button class="jpv-btn primary" id="jpv-validate-btn">Validate</button>',
    '<button class="jpv-btn" id="jpv-sample-btn">Load Samples</button>',
    '<button class="jpv-btn" id="jpv-clr-btn">Clear</button>',
    '</div>',
    '<div class="jpv-summary" id="jpv-summary" style="display:none"></div>',
    '</div>',

    '<div>',
    '<div class="jpv-rules">',
    '<div class="jpv-rules-title">AEM JCR Naming Rules</div>',
    '<div class="jpv-rule-item"><span class="dot">●</span> <span>Forbidden chars: <code>/ : [ ] | * " \\ &lt; &gt; ?</code> (XML illegal)</span></div>',
    '<div class="jpv-rule-item"><span class="dot">●</span> <span>No leading/trailing whitespace, no CR/LF/TAB</span></div>',
    '<div class="jpv-rule-item"><span class="dot">●</span> <span>Cannot start with <code>.</code> (dot) or <code>-</code> (hyphen)</span></div>',
    '<div class="jpv-rule-item"><span class="dot">●</span> <span>Namespace prefix requires <code>:</code> separator (e.g., <code>jcr:content</code>)</span></div>',
    '<div class="jpv-rule-item"><span class="dot">●</span> <span>AEM convention: lowercase, words separated by <code>-</code></span></div>',
    '<div class="jpv-rule-item"><span class="dot">●</span> <span>Max recommended length: 64 chars per segment</span></div>',
    '<div class="jpv-rule-item"><span class="dot">●</span> <span>Path must start with <code>/</code> for absolute paths</span></div>',
    '</div>',
    '<div class="jpv-result-list" id="jpv-results" style="margin-top:12px"></div>',
    '</div>',

    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('jcr-path-validator-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };

  var FORBIDDEN_CHARS = /[\/:\[\]|*"\\<>?]/;
  var WHITESPACE = /[\r\n\t\s]/;
  var RESERVED_NAMES = ['jcr:content', 'jcr:primaryType', 'jcr:mixinTypes', 'jcr:uuid', 'rep:policy', 'cq:Page', 'cq:PageContent'];

  function validateNodeName(name) {
    var issues = [];
    var warnings = [];

    if (!name || name.trim() === '') {
      issues.push({ type: 'error', msg: 'Node name cannot be empty' });
      return { issues: issues, warnings: warnings, valid: false };
    }

    // Check for namespace (colon-separated prefix)
    var parts = name.split(':');
    var localName = parts.length === 2 ? parts[1] : name;
    var ns = parts.length === 2 ? parts[0] : null;

    if (parts.length > 2) {
      issues.push({ type: 'error', msg: 'Node name contains multiple colons — only one namespace prefix allowed' });
    }

    // Forbidden chars (except colon which we handle as namespace)
    var checkName = localName || name;
    var forbiddenFound = checkName.split('').filter(function (c) { return /[\/\[\]|*"\\<>?]/.test(c); });
    if (forbiddenFound.length) {
      issues.push({ type: 'error', msg: 'Contains forbidden characters: ' + forbiddenFound.map(function (c) { return '"' + c + '"'; }).join(', ') });
    }

    if (/[\r\n\t]/.test(name)) {
      issues.push({ type: 'error', msg: 'Contains control characters (CR/LF/TAB)' });
    }
    if (/^\s|\s$/.test(name)) {
      issues.push({ type: 'error', msg: 'Has leading or trailing whitespace' });
    }
    if (/\s/.test(localName || name)) {
      issues.push({ type: 'error', msg: 'Contains spaces — use hyphens instead (e.g., "my-component")' });
    }
    if (/^[-.]/.test(localName || name)) {
      issues.push({ type: 'error', msg: 'Cannot start with a dot or hyphen' });
    }
    if ((localName || name).length > 64) {
      warnings.push({ type: 'warn', msg: 'Node name exceeds 64 characters — may cause issues in some AEM versions' });
    }

    // Naming convention warnings
    if (/[A-Z]/.test(localName || name)) {
      warnings.push({ type: 'warn', msg: 'AEM convention: use lowercase. Consider "' + (localName || name).replace(/([A-Z])/g, function (m) { return '-' + m.toLowerCase(); }).replace(/^-/, '') + '"' });
    }
    if (/[_]/.test(localName || name)) {
      warnings.push({ type: 'warn', msg: 'AEM convention: use hyphens instead of underscores' });
    }
    if ((localName || name).length > 40) {
      warnings.push({ type: 'info', msg: 'Long name — keep node names concise and descriptive' });
    }

    return { issues: issues, warnings: warnings, valid: issues.length === 0 };
  }

  function validatePath(path) {
    if (!path.startsWith('/')) {
      return validateNodeName(path);
    }

    var segments = path.split('/').filter(function (s) { return s !== ''; });
    var allIssues = [];
    var allWarnings = [];

    segments.forEach(function (seg, i) {
      var r = validateNodeName(seg);
      r.issues.forEach(function (iss) { allIssues.push({ type: iss.type, msg: 'Segment "' + seg + '": ' + iss.msg }); });
      r.warnings.forEach(function (w) { allWarnings.push({ type: w.type, msg: 'Segment "' + seg + '": ' + w.msg }); });
    });

    // Path-level checks
    if (path.endsWith('/') && path !== '/') {
      allWarnings.push({ type: 'warn', msg: 'Path ends with trailing slash' });
    }
    if (path.includes('//')) {
      allIssues.push({ type: 'error', msg: 'Path contains double slashes' });
    }

    return { issues: allIssues, warnings: allWarnings, valid: allIssues.length === 0 };
  }

  function suggestFix(name) {
    if (name.startsWith('/')) return null;
    var fix = name.trim()
      .replace(/\s+/g, '-')
      .replace(/[\/:\[\]|*"\\<>?]/g, '-')
      .replace(/([A-Z])/g, function (m) { return '-' + m.toLowerCase(); })
      .replace(/^-/, '')
      .replace(/_{1,}/g, '-')
      .replace(/-{2,}/g, '-')
      .toLowerCase();
    return fix !== name ? fix : null;
  }

  function validate() {
    var raw = $('jpv-input').value;
    var lines = raw.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    if (!lines.length) { $('jpv-results').innerHTML = ''; $('jpv-summary').style.display = 'none'; return; }

    var validCount = 0, warnCount = 0, invalidCount = 0;

    var html = lines.map(function (line) {
      var r = validatePath(line);
      var hasWarnings = r.warnings.length > 0;
      var cls = !r.valid ? 'invalid' : (hasWarnings ? 'warn' : 'valid');
      var badgeText = !r.valid ? 'Invalid' : (hasWarnings ? 'Warning' : 'Valid');

      if (!r.valid) invalidCount++;
      else if (hasWarnings) warnCount++;
      else validCount++;

      var issueHtml = '';
      r.issues.concat(r.warnings).forEach(function (iss) {
        issueHtml += '<div class="jpv-issue ' + iss.type + '"><span>' + (iss.type === 'error' ? '✕' : iss.type === 'warn' ? '⚠' : '✦') + '</span><span>' + escHtml(iss.msg) + '</span></div>';
      });

      var fix = !r.valid ? suggestFix(line) : null;
      var fixHtml = fix ? '<div class="jpv-suggestion">Suggested: <span>' + escHtml(fix) + '</span></div>' : '';

      return '<div class="jpv-result-item ' + cls + '">' +
        '<div class="jpv-ri-top"><span class="jpv-ri-path">' + escHtml(line) + '</span><span class="jpv-badge ' + cls + '">' + badgeText + '</span></div>' +
        (issueHtml ? '<div class="jpv-issues">' + issueHtml + '</div>' : '') +
        fixHtml +
        '</div>';
    }).join('');

    $('jpv-results').innerHTML = html;
    var sum = $('jpv-summary');
    sum.style.display = 'flex';
    sum.innerHTML = '<div class="jpv-sum-item"><b>' + lines.length + '</b> checked</div>' +
      '<div class="jpv-sum-item" style="color:var(--c-success)"><b>' + validCount + '</b> valid</div>' +
      (warnCount ? '<div class="jpv-sum-item" style="color:var(--c-warn)"><b>' + warnCount + '</b> warnings</div>' : '') +
      (invalidCount ? '<div class="jpv-sum-item" style="color:var(--c-error)"><b>' + invalidCount + '</b> invalid</div>' : '');
  }

  $('jpv-validate-btn').addEventListener('click', validate);
  $('jpv-input').addEventListener('input', function () {
    clearTimeout($('jpv-input')._t);
    $('jpv-input')._t = setTimeout(validate, 300);
  });

  $('jpv-sample-btn').addEventListener('click', function () {
    $('jpv-input').value = [
      '/content/mysite/en/home',
      '/apps/mysite/components/content/text-image',
      'jcr:content',
      'my-component',
      'MyBadCamelCase',
      'node with spaces',
      'bad/name',
      'has[brackets]',
      '/content/mysite/en/',
      'valid-node-name-123',
      'CamelCaseComponent',
      '_starts_with_underscore',
      '.hidden-node'
    ].join('\n');
    validate();
  });

  $('jpv-clr-btn').addEventListener('click', function () {
    $('jpv-input').value = '';
    $('jpv-results').innerHTML = '';
    $('jpv-summary').style.display = 'none';
  });

  function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
})();
