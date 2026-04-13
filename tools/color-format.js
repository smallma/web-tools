(function() {
  const CSS = `
#cf-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--c-mono:'JetBrains Mono','Fira Code',monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:22px;height:100%;overflow-y:auto}
#cf-app *,#cf-app *::before,#cf-app *::after{box-sizing:border-box}
#cf-hdr{text-align:center}
#cf-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}
#cf-hdr p{font-size:0.85rem;color:var(--c-text-sec)}
#cf-main{display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start}
@media(max-width:860px){#cf-main{grid-template-columns:1fr}}
.cf-col{display:flex;flex-direction:column;gap:14px}
.cf-preview{width:100%;height:100px;border-radius:14px;border:1px solid var(--c-border);position:relative;overflow:hidden;transition:background-color 0.12s}
.cf-preview__color{position:absolute;inset:0}
#cf-picker{position:relative;width:100%;aspect-ratio:1;border-radius:12px;overflow:hidden;cursor:crosshair;border:1px solid var(--c-border)}
#cf-sat-layer{position:absolute;inset:0;background:linear-gradient(to right,#fff 0%,hsl(270,100%,50%) 100%)}
#cf-val-layer{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,1))}
#cf-cursor{position:absolute;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,0.5);width:16px;height:16px;margin-left:-8px;margin-top:-8px;pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%)}
#cf-hue-row{display:flex;align-items:center;gap:10px}
#cf-hue-lbl{font-size:0.7rem;color:var(--c-text-sec);font-weight:600;width:14px;flex-shrink:0}
#cf-hue{-webkit-appearance:none;appearance:none;flex:1;height:18px;border-radius:9px;outline:none;cursor:pointer;
  background:linear-gradient(to right,hsl(0,100%,50%),hsl(30,100%,50%),hsl(60,100%,50%),hsl(90,100%,50%),hsl(120,100%,50%),hsl(150,100%,50%),hsl(180,100%,50%),hsl(210,100%,50%),hsl(240,100%,50%),hsl(270,100%,50%),hsl(300,100%,50%),hsl(330,100%,50%),hsl(360,100%,50%))}
#cf-hue::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);box-shadow:0 1px 4px rgba(0,0,0,0.4);cursor:grab}
#cf-native-row{display:flex;align-items:center;gap:10px}
#cf-native-lbl{font-size:0.7rem;color:var(--c-text-sec);font-weight:600;width:14px}
#cf-native{width:100%;height:42px;border-radius:8px;border:1px solid var(--c-border);cursor:pointer;padding:3px;background:rgba(0,0,0,0.3)}
#cf-native::-webkit-color-swatch-wrapper{padding:0;border-radius:6px}
#cf-native::-webkit-color-swatch{border:none;border-radius:6px}
.cf-slabel{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-top:4px}
.cf-hist{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.cf-hist-sw{width:30px;height:30px;border-radius:7px;border:1px solid var(--c-border);cursor:pointer;position:relative;overflow:hidden;transition:transform 0.15s}
.cf-hist-sw:hover{transform:scale(1.18)}
.cf-hist-sw__c{position:absolute;inset:0}
.cf-hist-sw__del{position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:50%;background:#ef4444;border:none;cursor:pointer;display:none;font-size:9px;color:#fff;align-items:center;justify-content:center}
.cf-hist-sw:hover .cf-hist-sw__del{display:flex}
.cf-right{display:flex;flex-direction:column;gap:14px}
.cf-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:4px}
.cf-tab{flex:1;padding:7px 4px;border:none;border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.78rem;font-weight:700;font-family:var(--c-mono);cursor:pointer;transition:all 0.18s}
.cf-tab:hover{background:rgba(255,255,255,0.05);color:var(--c-text)}
.cf-tab.active{background:var(--c-accent);color:#fff;box-shadow:0 2px 8px rgba(139,92,246,0.35)}
#cf-fields{display:flex;flex-direction:column;gap:8px}
.cf-fld{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:9px 12px;transition:border-color 0.2s}
.cf-fld:focus-within{border-color:var(--c-accent)}
.cf-fld__lbl{font-family:var(--c-mono);font-size:0.72rem;font-weight:700;color:var(--c-text-sec);width:18px;flex-shrink:0}
.cf-fld__lbl.hex{color:var(--c-accent2)}
.cf-fld__sl{-webkit-appearance:none;appearance:none;flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}
.cf-fld__sl::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);box-shadow:0 1px 3px rgba(0,0,0,0.4);cursor:grab}
.cf-fld__inp{background:transparent;border:none;outline:none;color:var(--c-text);font-family:var(--c-mono);font-size:0.9rem;width:70px;text-align:right;flex-shrink:0;text-transform:uppercase}
.cf-fld__val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:38px;text-align:right;flex-shrink:0}
.cf-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:6px;cursor:pointer;color:var(--c-text-sec);transition:all 0.18s;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.cf-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}
.cf-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}
#cf-contrast{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cf-cc{background:var(--c-card);border:1px solid var(--c-border);border-radius:12px;padding:13px;display:flex;flex-direction:column;gap:8px}
.cf-cc__lbl{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--c-text-sec)}
.cf-cc__sw{height:52px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;font-family:var(--c-mono);transition:background-color 0.12s}
.cf-cc__r{font-size:1rem;font-weight:700;text-align:center}
  `;

  const HTML = `
<div id="cf-app">
  <div id="cf-hdr"><h1>Color Format Converter</h1><p>HEX · RGB · HSL · HSV 即時轉換</p></div>
  <div id="cf-main">
    <div class="cf-col">
      <div class="cf-preview" id="cf-preview"><div class="cf-preview__color" id="cf-preview-color"></div></div>
      <div id="cf-picker">
        <div id="cf-sat-layer"></div>
        <div id="cf-val-layer"></div>
        <div id="cf-cursor"></div>
      </div>
      <div id="cf-hue-row"><span id="cf-hue-lbl">H</span><input type="range" id="cf-hue" min="0" max="360" value="270"></div>
      <div id="cf-native-row"><span id="cf-native-lbl">P</span><input type="color" id="cf-native" value="#8b5cf6"></div>
      <div><div class="cf-slabel">最近使用</div><div class="cf-hist" id="cf-hist"></div></div>
    </div>
    <div class="cf-right">
      <div class="cf-tabs">
        <button class="cf-tab active" data-fmt="hex">HEX</button>
        <button class="cf-tab" data-fmt="rgb">RGB</button>
        <button class="cf-tab" data-fmt="hsl">HSL</button>
        <button class="cf-tab" data-fmt="hsv">HSV</button>
      </div>
      <div id="cf-fields"></div>
      <div><div class="cf-slabel">對比度</div>
        <div id="cf-contrast">
          <div class="cf-cc"><div class="cf-cc__lbl">與白色</div><div class="cf-cc__sw" id="cf-cw">Aa</div><div class="cf-cc__r" id="cf-cr-w"></div></div>
          <div class="cf-cc"><div class="cf-cc__lbl">與黑色</div><div class="cf-cc__sw" id="cf-cb">Aa</div><div class="cf-cc__r" id="cf-cr-b"></div></div>
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
    const h2r=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;};
    return {r:Math.round(h2r(p,q,h+1/3)*255),g:Math.round(h2r(p,q,h)*255),b:Math.round(h2r(p,q,h-1/3)*255)};
  }
  function rgb2hex(r, g, b) { return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase(); }
  function hex2rgb(hex) {
    hex=hex.replace('#','');
    if(hex.length===3) hex=hex.split('').map(c=>c+c).join('');
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

  // ── State & DOM ──────────────────────────────────────
  var S = {h:270, s:85, v:90, a:1};
  var fmt = 'hex';
  var dragging = false;

  function $(id) { return document.getElementById(id); }

  // ── Init ────────────────────────────────────────────
  function init() {
    var styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    $('color-app').appendChild(styleEl);
    $('color-app').insertAdjacentHTML('beforeend', HTML);

    $('cf-hue').addEventListener('input', onHue);
    $('cf-native').addEventListener('input', onNative);
    [].forEach.call(document.querySelectorAll('.cf-tab'), function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.cf-tab').forEach(function(t){t.classList.remove('active');});
        tab.classList.add('active');
        fmt = tab.dataset.fmt;
        renderFields();
      });
    });

    $('cf-picker').addEventListener('mousedown', onPickerDown);
    document.addEventListener('mousemove', onPickerMove);
    document.addEventListener('mouseup', function(){ if(dragging){dragging=false; saveHistory();} });
    $('cf-picker').addEventListener('touchstart', function(e){e.preventDefault();dragging=true;onPickerEvent(e.touches[0]);},{passive:false});
    document.addEventListener('touchmove', function(e){if(dragging)onPickerEvent(e.touches[0]);},{passive:false});
    document.addEventListener('touchend', function(){if(dragging){dragging=false;saveHistory();}});

    loadFromHash();
    updateAll();
    renderHist(loadHist());
  }

  // ── Update ───────────────────────────────────────────
  function updateAll() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    // Saturation gradient: white → hue color
    $('cf-sat-layer').style.background = 'linear-gradient(to right,#fff 0%,hsl(' + S.h + ',100%,50%) 100%)';
    // Preview
    $('cf-preview-color').style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    // Hue slider
    $('cf-hue').value = S.h;
    // Native picker
    $('cf-native').value = rgb2hex(rgb.r, rgb.g, rgb.b);
    // Cursor
    var pickerW = $('cf-picker').offsetWidth;
    var pickerH = $('cf-picker').offsetHeight;
    var cx = (S.s / 100) * pickerW;
    var cy = (1 - S.v / 100) * pickerH;
    $('cf-cursor').style.left = cx + 'px';
    $('cf-cursor').style.top = cy + 'px';
    var brightness = (rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 140 ? '#000' : '#fff';
    $('cf-cursor').style.borderColor = brightness;
    // Contrast
    var W = {r:255,g:255,b:255}, B = {r:0,g:0,b:0};
    var crW = cr(rgb, W), crB = cr(rgb, B);
    var rgbStr = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    var cwEl = $('cf-cw'), cbEl = $('cf-cb');
    cwEl.style.backgroundColor = rgbStr;
    cwEl.style.color = crW > 3 ? '#fff' : '#000';
    cbEl.style.backgroundColor = rgbStr;
    cbEl.style.color = crB > 3 ? '#fff' : '#000';
    $('cf-cr-w').textContent = crW.toFixed(2) + ' : 1';
    $('cf-cr-w').style.color = crW >= 4.5 ? 'var(--c-success)' : crW >= 3 ? '#fbbf24' : '#ef4444';
    $('cf-cr-b').textContent = crB.toFixed(2) + ' : 1';
    $('cf-cr-b').style.color = crB >= 4.5 ? 'var(--c-success)' : crB >= 3 ? '#fbbf24' : '#ef4444';
    // Fields
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
  function bgA(r,g,b,a){ return 'linear-gradient(to right,rgba('+r+','+g+','+b+',0),rgba('+r+','+g+','+b+',1))'; }

  function renderFields() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    var hsl = rgb2hsl(rgb.r, rgb.g, rgb.b);
    var el, html = '';
    var a = Math.round(S.a * 100);

    if (fmt === 'hex') {
      var hex = rgb2hex(rgb.r, rgb.g, rgb.b);
      html = '<div class="cf-fld"><span class="cf-fld__lbl hex">#</span><input class="cf-fld__inp" id="cf-f0" value="'+hex.slice(1)+'" maxlength="6" spellcheck="false" placeholder="FFFFFF"><button class="cf-copy" id="cf-copy-hex"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M9.5 4.5V3A1.5 1.5 0 0 0 8 1.5H3A1.5 1.5 0 0 0 1.5 3v5A1.5 1.5 0 0 0 3 9.5H4.5" stroke="currentColor" stroke-width="1.3"/></svg></button></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">A</span><input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b,a/100)+'"><span class="cf-fld__val" id="cf-fa-v">'+a+'%</span></div>';
    } else if (fmt === 'rgb') {
      html = '<div class="cf-fld"><span class="cf-fld__lbl">R</span><input type="range" class="cf-fld__sl" id="cf-fr" min="0" max="255" value="'+rgb.r+'" style="background:'+bgR(rgb.r,rgb.g,rgb.b)+'"><input class="cf-fld__inp" id="cf-fr-i" value="'+rgb.r+'" maxlength="3"><span class="cf-fld__val" id="cf-fr-v">'+rgb.r+'</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">G</span><input type="range" class="cf-fld__sl" id="cf-fg" min="0" max="255" value="'+rgb.g+'" style="background:'+bgG(rgb.r,rgb.g,rgb.b)+'"><input class="cf-fld__inp" id="cf-fg-i" value="'+rgb.g+'" maxlength="3"><span class="cf-fld__val" id="cf-fg-v">'+rgb.g+'</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">B</span><input type="range" class="cf-fld__sl" id="cf-fb" min="0" max="255" value="'+rgb.b+'" style="background:'+bgB(rgb.r,rgb.g,rgb.b)+'"><input class="cf-fld__inp" id="cf-fb-i" value="'+rgb.b+'" maxlength="3"><span class="cf-fld__val" id="cf-fb-v">'+rgb.b+'</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">A</span><input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b,a/100)+'"><span class="cf-fld__val" id="cf-fa-v">'+a+'%</span></div>';
    } else if (fmt === 'hsl') {
      html = '<div class="cf-fld"><span class="cf-fld__lbl">H</span><input type="range" class="cf-fld__sl" id="cf-fh" min="0" max="360" value="'+hsl.h+'" style="background:'+bgH(hsl.h,hsl.s,hsl.l)+'"><span class="cf-fld__val" id="cf-fh-v">'+hsl.h+'°</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">S</span><input type="range" class="cf-fld__sl" id="cf-fs" min="0" max="100" value="'+hsl.s+'" style="background:'+bgS(hsl.h,hsl.s,hsl.l)+'"><span class="cf-fld__val" id="cf-fs-v">'+hsl.s+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">L</span><input type="range" class="cf-fld__sl" id="cf-fl" min="0" max="100" value="'+hsl.l+'" style="background:'+bgL(hsl.h,hsl.s)+'"><span class="cf-fld__val" id="cf-fl-v">'+hsl.l+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">A</span><input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b,a/100)+'"><span class="cf-fld__val" id="cf-fa-v">'+a+'%</span></div>';
    } else if (fmt === 'hsv') {
      html = '<div class="cf-fld"><span class="cf-fld__lbl">H</span><input type="range" class="cf-fld__sl" id="cf-fh" min="0" max="360" value="'+S.h+'" style="background:'+bgH(S.h,S.s,S.v)+'"><span class="cf-fld__val" id="cf-fh-v">'+S.h+'°</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">S</span><input type="range" class="cf-fld__sl" id="cf-fs" min="0" max="100" value="'+S.s+'" style="background:'+bgS(S.h,S.s,S.v)+'"><span class="cf-fld__val" id="cf-fs-v">'+S.s+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">V</span><input type="range" class="cf-fld__sl" id="cf-fv" min="0" max="100" value="'+S.v+'" style="background:linear-gradient(to right,#000,hsl('+S.h+','+S.s+'%,50%))"><span class="cf-fld__val" id="cf-fv-v">'+S.v+'%</span></div>';
      html += '<div class="cf-fld"><span class="cf-fld__lbl">A</span><input type="range" class="cf-fld__sl" id="cf-fa" min="0" max="100" value="'+a+'" style="background:'+bgA(rgb.r,rgb.g,rgb.b,a/100)+'"><span class="cf-fld__val" id="cf-fa-v">'+a+'%</span></div>';
    }

    $('cf-fields').innerHTML = html;
    attachFieldListeners();
  }

  function attachFieldListeners() {
    var copyBtn = $('cf-copy-hex');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        var rgb = hsv2rgb(S.h, S.s, S.v);
        navigator.clipboard.writeText(rgb2hex(rgb.r, rgb.g, rgb.b)).then(function() {
          copyBtn.classList.add('copied');
          setTimeout(function(){ copyBtn.classList.remove('copied'); }, 1200);
        });
      });
    }

    var fa = $('cf-fa');
    if (fa) {
      fa.addEventListener('input', function(e) {
        S.a = parseInt(e.target.value) / 100;
        $('cf-fa-v').textContent = e.target.value + '%';
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
            var rgb = hex2rgb(v);
            var hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
            S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
            updateAll();
          }
        });
      }
    } else if (fmt === 'rgb') {
      ['fr','fg','fb'].forEach(function(id) {
        var sl = $(id), inp = $(id+'-i'), val = $(id+'-v');
        if (!sl) return;
        var upd = function(src) {
          var n = Math.max(0, Math.min(255, parseInt(src === 'sl' ? sl.value : inp.value) || 0));
          if (src === 'sl') inp.value = n; else sl.value = n;
          val.textContent = n;
          var r = parseInt($('cf-fr').value)||0, g2 = parseInt($('cf-fg').value)||0, b = parseInt($('cf-fb').value)||0;
          var hsv = rgb2hsv(r, g2, b);
          S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
          updateAll();
        };
        sl.addEventListener('input', function(){ upd('sl'); });
        inp.addEventListener('input', function(){ upd('inp'); });
      });
    } else if (fmt === 'hsl') {
      var fh = $('cf-fh'), fs = $('cf-fs'), fl = $('cf-fl');
      if (fh) {
        var upd = function() {
          var hh = parseInt(fh.value)||0, ss = parseInt(fs.value)||0, ll = parseInt(fl.value)||0;
          fh.nextElementSibling.textContent = hh + '°';
          fs.nextElementSibling.textContent = ss + '%';
          fl.nextElementSibling.textContent = ll + '%';
          var rgb = hsl2rgb(hh, ss, ll);
          var hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
          S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
          updateAll();
        };
        fh.addEventListener('input', upd);
        fs.addEventListener('input', upd);
        fl.addEventListener('input', upd);
      }
    } else if (fmt === 'hsv') {
      var fh = $('cf-fh'), fs = $('cf-fs'), fv = $('cf-fv');
      if (fh) {
        var upd = function() {
          var hh = parseInt(fh.value)||0, ss = parseInt(fs.value)||0, vv = parseInt(fv.value)||0;
          fh.nextElementSibling.textContent = hh + '°';
          fs.nextElementSibling.textContent = ss + '%';
          fv.nextElementSibling.textContent = vv + '%';
          S.h = hh; S.s = ss; S.v = vv;
          updateAll();
        };
        fh.addEventListener('input', upd);
        fs.addEventListener('input', upd);
        fv.addEventListener('input', upd);
      }
    }
  }

  // ── Picker ───────────────────────────────────────────
  function onHue(e) {
    S.h = parseInt(e.target.value);
    updateAll();
  }
  $('cf-hue').addEventListener('change', saveHistory);

  function onNative(e) {
    var rgb = hex2rgb(e.target.value);
    var hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
    S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
    updateAll();
  }
  $('cf-native').addEventListener('change', saveHistory);

  function onPickerEvent(e) {
    var rect = $('cf-picker').getBoundingClientRect();
    var x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    var y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    S.s = Math.round(x * 100);
    S.v = Math.round((1 - y) * 100);
    updateAll();
  }
  function onPickerDown(e) { dragging = true; onPickerEvent(e); }
  function onPickerMove(e) { if (dragging) onPickerEvent(e); }

  // ── History ──────────────────────────────────────────
  function loadHist() {
    try { return JSON.parse(localStorage.getItem('cf-hist') || '[]'); } catch(e) { return []; }
  }
  function saveHist(h) { localStorage.setItem('cf-hist', JSON.stringify(h)); }

  function saveHistory() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    var hex = rgb2hex(rgb.r, rgb.g, rgb.b);
    var h = loadHist().filter(function(x){ return x !== hex; });
    h.unshift(hex);
    saveHist(h.slice(0, 16));
    renderHist(h.slice(0, 16));
  }

  function renderHist(h) {
    if (!h || h.length === 0) { $('cf-hist').innerHTML = ''; return; }
    var html = '';
    h.forEach(function(hex, i) {
      html += '<div class="cf-hist-sw" data-hex="'+hex+'" title="'+hex+'"><div class="cf-hist-sw__c" style="background:'+hex+'"></div><button class="cf-hist-sw__del" data-i="'+i+'">×</button></div>';
    });
    $('cf-hist').innerHTML = html;
    [].forEach.call($('cf-hist').querySelectorAll('.cf-hist-sw'), function(sw) {
      sw.addEventListener('click', function(e) {
        if (e.target.classList.contains('cf-hist-sw__del')) {
          var i = parseInt(e.target.dataset.i);
          var h = loadHist(); h.splice(i,1); saveHist(h); renderHist(h);
          return;
        }
        var hex = sw.dataset.hex;
        var rgb = hex2rgb(hex);
        var hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
        S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
        updateAll();
      });
    });
  }

  // ── URL ─────────────────────────────────────────────
  function updateUrlHash() {
    var rgb = hsv2rgb(S.h, S.s, S.v);
    history.replaceState(null, '', '#' + rgb2hex(rgb.r, rgb.g, rgb.b));
  }
  function loadFromHash() {
    var h = location.hash.slice(1);
    if (/^[0-9A-Fa-f]{6}$/.test(h)) {
      var rgb = hex2rgb(h);
      var hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
      S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
    }
  }

  // ── Bootstrap ────────────────────────────────────────
  // Defer until panel is visible
  function tryInit() {
    var panel = $('panel-color-format');
    if (!panel || panel.classList.contains('hidden')) return;
    init();
    document.removeEventListener('click', tryInit);
  }
  tryInit();
  document.addEventListener('click', tryInit);
})();
