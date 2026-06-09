(function() {
  const CSS = `
#wc-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--c-mono:'JetBrains Mono','Fira Code',monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:20px;min-height:100%}
#wc-app *,#wc-app *::before,#wc-app *::after{box-sizing:border-box}
#wc-hdr{text-align:center}
#wc-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}
#wc-hdr p{font-size:0.85rem;color:var(--c-text-sec)}
#wc-main{display:grid;grid-template-columns:260px 1fr;gap:20px;align-items:start}
@media(max-width:800px){#wc-main{grid-template-columns:1fr}}
#wc-left{display:flex;flex-direction:column;gap:14px}
#wc-stats{background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:16px;display:flex;flex-direction:column;gap:2px}
.wc-stats-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:8px}
.wc-stat-row{display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--c-border)}
.wc-stat-row:last-child{border-bottom:none}
.wc-stat-label{font-size:0.82rem;color:var(--c-text-sec)}
.wc-stat-val{font-family:var(--c-mono);font-size:0.9rem;font-weight:700;color:var(--c-accent2)}
#wc-freq{background:var(--c-card);border:1px solid var(--c-border);border-radius:14px;padding:16px}
.wc-freq-title{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-bottom:10px}
#wc-freq-table{width:100%;border-collapse:collapse}
#wc-freq-table th{font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--c-text-sec);text-align:left;padding:4px 0;border-bottom:1px solid var(--c-border)}
#wc-freq-table th:last-child{text-align:right}
#wc-freq-table td{font-size:0.8rem;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle}
#wc-freq-table td:last-child{text-align:right}
#wc-freq-table tr:last-child td{border-bottom:none}
.wc-freq-word{font-family:var(--c-mono);color:var(--c-text)}
.wc-freq-bar-cell{width:50%}
.wc-freq-bar-wrap{display:flex;align-items:center;gap:6px}
.wc-freq-bar{height:6px;border-radius:3px;background:linear-gradient(90deg,#8b5cf6,#06b6d4);min-width:2px;transition:width 0.25s}
.wc-freq-count{font-family:var(--c-mono);font-size:0.78rem;color:var(--c-text-sec);min-width:24px;text-align:right}
.wc-empty-msg{font-size:0.78rem;color:var(--c-text-sec);opacity:0.5;text-align:center;padding:12px 0}
#wc-right{display:flex;flex-direction:column;gap:10px}
#wc-toolbar{display:flex;align-items:center;justify-content:space-between}
.wc-tool-label{font-size:0.75rem;font-weight:700;color:var(--c-text-sec);text-transform:uppercase;letter-spacing:0.08em}
#wc-clear-btn{padding:5px 14px;border:1px solid var(--c-border);border-radius:6px;background:transparent;color:var(--c-text-sec);font-size:0.75rem;cursor:pointer;transition:all 0.18s}
#wc-clear-btn:hover{border-color:#ef4444;color:#ef4444;background:rgba(239,68,68,0.08)}
#wc-clear-btn:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
#wc-textarea{width:100%;min-height:420px;background:rgba(0,0,0,0.3);border:1px solid var(--c-border);border-radius:12px;color:var(--c-text);font-family:var(--c-mono);font-size:0.85rem;line-height:1.75;padding:16px;resize:vertical;outline:none;transition:border-color 0.18s}
#wc-textarea::placeholder{color:var(--c-text-sec);opacity:0.5}
#wc-textarea:focus{border-color:var(--c-accent)}
  `;

  const HTML = `
<div id="wc-app">
  <div id="wc-hdr">
    <h1>Word Counter</h1>
    <p>Real-time word, character, and readability statistics</p>
  </div>
  <div id="wc-main">
    <div id="wc-left">
      <div id="wc-stats">
        <div class="wc-stats-title">Statistics</div>
        <div class="wc-stat-row"><span class="wc-stat-label">Characters (with spaces)</span><span class="wc-stat-val" id="wc-s-chars">0</span></div>
        <div class="wc-stat-row"><span class="wc-stat-label">Characters (no spaces)</span><span class="wc-stat-val" id="wc-s-chars-no">0</span></div>
        <div class="wc-stat-row"><span class="wc-stat-label">Words</span><span class="wc-stat-val" id="wc-s-words">0</span></div>
        <div class="wc-stat-row"><span class="wc-stat-label">Sentences</span><span class="wc-stat-val" id="wc-s-sentences">0</span></div>
        <div class="wc-stat-row"><span class="wc-stat-label">Paragraphs</span><span class="wc-stat-val" id="wc-s-paras">0</span></div>
        <div class="wc-stat-row"><span class="wc-stat-label">Lines</span><span class="wc-stat-val" id="wc-s-lines">0</span></div>
        <div class="wc-stat-row"><span class="wc-stat-label">Reading time</span><span class="wc-stat-val" id="wc-s-read">0 sec</span></div>
        <div class="wc-stat-row"><span class="wc-stat-label">Speaking time</span><span class="wc-stat-val" id="wc-s-speak">0 sec</span></div>
      </div>
      <div id="wc-freq">
        <div class="wc-freq-title">Top 10 Words</div>
        <div id="wc-freq-body"><div class="wc-empty-msg">Start typing to see top words</div></div>
      </div>
    </div>
    <div id="wc-right">
      <div id="wc-toolbar">
        <span class="wc-tool-label">Text</span>
        <button id="wc-clear-btn">Clear</button>
      </div>
      <textarea id="wc-textarea" placeholder="Paste or type your text here…" aria-label="Text to analyze" spellcheck="false"></textarea>
    </div>
  </div>
</div>
  `;

  const container = document.getElementById('word-counter-app');
  if (!container) return;
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

  function formatTime(words, wpm) {
    const totalSec = Math.round((words / wpm) * 60);
    if (totalSec < 60) return totalSec + ' sec';
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return s > 0 ? m + ' min ' + s + ' sec' : m + ' min';
  }

  function countSentences(text) {
    const matches = text.match(/[^.!?]*[.!?]+/g);
    return matches ? matches.filter(s => s.trim().length > 0).length : (text.trim().length > 0 ? 1 : 0);
  }

  function countParagraphs(text) {
    if (!text.trim()) return 0;
    return text.split(/\n\s*\n+/).filter(p => p.trim().length > 0).length;
  }

  function getTopWords(text, n) {
    const words = text.toLowerCase().match(/\b[a-z']{2,}\b/g);
    if (!words || !words.length) return [];
    const freq = {};
    const stopWords = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','it','its','this','that','these','those','i','you','he','she','we','they','me','him','her','us','them','my','your','his','her','our','their','not','no','so','if','as','by','from','up','about','than','then','when','where','who','which','what','how','all','each','any','some','can']);
    for (const w of words) {
      if (!stopWords.has(w)) freq[w] = (freq[w] || 0) + 1;
    }
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, n);
  }

  function update(text) {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const wordMatches = text.trim() ? text.trim().match(/\S+/g) : null;
    const words = wordMatches ? wordMatches.length : 0;
    const sentences = countSentences(text);
    const paras = countParagraphs(text);
    const lines = text ? text.split('\n').length : 0;

    document.getElementById('wc-s-chars').textContent = chars.toLocaleString();
    document.getElementById('wc-s-chars-no').textContent = charsNoSpace.toLocaleString();
    document.getElementById('wc-s-words').textContent = words.toLocaleString();
    document.getElementById('wc-s-sentences').textContent = sentences.toLocaleString();
    document.getElementById('wc-s-paras').textContent = paras.toLocaleString();
    document.getElementById('wc-s-lines').textContent = lines.toLocaleString();
    document.getElementById('wc-s-read').textContent = words > 0 ? formatTime(words, 200) : '0 sec';
    document.getElementById('wc-s-speak').textContent = words > 0 ? formatTime(words, 130) : '0 sec';

    // Top words
    const freqBody = document.getElementById('wc-freq-body');
    const topWords = getTopWords(text, 10);
    if (!topWords.length) {
      freqBody.innerHTML = '<div class="wc-empty-msg">Start typing to see top words</div>';
    } else {
      const maxCount = topWords[0][1];
      let rows = '<table id="wc-freq-table"><thead><tr><th>Word</th><th class="wc-freq-bar-cell">Frequency</th><th>Count</th></tr></thead><tbody>';
      for (const [word, count] of topWords) {
        const pct = Math.round((count / maxCount) * 100);
        rows += `<tr>
          <td class="wc-freq-word">${word}</td>
          <td class="wc-freq-bar-cell"><div class="wc-freq-bar-wrap"><div class="wc-freq-bar" style="width:${pct}%"></div></div></td>
          <td class="wc-freq-count">${count}</td>
        </tr>`;
      }
      rows += '</tbody></table>';
      freqBody.innerHTML = rows;
    }
  }

  document.getElementById('wc-textarea').addEventListener('input', function() {
    update(this.value);
  });

  document.getElementById('wc-clear-btn').addEventListener('click', function() {
    document.getElementById('wc-textarea').value = '';
    update('');
  });

  update('');
})();
