(function () {
  var CSS = [
    '#smg-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#smg-app *{box-sizing:border-box}',
    '#smg-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#smg-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.smg-layout{display:grid;grid-template-columns:300px 1fr;gap:20px;align-items:start}',
    '@media(max-width:900px){.smg-layout{grid-template-columns:1fr}}',
    '.smg-config{display:flex;flex-direction:column;gap:12px}',
    '.smg-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.smg-input,.smg-select{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:9px 12px;font-size:0.8rem;color:var(--c-text);outline:none;transition:border-color .2s}',
    '.smg-input:focus,.smg-select:focus{border-color:var(--c-accent)}',
    '.smg-input::placeholder{color:rgba(170,176,204,0.4)}',
    '.smg-field{display:flex;flex-direction:column;gap:5px}',
    '.smg-checkbox-group{display:flex;flex-direction:column;gap:6px}',
    '.smg-checkbox-row{display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--c-text-sec);cursor:pointer}',
    '.smg-checkbox-row input{accent-color:var(--c-accent);width:14px;height:14px;cursor:pointer}',
    '.smg-section-title{font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-sec);padding:6px 0 4px;border-bottom:1px solid var(--c-border);margin-top:4px}',
    '.smg-fields-list{display:flex;flex-direction:column;gap:6px;max-height:280px;overflow-y:auto}',
    '.smg-field-item{background:var(--c-card);border:1px solid var(--c-border);border-radius:8px;padding:8px 10px;display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:6px;align-items:center}',
    '.smg-field-mini{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:6px;padding:6px 8px;font-size:0.75rem;color:var(--c-text);outline:none;width:100%}',
    '.smg-field-mini:focus{border-color:var(--c-accent)}',
    '.smg-field-mini::placeholder{color:rgba(170,176,204,0.3)}',
    '.smg-del-btn{background:transparent;border:none;color:var(--c-error);cursor:pointer;font-size:0.9rem;padding:2px 6px;border-radius:4px;opacity:.6}',
    '.smg-del-btn:hover{opacity:1}',
    '.smg-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.smg-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.smg-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.smg-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.smg-btn.sm{padding:4px 10px;font-size:0.72rem}',
    '.smg-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.smg-output-wrap{background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.smg-output{width:100%;min-height:560px;padding:14px;font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text);white-space:pre;overflow:auto;line-height:1.7;outline:none;background:transparent;border:none;resize:vertical}',
    '.smg-output-footer{display:flex;align-items:center;justify-content:flex-end;padding:8px 12px;border-top:1px solid var(--c-border);background:rgba(0,0,0,0.2)}'
  ].join('');

  var INJECT_TYPES = [
    { value: 'ValueMapValue', label: '@ValueMapValue (JCR property)' },
    { value: 'ChildResource', label: '@ChildResource (child node)' },
    { value: 'RequestAttribute', label: '@RequestAttribute' },
    { value: 'SlingObject', label: '@SlingObject (request/response/resolver)' },
    { value: 'OSGiService', label: '@OSGiService' },
    { value: 'ScriptVariable', label: '@ScriptVariable (WCM vars)' },
    { value: 'Self', label: '@Self (adapt current)' }
  ];

  var JAVA_TYPES = ['String', 'Boolean', 'Integer', 'Long', 'Double', 'List<String>', 'String[]', 'Resource', 'ResourceResolver', 'SlingHttpServletRequest', 'Page', 'PageManager', 'Designer', 'Object'];

  var injectTypeOpts = INJECT_TYPES.map(function (t) { return '<option value="' + t.value + '">' + t.label + '</option>'; }).join('');
  var javaTypeOpts = JAVA_TYPES.map(function (t) { return '<option value="' + t + '">' + t + '</option>'; }).join('');

  var HTML = [
    '<div id="smg-app">',
    '<div id="smg-hdr"><h1>Sling Model Generator</h1><p>Generate Java Sling Model boilerplate with annotations for AEM</p></div>',
    '<div class="smg-layout">',

    '<div class="smg-config">',
    '<div class="smg-field"><div class="smg-label">Package Name</div><input class="smg-input" id="smg-pkg" placeholder="com.mysite.core.models" value="com.mysite.core.models"></div>',
    '<div class="smg-field"><div class="smg-label">Class Name</div><input class="smg-input" id="smg-class" placeholder="MyComponent" value="MyComponent"></div>',
    '<div class="smg-field"><div class="smg-label">Resource Type</div><input class="smg-input" id="smg-rt" placeholder="mysite/components/content/mycomponent" value="mysite/components/content/mycomponent"></div>',

    '<div class="smg-section-title">Adaptable &amp; Options</div>',
    '<div class="smg-field"><div class="smg-label">Adaptable</div>',
    '<select class="smg-select" id="smg-adaptable">',
    '<option value="resource">Resource (default)</option>',
    '<option value="request">SlingHttpServletRequest</option>',
    '<option value="both">Both (Resource + Request)</option>',
    '</select></div>',

    '<div class="smg-checkbox-group">',
    '<label class="smg-checkbox-row"><input type="checkbox" id="smg-interface" checked> Generate Interface</label>',
    '<label class="smg-checkbox-row"><input type="checkbox" id="smg-postconstruct" checked> Add @PostConstruct method</label>',
    '<label class="smg-checkbox-row"><input type="checkbox" id="smg-optional"> Use Optional injection (DEFAULT_VALUES)</label>',
    '<label class="smg-checkbox-row"><input type="checkbox" id="smg-slf4j" checked> Add SLF4J Logger</label>',
    '</div>',

    '<div class="smg-section-title">Fields <button class="smg-btn sm" id="smg-add-field" style="margin-left:8px">+ Add</button></div>',
    '<div class="smg-fields-list" id="smg-fields-list"></div>',

    '<div class="smg-btn-row" style="margin-top:8px"><button class="smg-btn primary" id="smg-gen-btn">Generate Java</button></div>',
    '</div>',

    '<div>',
    '<div class="smg-label">Generated Java Class</div>',
    '<div class="smg-output-wrap">',
    '<textarea class="smg-output" id="smg-output" readonly spellcheck="false"></textarea>',
    '<div class="smg-output-footer"><button class="smg-btn" id="smg-copy-btn">Copy Java</button></div>',
    '</div>',
    '</div>',

    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('sling-model-gen-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };

  var modelFields = [
    { id: 'mf1', name: 'title', type: 'String', inject: 'ValueMapValue', required: true },
    { id: 'mf2', name: 'description', type: 'String', inject: 'ValueMapValue', required: false }
  ];
  var _uid = 10;
  function uid() { return 'mf' + (++_uid); }

  function renderModelFields() {
    var list = $('smg-fields-list');
    list.innerHTML = modelFields.map(function (f) {
      var selType = JAVA_TYPES.map(function (t) { return '<option value="' + t + '"' + (t === f.type ? ' selected' : '') + '>' + t + '</option>'; }).join('');
      var selInject = INJECT_TYPES.map(function (t) { return '<option value="' + t.value + '"' + (t.value === f.inject ? ' selected' : '') + '>' + t.label.replace(/@\w+\s/, '') + '</option>'; }).join('');
      return '<div class="smg-field-item" data-fid="' + f.id + '">' +
        '<input class="smg-field-mini" placeholder="fieldName" value="' + f.name + '" data-fname="' + f.id + '">' +
        '<select class="smg-field-mini" data-ftype="' + f.id + '">' + selType + '</select>' +
        '<select class="smg-field-mini" data-finject="' + f.id + '">' + selInject + '</select>' +
        '<button class="smg-del-btn" data-delfield="' + f.id + '">×</button>' +
        '</div>';
    }).join('');

    list.querySelectorAll('[data-fname]').forEach(function (el) { el.addEventListener('input', function () { var f = modelFields.find(function (x) { return x.id === el.dataset.fname; }); if (f) f.name = el.value; }); });
    list.querySelectorAll('[data-ftype]').forEach(function (el) { el.addEventListener('change', function () { var f = modelFields.find(function (x) { return x.id === el.dataset.ftype; }); if (f) f.type = el.value; }); });
    list.querySelectorAll('[data-finject]').forEach(function (el) { el.addEventListener('change', function () { var f = modelFields.find(function (x) { return x.id === el.dataset.finject; }); if (f) f.inject = el.value; }); });
    list.querySelectorAll('[data-delfield]').forEach(function (el) {
      el.addEventListener('click', function () { modelFields = modelFields.filter(function (x) { return x.id !== el.dataset.delfield; }); renderModelFields(); });
    });
  }

  $('smg-add-field').addEventListener('click', function () {
    modelFields.push({ id: uid(), name: 'newField', type: 'String', inject: 'ValueMapValue', required: false });
    renderModelFields();
  });

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function generateJava() {
    var pkg = $('smg-pkg').value.trim() || 'com.mysite.core.models';
    var cls = $('smg-class').value.trim() || 'MyComponent';
    var rt = $('smg-rt').value.trim();
    var adaptable = $('smg-adaptable').value;
    var genInterface = $('smg-interface').checked;
    var postConstruct = $('smg-postconstruct').checked;
    var optional = $('smg-optional').checked;
    var slf4j = $('smg-slf4j').checked;

    var imports = new Set();
    imports.add('org.apache.sling.api.resource.Resource');
    imports.add('org.apache.sling.models.annotations.Model');
    imports.add('org.apache.sling.models.annotations.DefaultInjectionStrategy');

    if (adaptable === 'request' || adaptable === 'both') {
      imports.add('org.apache.sling.api.SlingHttpServletRequest');
    }

    var fieldImportMap = {
      'ValueMapValue': 'org.apache.sling.models.annotations.injectorspecific.ValueMapValue',
      'ChildResource': 'org.apache.sling.models.annotations.injectorspecific.ChildResource',
      'RequestAttribute': 'org.apache.sling.models.annotations.injectorspecific.RequestAttribute',
      'SlingObject': 'org.apache.sling.models.annotations.injectorspecific.SlingObject',
      'OSGiService': 'org.apache.sling.models.annotations.injectorspecific.OSGiService',
      'ScriptVariable': 'org.apache.sling.models.annotations.injectorspecific.ScriptVariable',
      'Self': 'org.apache.sling.models.annotations.Self'
    };

    modelFields.forEach(function (f) {
      if (fieldImportMap[f.inject]) imports.add(fieldImportMap[f.inject]);
    });

    if (postConstruct) imports.add('javax.annotation.PostConstruct');
    if (optional) imports.add('org.apache.sling.models.annotations.Optional');
    if (slf4j) { imports.add('org.slf4j.Logger'); imports.add('org.slf4j.LoggerFactory'); }
    if (genInterface) imports.add('javax.annotation.Nonnull');

    var adaptables = adaptable === 'both'
      ? '{Resource.class, SlingHttpServletRequest.class}'
      : (adaptable === 'request' ? 'SlingHttpServletRequest.class' : 'Resource.class');

    var lines = [];
    lines.push('package ' + pkg + ';');
    lines.push('');
    var sortedImports = Array.from(imports).sort();
    sortedImports.forEach(function (imp) { lines.push('import ' + imp + ';'); });
    lines.push('');

    if (genInterface) {
      lines.push('/**');
      lines.push(' * Sling Model interface for ' + cls + ' component.');
      if (rt) lines.push(' * Resource type: ' + rt);
      lines.push(' */');
      lines.push('@Model(');
      lines.push('    adaptables = ' + adaptables + ',');
      lines.push('    adapters = ' + cls + '.class,');
      if (rt) lines.push('    resourceType = "' + rt + '",');
      lines.push('    defaultInjectionStrategy = DefaultInjectionStrategy.' + (optional ? 'OPTIONAL' : 'REQUIRED'));
      lines.push(')');
      lines.push('public interface ' + cls + ' {');
      lines.push('');
      modelFields.forEach(function (f) {
        if (f.inject === 'ValueMapValue' || f.inject === 'ChildResource') {
          var getter = 'get' + cap(f.name) + '()';
          if (f.type === 'Boolean') getter = 'is' + cap(f.name) + '()';
          lines.push('    ' + f.type + ' ' + getter + ';');
        }
      });
      lines.push('}');
      lines.push('');
      lines.push('// ─── Implementation ──────────────────────────────────────────');
      lines.push('package ' + pkg + '.impl;');
      lines.push('');
      lines.push('import ' + pkg + '.' + cls + ';');
      sortedImports.forEach(function (imp) { lines.push('import ' + imp + ';'); });
      lines.push('');
      lines.push('public class ' + cls + 'Impl implements ' + cls + ' {');
    } else {
      lines.push('/**');
      lines.push(' * Sling Model for ' + cls + ' component.');
      if (rt) lines.push(' * Resource type: ' + rt);
      lines.push(' */');
      lines.push('@Model(');
      lines.push('    adaptables = ' + adaptables + ',');
      if (rt) lines.push('    resourceType = "' + rt + '",');
      lines.push('    defaultInjectionStrategy = DefaultInjectionStrategy.' + (optional ? 'OPTIONAL' : 'REQUIRED'));
      lines.push(')');
      lines.push('public class ' + cls + ' {');
    }

    lines.push('');
    if (slf4j) {
      lines.push('    private static final Logger LOG = LoggerFactory.getLogger(' + cls + (genInterface ? 'Impl' : '') + '.class);');
      lines.push('');
    }

    modelFields.forEach(function (f) {
      lines.push('    @' + f.inject);
      lines.push('    private ' + f.type + ' ' + f.name + ';');
      lines.push('');
    });

    if (postConstruct) {
      lines.push('    @PostConstruct');
      lines.push('    protected void init() {');
      if (slf4j) lines.push('        LOG.debug("Initializing ' + cls + '");');
      lines.push('        // initialization logic here');
      lines.push('    }');
      lines.push('');
    }

    modelFields.forEach(function (f) {
      if (f.inject === 'ValueMapValue' || f.inject === 'ChildResource' || f.inject === 'Self') {
        var isOverride = genInterface && (f.inject === 'ValueMapValue' || f.inject === 'ChildResource');
        if (isOverride) lines.push('    @Override');
        if (f.type === 'Boolean') {
          lines.push('    public ' + f.type + ' is' + cap(f.name) + '() {');
        } else {
          lines.push('    public ' + f.type + ' get' + cap(f.name) + '() {');
        }
        lines.push('        return ' + f.name + ';');
        lines.push('    }');
        lines.push('');
      }
    });

    lines.push('}');

    var java = lines.join('\n');
    $('smg-output').value = java;
    return java;
  }

  $('smg-gen-btn').addEventListener('click', generateJava);

  $('smg-copy-btn').addEventListener('click', function () {
    var text = $('smg-output').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      var btn = $('smg-copy-btn');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () { btn.textContent = 'Copy Java'; btn.classList.remove('copied'); }, 2000);
    }).catch(function () {});
  });

  renderModelFields();
  generateJava();
})();
