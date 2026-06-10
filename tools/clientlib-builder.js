(function () {
  var CSS = [
    '#clb-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-warn:#facc15;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#clb-app *{box-sizing:border-box}',
    '#clb-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#clb-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.clb-layout{display:grid;grid-template-columns:360px 1fr;gap:20px;align-items:start}',
    '@media(max-width:900px){.clb-layout{grid-template-columns:1fr}}',
    '.clb-config{display:flex;flex-direction:column;gap:12px}',
    '.clb-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.clb-input,.clb-select{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:9px 12px;font-size:0.8rem;color:var(--c-text);outline:none;transition:border-color .2s}',
    '.clb-input:focus,.clb-select:focus{border-color:var(--c-accent)}',
    '.clb-input::placeholder{color:rgba(170,176,204,0.4)}',
    '.clb-field{display:flex;flex-direction:column;gap:5px}',
    '.clb-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.clb-section-title{font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-sec);padding:6px 0 4px;border-bottom:1px solid var(--c-border);margin-top:4px}',
    '.clb-lib-list{display:flex;flex-direction:column;gap:6px;max-height:300px;overflow-y:auto}',
    '.clb-lib-item{background:var(--c-card);border:1px solid var(--c-border);border-radius:8px;padding:10px 12px;display:flex;flex-direction:column;gap:8px}',
    '.clb-lib-top{display:grid;grid-template-columns:1fr 1fr auto;gap:6px;align-items:center}',
    '.clb-lib-bottom{display:grid;grid-template-columns:1fr 1fr;gap:6px}',
    '.clb-lib-mini{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:6px;padding:6px 9px;font-size:0.75rem;color:var(--c-text);outline:none;width:100%;font-family:var(--c-mono)}',
    '.clb-lib-mini:focus{border-color:var(--c-accent)}',
    '.clb-lib-mini::placeholder{color:rgba(170,176,204,0.3)}',
    '.clb-del-btn{background:transparent;border:none;color:var(--c-error);cursor:pointer;font-size:0.9rem;padding:2px 6px;border-radius:4px;opacity:.6}',
    '.clb-del-btn:hover{opacity:1}',
    '.clb-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.clb-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.clb-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.clb-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.clb-btn.sm{padding:4px 10px;font-size:0.72rem}',
    '.clb-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.clb-tabs{display:flex;gap:4px;padding:4px;background:rgba(0,0,0,0.3);border-radius:10px;width:fit-content;margin-bottom:12px}',
    '.clb-tab{padding:6px 16px;border-radius:7px;border:none;background:transparent;color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.clb-tab.active{background:rgba(249,115,22,0.2);color:var(--c-accent);border:1px solid rgba(249,115,22,0.4)}',
    '.clb-output-section{display:none;flex-direction:column;gap:10px}',
    '.clb-output-section.active{display:flex}',
    '.clb-output-wrap{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.clb-output{width:100%;min-height:260px;padding:14px;font-family:var(--c-mono);font-size:0.76rem;color:var(--c-text);white-space:pre;overflow:auto;line-height:1.7;outline:none;background:transparent;border:none;resize:vertical}',
    '.clb-output-footer{display:flex;align-items:center;justify-content:flex-end;padding:8px 12px;border-top:1px solid var(--c-border);background:rgba(0,0,0,0.2)}',
    '.clb-validation-list{display:flex;flex-direction:column;gap:6px}',
    '.clb-val-item{padding:8px 12px;border-radius:8px;font-size:0.78rem;display:flex;align-items:flex-start;gap:8px;border:1px solid}',
    '.clb-val-item.ok{background:rgba(52,211,153,0.07);border-color:rgba(52,211,153,0.2);color:var(--c-success)}',
    '.clb-val-item.warn{background:rgba(250,204,21,0.07);border-color:rgba(250,204,21,0.25);color:var(--c-warn)}',
    '.clb-val-item.error{background:rgba(248,113,113,0.07);border-color:rgba(248,113,113,0.2);color:var(--c-error)}',
    '.clb-dep-graph{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.78rem;color:var(--c-text-sec);white-space:pre;overflow:auto;max-height:280px;line-height:1.8}'
  ].join('');

  var HTML = [
    '<div id="clb-app">',
    '<div id="clb-hdr"><h1>ClientLib Builder</h1><p>Build, validate, and generate AEM Client Library (.content.xml) with category management</p></div>',
    '<div class="clb-layout">',

    '<div class="clb-config">',
    '<div class="clb-field"><div class="clb-label">Component/Library Name</div><input class="clb-input" id="clb-lib-name" placeholder="site.components.header" value="site.components.header"></div>',
    '<div class="clb-row">',
    '<div class="clb-field"><div class="clb-label">Library Type</div><select class="clb-select" id="clb-type"><option value="both">CSS + JS</option><option value="css">CSS only</option><option value="js">JS only</option></select></div>',
    '<div class="clb-field"><div class="clb-label">Channel</div><select class="clb-select" id="clb-channel"><option value="">All (default)</option><option value="touch">Touch UI</option><option value="classic">Classic UI</option></select></div>',
    '</div>',
    '<div class="clb-field"><div class="clb-label">Dependencies (comma-separated categories)</div><input class="clb-input" id="clb-deps" placeholder="cq.jquery, granite.utils" value="cq.jquery"></div>',
    '<div class="clb-field"><div class="clb-label">Embed (categories to embed inline)</div><input class="clb-input" id="clb-embed" placeholder="site.vendor.lodash" value=""></div>',
    '<div class="clb-row">',
    '<div class="clb-field"><div class="clb-label">Allow Proxy</div><select class="clb-select" id="clb-proxy"><option value="true">Yes (recommended)</option><option value="false">No</option></select></div>',
    '<div class="clb-field"><div class="clb-label">Long Cache Key</div><select class="clb-select" id="clb-lckey"><option value="false">No</option><option value="true">Yes</option></select></div>',
    '</div>',

    '<div class="clb-section-title">Additional Libraries <button class="clb-btn sm" id="clb-add-lib" style="margin-left:8px">+ Add</button></div>',
    '<div class="clb-lib-list" id="clb-lib-list"></div>',

    '<div class="clb-btn-row" style="margin-top:8px">',
    '<button class="clb-btn primary" id="clb-gen-btn">Generate</button>',
    '<button class="clb-btn" id="clb-sample-btn">Load Sample</button>',
    '</div>',
    '</div>',

    '<div>',
    '<div class="clb-tabs">',
    '<button class="clb-tab active" id="clb-tab-xml" data-tab="xml">Content XML</button>',
    '<button class="clb-tab" id="clb-tab-html" data-tab="html">HTML Include</button>',
    '<button class="clb-tab" id="clb-tab-validate" data-tab="validate">Validate</button>',
    '<button class="clb-tab" id="clb-tab-graph" data-tab="graph">Dep Graph</button>',
    '</div>',

    '<div class="clb-output-section active" id="clb-sec-xml">',
    '<div class="clb-output-wrap"><textarea class="clb-output" id="clb-out-xml" readonly spellcheck="false"></textarea>',
    '<div class="clb-output-footer"><button class="clb-btn" id="clb-copy-xml">Copy XML</button></div></div>',
    '</div>',

    '<div class="clb-output-section" id="clb-sec-html">',
    '<div class="clb-output-wrap"><textarea class="clb-output" id="clb-out-html" readonly spellcheck="false"></textarea>',
    '<div class="clb-output-footer"><button class="clb-btn" id="clb-copy-html">Copy HTML</button></div></div>',
    '</div>',

    '<div class="clb-output-section" id="clb-sec-validate">',
    '<div class="clb-validation-list" id="clb-val-list"></div>',
    '</div>',

    '<div class="clb-output-section" id="clb-sec-graph">',
    '<div class="clb-dep-graph" id="clb-dep-graph"></div>',
    '</div>',

    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('clientlib-builder-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };

  var extraLibs = [];
  var _uid = 0;
  function uid() { return 'el' + (++_uid); }

  // Tab switching
  document.querySelectorAll('#clb-app .clb-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#clb-app .clb-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('#clb-app .clb-output-section').forEach(function (s) { s.classList.remove('active'); });
      tab.classList.add('active');
      $('clb-sec-' + tab.dataset.tab).classList.add('active');
    });
  });

  function renderExtraLibs() {
    var list = $('clb-lib-list');
    if (!extraLibs.length) { list.innerHTML = ''; return; }
    list.innerHTML = extraLibs.map(function (lib) {
      return '<div class="clb-lib-item" data-lid="' + lib.id + '">' +
        '<div class="clb-lib-top">' +
        '<input class="clb-lib-mini" placeholder="Category name" value="' + escHtml(lib.category) + '" data-cat="' + lib.id + '" style="grid-column:1/3">' +
        '<button class="clb-del-btn" data-delel="' + lib.id + '">×</button>' +
        '</div>' +
        '<div class="clb-lib-bottom">' +
        '<input class="clb-lib-mini" placeholder="JS filename (site.js)" value="' + escHtml(lib.js) + '" data-ljs="' + lib.id + '">' +
        '<input class="clb-lib-mini" placeholder="CSS filename (site.css)" value="' + escHtml(lib.css) + '" data-lcss="' + lib.id + '">' +
        '</div></div>';
    }).join('');

    list.querySelectorAll('[data-cat]').forEach(function (el) { el.addEventListener('input', function () { var l = extraLibs.find(function (x) { return x.id === el.dataset.cat; }); if (l) l.category = el.value; }); });
    list.querySelectorAll('[data-ljs]').forEach(function (el) { el.addEventListener('input', function () { var l = extraLibs.find(function (x) { return x.id === el.dataset.ljs; }); if (l) l.js = el.value; }); });
    list.querySelectorAll('[data-lcss]').forEach(function (el) { el.addEventListener('input', function () { var l = extraLibs.find(function (x) { return x.id === el.dataset.lcss; }); if (l) l.css = el.value; }); });
    list.querySelectorAll('[data-delel]').forEach(function (el) { el.addEventListener('click', function () { extraLibs = extraLibs.filter(function (x) { return x.id !== el.dataset.delel; }); renderExtraLibs(); }); });
  }

  $('clb-add-lib').addEventListener('click', function () {
    extraLibs.push({ id: uid(), category: 'site.vendor.newlib', js: 'newlib.js', css: 'newlib.css' });
    renderExtraLibs();
  });

  $('clb-sample-btn').addEventListener('click', function () {
    $('clb-lib-name').value = 'mysite.components.header';
    $('clb-deps').value = 'cq.jquery, granite.utils, cq.wcm.edit';
    $('clb-embed').value = 'mysite.vendor.slick';
    $('clb-proxy').value = 'true';
    $('clb-type').value = 'both';
    extraLibs = [
      { id: uid(), category: 'mysite.vendor.slick', js: 'slick.min.js', css: 'slick.min.css' }
    ];
    renderExtraLibs();
    generate();
  });

  function validateCategory(cat) {
    var issues = [];
    if (!cat) { issues.push({ type: 'error', msg: 'Category name is empty' }); return issues; }
    if (/[A-Z]/.test(cat)) issues.push({ type: 'warn', msg: '"' + cat + '": AEM convention uses lowercase categories' });
    if (/[_]/.test(cat)) issues.push({ type: 'warn', msg: '"' + cat + '": Use dots (.) not underscores (_) as separators' });
    if (!/^[a-z]/.test(cat)) issues.push({ type: 'warn', msg: '"' + cat + '": Category should start with a lowercase letter' });
    if (/\s/.test(cat)) issues.push({ type: 'error', msg: '"' + cat + '": Category name cannot contain spaces' });
    if (cat.split('.').length < 2) issues.push({ type: 'warn', msg: '"' + cat + '": Consider using dot-namespacing (e.g., project.components.name)' });
    return issues;
  }

  function generate() {
    var category = $('clb-lib-name').value.trim() || 'site.components.main';
    var libType = $('clb-type').value;
    var channel = $('clb-channel').value;
    var deps = $('clb-deps').value.trim();
    var embed = $('clb-embed').value.trim();
    var allowProxy = $('clb-proxy').value;
    var longKey = $('clb-lckey').value;

    // Generate .content.xml
    var xmlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<jcr:root',
      '  xmlns:jcr="http://www.jcp.org/jcr/1.0"',
      '  xmlns:cq="http://www.day.com/jcr/cq/1.0"',
      '  jcr:primaryType="cq:ClientLibraryFolder"',
      '  categories="[' + category + ']"'
    ];
    if (deps) {
      var depsArr = deps.split(',').map(function (d) { return d.trim(); }).filter(Boolean);
      xmlLines.push('  dependencies="[' + depsArr.join(',') + ']"');
    }
    if (embed) {
      var embedArr = embed.split(',').map(function (d) { return d.trim(); }).filter(Boolean);
      xmlLines.push('  embed="[' + embedArr.join(',') + ']"');
    }
    if (allowProxy === 'true') xmlLines.push('  allowProxy="{Boolean}true"');
    if (longKey === 'true') xmlLines.push('  longCacheKey="${version}"');
    if (channel) xmlLines.push('  channels="[' + channel + ']"');
    xmlLines.push('/>');

    // CSS/JS file lists comments
    var fileComments = ['', '<!-- File structure for /apps/myproject/clientlibs/' + category.split('.').pop() + '/ -->',
      '<!--', '  ├── .content.xml     (this file)'];
    if (libType === 'both' || libType === 'css') fileComments.push('  ├── css.txt          (CSS file list)', '  ├── styles/          (CSS files)', '  │   └── main.less');
    if (libType === 'both' || libType === 'js') fileComments.push('  ├── js.txt           (JS file list)', '  └── js/              (JS files)', '      └── main.js');
    fileComments.push('-->');

    var xml = xmlLines.join('\n') + '\n' + fileComments.join('\n');
    $('clb-out-xml').value = xml;

    // Generate HTML includes
    var htmlLines = ['<!-- AEM HTL include (in head.html or customheaderlibs.html) -->',
      '<sly data-sly-use.clientlib="core/wcm/components/commons/v1/templates/clientlib.html">',
      '  <!-- CSS in <head> -->',
      '  <sly data-sly-call="${clientlib.css @ categories=\'' + category + '\'}"></sly>',
      '  <!-- JS at end of <body> -->',
      '  <sly data-sly-call="${clientlib.js @ categories=\'' + category + '\'}"></sly>',
      '</sly>',
      '',
      '<!-- Or using ui:includeClientLib (JSP — deprecated) -->',
      '<%-- <ui:includeClientLib categories="' + category + '" /> --%>',
      '',
      '<!-- HTL includeClientLib tag -->',
      '<sly data-sly-call="${clientlib.all @ categories=\'' + category + '\'}"></sly>'];
    $('clb-out-html').value = htmlLines.join('\n');

    // Validation
    var allCategories = [category].concat(extraLibs.map(function (l) { return l.category; }));
    var allIssues = [];
    allCategories.forEach(function (cat) {
      validateCategory(cat).forEach(function (iss) { allIssues.push(iss); });
    });

    // Check for circular deps
    var depsArr2 = deps ? deps.split(',').map(function (d) { return d.trim(); }) : [];
    if (depsArr2.indexOf(category) !== -1) {
      allIssues.push({ type: 'error', msg: 'Circular dependency: "' + category + '" depends on itself' });
    }
    if (!allIssues.length) allIssues.push({ type: 'ok', msg: 'All category names follow AEM conventions' });

    $('clb-val-list').innerHTML = allIssues.map(function (iss) {
      var icon = iss.type === 'ok' ? '✓' : iss.type === 'warn' ? '⚠' : '✕';
      return '<div class="clb-val-item ' + iss.type + '"><span>' + icon + '</span><span>' + escHtml(iss.msg) + '</span></div>';
    }).join('');

    // Dependency graph
    var graphLines = ['ClientLib Dependency Graph', '─'.repeat(40), ''];
    graphLines.push('  ' + category);
    if (depsArr2.length) {
      graphLines.push('  ├── dependencies:');
      depsArr2.forEach(function (d, i) {
        graphLines.push('  │   ' + (i === depsArr2.length - 1 ? '└──' : '├──') + ' ' + d);
      });
    }
    var embedArr2 = embed ? embed.split(',').map(function (d) { return d.trim(); }) : [];
    if (embedArr2.length) {
      graphLines.push('  ├── embedded:');
      embedArr2.forEach(function (d, i) {
        graphLines.push('  │   ' + (i === embedArr2.length - 1 ? '└──' : '├──') + ' ' + d + ' [inline]');
      });
    }
    $('clb-dep-graph').textContent = graphLines.join('\n');
  }

  $('clb-gen-btn').addEventListener('click', generate);

  function makeCopyBtn(btnId, outId) {
    $(btnId).addEventListener('click', function () {
      var text = $(outId).value;
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        var btn = $(btnId);
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = btn.textContent.replace('Copied!', btn.id.includes('xml') ? 'Copy XML' : 'Copy HTML'); btn.classList.remove('copied'); }, 2000);
      }).catch(function () {});
    });
  }
  makeCopyBtn('clb-copy-xml', 'clb-out-xml');
  makeCopyBtn('clb-copy-html', 'clb-out-html');

  function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  generate();
})();
