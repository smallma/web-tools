(function () {
  var CSS = [
    '#dxg-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#dxg-app *{box-sizing:border-box}',
    '#dxg-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#dxg-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.dxg-layout{display:grid;grid-template-columns:340px 1fr;gap:20px;align-items:start}',
    '@media(max-width:900px){.dxg-layout{grid-template-columns:1fr}}',
    '.dxg-builder{display:flex;flex-direction:column;gap:14px}',
    '.dxg-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.dxg-input,.dxg-select{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:9px 12px;font-size:0.8rem;color:var(--c-text);outline:none;transition:border-color .2s}',
    '.dxg-input:focus,.dxg-select:focus{border-color:var(--c-accent)}',
    '.dxg-input::placeholder{color:rgba(170,176,204,0.4)}',
    '.dxg-field{display:flex;flex-direction:column;gap:5px}',
    '.dxg-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.dxg-tabs-header{font-size:0.75rem;font-weight:700;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:.08em;padding:8px 0 6px;border-bottom:1px solid var(--c-border)}',
    '.dxg-tab-list{display:flex;flex-direction:column;gap:6px;max-height:260px;overflow-y:auto;padding:4px 0}',
    '.dxg-tab-item{display:flex;align-items:center;gap:8px;background:var(--c-card);border:1px solid var(--c-border);border-radius:8px;padding:8px 10px}',
    '.dxg-tab-item input{flex:1;background:transparent;border:none;color:var(--c-text);font-size:0.8rem;outline:none;font-family:inherit}',
    '.dxg-tab-item input::placeholder{color:rgba(170,176,204,0.3)}',
    '.dxg-del-btn{background:transparent;border:none;color:var(--c-error);cursor:pointer;font-size:0.9rem;padding:2px 6px;border-radius:4px;opacity:.6;transition:opacity .15s}',
    '.dxg-del-btn:hover{opacity:1}',
    '.dxg-fields-list{display:flex;flex-direction:column;gap:8px;max-height:320px;overflow-y:auto}',
    '.dxg-field-item{background:var(--c-card);border:1px solid var(--c-border);border-radius:8px;padding:10px 12px;display:flex;flex-direction:column;gap:6px}',
    '.dxg-field-row{display:grid;grid-template-columns:1fr 1fr auto;gap:6px;align-items:center}',
    '.dxg-field-mini{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:6px;padding:6px 9px;font-size:0.77rem;color:var(--c-text);outline:none;width:100%}',
    '.dxg-field-mini:focus{border-color:var(--c-accent)}',
    '.dxg-field-mini::placeholder{color:rgba(170,176,204,0.3)}',
    '.dxg-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.dxg-btn{padding:7px 16px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.dxg-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.dxg-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.dxg-btn.sm{padding:4px 10px;font-size:0.72rem}',
    '.dxg-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.dxg-output-wrap{position:relative;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.dxg-output{width:100%;min-height:500px;padding:14px;font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text);white-space:pre;overflow:auto;line-height:1.7;outline:none;background:transparent;border:none;resize:vertical}',
    '.dxg-output-footer{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-top:1px solid var(--c-border);background:rgba(0,0,0,0.2)}',
    '.dxg-info{font-size:0.75rem;color:var(--c-text-sec)}',
    '.dxg-checkbox-row{display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--c-text-sec);cursor:pointer}',
    '.dxg-checkbox-row input{accent-color:var(--c-accent);width:14px;height:14px;cursor:pointer}'
  ].join('');

  var FIELD_TYPES = [
    { value: 'textfield', label: 'Text Field', rt: 'granite/ui/components/coral/foundation/form/textfield' },
    { value: 'textarea', label: 'Text Area', rt: 'granite/ui/components/coral/foundation/form/textarea' },
    { value: 'checkbox', label: 'Checkbox', rt: 'granite/ui/components/coral/foundation/form/checkbox' },
    { value: 'select', label: 'Select', rt: 'granite/ui/components/coral/foundation/form/select' },
    { value: 'pathbrowser', label: 'Path Browser', rt: 'granite/ui/components/coral/foundation/form/pathbrowser' },
    { value: 'numberfield', label: 'Number Field', rt: 'granite/ui/components/coral/foundation/form/numberfield' },
    { value: 'datepicker', label: 'Date Picker', rt: 'granite/ui/components/coral/foundation/form/datepicker' },
    { value: 'colorfield', label: 'Color Field', rt: 'granite/ui/components/coral/foundation/form/colorfield' },
    { value: 'richtext', label: 'Rich Text', rt: 'cq/gui/components/authoring/dialog/richtext' },
    { value: 'multifield', label: 'Multi Field', rt: 'granite/ui/components/coral/foundation/form/multifield' },
    { value: 'switch', label: 'Switch (Toggle)', rt: 'granite/ui/components/coral/foundation/form/switch' },
    { value: 'fileupload', label: 'File Upload', rt: 'granite/ui/components/coral/foundation/form/fileupload' }
  ];

  var fieldTypeOpts = FIELD_TYPES.map(function (t) { return '<option value="' + t.value + '">' + t.label + '</option>'; }).join('');

  var HTML = [
    '<div id="dxg-app">',
    '<div id="dxg-hdr"><h1>Dialog XML Generator</h1><p>Generate cq:dialog .content.xml with Granite UI components for AEM Touch UI</p></div>',
    '<div class="dxg-layout">',

    // Builder panel
    '<div class="dxg-builder">',
    '<div class="dxg-field"><div class="dxg-label">Component Name</div><input class="dxg-input" id="dxg-comp-name" placeholder="My Component" value="My Component"></div>',
    '<div class="dxg-row">',
    '<div class="dxg-field"><div class="dxg-label">Dialog Type</div><select class="dxg-select" id="dxg-dialog-type"><option value="cq:dialog">cq:dialog (Edit Dialog)</option><option value="cq:design_dialog">cq:design_dialog (Design Dialog)</option></select></div>',
    '<div class="dxg-field"><div class="dxg-label">Layout</div><select class="dxg-select" id="dxg-layout-type"><option value="tabs">Tabs</option><option value="fixed">Fixed Columns</option></select></div>',
    '</div>',

    // Tabs
    '<div class="dxg-tabs-header">Tabs <button class="dxg-btn sm" id="dxg-add-tab" style="margin-left:8px">+ Add Tab</button></div>',
    '<div class="dxg-tab-list" id="dxg-tab-list"></div>',

    // Fields
    '<div class="dxg-tabs-header" style="margin-top:8px">Fields <button class="dxg-btn sm" id="dxg-add-field" style="margin-left:8px">+ Add Field</button></div>',
    '<div class="dxg-fields-list" id="dxg-fields-list"></div>',

    '<div class="dxg-checkbox-row"><input type="checkbox" id="dxg-required-chk"> <label for="dxg-required-chk">Mark new fields as required</label></div>',
    '<div class="dxg-btn-row"><button class="dxg-btn primary" id="dxg-gen-btn">Generate XML</button><button class="dxg-btn" id="dxg-reset-btn">Reset</button></div>',
    '</div>',

    // Output panel
    '<div>',
    '<div class="dxg-label">Generated .content.xml</div>',
    '<div class="dxg-output-wrap">',
    '<textarea class="dxg-output" id="dxg-output" readonly spellcheck="false"></textarea>',
    '<div class="dxg-output-footer"><div class="dxg-info" id="dxg-info"></div><button class="dxg-btn" id="dxg-copy-btn">Copy XML</button></div>',
    '</div>',
    '</div>',

    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('dialog-xml-gen-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };

  var tabs = [{ id: 't1', label: 'Properties' }, { id: 't2', label: 'Advanced' }];
  var fields = [
    { id: 'f1', name: 'title', label: 'Title', type: 'textfield', tab: 't1', required: false },
    { id: 'f2', name: 'description', label: 'Description', type: 'textarea', tab: 't1', required: false }
  ];
  var _uid = 10;

  function uid() { return 'id' + (++_uid); }

  function renderTabs() {
    var list = $('dxg-tab-list');
    list.innerHTML = tabs.map(function (t) {
      return '<div class="dxg-tab-item" data-tabid="' + t.id + '">' +
        '<span style="color:var(--c-text-sec);font-size:0.7rem;min-width:20px">#</span>' +
        '<input placeholder="Tab label..." value="' + escHtml(t.label) + '" data-tabinput="' + t.id + '">' +
        '<button class="dxg-del-btn" data-deltab="' + t.id + '" title="Remove tab">×</button>' +
        '</div>';
    }).join('');

    list.querySelectorAll('[data-tabinput]').forEach(function (el) {
      el.addEventListener('input', function () {
        var id = el.dataset.tabinput;
        var tab = tabs.find(function (t) { return t.id === id; });
        if (tab) tab.label = el.value;
      });
    });
    list.querySelectorAll('[data-deltab]').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.dataset.deltab;
        tabs = tabs.filter(function (t) { return t.id !== id; });
        renderTabs();
        renderFields();
      });
    });
  }

  function renderFields() {
    var tabOpts = tabs.map(function (t) { return '<option value="' + t.id + '">' + escHtml(t.label) + '</option>'; }).join('');
    var list = $('dxg-fields-list');
    list.innerHTML = fields.map(function (f) {
      var selTab = tabs.map(function (t) {
        return '<option value="' + t.id + '"' + (t.id === f.tab ? ' selected' : '') + '>' + escHtml(t.label) + '</option>';
      }).join('');
      var selType = FIELD_TYPES.map(function (t) {
        return '<option value="' + t.value + '"' + (t.value === f.type ? ' selected' : '') + '>' + t.label + '</option>';
      }).join('');
      return '<div class="dxg-field-item" data-fid="' + f.id + '">' +
        '<div class="dxg-field-row">' +
        '<input class="dxg-field-mini" placeholder="Node name (camelCase)" value="' + escHtml(f.name) + '" data-fname="' + f.id + '">' +
        '<input class="dxg-field-mini" placeholder="Field label" value="' + escHtml(f.label) + '" data-flabel="' + f.id + '">' +
        '<button class="dxg-del-btn" data-delfield="' + f.id + '">×</button>' +
        '</div>' +
        '<div class="dxg-row" style="margin-top:4px">' +
        '<select class="dxg-field-mini" data-ftype="' + f.id + '">' + selType + '</select>' +
        '<select class="dxg-field-mini" data-ftab="' + f.id + '">' + (tabs.length ? selTab : '<option>No tabs</option>') + '</select>' +
        '</div>' +
        '</div>';
    }).join('');

    list.querySelectorAll('[data-fname]').forEach(function (el) {
      el.addEventListener('input', function () { var f = fields.find(function (x) { return x.id === el.dataset.fname; }); if (f) f.name = el.value; });
    });
    list.querySelectorAll('[data-flabel]').forEach(function (el) {
      el.addEventListener('input', function () { var f = fields.find(function (x) { return x.id === el.dataset.flabel; }); if (f) f.label = el.value; });
    });
    list.querySelectorAll('[data-ftype]').forEach(function (el) {
      el.addEventListener('change', function () { var f = fields.find(function (x) { return x.id === el.dataset.ftype; }); if (f) f.type = el.value; });
    });
    list.querySelectorAll('[data-ftab]').forEach(function (el) {
      el.addEventListener('change', function () { var f = fields.find(function (x) { return x.id === el.dataset.ftab; }); if (f) f.tab = el.value; });
    });
    list.querySelectorAll('[data-delfield]').forEach(function (el) {
      el.addEventListener('click', function () { fields = fields.filter(function (x) { return x.id !== el.dataset.delfield; }); renderFields(); });
    });
  }

  $('dxg-add-tab').addEventListener('click', function () {
    var id = uid();
    tabs.push({ id: id, label: 'New Tab' });
    renderTabs();
    renderFields();
  });

  $('dxg-add-field').addEventListener('click', function () {
    var id = uid();
    var required = $('dxg-required-chk').checked;
    fields.push({ id: id, name: 'field' + id, label: 'New Field', type: 'textfield', tab: tabs[0] ? tabs[0].id : '', required: required });
    renderFields();
  });

  $('dxg-reset-btn').addEventListener('click', function () {
    tabs = [{ id: 't1', label: 'Properties' }, { id: 't2', label: 'Advanced' }];
    fields = [
      { id: 'f1', name: 'title', label: 'Title', type: 'textfield', tab: 't1', required: false },
      { id: 'f2', name: 'description', label: 'Description', type: 'textarea', tab: 't1', required: false }
    ];
    renderTabs();
    renderFields();
    $('dxg-output').value = '';
    $('dxg-info').textContent = '';
  });

  function getFieldRT(type) {
    var t = FIELD_TYPES.find(function (x) { return x.value === type; });
    return t ? t.rt : 'granite/ui/components/coral/foundation/form/textfield';
  }

  function indent(n) { return '  '.repeat(n); }

  function xmlAttr(key, val) { return key + '="' + String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') + '"'; }

  function generateXML() {
    var compName = $('dxg-comp-name').value || 'My Component';
    var dialogType = $('dxg-dialog-type').value;
    var layoutType = $('dxg-layout-type').value;
    var isTabs = layoutType === 'tabs';

    var lines = [];
    lines.push('<?xml version="1.0" encoding="UTF-8"?>');
    lines.push('<jcr:root');
    lines.push(indent(1) + 'xmlns:jcr="http://www.jcp.org/jcr/1.0"');
    lines.push(indent(1) + 'xmlns:nt="http://www.jcp.org/jcr/nt/1.0"');
    lines.push(indent(1) + 'xmlns:sling="http://sling.apache.org/jcr/sling/1.0"');
    lines.push(indent(1) + 'xmlns:cq="http://www.day.com/jcr/cq/1.0"');
    lines.push(indent(1) + 'xmlns:granite="http://www.adobe.com/jcr/granite/1.0"');
    lines.push(indent(1) + 'jcr:primaryType="nt:unstructured"');
    lines.push(indent(1) + 'jcr:title="' + compName + '"');
    lines.push(indent(1) + 'sling:resourceType="cq/gui/components/authoring/dialog">');

    if (isTabs) {
      lines.push(indent(1) + '<content');
      lines.push(indent(2) + 'jcr:primaryType="nt:unstructured"');
      lines.push(indent(2) + 'sling:resourceType="granite/ui/components/coral/foundation/container">');
      lines.push(indent(2) + '<items jcr:primaryType="nt:unstructured">');
      lines.push(indent(3) + '<tabs');
      lines.push(indent(4) + 'jcr:primaryType="nt:unstructured"');
      lines.push(indent(4) + 'sling:resourceType="granite/ui/components/coral/foundation/tabs"');
      lines.push(indent(4) + 'maximized="{Boolean}true">');
      lines.push(indent(4) + '<items jcr:primaryType="nt:unstructured">');

      tabs.forEach(function (tab) {
        var tabFields = fields.filter(function (f) { return f.tab === tab.id; });
        lines.push(indent(5) + '<' + tab.id);
        lines.push(indent(6) + 'jcr:primaryType="nt:unstructured"');
        lines.push(indent(6) + 'jcr:title="' + escHtml(tab.label) + '"');
        lines.push(indent(6) + 'sling:resourceType="granite/ui/components/coral/foundation/container">');
        lines.push(indent(6) + '<items jcr:primaryType="nt:unstructured">');

        tabFields.forEach(function (f) {
          lines.push(indent(7) + '<' + f.name);
          lines.push(indent(8) + 'jcr:primaryType="nt:unstructured"');
          lines.push(indent(8) + 'sling:resourceType="' + getFieldRT(f.type) + '"');
          lines.push(indent(8) + 'fieldLabel="' + escHtml(f.label) + '"');
          lines.push(indent(8) + 'name="./' + f.name + '"');
          if (f.required) lines.push(indent(8) + 'required="{Boolean}true"');
          if (f.type === 'textfield' || f.type === 'textarea') {
            lines.push(indent(8) + 'emptyText="Enter ' + escHtml(f.label.toLowerCase()) + '..."');
          }
          if (f.type === 'checkbox') {
            lines.push(indent(8) + 'text="Enable ' + escHtml(f.label) + '"');
            lines.push(indent(8) + 'value="{Boolean}true"');
            lines.push(indent(8) + 'uncheckedValue="{Boolean}false"');
          }
          if (f.type === 'pathbrowser') {
            lines.push(indent(8) + 'rootPath="/content"');
          }
          if (f.type === 'datepicker') {
            lines.push(indent(8) + 'type="datetime"');
            lines.push(indent(8) + 'displayedFormat="YYYY-MM-DD HH:mm"');
            lines.push(indent(8) + 'valueFormat="YYYY-MM-DD[T]HH:mm:ss.000+00:00"');
          }
          lines.push(indent(7) + '/>');
        });

        lines.push(indent(6) + '</items>');
        lines.push(indent(5) + '</' + tab.id + '>');
      });

      lines.push(indent(4) + '</items>');
      lines.push(indent(3) + '</tabs>');
      lines.push(indent(2) + '</items>');
      lines.push(indent(1) + '</content>');
    } else {
      // Fixed columns layout
      lines.push(indent(1) + '<content');
      lines.push(indent(2) + 'jcr:primaryType="nt:unstructured"');
      lines.push(indent(2) + 'sling:resourceType="granite/ui/components/coral/foundation/fixedcolumns">');
      lines.push(indent(2) + '<items jcr:primaryType="nt:unstructured">');
      lines.push(indent(3) + '<column');
      lines.push(indent(4) + 'jcr:primaryType="nt:unstructured"');
      lines.push(indent(4) + 'sling:resourceType="granite/ui/components/coral/foundation/container">');
      lines.push(indent(4) + '<items jcr:primaryType="nt:unstructured">');

      fields.forEach(function (f) {
        lines.push(indent(5) + '<' + f.name);
        lines.push(indent(6) + 'jcr:primaryType="nt:unstructured"');
        lines.push(indent(6) + 'sling:resourceType="' + getFieldRT(f.type) + '"');
        lines.push(indent(6) + 'fieldLabel="' + escHtml(f.label) + '"');
        lines.push(indent(6) + 'name="./' + f.name + '"');
        if (f.required) lines.push(indent(6) + 'required="{Boolean}true"');
        lines.push(indent(5) + '/>');
      });

      lines.push(indent(4) + '</items>');
      lines.push(indent(3) + '</column>');
      lines.push(indent(2) + '</items>');
      lines.push(indent(1) + '</content>');
    }

    lines.push('</jcr:root>');

    var xml = lines.join('\n');
    $('dxg-output').value = xml;
    $('dxg-info').textContent = fields.length + ' field(s), ' + tabs.length + ' tab(s), ' + xml.split('\n').length + ' lines';
    return xml;
  }

  $('dxg-gen-btn').addEventListener('click', generateXML);

  $('dxg-copy-btn').addEventListener('click', function () {
    var text = $('dxg-output').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      var btn = $('dxg-copy-btn');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () { btn.textContent = 'Copy XML'; btn.classList.remove('copied'); }, 2000);
    }).catch(function () {});
  });

  function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  renderTabs();
  renderFields();
  generateXML();
})();
