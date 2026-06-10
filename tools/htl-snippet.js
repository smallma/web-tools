(function () {
  var CSS = [
    '#htl-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#f97316;--c-accent2:#fb923c;--c-success:#34d399;--c-error:#f87171;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#htl-app *{box-sizing:border-box}',
    '#htl-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#f97316,#fb923c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#htl-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '.htl-layout{display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){.htl-layout{grid-template-columns:1fr}}',
    '.htl-menu{display:flex;flex-direction:column;gap:4px}',
    '.htl-menu-group{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);padding:8px 4px 4px;margin-top:4px}',
    '.htl-menu-item{padding:8px 12px;border-radius:8px;border:1px solid transparent;background:transparent;color:var(--c-text-sec);font-size:0.8rem;cursor:pointer;text-align:left;transition:all .15s;width:100%}',
    '.htl-menu-item:hover{color:var(--c-text);background:rgba(249,115,22,0.08);border-color:rgba(249,115,22,0.2)}',
    '.htl-menu-item.active{color:var(--c-accent);background:rgba(249,115,22,0.15);border-color:rgba(249,115,22,0.35)}',
    '.htl-panel{display:flex;flex-direction:column;gap:16px}',
    '.htl-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-sec);margin-bottom:4px}',
    '.htl-input{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:9px 12px;font-size:0.8rem;color:var(--c-text);outline:none;transition:border-color .2s}',
    '.htl-input:focus{border-color:var(--c-accent)}',
    '.htl-input::placeholder{color:rgba(170,176,204,0.4)}',
    '.htl-select{width:100%;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;padding:9px 12px;font-size:0.8rem;color:var(--c-text);outline:none;cursor:pointer}',
    '.htl-select:focus{border-color:var(--c-accent)}',
    '.htl-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '@media(max-width:600px){.htl-row{grid-template-columns:1fr}}',
    '.htl-field{display:flex;flex-direction:column;gap:5px}',
    '.htl-checkbox-row{display:flex;align-items:center;gap:8px;font-size:0.82rem;color:var(--c-text-sec);cursor:pointer}',
    '.htl-checkbox-row input{accent-color:var(--c-accent);width:14px;height:14px;cursor:pointer}',
    '.htl-btn-row{display:flex;gap:8px;flex-wrap:wrap}',
    '.htl-btn{padding:8px 18px;border-radius:8px;border:1px solid var(--c-border);background:rgba(0,0,0,0.25);color:var(--c-text-sec);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all .18s}',
    '.htl-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(249,115,22,0.1)}',
    '.htl-btn.primary{background:linear-gradient(130deg,rgba(249,115,22,0.25),rgba(251,146,60,0.15));border-color:var(--c-accent);color:var(--c-accent)}',
    '.htl-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}',
    '.htl-output-wrap{position:relative;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.htl-output{width:100%;min-height:280px;padding:14px;font-family:var(--c-mono);font-size:0.78rem;color:var(--c-text);white-space:pre;overflow:auto;line-height:1.8;outline:none;background:transparent;border:none;resize:vertical}',
    '.htl-output-footer{display:flex;align-items:center;justify-content:flex-end;padding:8px 12px;border-top:1px solid var(--c-border);background:rgba(0,0,0,0.2)}',
    '.htl-desc{font-size:0.8rem;color:var(--c-text-sec);line-height:1.6;background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.15);border-radius:8px;padding:10px 14px}'
  ].join('');

  var snippets = {
    'sly-use-model': {
      label: 'data-sly-use (Sling Model)',
      group: 'Use',
      desc: 'Bind a Sling Model or Use-class to a local variable. The WCM Use API / Sling Models are instantiated with context of the current resource.',
      fields: [
        { id: 'varName', label: 'Variable Name', placeholder: 'model', value: 'model' },
        { id: 'className', label: 'Model Class (Java FQCN)', placeholder: 'com.mysite.core.models.MyModel', value: 'com.mysite.core.models.MyModel' }
      ],
      generate: function (f) {
        return '<sly data-sly-use.' + f.varName + '="' + f.className + '">\n  <p>${' + f.varName + '.title}</p>\n</sly>';
      }
    },
    'sly-use-template': {
      label: 'data-sly-use (Template)',
      group: 'Use',
      desc: 'Use a client-side template file. Useful for extracting reusable markup.',
      fields: [
        { id: 'varName', label: 'Variable Name', placeholder: 'templates', value: 'templates' },
        { id: 'templateFile', label: 'Template File Path', placeholder: '/apps/mysite/components/global/templates.html', value: '/apps/mysite/components/global/templates.html' }
      ],
      generate: function (f) {
        return '<sly data-sly-use.' + f.varName + '="' + f.templateFile + '">\n  <sly data-sly-call="${' + f.varName + '.myTemplate @ param1=\'value\'}">' + '</sly>\n</sly>';
      }
    },
    'sly-list': {
      label: 'data-sly-list',
      group: 'Iteration',
      desc: 'Iterate over a collection. Each iteration exposes itemList.index, itemList.count, itemList.first, itemList.last.',
      fields: [
        { id: 'itemVar', label: 'Item Variable Name', placeholder: 'item', value: 'item' },
        { id: 'collection', label: 'Collection Expression', placeholder: 'model.items', value: 'model.items' },
        { id: 'element', label: 'HTML Element', placeholder: 'li', value: 'li' }
      ],
      generate: function (f) {
        return '<ul>\n  <' + f.element + ' data-sly-list.item="${' + f.collection + '}">\n    <span>${item.title}</span>\n    <!-- itemList.index = ${itemList.index}, first = ${itemList.first}, last = ${itemList.last} -->\n  </' + f.element + '>\n</ul>';
      }
    },
    'sly-repeat': {
      label: 'data-sly-repeat',
      group: 'Iteration',
      desc: 'Like data-sly-list but repeats the element itself (no wrapper element needed).',
      fields: [
        { id: 'itemVar', label: 'Item Variable Name', placeholder: 'item', value: 'item' },
        { id: 'collection', label: 'Collection Expression', placeholder: 'model.items', value: 'model.items' },
        { id: 'element', label: 'Outer HTML Element', placeholder: 'div', value: 'div' }
      ],
      generate: function (f) {
        return '<' + f.element + ' data-sly-repeat.item="${' + f.collection + '}" class="card">\n  <h3>${item.title}</h3>\n  <p>${item.description}</p>\n</' + f.element + '>';
      }
    },
    'sly-test': {
      label: 'data-sly-test',
      group: 'Conditionals',
      desc: 'Conditionally render an element. Element is removed from DOM if expression is falsy.',
      fields: [
        { id: 'condition', label: 'Condition Expression', placeholder: 'model.title', value: 'model.title' },
        { id: 'element', label: 'HTML Element', placeholder: 'h1', value: 'h1' }
      ],
      generate: function (f) {
        return '<' + f.element + ' data-sly-test="${' + f.condition + '}">${' + f.condition + '}</' + f.element + '>\n\n<!-- With variable binding -->\n<sly data-sly-test.hasTitle="${' + f.condition + '}">\n  <' + f.element + '>${hasTitle}</' + f.element + '>\n</sly>';
      }
    },
    'sly-include': {
      label: 'data-sly-include',
      group: 'Inclusion',
      desc: 'Include another HTL/HTML script. Inherits current context (resource, request, etc.).',
      fields: [
        { id: 'path', label: 'Script Path', placeholder: 'header.html', value: 'header.html' }
      ],
      generate: function (f) {
        return '<!-- Include relative path -->\n<sly data-sly-include="' + f.path + '"></sly>\n\n<!-- Include with expression -->\n<sly data-sly-include="${model.scriptPath}"></sly>';
      }
    },
    'sly-resource': {
      label: 'data-sly-resource',
      group: 'Inclusion',
      desc: 'Include a Sling resource by path. AEM will dispatch rendering of that resource.',
      fields: [
        { id: 'path', label: 'Resource Path', placeholder: 'header', value: 'header' },
        { id: 'resourceType', label: 'Force Resource Type (optional)', placeholder: 'mysite/components/header', value: '' }
      ],
      generate: function (f) {
        var rt = f.resourceType ? '\n  @ resourceType=\'' + f.resourceType + '\'' : '';
        return '<sly data-sly-resource="${\'' + f.path + '\'' + rt + '}"></sly>';
      }
    },
    'context-output': {
      label: 'Context-aware Output',
      group: 'Expressions',
      desc: 'AEM auto-escapes output by context. Explicitly set context to override. Never use @ context=\'unsafe\' on user input.',
      fields: [
        { id: 'varName', label: 'Variable', placeholder: 'model.url', value: 'model.url' }
      ],
      generate: function (f) {
        return '<!-- Auto context (text, escaped HTML entities) -->\n<p>${' + f.varName + '}</p>\n\n<!-- HTML context (renders HTML markup) -->\n<div>${' + f.varName + ' @ context=\'html\'}</div>\n\n<!-- URI context (URL encoding) -->\n<a href="${' + f.varName + ' @ context=\'uri\'}">\n\n<!-- Attribute context -->\n<div class="${' + f.varName + ' @ context=\'attribute\'}">\n\n<!-- Script context (JS) -->\n<script>var x = "${' + f.varName + ' @ context=\'scriptString\'}";</script>';
      }
    },
    'sly-attribute': {
      label: 'data-sly-attribute',
      group: 'Attributes',
      desc: 'Set, remove, or dynamically add HTML attributes.',
      fields: [
        { id: 'attrName', label: 'Attribute Name', placeholder: 'class', value: 'class' },
        { id: 'expression', label: 'Value Expression', placeholder: 'model.cssClass', value: 'model.cssClass' }
      ],
      generate: function (f) {
        return '<!-- Single attribute -->\n<div data-sly-attribute.' + f.attrName + '="${' + f.expression + '}">Content</div>\n\n<!-- Multiple attributes from map -->\n<div data-sly-attribute="${model.attributes}">Content</div>\n\n<!-- Remove attribute if falsy -->\n<div data-sly-attribute.disabled="${model.isDisabled}">Content</div>';
      }
    },
    'sly-element': {
      label: 'data-sly-element',
      group: 'Attributes',
      desc: 'Dynamically change the HTML element tag name.',
      fields: [
        { id: 'expression', label: 'Tag Expression', placeholder: 'model.headingLevel', value: 'model.headingLevel' }
      ],
      generate: function (f) {
        return '<!-- Renders as h1/h2/h3 depending on model.headingLevel -->\n<h1 data-sly-element="${' + f.expression + '}">${model.title}</h1>';
      }
    },
    'sly-call': {
      label: 'data-sly-call (Template Call)',
      group: 'Templates',
      desc: 'Call a defined HTL template block with named parameters.',
      fields: [
        { id: 'templateRef', label: 'Template Reference', placeholder: 'templates.card', value: 'templates.card' },
        { id: 'params', label: 'Parameters (JS object syntax)', placeholder: 'title: model.title, link: model.url', value: 'title: model.title, link: model.url' }
      ],
      generate: function (f) {
        return '<!-- Define the template -->\n<template data-sly-template.card="${@ title, link}">\n  <div class="card">\n    <h3>${title}</h3>\n    <a href="${link @ context=\'uri\'}">Read more</a>\n  </div>\n</template>\n\n<!-- Call the template -->\n<sly data-sly-call="${' + f.templateRef + ' @ ' + f.params + '}"></sly>';
      }
    },
    'sly-text': {
      label: 'data-sly-text',
      group: 'Content',
      desc: 'Replace element text content. Useful when the element has default/placeholder text.',
      fields: [
        { id: 'expression', label: 'Text Expression', placeholder: 'model.description', value: 'model.description' },
        { id: 'element', label: 'HTML Element', placeholder: 'p', value: 'p' }
      ],
      generate: function (f) {
        return '<' + f.element + ' data-sly-text="${' + f.expression + '}">Placeholder text</' + f.element + '>';
      }
    }
  };

  var menuGroups = ['Use', 'Iteration', 'Conditionals', 'Inclusion', 'Expressions', 'Attributes', 'Templates', 'Content'];

  var menuHTML = menuGroups.map(function (g) {
    var items = Object.keys(snippets).filter(function (k) { return snippets[k].group === g; });
    if (!items.length) return '';
    return '<div class="htl-menu-group">' + g + '</div>' +
      items.map(function (k) {
        return '<button class="htl-menu-item" data-snippet="' + k + '">' + snippets[k].label + '</button>';
      }).join('');
  }).join('');

  var HTML = [
    '<div id="htl-app">',
    '<div id="htl-hdr"><h1>HTL Snippet Generator</h1><p>Generate Sightly / HTL snippets for AEM component development</p></div>',
    '<div class="htl-layout">',
    '<div class="htl-menu" id="htl-menu">' + menuHTML + '</div>',
    '<div class="htl-panel" id="htl-panel">',
    '<div class="htl-desc" id="htl-desc">Select a snippet from the left menu to get started.</div>',
    '<div id="htl-fields"></div>',
    '<div class="htl-btn-row" id="htl-btn-row" style="display:none">',
    '<button class="htl-btn primary" id="htl-gen-btn">Generate</button>',
    '</div>',
    '<div id="htl-output-container" style="display:none">',
    '<div class="htl-label">Generated HTL</div>',
    '<div class="htl-output-wrap">',
    '<textarea class="htl-output" id="htl-output" readonly spellcheck="false"></textarea>',
    '<div class="htl-output-footer"><button class="htl-btn" id="htl-copy-btn">Copy</button></div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>',
    '</div>'
  ].join('');

  var container = document.getElementById('htl-snippet-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $ = function (id) { return document.getElementById(id); };
  var currentKey = null;

  function selectSnippet(key) {
    currentKey = key;
    var snip = snippets[key];
    document.querySelectorAll('.htl-menu-item').forEach(function (el) {
      el.classList.toggle('active', el.dataset.snippet === key);
    });
    $('htl-desc').textContent = snip.desc;

    var fieldsEl = $('htl-fields');
    fieldsEl.innerHTML = '';
    if (snip.fields && snip.fields.length) {
      var rows = [];
      snip.fields.forEach(function (f, i) {
        var id = 'htl-f-' + f.id;
        var pair = '<div class="htl-field"><label class="htl-label" for="' + id + '">' + f.label + '</label>' +
          '<input class="htl-input" id="' + id + '" placeholder="' + f.placeholder + '" value="' + (f.value || '') + '"></div>';
        if (i % 2 === 0) rows.push('<div class="htl-row">');
        rows.push(pair);
        if (i % 2 === 1 || i === snip.fields.length - 1) rows.push('</div>');
      });
      fieldsEl.innerHTML = rows.join('');
      fieldsEl.querySelectorAll('.htl-input').forEach(function (inp) {
        inp.addEventListener('input', function () { if (currentKey) generateSnippet(); });
      });
    }

    $('htl-btn-row').style.display = 'flex';
    generateSnippet();
  }

  function generateSnippet() {
    if (!currentKey) return;
    var snip = snippets[currentKey];
    var fieldVals = {};
    (snip.fields || []).forEach(function (f) {
      var el = document.getElementById('htl-f-' + f.id);
      fieldVals[f.id] = el ? el.value : f.value;
    });
    var code = snip.generate(fieldVals);
    $('htl-output').value = code;
    $('htl-output-container').style.display = 'block';
  }

  document.querySelectorAll('.htl-menu-item').forEach(function (el) {
    el.addEventListener('click', function () { selectSnippet(el.dataset.snippet); });
  });

  $('htl-gen-btn').addEventListener('click', generateSnippet);

  $('htl-copy-btn').addEventListener('click', function () {
    var text = $('htl-output').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(function () {
      var btn = $('htl-copy-btn');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    }).catch(function () {});
  });

  // Auto-select first snippet
  selectSnippet('sly-use-model');
})();
