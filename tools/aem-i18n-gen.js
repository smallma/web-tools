(function () {
  var CSS = [
    '#ai18-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#ai18-app *{box-sizing:border-box}',
    '#ai18-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#ai18-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.ai18-layout{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){.ai18-layout{grid-template-columns:1fr}}',
    '.ai18-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.ai18-input,.ai18-select{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:9px 12px;font-size:0.8rem;color:var(--c-text);outline:none;transition:border-color .2s}',
    '.ai18-input:focus,.ai18-select:focus{border-color:var(--c-accent)}',
    '.ai18-input::placeholder{color:rgba(170,176,204,0.4)}',
    '.ai18-field{display:flex;flex-direction:column;gap:5px}',
    '.ai18-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.ai18-entries-list{display:flex;flex-direction:column;gap:6px;max-height:360px;overflow-y:auto}',
    '.ai18-entry{display:grid;grid-template-columns:1fr 1fr auto;gap:6px;align-items:center;background:var(--c-card);border:1px solid var(--c-border);border-radius:8px;padding:8px 10px}',
    '.ai18-mini{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:6px;padding:7px 10px;font-size:0.78rem;color:var(--c-text);outline:none;width:100%;font-family:var(--c-mono)}',
    '.ai18-mini:focus{border-color:var(--c-accent)}',
    '.ai18-mini::placeholder{color:rgba(170,176,204,0.3)}',
    '.ai18-del{background:transparent;border:none;color:var(--c-error);cursor:pointer;font-size:0.9rem;padding:2px 6px;border-radius:4px;opacity:.6}',
    '.ai18-del:hover{opacity:1}',
    '.ai18-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.ai18-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.ai18-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.ai18-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.ai18-btn.sm{padding:4px 10px;font-size:0.72rem}',
    '.ai18-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.ai18-tabs{display:flex;gap:4px;padding:4px;background:rgba(0,0,0,0.3);border-radius:10px;width:fit-content;margin-bottom:10px}',
    '.ai18-tab{padding:6px 14px;border-radius:7px;border:none;background:transparent;color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.ai18-tab.active{background:rgba(249,115,22,0.2);color:var(--c-accent);border:1px solid rgba(249,115,22,0.4)}',
    '.ai18-out-sec{display:none;flex-direction:column;gap:8px}',
    '.ai18-out-sec.active{display:flex}',
    '.ai18-output-wrap{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.ai18-output{width:100%;min-height:420px;padding:14px;font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text);white-space:pre;overflow:auto;line-height:1.7;outline:none;background:transparent;border:none;resize:vertical}',
    '.ai18-output-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-top:1px solid var(--c-border);background:rgba(0,0,0,0.2)}',
    '.ai18-info{font-size:0.74rem;color:var(--c-text-sec)}',
    '.ai18-section-title{font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-sec);padding:6px 0 4px;border-bottom:1px solid var(--c-border);margin-top:4px}',
    '.ai18-smart-input{width:100%;min-height:100px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:10px 12px;font-size:0.8rem;color:var(--c-text);resize:vertical;outline:none;transition:border-color .2s;line-height:1.6}',
    '.ai18-smart-input:focus{border-color:var(--c-accent)}',
    '.ai18-smart-input::placeholder{color:rgba(170,176,204,0.35)}'
  ].join('');

  var HTML = [
    '<div id="ai18-app">',
    '<div id="ai18-hdr"><h1>AEM i18n Generator</h1><p>Generate JCR i18n translation nodes (.content.xml) and Java resource bundles for AEM</p></div>',
    '<div class="ai18-layout">',

    '<div style="display:flex;flex-direction:column;gap:14px">',
    '<div class="ai18-row">',
    '<div class="ai18-field"><div class="ai18-label">JCR Path Prefix</div><input class="ai18-input" id="ai18-path" placeholder="/apps/mysite/i18n" value="/apps/mysite/i18n"></div>',
    '<div class="ai18-field"><div class="ai18-label">Locale</div><input class="ai18-input" id="ai18-locale" placeholder="en" value="en"></div>',
    '</div>',
    '<div class="ai18-field"><div class="ai18-label">Language Name</div><input class="ai18-input" id="ai18-lang-name" placeholder="English" value="English"></div>',

    '<div class="ai18-section-title">Smart Parse <span style="font-weight:400;text-transform:none;font-size:0.72rem;opacity:.7;letter-spacing:0">(paste text to auto-extract keys)</span></div>',
    '<textarea class="ai18-smart-input" id="ai18-smart" placeholder="Paste any text here...&#10;E.g.: Submit Form, Cancel, Please enter your email address, Sign In"></textarea>',
    '<div class="ai18-btn-row"><button class="ai18-btn" id="ai18-smart-parse">Extract Keys from Text</button></div>',

    '<div class="ai18-section-title">Translation Keys <button class="ai18-btn sm" id="ai18-add-key" style="margin-left:8px">+ Add</button></div>',
    '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:6px;padding:0 0 4px;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-sec)"><span>Key</span><span>Value (Translation)</span><span></span></div>',
    '<div class="ai18-entries-list" id="ai18-entries"></div>',
    '<div class="ai18-btn-row" style="margin-top:8px"><button class="ai18-btn primary" id="ai18-gen-btn">Generate</button><button class="ai18-btn" id="ai18-sample-btn">Load Sample</button><button class="ai18-btn" id="ai18-clr-btn">Clear</button></div>',
    '</div>',

    '<div>',
    '<div class="ai18-tabs">',
    '<button class="ai18-tab active" id="ai18-tab-jcr" data-tab="jcr">JCR XML</button>',
    '<button class="ai18-tab" id="ai18-tab-props" data-tab="props">Properties File</button>',
    '<button class="ai18-tab" id="ai18-tab-htl" data-tab="htl">HTL Usage</button>',
    '</div>',

    '<div class="ai18-out-sec active" id="ai18-sec-jcr">',
    '<div class="ai18-output-wrap"><textarea class="ai18-output" id="ai18-out-jcr" readonly spellcheck="false"></textarea>',
    '<div class="ai18-output-footer"><div class="ai18-info" id="ai18-info-jcr"></div><button class="ai18-btn" id="ai18-copy-jcr">Copy XML</button></div></div>',
    '</div>',

    '<div class="ai18-out-sec" id="ai18-sec-props">',
    '<div class="ai18-output-wrap"><textarea class="ai18-output" id="ai18-out-props" readonly spellcheck="false"></textarea>',
    '<div class="ai18-output-footer"><div class="ai18-info">Java .properties format</div><button class="ai18-btn" id="ai18-copy-props">Copy</button></div></div>',
    '</div>',

    '<div class="ai18-out-sec" id="ai18-sec-htl">',
    '<div class="ai18-output-wrap"><textarea class="ai18-output" id="ai18-out-htl" readonly spellcheck="false" style="min-height:260px"></textarea>',
    '<div class="ai18-output-footer"><button class="ai18-btn" id="ai18-copy-htl">Copy</button></div></div>',
    '</div>',

    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('aem-i18n-gen-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };

  var entries = [
    { id: 'e1', key: 'site.header.title', value: 'Welcome to My Site' },
    { id: 'e2', key: 'site.header.nav.home', value: 'Home' },
    { id: 'e3', key: 'site.cta.submit', value: 'Submit' },
    { id: 'e4', key: 'site.form.email.placeholder', value: 'Enter your email address' }
  ];
  var _uid = 10;
  function uid() { return 'e' + (++_uid); }

  // Tab switching
  document.querySelectorAll('#ai18-app .ai18-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('#ai18-app .ai18-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('#ai18-app .ai18-out-sec').forEach(function (s) { s.classList.remove('active'); });
      tab.classList.add('active');
      $('ai18-sec-' + tab.dataset.tab).classList.add('active');
    });
  });

  function renderEntries() {
    var list = $('ai18-entries');
    list.innerHTML = entries.map(function (e) {
      return '<div class="ai18-entry" data-eid="' + e.id + '">' +
        '<input class="ai18-mini" placeholder="key.name" value="' + escHtml(e.key) + '" data-ekey="' + e.id + '">' +
        '<input class="ai18-mini" placeholder="Translation value" value="' + escHtml(e.value) + '" data-eval="' + e.id + '">' +
        '<button class="ai18-del" data-delentry="' + e.id + '">×</button>' +
        '</div>';
    }).join('');
    list.querySelectorAll('[data-ekey]').forEach(function (el) { el.addEventListener('input', function () { var e = entries.find(function (x) { return x.id === el.dataset.ekey; }); if (e) e.key = el.value; }); });
    list.querySelectorAll('[data-eval]').forEach(function (el) { el.addEventListener('input', function () { var e = entries.find(function (x) { return x.id === el.dataset.eval; }); if (e) e.value = el.value; }); });
    list.querySelectorAll('[data-delentry]').forEach(function (el) { el.addEventListener('click', function () { entries = entries.filter(function (x) { return x.id !== el.dataset.delentry; }); renderEntries(); }); });
  }

  $('ai18-add-key').addEventListener('click', function () {
    entries.push({ id: uid(), key: 'site.new.key', value: 'New Value' });
    renderEntries();
  });

  $('ai18-clr-btn').addEventListener('click', function () { entries = []; renderEntries(); });

  $('ai18-sample-btn').addEventListener('click', function () {
    $('ai18-path').value = '/apps/mysite/i18n';
    $('ai18-locale').value = 'en';
    $('ai18-lang-name').value = 'English';
    entries = [
      { id: 'e1', key: 'site.header.title', value: 'Welcome to My Site' },
      { id: 'e2', key: 'site.nav.home', value: 'Home' },
      { id: 'e3', key: 'site.nav.about', value: 'About Us' },
      { id: 'e4', key: 'site.nav.contact', value: 'Contact' },
      { id: 'e5', key: 'site.cta.submit', value: 'Submit' },
      { id: 'e6', key: 'site.cta.cancel', value: 'Cancel' },
      { id: 'e7', key: 'site.form.email', value: 'Email Address' },
      { id: 'e8', key: 'site.form.email.placeholder', value: 'Enter your email address' }
    ];
    renderEntries();
    generate();
  });

  // Smart parse: extract potential i18n keys from freeform text
  $('ai18-smart-parse').addEventListener('click', function () {
    var text = $('ai18-smart').value.trim();
    if (!text) return;
    var sentences = text.split(/[,\n;]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    sentences.forEach(function (sentence) {
      var key = sentence
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .replace(/\s+/g, '.')
        .slice(0, 40);
      if (key) {
        entries.push({ id: uid(), key: 'site.' + key, value: sentence });
      }
    });
    renderEntries();
    $('ai18-smart').value = '';
  });

  function escXml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }
  function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function generate() {
    var jcrPath = $('ai18-path').value.trim() || '/apps/mysite/i18n';
    var locale = $('ai18-locale').value.trim() || 'en';
    var langName = $('ai18-lang-name').value.trim() || 'English';

    // JCR XML
    var xmlLines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<!-- JCR path: ' + jcrPath + '/' + locale + '.xml -->',
      '<jcr:root',
      '  xmlns:jcr="http://www.jcp.org/jcr/1.0"',
      '  xmlns:mix="http://www.jcp.org/jcr/mix/1.0"',
      '  xmlns:sling="http://sling.apache.org/jcr/sling/1.0"',
      '  jcr:language="' + locale + '"',
      '  jcr:mixinTypes="[mix:language]"',
      '  jcr:primaryType="sling:Folder"',
      '  sling:basename="' + langName + '">'
    ];

    entries.forEach(function (e) {
      if (!e.key) return;
      xmlLines.push('  <' + escXml(e.key.replace(/\./g, '_').replace(/[^a-zA-Z0-9_-]/g, '_')) + '');
      xmlLines.push('    jcr:primaryType="sling:MessageEntry"');
      xmlLines.push('    sling:key="' + escXml(e.key) + '"');
      xmlLines.push('    sling:message="' + escXml(e.value) + '"/>');
    });

    xmlLines.push('</jcr:root>');
    $('ai18-out-jcr').value = xmlLines.join('\n');
    $('ai18-info-jcr').textContent = entries.length + ' message entries, locale: ' + locale;

    // Properties file
    var propsLines = [
      '# AEM i18n Messages - ' + langName + ' (' + locale + ')',
      '# Generated from JCR path: ' + jcrPath + '/' + locale + '.xml',
      '# Date: ' + new Date().toISOString().split('T')[0],
      ''
    ];
    entries.forEach(function (e) {
      if (!e.key) return;
      var escapedVal = e.value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
      propsLines.push(e.key + '=' + escapedVal);
    });
    $('ai18-out-props').value = propsLines.join('\n');

    // HTL usage
    var sampleKey = entries.length ? entries[0].key : 'site.header.title';
    var htlLines = [
      '<!-- Load i18n in HTL component -->',
      '<sly data-sly-use.i18n="com.adobe.granite.i18n.I18nProvider">',
      '',
      '  <!-- Simple translation -->',
      '  <h1>${i18n.get(\'' + sampleKey + '\')}</h1>',
      '',
      '  <!-- With default fallback -->',
      '  <p>${i18n.get(\'' + sampleKey + '\', \'Default Value\')}</p>',
      '',
      '  <!-- Parametrized message (e.g., "Hello, {0}!") -->',
      '  <p>${i18n.get(\'' + sampleKey + '\', [userName])}</p>',
      '',
      '</sly>',
      '',
      '<!-- In Sling Model (Java) -->',
      '// Inject:',
      '// @Self private SlingHttpServletRequest request;',
      '//  ',
      '// Usage:',
      '// ResourceBundle bundle = request.getResourceBundle(Locale.ENGLISH);',
      '// I18n i18n = new I18n(bundle);',
      '// String msg = i18n.get("' + sampleKey + '");',
      '',
      '<!-- All key-value pairs for reference: -->',
    ];
    entries.forEach(function (e) {
      if (!e.key) return;
      htlLines.push('<!-- ' + e.key + ' = "' + e.value + '" -->');
    });
    $('ai18-out-htl').value = htlLines.join('\n');
  }

  $('ai18-gen-btn').addEventListener('click', generate);

  ['ai18-copy-jcr', 'ai18-copy-props', 'ai18-copy-htl'].forEach(function (btnId) {
    $(btnId).addEventListener('click', function () {
      var outId = btnId.replace('copy', 'out').replace('-jcr', '-jcr').replace('-props', '-props').replace('-htl', '-htl');
      var text = $(outId).value;
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        $(btnId).textContent = 'Copied!';
        $(btnId).classList.add('copied');
        setTimeout(function () { $(btnId).textContent = 'Copy'; $(btnId).classList.remove('copied'); }, 2000);
      }).catch(function () {});
    });
  });

  renderEntries();
  generate();
})();
