(function () {
  var CSS = [
    '#dpt-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-warn:#facc15;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#dpt-app *{box-sizing:border-box}',
    '#dpt-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#dpt-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.dpt-layout{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}',
    '@media(max-width:900px){.dpt-layout{grid-template-columns:1fr}}',
    '.dpt-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.dpt-textarea{width:100%;min-height:320px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.76rem;color:var(--c-text);resize:vertical;outline:none;transition:border-color .2s;line-height:1.7;tab-size:2}',
    '.dpt-textarea:focus{border-color:var(--c-accent)}',
    '.dpt-textarea::placeholder{color:rgba(170,176,204,0.35)}',
    '.dpt-input{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:9px 12px;font-family:var(--c-mono);font-size:0.8rem;color:var(--c-text);outline:none;transition:border-color .2s}',
    '.dpt-input:focus{border-color:var(--c-accent)}',
    '.dpt-input::placeholder{color:rgba(170,176,204,0.35)}',
    '.dpt-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.dpt-field{display:flex;flex-direction:column;gap:5px;margin-top:10px}',
    '.dpt-btn-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}',
    '.dpt-btn{padding:8px 18px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.dpt-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.dpt-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.dpt-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.dpt-result{padding:16px 20px;border-radius:10px;margin-bottom:8px;display:flex;align-items:center;gap:14px;border:1px solid}',
    '.dpt-result.allow{background:rgba(52,211,153,0.08);border-color:rgba(52,211,153,0.3)}',
    '.dpt-result.deny{background:rgba(248,113,113,0.08);border-color:rgba(248,113,113,0.3)}',
    '.dpt-result.nomatch{background:rgba(170,176,204,0.06);border-color:rgba(170,176,204,0.2)}',
    '.dpt-result-icon{font-size:1.6rem;line-height:1}',
    '.dpt-result-body{display:flex;flex-direction:column;gap:4px;flex:1}',
    '.dpt-result-verdict{font-size:1rem;font-weight:700}',
    '.dpt-result-verdict.allow{color:var(--c-success)}',
    '.dpt-result-verdict.deny{color:var(--c-error)}',
    '.dpt-result-verdict.nomatch{color:var(--c-text-sec)}',
    '.dpt-result-detail{font-size:0.78rem;color:var(--c-text-sec);font-family:var(--c-mono)}',
    '.dpt-trace{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.dpt-trace-header{padding:10px 14px;border-bottom:1px solid var(--c-border);font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-sec)}',
    '.dpt-trace-list{display:flex;flex-direction:column;max-height:280px;overflow-y:auto}',
    '.dpt-trace-row{display:grid;grid-template-columns:32px 80px 1fr 80px;gap:8px;align-items:center;padding:7px 14px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.74rem;font-family:var(--c-mono)}',
    '.dpt-trace-row:last-child{border-bottom:none}',
    '.dpt-trace-row.match{background:rgba(249,115,22,0.07)}',
    '.dpt-trace-idx{color:var(--c-text-sec)}',
    '.dpt-trace-type.allow{color:var(--c-success)}',
    '.dpt-trace-type.deny{color:var(--c-error)}',
    '.dpt-trace-rule{color:var(--c-text-sec);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.dpt-trace-status{text-align:right}',
    '.dpt-trace-status.hit{color:var(--c-accent)}',
    '.dpt-parse-err{padding:8px 12px;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:8px;color:var(--c-error);font-size:0.78rem;font-family:var(--c-mono);display:none}',
    '.dpt-url-tests{display:flex;flex-direction:column;gap:6px;margin-top:10px}',
    '.dpt-url-test-item{display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center}',
    '.dpt-url-del{background:transparent;border:none;color:var(--c-error);cursor:pointer;font-size:0.85rem;opacity:.6;padding:4px 6px;border-radius:4px}',
    '.dpt-url-del:hover{opacity:1}',
    '.dpt-url-badge{padding:2px 9px;border-radius:20px;font-size:0.68rem;font-weight:700;white-space:nowrap}',
    '.dpt-url-badge.allow{background:rgba(52,211,153,0.15);color:var(--c-success);border:1px solid rgba(52,211,153,0.3)}',
    '.dpt-url-badge.deny{background:rgba(248,113,113,0.12);color:var(--c-error);border:1px solid rgba(248,113,113,0.3)}',
    '.dpt-url-badge.nomatch{background:rgba(170,176,204,0.08);color:var(--c-text-sec);border:1px solid rgba(170,176,204,0.2)}'
  ].join('');

  var DEFAULT_RULES = [
    '/filter {',
    '  /0001 { /type "deny"  /url "*" }',
    '  /0010 { /type "allow" /method "GET" /url "/content/*" /extension \'html\' }',
    '  /0011 { /type "allow" /method "GET" /url "/content/*" /extension \'json\' /selectors \'\' }',
    '  /0020 { /type "allow" /method "GET" /url "/libs/granite/csrf/token.json" }',
    '  /0030 { /type "deny"  /url "/content/admin*" }',
    '  /0040 { /type "allow" /method "GET" /url "/apps/mysite/clientlibs/*" /extension \'(css|js)\' }',
    '  /0050 { /type "allow" /method "GET" /url "/etc.clientlibs/*" /extension \'(css|js|map|ico|png|gif|jpg|svg|eot|woff|woff2|ttf)\' }',
    '}'
  ].join('\n');

  var DEFAULT_URLS = [
    'GET /content/mysite/en/home.html',
    'GET /content/mysite/en/home.model.json',
    'POST /content/mysite/en/form',
    'GET /content/admin/users',
    'GET /apps/mysite/clientlibs/site/css/style.css',
    'GET /etc.clientlibs/core/wcm/components/image/v2/image/clientlibs/site.js'
  ].join('\n');

  var HTML = [
    '<div id="dpt-app">',
    '<div id="dpt-hdr"><h1>Dispatcher Rule Tester</h1><p>Test URLs against AEM Dispatcher filter rules (allow/deny pattern matching)</p></div>',
    '<div class="dpt-layout">',

    '<div>',
    '<div class="dpt-label">Dispatcher /filter Rules</div>',
    '<textarea class="dpt-textarea" id="dpt-rules" spellcheck="false" aria-label="Dispatcher filter rules"></textarea>',
    '<div class="dpt-parse-err" id="dpt-parse-err"></div>',
    '<div class="dpt-btn-row"><button class="dpt-btn" id="dpt-load-sample">Load Sample Rules</button></div>',
    '</div>',

    '<div>',
    '<div class="dpt-label">Test URLs (METHOD /path, one per line)</div>',
    '<textarea class="dpt-textarea" id="dpt-urls" spellcheck="false" placeholder="GET /content/mysite/en/home.html&#10;POST /content/form" style="min-height:160px" aria-label="Test URLs"></textarea>',
    '<div class="dpt-btn-row">',
    '<button class="dpt-btn primary" id="dpt-test-btn">Test All URLs</button>',
    '<button class="dpt-btn" id="dpt-clr-btn">Clear Results</button>',
    '</div>',
    '<div id="dpt-results" style="margin-top:12px;display:flex;flex-direction:column;gap:10px"></div>',
    '</div>',

    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('dispatcher-tester-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };

  $('dpt-rules').value = DEFAULT_RULES;
  $('dpt-urls').value = DEFAULT_URLS;

  $('dpt-load-sample').addEventListener('click', function () {
    $('dpt-rules').value = DEFAULT_RULES;
    $('dpt-urls').value = DEFAULT_URLS;
  });

  function parseRules(text) {
    // Parse simple Dispatcher-like filter rules
    var rules = [];
    var ruleRegex = /\/\w+\s*\{([^}]*)\}/g;
    var m;
    while ((m = ruleRegex.exec(text)) !== null) {
      var body = m[1];
      var rule = {};
      // Extract type
      var typeM = body.match(/\/type\s+"(\w+)"/i);
      if (!typeM) continue;
      rule.type = typeM[1].toLowerCase();
      if (rule.type !== 'allow' && rule.type !== 'deny') continue;

      // Extract properties (double-quoted exact, single-quoted regex)
      function extractProp(name) {
        var dq = body.match(new RegExp('\\/' + name + '\\s+"([^"]*)"'));
        var sq = body.match(new RegExp('\\/' + name + "\\s+'([^']*)'"));
        if (dq) return { value: dq[1], isRegex: false };
        if (sq) return { value: sq[1], isRegex: true };
        return null;
      }

      rule.url = extractProp('url');
      rule.method = extractProp('method');
      rule.extension = extractProp('extension');
      rule.selectors = extractProp('selectors');
      rule.suffix = extractProp('suffix');
      rule.path = extractProp('path');
      rule.raw = m[0].trim();
      rules.push(rule);
    }
    return rules;
  }

  function matchProp(prop, testVal) {
    if (!prop) return true;
    if (prop.isRegex) {
      try {
        return new RegExp('^(' + prop.value + ')$').test(testVal);
      } catch (e) { return false; }
    } else {
      // Glob pattern: * matches anything, ? matches single char
      var pattern = '^' + prop.value.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$';
      try { return new RegExp(pattern).test(testVal); } catch (e) { return false; }
    }
  }

  function parseTestUrl(line) {
    line = line.trim();
    var parts = line.split(/\s+/);
    var method = 'GET', urlPart = line;
    if (parts.length >= 2 && /^[A-Z]+$/.test(parts[0])) {
      method = parts[0];
      urlPart = parts.slice(1).join(' ');
    }

    // Parse AEM URL structure
    var qIdx = urlPart.indexOf('?');
    var qs = qIdx !== -1 ? urlPart.slice(qIdx + 1) : '';
    var path = qIdx !== -1 ? urlPart.slice(0, qIdx) : urlPart;

    // Find extension/selectors
    var segs = path.split('/');
    var lastSeg = segs[segs.length - 1] || '';
    var dotParts = lastSeg.split('.');
    var ext = '';
    var selectors = [];
    if (dotParts.length >= 2) {
      ext = dotParts[dotParts.length - 1];
      selectors = dotParts.slice(1, dotParts.length - 1);
    }

    // Find suffix (after extension segment)
    var extSegIdx = segs.findIndex(function (s) { return s.indexOf('.') !== -1; });
    var suffix = extSegIdx !== -1 && extSegIdx < segs.length - 1 ? '/' + segs.slice(extSegIdx + 1).join('/') : '';

    return { method: method, url: urlPart.split('?')[0], extension: ext, selectors: selectors.join('.'), suffix: suffix };
  }

  function testUrl(rules, parsed) {
    var trace = [];
    var finalType = 'nomatch';
    var matchedRule = null;
    var matchedIdx = -1;

    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      var matched = true;

      if (rule.url && !matchProp(rule.url, parsed.url)) matched = false;
      if (rule.method && !matchProp(rule.method, parsed.method)) matched = false;
      if (rule.extension && !matchProp(rule.extension, parsed.extension)) matched = false;
      if (rule.selectors && !matchProp(rule.selectors, parsed.selectors)) matched = false;
      if (rule.suffix && !matchProp(rule.suffix, parsed.suffix)) matched = false;
      if (rule.path && !matchProp(rule.path, parsed.url)) matched = false;

      trace.push({ idx: i + 1, type: rule.type, rule: rule.raw, matched: matched });

      if (matched) {
        finalType = rule.type;
        matchedRule = rule;
        matchedIdx = i;
        // Dispatcher processes all rules, last match wins
      }
    }

    return { result: finalType, matchedIdx: matchedIdx, matchedRule: matchedRule, trace: trace };
  }

  function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function runTests() {
    var rulesText = $('dpt-rules').value;
    var urlsText = $('dpt-urls').value;
    var errEl = $('dpt-parse-err');

    var rules = parseRules(rulesText);
    if (!rules.length) {
      errEl.textContent = 'No valid rules found. Check syntax: /ruleName { /type "allow"/"deny" /url "..." }';
      errEl.style.display = 'block';
    } else {
      errEl.style.display = 'none';
    }

    var urls = urlsText.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    var resultsEl = $('dpt-results');

    if (!urls.length) { resultsEl.innerHTML = ''; return; }

    var html = urls.map(function (urlLine) {
      var parsed = parseTestUrl(urlLine);
      var res = testUrl(rules, parsed);

      var icon = res.result === 'allow' ? '✅' : res.result === 'deny' ? '🚫' : '⬜';
      var verdictText = res.result === 'allow' ? 'ALLOW' : res.result === 'deny' ? 'DENY' : 'NO MATCH (deny by default)';

      var traceRows = res.trace.map(function (t) {
        var matchTxt = t.matched ? '← HIT' : '';
        return '<div class="dpt-trace-row' + (t.matched ? ' match' : '') + '">' +
          '<span class="dpt-trace-idx">#' + t.idx + '</span>' +
          '<span class="dpt-trace-type ' + t.type + '">' + t.type.toUpperCase() + '</span>' +
          '<span class="dpt-trace-rule" title="' + escHtml(t.rule) + '">' + escHtml(t.rule.slice(0, 60)) + (t.rule.length > 60 ? '…' : '') + '</span>' +
          '<span class="dpt-trace-status hit">' + matchTxt + '</span>' +
          '</div>';
      }).join('');

      return '<div style="display:flex;flex-direction:column;gap:6px">' +
        '<div class="dpt-result ' + res.result + '">' +
        '<span class="dpt-result-icon">' + icon + '</span>' +
        '<div class="dpt-result-body">' +
        '<span class="dpt-result-verdict ' + res.result + '">' + verdictText + '</span>' +
        '<span class="dpt-result-detail">' + escHtml(urlLine) + '</span>' +
        (res.matchedRule ? '<span class="dpt-result-detail" style="margin-top:2px">Last matching rule: ' + escHtml(res.matchedRule.raw.split('\n')[0]) + '</span>' : '') +
        '</div></div>' +
        '<div class="dpt-trace"><div class="dpt-trace-header">Rule Evaluation Trace (' + res.trace.length + ' rules)</div>' +
        '<div class="dpt-trace-list">' + traceRows + '</div></div>' +
        '</div>';
    }).join('');

    resultsEl.innerHTML = html;
  }

  $('dpt-test-btn').addEventListener('click', runTests);
  $('dpt-clr-btn').addEventListener('click', function () { $('dpt-results').innerHTML = ''; });

  // Auto-run with defaults
  runTests();
})();
