(function() {
  const CSS = `
#li-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--c-mono:'JetBrains Mono','Fira Code',monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}
#li-app *,#li-app *::before,#li-app *::after{box-sizing:border-box}
#li-hdr{text-align:center}
#li-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}
#li-hdr p{font-size:0.85rem;color:var(--c-text-sec)}
#li-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}
@media(max-width:800px){#li-main{grid-template-columns:1fr}}
#li-controls{display:flex;flex-direction:column;gap:14px;background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:18px}
.li-slabel{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:6px;display:block}
.li-num-row{display:flex;align-items:center;gap:8px}
.li-num-row input[type=number]{flex:1;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:8px;color:var(--c-text);font-family:var(--c-mono);font-size:0.95rem;padding:8px 12px;outline:none;transition:border-color 0.18s}
.li-num-row input[type=number]:focus{border-color:var(--c-accent)}
.li-num-row input[type=number]::-webkit-inner-spin-button,.li-num-row input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none}
.li-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:4px}
.li-tab{flex:1;padding:7px 4px;border:none;border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.18s}
.li-tab:hover{background:rgba(255,255,255,0.05);color:var(--c-text)}
.li-tab.active{background:var(--c-accent);color:#fff;box-shadow:0 2px 8px rgba(139,92,246,0.35)}
.li-tab:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
.li-check-row{display:flex;align-items:center;gap:9px;cursor:pointer;user-select:none}
.li-check-row input[type=checkbox]{width:16px;height:16px;accent-color:var(--c-accent);cursor:pointer}
.li-check-row span{font-size:0.85rem;color:var(--c-text-sec)}
#li-gen-btn{width:100%;padding:11px;border:none;border-radius:9px;background:linear-gradient(130deg,#8b5cf6,#06b6d4);color:#fff;font-size:0.9rem;font-weight:700;cursor:pointer;transition:opacity 0.18s;margin-top:4px}
#li-gen-btn:hover{opacity:0.88}
#li-gen-btn:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
#li-output{display:flex;flex-direction:column;gap:12px}
#li-textarea-wrap{position:relative}
#li-textarea{width:100%;min-height:320px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:12px;color:var(--c-text);font-family:var(--c-mono);font-size:0.82rem;line-height:1.7;padding:14px 16px;resize:vertical;outline:none;transition:border-color 0.18s}
#li-textarea:focus{border-color:var(--c-accent)}
#li-output-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px}
#li-stats{display:flex;gap:16px}
.li-stat{font-size:0.78rem;color:var(--c-text-sec)}
.li-stat span{color:var(--c-accent2);font-weight:700;font-family:var(--c-mono)}
#li-copy-btn{display:flex;align-items:center;gap:7px;padding:8px 16px;border:1px solid var(--c-border);border-radius:8px;background:transparent;color:var(--c-text-sec);font-size:0.82rem;font-weight:600;cursor:pointer;transition:all 0.18s}
#li-copy-btn:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.08)}
#li-copy-btn.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.08)}
#li-copy-btn:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
  `;

  const HTML = `
<div id="li-app">
  <div id="li-hdr">
    <h1>Lorem Ipsum Generator</h1>
    <p>Generate placeholder text for your designs and mockups</p>
  </div>
  <div id="li-main">
    <div id="li-controls">
      <div>
        <span class="li-slabel">Type</span>
        <div class="li-tabs" role="tablist">
          <button class="li-tab active" data-type="paragraphs" role="tab" aria-selected="true">Paragraphs</button>
          <button class="li-tab" data-type="sentences" role="tab" aria-selected="false">Sentences</button>
          <button class="li-tab" data-type="words" role="tab" aria-selected="false">Words</button>
        </div>
      </div>
      <div>
        <span class="li-slabel">Count</span>
        <div class="li-num-row">
          <input type="number" id="li-count" value="3" min="1" max="100" aria-label="Count" />
        </div>
      </div>
      <label class="li-check-row">
        <input type="checkbox" id="li-start-lorem" checked />
        <span>Start with "Lorem ipsum…"</span>
      </label>
      <button id="li-gen-btn">Generate</button>
    </div>
    <div id="li-output">
      <div id="li-output-toolbar">
        <div id="li-stats">
          <div class="li-stat">Words: <span id="li-stat-words">0</span></div>
          <div class="li-stat">Chars: <span id="li-stat-chars">0</span></div>
        </div>
        <button id="li-copy-btn" aria-label="Copy text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </button>
      </div>
      <textarea id="li-textarea" readonly aria-label="Generated Lorem Ipsum text" aria-live="polite"></textarea>
    </div>
  </div>
</div>
  `;

  const container = document.getElementById('lorem-ipsum-app');
  if (!container) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  // --- Word bank ---
  const LOREM_WORDS = [
    'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do',
    'eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim',
    'ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi',
    'aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit',
    'voluptate','velit','esse','cillum','eu','fugiat','nulla','pariatur','excepteur','sint',
    'occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt',
    'mollit','anim','id','est','laborum','at','vero','eos','accusamus','iusto','odio',
    'dignissimos','ducimus','blanditiis','praesentium','voluptatum','deleniti','atque',
    'corrupti','quos','dolores','quas','molestias','excepturi','occaecati','cupiditate',
    'provident','similique','mollitia','animi','aut','perferendis','doloribus','asperiores',
    'repellat','voluptatem','sequi','nesciunt','neque','porro','quisquam','qui','dolorem',
    'eum','fugit','quo','voluptas','nulla','explicabo','nemo','ipsa','architecto','beatae',
    'vitae','dicta','unde','omnis','iste','natus','error','perspiciatis','voluptatem',
    'doloremque','laudantium','totam','rem','aperiam','eaque','ipsa','quae','ab','illo',
    'inventore','veritatis','quasi','architecto','beatae','vitae','dicta','sunt','explicabo',
    'nemo','ipsam','quia','voluptas','sit','aspernatur','aut','odit','aut','fugit','sed',
    'quia','consequuntur','magni','dolores','eos','qui','ratione','voluptatem','sequi',
    'nesciunt','neque','porro','quisquam','dolorem','ipsum','quia','dolor','sit','amet',
    'consectetur','adipisci','velit','sed','quia','non','numquam','eius','modi','tempora',
    'incidunt','labore','dolore','magnam','aliquam','quaerat','voluptatem','ut','enim',
    'minima','veniam','quis','nostrum','exercitationem','ullam','corporis','suscipit',
    'laboriosam','nisi','aliquid','ex','ea','commodi','consequatur','quis','autem','vel',
    'eum','iure','reprehenderit','qui','voluptatibus','maiores','alias','consequatur',
    'aut','perferendis','doloribus','asperiores','repellat'
  ];

  const LOREM_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function randomWord() {
    return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
  }

  function generateSentence(forceStart) {
    if (forceStart) return LOREM_START;
    const len = rnd(8, 20);
    const words = [];
    for (let i = 0; i < len; i++) words.push(randomWord());
    return capitalize(words.join(' ')) + '.';
  }

  function generateParagraph(isFirst, startWithLorem) {
    const sentCount = rnd(4, 8);
    const sentences = [];
    for (let i = 0; i < sentCount; i++) {
      sentences.push(generateSentence(i === 0 && isFirst && startWithLorem));
    }
    return sentences.join(' ');
  }

  function generate() {
    const type = document.querySelector('#li-app .li-tab.active').dataset.type;
    const count = Math.max(1, Math.min(100, parseInt(document.getElementById('li-count').value) || 3));
    const startLorem = document.getElementById('li-start-lorem').checked;

    let result = '';
    if (type === 'paragraphs') {
      const paras = [];
      for (let i = 0; i < count; i++) paras.push(generateParagraph(i === 0, startLorem));
      result = paras.join('\n\n');
    } else if (type === 'sentences') {
      const sents = [];
      for (let i = 0; i < count; i++) sents.push(generateSentence(i === 0 && startLorem));
      result = sents.join(' ');
    } else {
      // words
      const words = [];
      if (startLorem) {
        const startWords = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'];
        for (let i = 0; i < Math.min(count, 5); i++) words.push(startWords[i]);
        for (let i = words.length; i < count; i++) words.push(randomWord());
      } else {
        for (let i = 0; i < count; i++) words.push(randomWord());
        if (words.length > 0) words[0] = capitalize(words[0]);
      }
      result = words.join(' ');
    }

    const textarea = document.getElementById('li-textarea');
    textarea.value = result;
    updateStats(result);
  }

  function updateStats(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    document.getElementById('li-stat-words').textContent = words.toLocaleString();
    document.getElementById('li-stat-chars').textContent = chars.toLocaleString();
  }

  // Tab switching
  document.querySelectorAll('#li-app .li-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#li-app .li-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      generate();
    });
  });

  document.getElementById('li-count').addEventListener('input', generate);
  document.getElementById('li-start-lorem').addEventListener('change', generate);
  document.getElementById('li-gen-btn').addEventListener('click', generate);

  // Copy button
  document.getElementById('li-copy-btn').addEventListener('click', function() {
    const text = document.getElementById('li-textarea').value;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      this.classList.add('copied');
      this.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        this.classList.remove('copied');
        this.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy';
      }, 2000);
    });
  });

  // Initial generate
  generate();
})();
