(function() {
  const CSS = `
#cf-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#aab0cc;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--c-mono:'JetBrains Mono','Fira Code',monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:22px;min-height:100%}
#cf-app *,#cf-app *::before,#cf-app *::after{box-sizing:border-box}
#cf-hdr{text-align:center}
#cf-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}
#cf-hdr p{font-size:0.85rem;color:var(--c-text-sec)}
#cf-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}
@media(max-width:860px){#cf-main{grid-template-columns:1fr}}
.cf-col{display:flex;flex-direction:column;gap:14px}
.cf-preview{width:100%;height:100px;border-radius:14px;border:1px solid var(--c-border);position:relative;overflow:hidden;transition:background-color 0.12s}
.cf-preview__color{position:absolute;inset:0}
#cf-picker{position:relative;width:100%;aspect-ratio:1;border-radius:12px;overflow:hidden;cursor:crosshair;border:1px solid var(--c-border);outline:none}
#cf-picker:focus{box-shadow:0 0 0 2px var(--c-accent)}
#cf-sat-layer{position:absolute;inset:0;background:linear-gradient(to right,#fff 0%,hsl(270,100%,50%) 100%);pointer-events:none}
#cf-val-layer{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,1));pointer-events:none}
#cf-cursor{position:absolute;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,0.5);width:16px;height:16px;margin-left:-8px;margin-top:-8px;pointer-events:none;top:50%;left:50%}
#cf-hue-row{display:flex;align-items:center;gap:10px}
#cf-hue-row label{font-size:0.7rem;color:var(--c-text-sec);font-weight:600;width:60px;flex-shrink:0}
#cf-hue{-webkit-appearance:none;appearance:none;flex:1;height:18px;border-radius:9px;outline:none;cursor:pointer;
  background:linear-gradient(to right,hsl(0,100%,50%),hsl(30,100%,50%),hsl(60,100%,50%),hsl(90,100%,50%),hsl(120,100%,50%),hsl(150,100%,50%),hsl(180,100%,50%),hsl(210,100%,50%),hsl(240,100%,50%),hsl(270,100%,50%),hsl(300,100%,50%),hsl(330,100%,50%),hsl(360,100%,50%))}
#cf-hue::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);box-shadow:0 1px 4px rgba(0,0,0,0.4);cursor:grab}
#cf-hue:focus{box-shadow:0 0 0 2px var(--c-accent)}
#cf-native-row{display:flex;align-items:center;gap:10px}
#cf-native-row label{font-size:0.7rem;color:var(--c-text-sec);font-weight:600;width:60px;flex-shrink:0}
#cf-native{flex:1;height:42px;border-radius:8px;border:1px solid var(--c-border);cursor:pointer;padding:3px;background:rgba(0,0,0,0.3)}
#cf-native::-webkit-color-swatch-wrapper{padding:0;border-radius:6px}
#cf-native::-webkit-color-swatch{border:none;border-radius:6px}
#cf-native:focus{box-shadow:0 0 0 2px var(--c-accent);outline:none}
.cf-slabel{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-top:4px}
.cf-hist{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.cf-hist-sw{width:30px;height:30px;border-radius:7px;border:1px solid var(--c-border);cursor:pointer;position:relative;overflow:hidden;transition:transform 0.15s}
.cf-hist-sw:hover{transform:scale(1.18)}
.cf-hist-sw:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
.cf-hist-sw__c{position:absolute;inset:0;pointer-events:none}
.cf-hist-sw__del{position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:50%;background:#ef4444;border:none;cursor:pointer;display:none;font-size:9px;color:#fff;align-items:center;justify-content:center;z-index:1}
.cf-hist-sw:hover .cf-hist-sw__del{display:flex}
.cf-right{display:flex;flex-direction:column;gap:14px}
.cf-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:4px}
.cf-tab{flex:1;padding:7px 4px;border:none;border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.78rem;font-weight:700;font-family:var(--c-mono);cursor:pointer;transition:all 0.18s}
.cf-tab:hover{background:rgba(255,255,255,0.05);color:var(--c-text)}
.cf-tab.active{background:var(--c-accent);color:#fff;box-shadow:0 2px 8px rgba(139,92,246,0.35)}
.cf-tab:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
#cf-fields{display:flex;flex-direction:column;gap:8px}
.cf-fld{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:9px 12px;transition:border-color 0.2s}
.cf-fld:focus-within{border-color:var(--c-accent)}
.cf-fld__lbl{font-family:var(--c-mono);font-size:0.72rem;font-weight:700;color:var(--c-text-sec);width:18px;flex-shrink:0}
.cf-fld__lbl.hex{color:var(--c-accent2)}
.cf-fld__sl{-webkit-appearance:none;appearance:none;flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}
.cf-fld__sl::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);box-shadow:0 1px 3px rgba(0,0,0,0.4);cursor:grab}
.cf-fld__sl:focus{box-shadow:0 0 0 2px var(--c-accent)}
.cf-fld__inp{background:transparent;border:none;outline:none;color:var(--c-text);font-family:var(--c-mono);font-size:0.9rem;width:70px;text-align:right;flex-shrink:0;text-transform:uppercase}
.cf-fld__inp:focus{outline:1px solid var(--c-accent);border-radius:4px}
.cf-fld__val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:38px;text-align:right;flex-shrink:0}
.cf-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:6px;cursor:pointer;color:var(--c-text-sec);transition:all 0.18s;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.cf-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}
.cf-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}
.cf-copy:focus{outline:none;box-shadow:0 0 0 2px var(--c-accent)}
#cf-contrast{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cf-cc{background:var(--c-card);border:1px solid var(--c-border);border-radius:12px;padding:13px;display:flex;flex-direction:column;gap:8px}
.cf-cc__lbl{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--c-text-sec)}
.cf-cc__sw{height:52px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;font-family:var(--c-mono);transition:background-color 0.12s}
.cf-cc__r{font-size:1rem;font-weight:700;text-align:center}
  `;

  const HTML = `
<div id="cf-app">
  <div id="cf-hdr"><h1>Color Format Converter</h1><p>HEX · RGB · HSL · HSV 即時轉換</p></div>
  <div aria-live="polite" aria-atomic="true" id="cf-aria-announce" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0"></div>
  <div id="cf-main">
    <div class="cf-col">
      <div class="cf-preview" id="cf-preview" aria-hidden="true"><div class="cf-preview__color" id="cf-preview-color"></div></div>
      <div
        id="cf-picker"
        tabindex="0"
        role="group"
        aria-label="色板：方向鍵調整飽和度與明度"
        aria-describedby="cf-picker-hint"
      >
        <div id="cf-sat-layer"></div>
        <div id="cf-val-layer"></div>
        <div id="cf-cursor" aria-hidden="true"></div>
      </div>
      <p id="cf-picker-hint" style="font-size:0.68rem;color:var(--c-text-sec);margin:0">← → 調飽和度，↑ ↓ 調明度</p>
      <div id="cf-hue-row">
        <label for="cf-hue">色相滑桿</label>
        <input type="range" id="cf-hue" min="0" max="360" value="270" aria-label="色相" aria-valuemin="0" aria-valuemax="360">
      </div>
      <div id="cf-native-row">
        <label for="cf-native">顏色選擇器</label>
        <input type="color" id="cf-native" value="#8b5cf6" aria-label="顏色選擇器">
      </div>
      <div>
        <div class="cf-slabel">最近使用</div>
        <div class="cf-hist" id="cf-hist" role="list" aria-label="最近使用的顏色"></div>
      </div>
    </div>
    <div class="cf-right">
      <div class="cf-tabs" role="tablist" aria-label="顏色格式">
        <button class="cf-tab active" data-fmt="hex" role="tab" aria-selected="true" aria-controls="cf-fields">HEX</button>
        <button class="cf-tab" data-fmt="rgb" role="tab" aria-selected="false" aria-controls="cf-fields">RGB</button>
        <button class="cf-tab" data-fmt="hsl" role="tab" aria-selected="false" aria-controls="cf-fields">HSL</button>
        <button class="cf-tab" data-fmt="hsv" role="tab" aria-selected="false" aria-controls="cf-fields">HSV</button>
      </div>
      <div id="cf-fields" role="status" aria-live="polite" aria-label="色彩數值欄位"></div>
      <div>
        <div class="cf-slabel">對比度</div>
        <div id="cf-contrast" role="status" aria-live="polite" aria-label="對比度結果">
          <div class="cf-cc">
            <div class="cf-cc__lbl">與白色</div>
            <div class="cf-cc__sw" id="cf-cw" aria-hidden="true">Aa</div>
            <div class="cf-cc__r" id="cf-cr-w"></div>
          </div>
          <div class="cf-cc">
            <div class="cf-cc__lbl">與黑色</div>
            <div class="cf-cc__sw" id="cf-cb" aria-hidden="true">Aa</div>
            <div class="cf-cc__r" id="cf-cr-b"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;

  // ── Color Math ────────────────────────────────────────
  function hsv2rgb(h, s, v) {
    s /= 100; v /= 100;
    const c = v * s;
    const x = c * (1 - Math.abs(((h % 360) / 60) % 2 - 1));
    const m = v - c;
    let r, g, b;
    const hh = ((h % 360) + 360) % 360;
    if (hh < 60)       { r=c; g=x; b=0; }
    else if (hh < 120) { r=x; g=c; b=0; }
    else if (hh < 180) { r=0; g=c; b=x; }
    else if (hh < 240) { r=0; g=x; b=c; }
    else if (hh < 300) { r=x; g=0; b=c; }
    else               { r=c; g=0; b=x; }
    return { r: Math.round((r+m)*255), g: Math.round((g+m)*255), b: Math.round((b+m)*255) };
  }
  function rgb2hsv(r, g, b) {
    r/=255; g/=255; b/=255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min;
    let h=0, s=max===0?0:(d/max)*100;
    if (d!==0) {
      if (max===r)      h=((g-b)/d+6)*60;
      else if (max===g) h=((b-r)/d+2)*60;
      else              h=((r-g)/d+4)*60;
    }
    return { h:Math.round(h), s:Math.round(s), v:Math.round(max*100) };
  }
  function rgb2hsl(r, g, b) {
    r/=255; g/=255; b/=255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b), l=(max+min)/2;
    let h=0, s=0;
    const d=max-min;
    if (d!==0) {
      s=l>0.5?d/(2-max-min):d/(max+min);
      if (max===r)      h=((g-b)/d+6)*60;
      else if (max===g) h=((b-r)/d+2)*60;
      else              h=((r-g)/d+4)*60;
    }
    return { h:Math.round(h), s:Math.round(s*100), l:Math.round(l*100) };
  }
  function hsl2rgb(h, s, l) {
    h/=360; s/=100; l/=100;
    if (s===0) { const v=Math.round(l*255); return {r:v,g:v,b:v}; }
    const q=l<0.5?l*(1+s):l+s-l*s;
    const p=2*l-q;
    const h2r=(pp,qq,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return pp+(qq-pp)*6*t;if(t<1/2)return qq;if(t<2/3)return pp+(qq-pp)*(2/3-t)*6;return pp;};
    return {r:Math.round(h2r(p,q,h+1/3)*255),g:Math.round(h2r(p,q,h)*255),b:Math.round(h2r(p,q,h-1/3)*255)};
  }
  function rgb2hex(r, g, b) { return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase(); }
  function hex2rgb(hex) {
    hex=hex.replace(/^#/,'');
    if(hex.length===3) hex=hex.split('').map(c=>c+c).join('');
    if(!/^[0-9A-Fa-f]{6}$/.test(hex)) return null;
    const n=parseInt(hex,16);
    return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
  }
  function lumin(r,g,b) {
    const a=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
    return a[0]*0.2126+a[1]*0.7152+a[2]*0.0722;
  }
  function cr(frm, to) {
    const l1=lumin(frm.r,frm.g,frm.b), l2=lumin(to.r,to.g,to.b);
    const [L,D] = l1>l2 ? [l1,l2] : [l2,l1];
    return (L+0.05)/(D+0.05);
  }

  // ── State ────────────────────────────────────────────
  var S = {h:270, s:85, v:90, a:1};
  var fmt = 'hex';
  var dragging = false;
  var inited = false;

  function $(id) { return document.getElementById(id); }

  // ── Init ─────────────────────────────────────────────
  function init() {
    if (inited) return;
    inited = true;

    var root = $('color-app');
    var styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    root.appendChild(styleEl);
    root.insertAdjacentHTML('beforeend', HTML);

    // Hue slider
    $('cf-hue').addEventListener('input', function(e) {
      S.h = parseInt(e.target.value);
      updateAll();
    });
    $('cf-hue').addEventListener('change', saveHistory);

    // Native picker
    $('cf-native').addEventListener('input', function(e) {
      var rgb = hex2rgb(e.target.value);
      if (!rgb) return;
      var hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
      S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
      updateAll();
    });
    $('cf-native').addEventListener('change', saveHistory);

    // Format tabs
    document.querySelectorAll('.cf-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.cf-tab').forEach(function(t){
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        fmt = tab.dataset.fmt;
        renderFields();
      });
    });

    // Picker — mouse
    $('cf-picker').addEventListener('mousedown', function(e) {
      dragging = true;
      onPickerEvent(e);
    });
    document.addEventListener('mousemove', function(e) { if (dragging) onPickerEvent(e); });
    document.addEventListener('mouseup', function() {
      if (dragging) { dragging = false; saveHistory(); }
    });

    // Picker — touch
    $('cf-picker').addEventListener('touchstart', function(e) {
      e.preventDefault();
      dragging = true;
      onPickerEvent(e.touches[0]);
    }, {passive: false});
    document.addEventListener('touchmove', function(e) {
      if (dragging) { e.preventDefault(); onPickerEvent(e.touches[0]); }
    }, {passive: false});
    document.addEventListener('touchend', function() {
      if (dragging) { dragging = false; saveHistory(); }
    });

    // Picker — keyboard (核心 a11y 修正)
    $('cf-picker').addEventListener('keydown', function(e) {
      var step = e.shiftKey ? 10 : 2;
      var handled = true;
      switch(e.key) {
        case 'ArrowRight': S.s = Math.min(100, S.s + step); break;
        case 'ArrowLeft':  S.s = Math.max(0,   S.s - step); break;
        case 'ArrowUp':    S.v = Math.min(100, S.v + step); break;
        case 'ArrowDown':  S.v = Math.max(0,   S.v - step); break;
        default: handled = false;
      }
      if (handled) {
        e.preventDefault();
        updateAll();
      }
    });
    $('cf-picker').addEventListener('keyup', function(e) {
      var keys = ['ArrowRight','ArrowLeft','ArrowUp','ArrowDown'];
      if (keys.indexOf(e.key) !== -1) saveHistory();
    });

    loadFromHash();
    updateAll();
    renderHist(loadHist());
  }

  // ── Update ───────────────────────────────────────────
  function updateAll() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    var picker = $('cf-picker');
    var cursor = $('cf-cursor');
    if (!picker) return;

    // Saturation gradient
    $('cf-sat-layer').style.background = 'linear-gradient(to right,#fff 0%,hsl(' + S.h + ',100%,50%) 100%)';

    // Preview
    $('cf-preview-color').style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

    // Hue slider
    $('cf-hue').value = S.h;
    $('cf-hue').setAttribute('aria-valuenow', S.h);

    // Native picker
    $('cf-native').value = rgb2hex(rgb.r, rgb.g, rgb.b);

    // Cursor position
    var pickerW = picker.offsetWidth || 280;
    var pickerH = picker.offsetHeight || 280;
    var cx = (S.s / 100) * pickerW;
    var cy = (1 - S.v / 100) * pickerH;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    var brightness = (rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 140 ? '#000' : '#fff';
    cursor.style.borderColor = brightness;

    // Picker ARIA
    picker.setAttribute('aria-label', '色板 飽和度 ' + S.s + '% 明度 ' + S.v + '%，方向鍵調整');

    // Contrast
    var W = {r:255,g:255,b:255}, B = {r:0,g:0,b:0};
    var crW = cr(rgb, W), crB = cr(rgb, B);
    var rgbStr = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    var cwEl = $('cf-cw'), cbEl = $('cf-cb');
    cwEl.style.backgroundColor = rgbStr;
    cwEl.style.color = '#fff';
    cbEl.style.backgroundColor = rgbStr;
    cbEl.style.color = '#000';
    $('cf-cr-w').textContent = crW.toFixed(2) + ' : 1';
    $('cf-cr-w').style.color = crW >= 4.5 ? 'var(--c-success)' : crW >= 3 ? '#fbbf24' : '#ef4444';
    $('cf-cr-b').textContent = crB.toFixed(2) + ' : 1';
    $('cf-cr-b').style.color = crB >= 4.5 ? 'var(--c-success)' : crB >= 3 ? '#fbbf24' : '#ef4444';

    renderFields();
    updateUrlHash();
  }

  // ── Fields ───────────────────────────────────────────
  function bgR(r,g,b){ return 'linear-gradient(to right,rgb(0,'+g+','+b+'),rgb(255,'+g+','+b+'))'; }
  function bgG(r,g,b){ return 'linear-gradient(to right,rgb('+r+',0,'+b+'),rgb('+r+',255,'+b+'))'; }
  function bgB(r,g,b){ return 'linear-gradient(to right,rgb('+r+','+g+',0),rgb('+r+','+g+',255))'; }
  function bgH(h,s,l){ return 'linear-gradient(to right,hsl(0,'+s+'%,'+l+'%),hsl(60,'+s+'%,'+l+'%),hsl(120,'+s+'%,'+l+'%),hsl(180,'+s+'%,'+l+'%),hsl(240,'+s+'%,'+l+'%),hsl(300,'+s+'%,'+l+'%),hsl(360,'+s+'%,'+l+'%))'; }
  function bgS(h,s,l){ return 'linear-gradient(to right,hsl('+h+',0%,'+l+'%),hsl('+h+',100%,'+l+'%))'; }
  function bgL(h,s){ return 'linear-gradient(to right,#000,hsl('+h+','+s+'%,50%),#fff)'; }
  function bgA(r,g,b){ return 'linear-gradient(to right,rgba('+r+','+g+','+b+',0),rgba('+r+','+g+','+b+',1))'; }

  var COPY_SVG = '<svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M9.5 4.5V3A1.5 1.5 0 0 0 8 1.5H3A1.5 1.5 0 0 0 1.5 3v5A1.5 1.5 0 0 0 3 9.5H4.5" stroke="currentColor" stroke-width="1.3"/></svg>';

  function makeCopyBtn(id, ariaLabel) {
    return '<button class="cf-copy" id="'+id+'" aria-label="'+ariaLabel+'">'+COPY_SVG+'</button>';
  }

  function renderFields() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    var hsl = rgb2hsl(rgb.r, rgb.g, rgb.b);
    var html = '';
    var a = Math.round(S.a * 100);

    if (fmt === 'hex') {
      var hex = rgb2hex(rgb.r, rgb.g, rgb.b);
      html += '<div class="cf-fld">'
        + '<span class="cf-fld__lbl hex" aria-hidden="true">#</span>'
        + '<label for="cf-f0" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">HEX 色碼</label>'
        + '<input class="cf-fld__inp" id="cf-f0" value="'+hex.slice(1)+'" maxlength="6" spellcheck="false" placeholder="FFFFFF" aria-label="HEX 色碼">'
        + makeCopyBtn('cf-copy-hex', '複製 HEX 值')
        + '</div>';
      html += '<div class="cf-fld">'
        + '<span class="cf-fld__lbl" aria-hidden="true">A</span>'
        + '<input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b)+'" aria-label="透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+a+'">'
        + '<span class="cf-fld__val" id="cf-fa-v" aria-live="off">'+a+'%</span>'
        + '</div>';
    } else if (fmt === 'rgb') {
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">R</span><input type="range" class="cf-fld__sl" id="cf-fr" min="0" max="255" value="'+rgb.r+'" style="background:'+bgR(rgb.r,rgb.g,rgb.b)+'" aria-label="紅色通道" aria-valuemin="0" aria-valuemax="255" aria-valuenow="'+rgb.r+'"><input class="cf-fld__inp" id="cf-fr-i" value="'+rgb.r+'" maxlength="3" aria-label="紅色通道數值"><span class="cf-fld__val" id="cf-fr-v" aria-live="off">'+rgb.r+'</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">G</span><input type="range" class="cf-fld__sl" id="cf-fg" min="0" max="255" value="'+rgb.g+'" style="background:'+bgG(rgb.r,rgb.g,rgb.b)+'" aria-label="綠色通道" aria-valuemin="0" aria-valuemax="255" aria-valuenow="'+rgb.g+'"><input class="cf-fld__inp" id="cf-fg-i" value="'+rgb.g+'" maxlength="3" aria-label="綠色通道數值"><span class="cf-fld__val" id="cf-fg-v" aria-live="off">'+rgb.g+'</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">B</span><input type="range" class="cf-fld__sl" id="cf-fb" min="0" max="255" value="'+rgb.b+'" style="background:'+bgB(rgb.r,rgb.g,rgb.b)+'" aria-label="藍色通道" aria-valuemin="0" aria-valuemax="255" aria-valuenow="'+rgb.b+'"><input class="cf-fld__inp" id="cf-fb-i" value="'+rgb.b+'" maxlength="3" aria-label="藍色通道數值"><span class="cf-fld__val" id="cf-fb-v" aria-live="off">'+rgb.b+'</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">A</span><input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b)+'" aria-label="透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+a+'"><span class="cf-fld__val" id="cf-fa-v" aria-live="off">'+a+'%</span></div>';
      html += '<div style="display:flex;justify-content:flex-end">'+makeCopyBtn('cf-copy-rgb', '複製 RGB 值')+'</div>';
    } else if (fmt === 'hsl') {
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">H</span><input type="range" class="cf-fld__sl" id="cf-fh" min="0" max="360" value="'+hsl.h+'" style="background:'+bgH(hsl.h,hsl.s,hsl.l)+'" aria-label="色相" aria-valuemin="0" aria-valuemax="360" aria-valuenow="'+hsl.h+'"><span class="cf-fld__val" id="cf-fh-v" aria-live="off">'+hsl.h+'°</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">S</span><input type="range" class="cf-fld__sl" id="cf-fs" min="0" max="100" value="'+hsl.s+'" style="background:'+bgS(hsl.h,hsl.s,hsl.l)+'" aria-label="飽和度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+hsl.s+'"><span class="cf-fld__val" id="cf-fs-v" aria-live="off">'+hsl.s+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">L</span><input type="range" class="cf-fld__sl" id="cf-fl" min="0" max="100" value="'+hsl.l+'" style="background:'+bgL(hsl.h,hsl.s)+'" aria-label="明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+hsl.l+'"><span class="cf-fld__val" id="cf-fl-v" aria-live="off">'+hsl.l+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">A</span><input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b)+'" aria-label="透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+a+'"><span class="cf-fld__val" id="cf-fa-v" aria-live="off">'+a+'%</span></div>';
      html += '<div style="display:flex;justify-content:flex-end">'+makeCopyBtn('cf-copy-hsl', '複製 HSL 值')+'</div>';
    } else if (fmt === 'hsv') {
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">H</span><input type="range" class="cf-fld__sl" id="cf-fh" min="0" max="360" value="'+S.h+'" style="background:'+bgH(S.h,S.s,S.v)+'" aria-label="色相" aria-valuemin="0" aria-valuemax="360" aria-valuenow="'+S.h+'"><span class="cf-fld__val" id="cf-fh-v" aria-live="off">'+S.h+'°</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">S</span><input type="range" class="cf-fld__sl" id="cf-fs" min="0" max="100" value="'+S.s+'" style="background:'+bgS(S.h,S.s,S.v)+'" aria-label="飽和度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+S.s+'"><span class="cf-fld__val" id="cf-fs-v" aria-live="off">'+S.s+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">V</span><input type="range" class="cf-fld__sl" id="cf-fv" min="0" max="100" value="'+S.v+'" style="background:linear-gradient(to right,#000,hsl('+S.h+','+S.s+'%,50%))" aria-label="明度（HSV）" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+S.v+'"><span class="cf-fld__val" id="cf-fv-v" aria-live="off">'+S.v+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl" aria-hidden="true">A</span><input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b)+'" aria-label="透明度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+a+'"><span class="cf-fld__val" id="cf-fa-v" aria-live="off">'+a+'%</span></div>';
      html += '<div style="display:flex;justify-content:flex-end">'+makeCopyBtn('cf-copy-hsv', '複製 HSV 值')+'</div>';
    }

    $('cf-fields').innerHTML = html;
    attachFieldListeners();
  }

  function announce(msg) {
    var el = $('cf-aria-announce');
    if (!el) return;
    el.textContent = '';
    // 短暫清空再設定才能觸發 aria-live
    setTimeout(function(){ el.textContent = msg; }, 50);
  }

  function doCopy(text, btn) {
    navigator.clipboard.writeText(text).then(function() {
      btn.classList.add('copied');
      announce('已複製 ' + text);
      setTimeout(function(){ btn.classList.remove('copied'); }, 2000);
    }).catch(function() {
      // fallback
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.classList.add('copied');
      announce('已複製 ' + text);
      setTimeout(function(){ btn.classList.remove('copied'); }, 2000);
    });
  }

  function attachFieldListeners() {
    var rgb = hsv2rgb(S.h, S.s, S.v);

    // Copy buttons
    var copyHex = $('cf-copy-hex');
    if (copyHex) {
      copyHex.addEventListener('click', function() {
        doCopy(rgb2hex(rgb.r, rgb.g, rgb.b), copyHex);
      });
    }
    var copyRgb = $('cf-copy-rgb');
    if (copyRgb) {
      copyRgb.addEventListener('click', function() {
        var c = hsv2rgb(S.h, S.s, S.v);
        doCopy('rgb(' + c.r + ', ' + c.g + ', ' + c.b + ')', copyRgb);
      });
    }
    var copyHsl = $('cf-copy-hsl');
    if (copyHsl) {
      copyHsl.addEventListener('click', function() {
        var c = hsv2rgb(S.h, S.s, S.v);
        var h = rgb2hsl(c.r, c.g, c.b);
        doCopy('hsl(' + h.h + ', ' + h.s + '%, ' + h.l + '%)', copyHsl);
      });
    }
    var copyHsv = $('cf-copy-hsv');
    if (copyHsv) {
      copyHsv.addEventListener('click', function() {
        doCopy('hsv(' + S.h + ', ' + S.s + '%, ' + S.v + '%)', copyHsv);
      });
    }

    // Alpha slider (all fmts)
    var fa = $('cf-fa');
    if (fa) {
      fa.addEventListener('input', function(e) {
        S.a = parseInt(e.target.value) / 100;
        var faV = $('cf-fa-v');
        if (faV) faV.textContent = e.target.value + '%';
        fa.setAttribute('aria-valuenow', e.target.value);
        updateAll();
      });
    }

    if (fmt === 'hex') {
      var fi = $('cf-f0');
      if (fi) {
        fi.addEventListener('input', function(e) {
          var v = e.target.value.replace(/[^0-9A-Fa-f]/g,'').slice(0,6);
          e.target.value = v.toUpperCase();
          if (v.length === 6) {
            var parsed = hex2rgb(v);
            if (parsed) {
              var hsv = rgb2hsv(parsed.r, parsed.g, parsed.b);
              S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
              updateAll();
            }
          }
        });
      }
    } else if (fmt === 'rgb') {
      var ids = ['cf-fr', 'cf-fg', 'cf-fb'];
      ids.forEach(function(bid) {
        var sl = $(bid), inp = $(bid+'-i'), val = $(bid+'-v');
        if (!sl) return;
        function upd(src) {
          var n = Math.max(0, Math.min(255, parseInt(src === 'sl' ? sl.value : inp.value) || 0));
          if (src === 'sl') { inp.value = n; } else { sl.value = n; }
          if (val) val.textContent = n;
          sl.setAttribute('aria-valuenow', n);
          var r2 = parseInt($('cf-fr').value)||0, g2 = parseInt($('cf-fg').value)||0, b2 = parseInt($('cf-fb').value)||0;
          var hsv2 = rgb2hsv(r2, g2, b2);
          S.h = hsv2.h; S.s = hsv2.s; S.v = hsv2.v;
          updateAll();
        }
        sl.addEventListener('input', function(){ upd('sl'); });
        inp.addEventListener('input', function(){ upd('inp'); });
      });
    } else if (fmt === 'hsl') {
      var fh = $('cf-fh'), fs = $('cf-fs'), fl = $('cf-fl');
      if (fh && fs && fl) {
        function updHsl() {
          var hh = parseInt(fh.value)||0, ss = parseInt(fs.value)||0, ll = parseInt(fl.value)||0;
          var fhv = $('cf-fh-v'), fsv = $('cf-fs-v'), flv = $('cf-fl-v');
          if (fhv) fhv.textContent = hh + '°';
          if (fsv) fsv.textContent = ss + '%';
          if (flv) flv.textContent = ll + '%';
          fh.setAttribute('aria-valuenow', hh);
          fs.setAttribute('aria-valuenow', ss);
          fl.setAttribute('aria-valuenow', ll);
          var rgbC = hsl2rgb(hh, ss, ll);
          var hsvC = rgb2hsv(rgbC.r, rgbC.g, rgbC.b);
          S.h = hsvC.h; S.s = hsvC.s; S.v = hsvC.v;
          updateAll();
        }
        fh.addEventListener('input', updHsl);
        fs.addEventListener('input', updHsl);
        fl.addEventListener('input', updHsl);
      }
    } else if (fmt === 'hsv') {
      var fh = $('cf-fh'), fs = $('cf-fs'), fv = $('cf-fv');
      if (fh && fs && fv) {
        function updHsv() {
          var hh = parseInt(fh.value)||0, ss = parseInt(fs.value)||0, vv = parseInt(fv.value)||0;
          var fhv = $('cf-fh-v'), fsv = $('cf-fs-v'), fvv = $('cf-fv-v');
          if (fhv) fhv.textContent = hh + '°';
          if (fsv) fsv.textContent = ss + '%';
          if (fvv) fvv.textContent = vv + '%';
          fh.setAttribute('aria-valuenow', hh);
          fs.setAttribute('aria-valuenow', ss);
          fv.setAttribute('aria-valuenow', vv);
          S.h = hh; S.s = ss; S.v = vv;
          updateAll();
        }
        fh.addEventListener('input', updHsv);
        fs.addEventListener('input', updHsv);
        fv.addEventListener('input', updHsv);
      }
    }
  }

  // ── Picker mouse/touch ────────────────────────────────
  function onPickerEvent(e) {
    var rect = $('cf-picker').getBoundingClientRect();
    var x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    var y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    S.s = Math.round(x * 100);
    S.v = Math.round((1 - y) * 100);
    updateAll();
  }

  // ── History ──────────────────────────────────────────
  function loadHist() {
    try { return JSON.parse(localStorage.getItem('cf-hist') || '[]'); } catch(e) { return []; }
  }
  function saveHist(h) { try { localStorage.setItem('cf-hist', JSON.stringify(h)); } catch(e){} }

  function saveHistory() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    var hex = rgb2hex(rgb.r, rgb.g, rgb.b);
    var h = loadHist().filter(function(x){ return x !== hex; });
    h.unshift(hex);
    saveHist(h.slice(0, 16));
    renderHist(h.slice(0, 16));
  }

  function renderHist(h) {
    var cont = $('cf-hist');
    if (!cont) return;
    if (!h || h.length === 0) { cont.innerHTML = ''; return; }
    var html = '';
    h.forEach(function(hex, i) {
      html += '<div class="cf-hist-sw" data-hex="'+hex+'" role="listitem">'
        + '<div class="cf-hist-sw__c" style="background:'+hex+'"></div>'
        + '<button class="cf-hist-sw__del" data-i="'+i+'" aria-label="刪除 '+hex+'" tabindex="-1">×</button>'
        + '</div>';
    });
    cont.innerHTML = html;
    cont.querySelectorAll('.cf-hist-sw').forEach(function(sw) {
      sw.setAttribute('tabindex', '0');
      sw.setAttribute('role', 'button');
      sw.setAttribute('aria-label', '選擇顏色 ' + sw.dataset.hex);

      function activate(e) {
        if (e.target.classList.contains('cf-hist-sw__del')) {
          var idx = parseInt(e.target.dataset.i);
          var arr = loadHist(); arr.splice(idx, 1); saveHist(arr); renderHist(arr);
          return;
        }
        var rgb2 = hex2rgb(sw.dataset.hex);
        if (!rgb2) return;
        var hsv2 = rgb2hsv(rgb2.r, rgb2.g, rgb2.b);
        S.h = hsv2.h; S.s = hsv2.s; S.v = hsv2.v;
        updateAll();
        saveHistory();
      }
      sw.addEventListener('click', activate);
      sw.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(e); }
        if (e.key === 'Delete' || e.key === 'Backspace') {
          var idx = Array.from(cont.querySelectorAll('.cf-hist-sw')).indexOf(sw);
          var arr = loadHist(); arr.splice(idx, 1); saveHist(arr); renderHist(arr);
        }
      });
    });
  }

  // ── URL ──────────────────────────────────────────────
  function updateUrlHash() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    try { history.replaceState(null, '', '#' + rgb2hex(rgb.r, rgb.g, rgb.b)); } catch(e){}
  }
  function loadFromHash() {
    var h = location.hash.slice(1);
    if (/^[0-9A-Fa-f]{6}$/.test(h)) {
      var rgb = hex2rgb(h);
      if (rgb) {
        var hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
        S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
      }
    }
  }

  // ── Bootstrap ────────────────────────────────────────
  function tryInit() {
    var panel = document.getElementById('panel-color-format');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
