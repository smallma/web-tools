(function() {
  var CSS = [
    '#rx-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-error:#f87171;--c-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--c-mono:"JetBrains Mono","Fira Code",monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}',
    '#rx-app *,*::before,*::after{box-sizing:border-box}',
    '#rx-hdr{text-align:center}',
    '#rx-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 4px}',
    '#rx-hdr p{font-size:0.85rem;color:var(--c-text-sec);margin:0}',
    '#rx-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}',
    '@media(max-width:800px){#rx-main{grid-template-columns:1fr}}',
    '.rx-col{display:flex;flex-direction:column;gap:12px}',
    '.rx-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec)}',
    '.rx-pattern-wrap{display:flex;align-items:center;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;overflow:hidden;transition:border-color 0.2s}',
    '.rx-pattern-wrap:focus-within{border-color:var(--c-accent)}',
    '.rx-pattern-wrap.error{border-color:rgba(248,113,113,0.6)}',
    '.rx-slash{padding:0 8px;color:var(--c-text-sec);font-family:var(--c-mono);font-size:1.1rem;font-weight:300;select:none}',
    '#rx-pattern{flex:1;background:transparent;border:none;outline:none;padding:10px 4px;font-family:var(--c-mono);font-size:0.88rem;color:var(--c-text);min-width:0}',
    '#rx-flags-input{width:52px;padding:10px 6px;background:transparent;border:none;border-left:1px solid var(--c-border);outline:none;font-family:var(--c-mono);font-size:0.85rem;color:var(--c-accent2)}',
    '.rx-flags-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}',
    '.rx-flag-lbl{display:flex;align-items:center;gap:5px;font-size:0.78rem;color:var(--c-text-sec);cursor:pointer;user-select:none}',
    '.rx-flag-lbl input{width:14px;height:14px;accent-color:var(--c-accent);cursor:pointer}',
    '.rx-flag-code{font-family:var(--c-mono);font-size:0.8rem;color:var(--c-accent2);font-weight:700}',
    '.rx-error{padding:8px 12px;background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:8px;color:var(--c-error);font-size:0.78rem;font-family:var(--c-mono);display:none}',
    '.rx-patterns-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}',
    '.rx-qp{padding:6px 8px;border:1px solid var(--c-border);border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.7rem;font-weight:600;cursor:pointer;transition:all 0.18s;text-align:left;line-height:1.2}',
    '.rx-qp:hover{border-color:var(--c-accent);color:var(--c-accent);background:rgba(139,92,246,0.08)}',
    '.rx-qp-name{display:block;color:var(--c-text-sec);font-size:0.68rem}',
    '.rx-qp-val{display:block;color:var(--c-accent2);font-family:var(--c-mono);font-size:0.65rem;margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.rx-textarea{width:100%;min-height:200px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.82rem;color:var(--c-text);resize:vertical;outline:none;transition:border-color 0.2s;line-height:1.7}',
    '.rx-textarea:focus{border-color:var(--c-accent)}',
    '.rx-textarea::placeholder{color:rgba(170,176,204,0.4)}',
    '.rx-highlights{min-height:200px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:10px;padding:14px;font-family:var(--c-mono);font-size:0.82rem;line-height:1.7;word-break:break-all;white-space:pre-wrap;color:var(--c-text)}',
    '.rx-match{background:rgba(139,92,246,0.3);border-radius:3px;border-bottom:2px solid var(--c-accent);color:#fff}',
    '.rx-match-alt{background:rgba(6,182,212,0.25);border-bottom:2px solid var(--c-accent2)}',
    '.rx-status{display:flex;align-items:center;gap:10px;flex-wrap:wrap}',
    '.rx-badge{padding:3px 10px;border-radius:20px;font-size:0.72rem;font-weight:700}',
    '.rx-badge.match{background:rgba(52,211,153,0.15);color:var(--c-success);border:1px solid rgba(52,211,153,0.3)}',
    '.rx-badge.nomatch{background:rgba(248,113,113,0.1);color:var(--c-error);border:1px solid rgba(248,113,113,0.3)}',
    '.rx-badge.idle{background:rgba(255,255,255,0.05);color:var(--c-text-sec);border:1px solid var(--c-border)}',
    '.rx-count{font-size:0.8rem;color:var(--c-text-sec)}',
    '.rx-count span{color:var(--c-accent2);font-family:var(--c-mono);font-weight:600}',
    '.rx-groups-wrap{background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;overflow:hidden}',
    '.rx-groups-title{padding:8px 14px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--c-text-sec);border-bottom:1px solid var(--c-border);background:rgba(0,0,0,0.15)}',
    '.rx-groups-table{width:100%;border-collapse:collapse}',
    '.rx-groups-table th{padding:7px 12px;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--c-text-sec);text-align:left;border-bottom:1px solid var(--c-border)}',
    '.rx-groups-table td{padding:6px 12px;font-family:var(--c-mono);font-size:0.78rem;color:var(--c-text);border-bottom:1px solid rgba(255,255,255,0.04)}',
    '.rx-groups-table tr:last-child td{border-bottom:none}',
    '.rx-groups-table tr:hover td{background:rgba(139,92,246,0.06)}',
    '.rx-groups-table .idx{color:var(--c-text-sec)}',
    '.rx-groups-table .val{color:var(--c-success)}',
    '.rx-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'
  ].join('');

  var QUICK_PATTERNS = [
    { name: 'Email', val: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}', flags: 'gi' },
    { name: 'URL', val: 'https?:\\/\\/[^\\s/$.?#].[^\\s]*', flags: 'gi' },
    { name: 'IPv4', val: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
    { name: 'Phone (US)', val: '\\+?1?[\\s\\-.]?\\(?\\d{3}\\)?[\\s\\-.]?\\d{3}[\\s\\-.]?\\d{4}', flags: 'g' },
    { name: 'Integer', val: '-?\\b\\d+\\b', flags: 'g' },
    { name: 'Float', val: '-?\\b\\d+\\.\\d+\\b', flags: 'g' },
    { name: 'Hex Color', val: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b', flags: 'g' },
    { name: 'Date (YYYY-MM-DD)', val: '\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])', flags: 'g' },
    { name: 'HTML Tag', val: '<[^>]+>', flags: 'gi' },
    { name: 'Whitespace', val: '\\s+', flags: 'g' }
  ];

  var qpHTML = QUICK_PATTERNS.map(function(p, i) {
    return '<button class="rx-qp" data-idx="' + i + '" aria-label="Insert ' + p.name + ' pattern"><span class="rx-qp-name">' + p.name + '</span><span class="rx-qp-val">' + p.val.replace(/</g,'&lt;').substring(0,28) + '</span></button>';
  }).join('');

  var HTML = [
    '<div id="rx-app">',
    '<div id="rx-hdr"><h1>Regex Tester</h1><p>Real-time pattern matching · Capture groups · Quick patterns</p></div>',
    '<div id="rx-main">',

    // Left column
    '<div class="rx-col">',
    '<div class="rx-label">Pattern</div>',
    '<div class="rx-pattern-wrap" id="rx-pattern-wrap">',
    '<span class="rx-slash" aria-hidden="true">/</span>',
    '<input id="rx-pattern" type="text" placeholder="pattern..." spellcheck="false" autocomplete="off" aria-label="Regular expression pattern">',
    '<span class="rx-slash" aria-hidden="true">/</span>',
    '<input id="rx-flags-input" type="text" value="g" maxlength="6" spellcheck="false" autocomplete="off" aria-label="Regex flags">',
    '</div>',
    '<div class="rx-flags-row" role="group" aria-label="Flag shortcuts">',
    '<label class="rx-flag-lbl"><input type="checkbox" id="rx-fg" checked> <span class="rx-flag-code">g</span> global</label>',
    '<label class="rx-flag-lbl"><input type="checkbox" id="rx-fi"> <span class="rx-flag-code">i</span> case-insensitive</label>',
    '<label class="rx-flag-lbl"><input type="checkbox" id="rx-fm"> <span class="rx-flag-code">m</span> multiline</label>',
    '<label class="rx-flag-lbl"><input type="checkbox" id="rx-fs"> <span class="rx-flag-code">s</span> dotAll</label>',
    '</div>',
    '<div class="rx-error" id="rx-error" role="alert" aria-live="polite"></div>',
    '<div class="rx-label" style="margin-top:4px">Quick Patterns</div>',
    '<div class="rx-patterns-grid" role="list" aria-label="Quick pattern presets">' + qpHTML + '</div>',
    '</div>',

    // Right column
    '<div class="rx-col">',
    '<div class="rx-label">Test String</div>',
    '<textarea class="rx-textarea" id="rx-test" placeholder="Enter test string here..." spellcheck="false" aria-label="Test string"></textarea>',
    '<div class="rx-status">',
    '<span class="rx-badge idle" id="rx-badge">No pattern</span>',
    '<span class="rx-count" id="rx-count"></span>',
    '</div>',
    '<div class="rx-label">Highlighted Matches</div>',
    '<div class="rx-highlights" id="rx-highlights" aria-live="polite" aria-label="Match highlights"></div>',
    '<div id="rx-groups-wrap" style="display:none">',
    '<div class="rx-groups-wrap">',
    '<div class="rx-groups-title">Capture Groups</div>',
    '<div id="rx-groups-content"></div>',
    '</div>',
    '</div>',
    '</div>',

    '</div>',
    '<div id="rx-announce" class="rx-sr-only" role="status" aria-live="polite"></div>',
    '</div>'
  ].join('');

  var container = document.getElementById('regex-tester-app');
  if (!container) return;
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  var $id = function(id) { return document.getElementById(id); };
  var patternInput = $id('rx-pattern');
  var flagsInput = $id('rx-flags-input');
  var testInput = $id('rx-test');
  var errorEl = $id('rx-error');
  var badgeEl = $id('rx-badge');
  var countEl = $id('rx-count');
  var highlightsEl = $id('rx-highlights');
  var groupsWrap = $id('rx-groups-wrap');
  var groupsContent = $id('rx-groups-content');
  var patternWrap = $id('rx-pattern-wrap');
  var announce = $id('rx-announce');

  // Sync flags checkboxes → flags input
  function getFlags() {
    var f = '';
    if ($id('rx-fg').checked) f += 'g';
    if ($id('rx-fi').checked) f += 'i';
    if ($id('rx-fm').checked) f += 'm';
    if ($id('rx-fs').checked) f += 's';
    return f;
  }

  function syncFlagsInput() {
    flagsInput.value = getFlags();
    run();
  }

  function syncFlagsCheckboxes() {
    var f = flagsInput.value;
    $id('rx-fg').checked = f.indexOf('g') >= 0;
    $id('rx-fi').checked = f.indexOf('i') >= 0;
    $id('rx-fm').checked = f.indexOf('m') >= 0;
    $id('rx-fs').checked = f.indexOf('s') >= 0;
    run();
  }

  ['rx-fg','rx-fi','rx-fm','rx-fs'].forEach(function(id) {
    $id(id).addEventListener('change', syncFlagsInput);
  });
  flagsInput.addEventListener('input', syncFlagsCheckboxes);

  function escapeHTML(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function run() {
    var pattern = patternInput.value;
    var flags = flagsInput.value;
    var test = testInput.value;
    errorEl.style.display = 'none';
    patternWrap.classList.remove('error');

    if (!pattern) {
      badgeEl.className = 'rx-badge idle';
      badgeEl.textContent = 'No pattern';
      countEl.textContent = '';
      highlightsEl.textContent = test;
      groupsWrap.style.display = 'none';
      return;
    }

    var re;
    try {
      re = new RegExp(pattern, flags);
    } catch(e) {
      errorEl.textContent = 'Invalid regex: ' + e.message;
      errorEl.style.display = 'block';
      patternWrap.classList.add('error');
      badgeEl.className = 'rx-badge nomatch';
      badgeEl.textContent = 'Error';
      countEl.textContent = '';
      highlightsEl.textContent = test;
      groupsWrap.style.display = 'none';
      return;
    }

    if (!test) {
      badgeEl.className = 'rx-badge idle';
      badgeEl.textContent = 'No test string';
      countEl.textContent = '';
      highlightsEl.textContent = '';
      groupsWrap.style.display = 'none';
      return;
    }

    // Collect all matches
    var matches = [];
    var hasGroups = false;
    if (flags.indexOf('g') >= 0) {
      var m;
      re.lastIndex = 0;
      while ((m = re.exec(test)) !== null) {
        matches.push(m);
        if (m.index === re.lastIndex) re.lastIndex++;
        if (m.length > 1) hasGroups = true;
      }
    } else {
      var single = re.exec(test);
      if (single) {
        matches.push(single);
        if (single.length > 1) hasGroups = true;
      }
    }

    if (matches.length === 0) {
      badgeEl.className = 'rx-badge nomatch';
      badgeEl.textContent = 'No match';
      countEl.textContent = '';
      highlightsEl.textContent = test;
      groupsWrap.style.display = 'none';
      announce.textContent = 'No matches found.';
      return;
    }

    badgeEl.className = 'rx-badge match';
    badgeEl.textContent = 'Match';
    countEl.innerHTML = '<span>' + matches.length + '</span> match' + (matches.length !== 1 ? 'es' : '');
    announce.textContent = matches.length + ' match' + (matches.length !== 1 ? 'es' : '') + ' found.';

    // Build highlighted output
    var result = '';
    var lastIdx = 0;
    var colors = ['rx-match', 'rx-match-alt'];
    matches.forEach(function(m, mi) {
      if (m.index > lastIdx) result += escapeHTML(test.slice(lastIdx, m.index));
      var cls = colors[mi % 2];
      result += '<mark class="' + cls + '" aria-label="Match ' + (mi+1) + '">' + escapeHTML(m[0]) + '</mark>';
      lastIdx = m.index + m[0].length;
    });
    result += escapeHTML(test.slice(lastIdx));
    highlightsEl.innerHTML = result;

    // Groups table
    if (hasGroups) {
      var tableHTML = '<table class="rx-groups-table"><thead><tr><th>Match</th><th>Group</th><th>Value</th></tr></thead><tbody>';
      matches.forEach(function(m, mi) {
        for (var gi = 1; gi < m.length; gi++) {
          tableHTML += '<tr><td class="idx">' + (mi+1) + '</td><td class="idx">$' + gi + '</td><td class="val">' + (m[gi] === undefined ? '<em style="color:var(--c-text-sec)">undefined</em>' : escapeHTML(m[gi])) + '</td></tr>';
        }
      });
      tableHTML += '</tbody></table>';
      groupsContent.innerHTML = tableHTML;
      groupsWrap.style.display = 'block';
    } else {
      groupsWrap.style.display = 'none';
    }
  }

  patternInput.addEventListener('input', run);
  testInput.addEventListener('input', run);

  // Quick patterns
  document.querySelectorAll('#rx-app .rx-qp').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(btn.getAttribute('data-idx'), 10);
      var p = QUICK_PATTERNS[idx];
      patternInput.value = p.val;
      flagsInput.value = p.flags;
      $id('rx-fg').checked = p.flags.indexOf('g') >= 0;
      $id('rx-fi').checked = p.flags.indexOf('i') >= 0;
      $id('rx-fm').checked = p.flags.indexOf('m') >= 0;
      $id('rx-fs').checked = p.flags.indexOf('s') >= 0;
      run();
      testInput.focus();
    });
  });

  run();
})();
