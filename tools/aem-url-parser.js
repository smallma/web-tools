(function () {
  var CSS = [
    '#aup-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#aup-app *{box-sizing:border-box}',
    '#aup-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#aup-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.aup-tabs{display:flex;gap:4px;padding:4px;background:rgba(0,0,0,0.3);border-radius:10px;width:fit-content}',
    '.aup-tab{padding:6px 18px;border-radius:7px;border:none;background:transparent;color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.aup-tab.active{background:rgba(249,115,22,0.2);color:var(--c-accent);border:1px solid rgba(249,115,22,0.4)}',
    '.aup-section{display:none}',
    '.aup-section.active{display:flex;flex-direction:column;gap:16px}',
    '.aup-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.aup-input{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:12px 14px;font-family:var(--c-mono);font-size:0.82rem;color:var(--c-text);outline:none;transition:border-color .2s}',
    '.aup-input:focus{border-color:var(--c-accent)}',
    '.aup-input::placeholder{color:rgba(170,176,204,0.4)}',
    '.aup-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.aup-btn{padding:8px 18px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.aup-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.aup-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.aup-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.aup-result-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}',
    '.aup-card{background:var(--c-card);border:1px solid var(--c-border);border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:6px}',
    '.aup-card-key{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-sec)}',
    '.aup-card-val{font-family:var(--c-mono);font-size:0.82rem;color:var(--c-accent2);word-break:break-all}',
    '.aup-card-val.empty{color:rgba(170,176,204,0.35);font-style:italic}',
    '.aup-selectors-list{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}',
    '.aup-sel-badge{padding:2px 10px;border-radius:20px;background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.3);font-family:var(--c-mono);font-size:0.75rem;color:var(--c-accent2)}',
    '.aup-params-table{width:100%;border-collapse:collapse;font-size:0.78rem;font-family:var(--c-mono)}',
    '.aup-params-table th{text-align:left;padding:6px 10px;color:var(--c-text-sec);font-size:0.65rem;text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid var(--c-border)}',
    '.aup-params-table td{padding:6px 10px;color:var(--c-text);border-bottom:1px solid rgba(255,255,255,0.04)}',
    '.aup-params-table td:first-child{color:var(--c-accent2)}',
    '.aup-build-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '@media(max-width:700px){.aup-build-row{grid-template-columns:1fr}}',
    '.aup-field{display:flex;flex-direction:column;gap:6px}',
    '.aup-output-box{background:rgba(0,0,0,0.35);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.82rem;color:var(--c-accent2);word-break:break-all;min-height:52px;display:flex;align-items:center}',
    '.aup-error{padding:10px 14px;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:8px;color:var(--c-error);font-size:0.8rem;display:none}',
    '.aup-section-title{font-size:1rem;font-weight:600;color:var(--c-text);margin-bottom:2px}'
  ].join('');

  var HTML = [
    '<div id="aup-app">',
    '<div id="aup-hdr"><h1>AEM URL Parser</h1><p>Parse &amp; build AEM URLs — content path · selectors · extension · suffix · query</p></div>',

    '<div class="aup-tabs">',
    '<button class="aup-tab active" id="aup-tab-parse">Parse URL</button>',
    '<button class="aup-tab" id="aup-tab-build">Build URL</button>',
    '</div>',

    // Parse section
    '<div class="aup-section active" id="aup-sec-parse">',
    '<div class="aup-section-title">Parse AEM URL</div>',
    '<div class="aup-field"><div class="aup-label">AEM URL or Path</div>',
    '<input class="aup-input" id="aup-url-input" placeholder="e.g. https://author.domain.com/content/mysite/en/home.selector1.selector2.html/suffix/path?foo=bar&baz=1" spellcheck="false">',
    '</div>',
    '<div class="aup-btn-row"><button class="aup-btn primary" id="aup-parse-btn">Parse</button><button class="aup-btn" id="aup-sample-btn">Load Sample</button><button class="aup-btn" id="aup-clr-parse-btn">Clear</button></div>',
    '<div class="aup-error" id="aup-parse-error"></div>',
    '<div class="aup-result-grid" id="aup-result-grid"></div>',
    '</div>',

    // Build section
    '<div class="aup-section" id="aup-sec-build">',
    '<div class="aup-section-title">Build AEM URL</div>',
    '<div class="aup-build-row">',
    '<div class="aup-field"><div class="aup-label">Base Domain (optional)</div><input class="aup-input" id="aup-b-domain" placeholder="https://author.domain.com"></div>',
    '<div class="aup-field"><div class="aup-label">Content Path</div><input class="aup-input" id="aup-b-path" placeholder="/content/mysite/en/home"></div>',
    '</div>',
    '<div class="aup-build-row">',
    '<div class="aup-field"><div class="aup-label">Selectors (comma-separated)</div><input class="aup-input" id="aup-b-selectors" placeholder="selector1, selector2"></div>',
    '<div class="aup-field"><div class="aup-label">Extension</div><input class="aup-input" id="aup-b-ext" placeholder="html" value="html"></div>',
    '</div>',
    '<div class="aup-build-row">',
    '<div class="aup-field"><div class="aup-label">Suffix (optional)</div><input class="aup-input" id="aup-b-suffix" placeholder="/suffix/path"></div>',
    '<div class="aup-field"><div class="aup-label">Query Params (key=value, one per line)</div><textarea class="aup-input" id="aup-b-query" rows="3" placeholder="foo=bar&#10;baz=1" style="resize:vertical"></textarea></div>',
    '</div>',
    '<div class="aup-btn-row"><button class="aup-btn primary" id="aup-build-btn">Build URL</button><button class="aup-btn" id="aup-clr-build-btn">Clear</button></div>',
    '<div class="aup-field"><div class="aup-label">Generated URL</div>',
    '<div class="aup-output-box" id="aup-built-url" style="cursor:pointer" title="Click to copy"></div>',
    '</div>',
    '<div class="aup-btn-row"><button class="aup-btn" id="aup-copy-built" style="display:none">Copy URL</button></div>',
    '</div>',

    '</div>'
  ].join('');

  var container = document.getElementById('aem-url-parser-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };

  // Tab switching
  $('aup-tab-parse').addEventListener('click', function () {
    $('aup-tab-parse').classList.add('active');
    $('aup-tab-build').classList.remove('active');
    $('aup-sec-parse').classList.add('active');
    $('aup-sec-build').classList.remove('active');
  });
  $('aup-tab-build').addEventListener('click', function () {
    $('aup-tab-build').classList.add('active');
    $('aup-tab-parse').classList.remove('active');
    $('aup-sec-build').classList.add('active');
    $('aup-sec-parse').classList.remove('active');
  });

  function parseAemUrl(raw) {
    raw = raw.trim();
    var result = { origin: '', contentPath: '', selectors: [], extension: '', suffix: '', queryString: '', params: [] };
    if (!raw) return null;

    var working = raw;

    // Extract origin
    var originMatch = working.match(/^(https?:\/\/[^/]+)/);
    if (originMatch) {
      result.origin = originMatch[1];
      working = working.slice(originMatch[1].length);
    }

    // Extract query string
    var qIdx = working.indexOf('?');
    if (qIdx !== -1) {
      result.queryString = working.slice(qIdx + 1);
      working = working.slice(0, qIdx);
      result.params = result.queryString.split('&').filter(Boolean).map(function (p) {
        var eq = p.indexOf('=');
        return eq === -1 ? { key: decodeURIComponent(p), val: '' } : { key: decodeURIComponent(p.slice(0, eq)), val: decodeURIComponent(p.slice(eq + 1)) };
      });
    }

    // AEM path structure: /content/path/to/page[.sel1.sel2.ext][/suffix]
    // Strategy: split on '/' and find the segment containing dots after content path
    var parts = working.split('/');
    var dotSegmentIdx = -1;
    var contentPathParts = [];

    for (var i = 0; i < parts.length; i++) {
      var seg = parts[i];
      if (dotSegmentIdx === -1 && seg.indexOf('.') !== -1) {
        // This segment might be the page node with selectors/extension
        dotSegmentIdx = i;
        contentPathParts.push(seg.split('.')[0]);
      } else if (dotSegmentIdx === -1) {
        contentPathParts.push(seg);
      }
    }

    result.contentPath = contentPathParts.join('/') || '/';
    if (result.contentPath && !result.contentPath.startsWith('/') && working.startsWith('/')) {
      result.contentPath = '/' + result.contentPath;
    }

    if (dotSegmentIdx !== -1) {
      var dotSeg = parts[dotSegmentIdx];
      var dotParts = dotSeg.split('.');
      // dotParts[0] = node name (already added to contentPath)
      // last dot part is extension; middle ones are selectors
      if (dotParts.length >= 2) {
        result.extension = dotParts[dotParts.length - 1];
        result.selectors = dotParts.slice(1, dotParts.length - 1);
      }
      // suffix is everything after the dot segment
      if (dotSegmentIdx < parts.length - 1) {
        result.suffix = '/' + parts.slice(dotSegmentIdx + 1).join('/');
      }
    }

    return result;
  }

  function renderResult(r) {
    var grid = $('aup-result-grid');
    var empty = '<span class="empty">—</span>';

    function card(key, valHtml) {
      return '<div class="aup-card"><div class="aup-card-key">' + key + '</div>' + valHtml + '</div>';
    }

    function val(v) {
      return v ? '<div class="aup-card-val">' + escHtml(v) + '</div>' : '<div class="aup-card-val empty">—</div>';
    }

    var selsHtml = r.selectors.length
      ? '<div class="aup-selectors-list">' + r.selectors.map(function (s) { return '<span class="aup-sel-badge">' + escHtml(s) + '</span>'; }).join('') + '</div>'
      : '<div class="aup-card-val empty">—</div>';

    var paramsHtml = r.params.length
      ? '<table class="aup-params-table"><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>' +
        r.params.map(function (p) { return '<tr><td>' + escHtml(p.key) + '</td><td>' + escHtml(p.val) + '</td></tr>'; }).join('') +
        '</tbody></table>'
      : '<div class="aup-card-val empty">—</div>';

    var fullPath = (r.origin || '') + r.contentPath + (r.selectors.length || r.extension ? '.' + r.selectors.concat([r.extension]).join('.') : '') + (r.suffix || '') + (r.queryString ? '?' + r.queryString : '');

    grid.innerHTML = [
      card('Origin / Domain', val(r.origin)),
      card('Content Path (JCR Node)', val(r.contentPath)),
      card('Selectors (' + r.selectors.length + ')', selsHtml),
      card('Extension', val(r.extension)),
      card('Suffix', val(r.suffix)),
      card('Query String', val(r.queryString ? '?' + r.queryString : '')),
      r.params.length ? '<div class="aup-card" style="grid-column:1/-1"><div class="aup-card-key">Query Parameters (' + r.params.length + ')</div>' + paramsHtml + '</div>' : '',
      '<div class="aup-card" style="grid-column:1/-1;cursor:pointer" id="aup-full-path-card" title="Click to copy"><div class="aup-card-key">Full Reconstructed URL</div><div class="aup-card-val" style="word-break:break-all">' + escHtml(fullPath) + '</div></div>'
    ].join('');

    var copyCard = $('aup-full-path-card');
    if (copyCard) {
      copyCard.addEventListener('click', function () {
        navigator.clipboard.writeText(fullPath).then(function () {
          copyCard.querySelector('.aup-card-key').textContent = 'Full Reconstructed URL ✓ Copied!';
          setTimeout(function () { copyCard.querySelector('.aup-card-key').textContent = 'Full Reconstructed URL'; }, 2000);
        }).catch(function () {});
      });
    }
  }

  function escHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  $('aup-parse-btn').addEventListener('click', function () {
    var raw = $('aup-url-input').value;
    var errEl = $('aup-parse-error');
    errEl.style.display = 'none';
    if (!raw.trim()) { $('aup-result-grid').innerHTML = ''; return; }
    var r = parseAemUrl(raw);
    if (!r) { errEl.textContent = 'Could not parse URL.'; errEl.style.display = 'block'; return; }
    renderResult(r);
  });

  $('aup-url-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') $('aup-parse-btn').click();
  });

  $('aup-sample-btn').addEventListener('click', function () {
    $('aup-url-input').value = 'https://author.mysite.com/content/mysite/en/products/details.mobile.print.html/product-sku-123?campaign=spring&user=test';
    $('aup-parse-btn').click();
  });

  $('aup-clr-parse-btn').addEventListener('click', function () {
    $('aup-url-input').value = '';
    $('aup-result-grid').innerHTML = '';
    $('aup-parse-error').style.display = 'none';
  });

  // Build URL
  function buildUrl() {
    var domain = $('aup-b-domain').value.trim().replace(/\/$/, '');
    var path = $('aup-b-path').value.trim().replace(/\/$/, '');
    var selRaw = $('aup-b-selectors').value.trim();
    var ext = $('aup-b-ext').value.trim().replace(/^\./, '');
    var suffix = $('aup-b-suffix').value.trim();
    var queryRaw = $('aup-b-query').value.trim();

    if (!path) { $('aup-built-url').textContent = ''; $('aup-copy-built').style.display = 'none'; return; }

    var selectors = selRaw ? selRaw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];
    var url = domain + path;
    if (selectors.length) url += '.' + selectors.join('.');
    if (ext) url += '.' + ext;
    if (suffix) url += (suffix.startsWith('/') ? '' : '/') + suffix;
    if (queryRaw) {
      var params = queryRaw.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      url += '?' + params.join('&');
    }

    $('aup-built-url').textContent = url;
    $('aup-copy-built').style.display = 'inline-block';
    return url;
  }

  $('aup-build-btn').addEventListener('click', buildUrl);
  ['aup-b-domain', 'aup-b-path', 'aup-b-selectors', 'aup-b-ext', 'aup-b-suffix', 'aup-b-query'].forEach(function (id) {
    $(id).addEventListener('input', buildUrl);
  });

  $('aup-clr-build-btn').addEventListener('click', function () {
    ['aup-b-domain', 'aup-b-path', 'aup-b-selectors', 'aup-b-suffix', 'aup-b-query'].forEach(function (id) { $(id).value = ''; });
    $('aup-b-ext').value = 'html';
    $('aup-built-url').textContent = '';
    $('aup-copy-built').style.display = 'none';
  });

  $('aup-copy-built').addEventListener('click', function () {
    var url = $('aup-built-url').textContent;
    if (!url) return;
    navigator.clipboard.writeText(url).then(function () {
      var btn = $('aup-copy-built');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () { btn.textContent = 'Copy URL'; btn.classList.remove('copied'); }, 2000);
    }).catch(function () {});
  });
})();
