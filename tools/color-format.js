(function() {
  const CSS = `
#cf-app{--c-bg:#0d0d12;--c-card:rgba(25,25,38,0.7);--c-border:rgba(255,255,255,0.09);--c-text:#f0f0f5;--c-text-sec:#8888a0;--c-accent:#8b5cf6;--c-accent2:#06b6d4;--c-success:#34d399;--c-font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;--c-mono:'JetBrains Mono','Fira Code',monospace;font-family:var(--c-font);color:var(--c-text);padding:28px 24px;display:flex;flex-direction:column;gap:22px;height:100%;overflow-y:auto;box-sizing:border-box}
#cf-app *,#cf-app *::before,#cf-app *::after{box-sizing:border-box}
#cf-hdr{text-align:center}
#cf-hdr h1{font-size:1.7rem;font-weight:700;background:linear-gradient(130deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:3px}
#cf-hdr p{font-size:0.85rem;color:var(--c-text-sec)}
#cf-main{display:grid;grid-template-columns:300px 1fr;gap:20px;align-items:start}
@media(max-width:860px){#cf-main{grid-template-columns:1fr}}
.cf-col{display:flex;flex-direction:column;gap:14px}
.cf-preview{width:100%;height:110px;border-radius:14px;border:1px solid var(--c-border);position:relative;overflow:hidden;transition:background-color 0.12s}
.cf-preview__ checker{position:absolute;inset:0;background-image:linear-gradient(45deg,#1a1a2e 25%,transparent 25%),linear-gradient(-45deg,#1a1a2e 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1a1a2e 75%),linear-gradient(-45deg,transparent 75%,#1a1a2e 75%);background-size:12px 12px;background-position:0 0,0 6px,6px -6px,-6px 0;background-color:#12121e}
.cf-preview__color{position:absolute;inset:0;transition:background-color 0.12s}
#cf-picker-canvas-wrap{position:relative;width:100%;aspect-ratio:1;max-height:220px;border-radius:12px;overflow:hidden;cursor:crosshair;border:1px solid var(--c-border)}
#cf-sat-bg{position:absolute;inset:0;width:100%;height:100%;background:linear-gradient(to right,#fff 0%,hsl(var(--hue),100%,50%) 100%)}
#cf-val-bg{position:absolute;inset:0;width:100%;height:100%;background:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);pointer-events:none}
#cf-picker-cursor{position:absolute;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 0 1px rgba(0,0,0,0.5),inset 0 0 0 1px rgba(0,0,0,0.3);width:16px;height:16px;margin-left:-8px;margin-top:-8px;pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%)}
#cf-hue-row{display:flex;align-items:center;gap:10px}
#cf-hue-label{font-size:0.7rem;color:var(--c-text-sec);font-weight:600;width:14px;flex-shrink:0}
#cf-hue-slider{-webkit-appearance:none;appearance:none;flex:1;height:18px;border-radius:9px;outline:none;cursor:pointer;
  background:linear-gradient(to right,hsl(0,100%,50%),hsl(30,100%,50%),hsl(60,100%,50%),hsl(90,100%,50%),hsl(120,100%,50%),hsl(150,100%,50%),hsl(180,100%,50%),hsl(210,100%,50%),hsl(240,100%,50%),hsl(270,100%,50%),hsl(300,100%,50%),hsl(330,100%,50%),hsl(360,100%,50%))}
#cf-hue-slider::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);box-shadow:0 1px 4px rgba(0,0,0,0.4);cursor:grab}
#cf-native-row{display:flex;align-items:center;gap:10px}
#cf-native-label{font-size:0.7rem;color:var(--c-text-sec);font-weight:600;width:14px}
#cf-native-picker{flex:1;height:42px;border-radius:8px;border:1px solid var(--c-border);cursor:pointer;padding:3px;background:rgba(0,0,0,0.3)}
#cf-native-picker::-webkit-color-swatch-wrapper{padding:0;border-radius:6px}
#cf-native-picker::-webkit-color-swatch{border:none;border-radius:6px}
.cf-section-label{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--c-text-sec);margin-top:4px}
.cf-history-row{display:flex;gap:7px;flex-wrap:wrap;align-items:center}
.cf-history-swatch{width:30px;height:30px;border-radius:7px;border:1px solid var(--c-border);cursor:pointer;position:relative;overflow:hidden;transition:transform 0.15s;flex-shrink:0}
.cf-history-swatch:hover{transform:scale(1.18)}
.cf-history-swatch__color{position:absolute;inset:0}
.cf-history-swatch__del{position:absolute;top:-5px;right:-5px;width:16px;height:16px;border-radius:50%;background:#ef4444;border:none;cursor:pointer;display:none;font-size:9px;color:#fff;align-items:center;justify-content:center}
.cf-history-swatch:hover .cf-history-swatch__del{display:flex}
.cf-right-col{display:flex;flex-direction:column;gap:14px}
.cf-tabs{display:flex;gap:4px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:4px}
.cf-tab{flex:1;padding:7px 4px;border:none;border-radius:7px;background:transparent;color:var(--c-text-sec);font-size:0.78rem;font-weight:700;font-family:var(--c-mono);cursor:pointer;transition:all 0.18s}
.cf-tab:hover{background:rgba(255,255,255,0.05);color:var(--c-text)}
.cf-tab.active{background:var(--c-accent);color:#fff;box-shadow:0 2px 8px rgba(139,92,246,0.35)}
#cf-fields{display:flex;flex-direction:column;gap:8px}
.cf-field{display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.25);border:1px solid var(--c-border);border-radius:10px;padding:9px 12px;transition:border-color 0.2s}
.cf-field:focus-within{border-color:var(--c-accent)}
.cf-field__lbl{font-family:var(--c-mono);font-size:0.72rem;font-weight:700;color:var(--c-text-sec);width:18px;flex-shrink:0}
.cf-field__lbl.hex{color:var(--c-accent2)}
.cf-field__sl{-webkit-appearance:none;appearance:none;flex:1;height:5px;border-radius:3px;background:rgba(255,255,255,0.1);cursor:pointer;outline:none}
.cf-field__sl::-webkit-slider-thumb{-webkit-appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;border:2px solid rgba(0,0,0,0.3);box-shadow:0 1px 3px rgba(0,0,0,0.4);cursor:grab}
.cf-field__inp{background:transparent;border:none;outline:none;color:var(--c-text);font-family:var(--c-mono);font-size:0.9rem;width:70px;text-align:right;flex-shrink:0;text-transform:uppercase}
.cf-field__val{font-family:var(--c-mono);font-size:0.75rem;color:var(--c-text-sec);width:38px;text-align:right;flex-shrink:0}
.cf-copy{background:transparent;border:1px solid var(--c-border);border-radius:6px;padding:6px;cursor:pointer;color:var(--c-text-sec);transition:all 0.18s;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.cf-copy:hover{color:var(--c-accent);border-color:var(--c-accent);background:rgba(139,92,246,0.1)}
.cf-copy.copied{color:var(--c-success);border-color:var(--c-success);background:rgba(52,211,153,0.1)}
#cf-contrast{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cf-contrast-card{background:var(--c-card);border:1px solid var(--c-border);border-radius:12px;padding:13px;display:flex;flex-direction:column;gap:8px}
.cf-contrast-card__lbl{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--c-text-sec)}
.cf-contrast-card__sw{height:52px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;font-family:var(--c-mono);transition:background-color 0.12s}
.cf-contrast-card__ratio{font-size:1rem;font-weight:700;text-align:center}
  `;

  const HTML = `
<div id="cf-app">
  <div id="cf-hdr"><h1>Color Format Converter</h1><p>HEX · RGB · HSL · HSV 即時轉換</p></div>
  <div id="cf-main">
    <div class="cf-col">
      <div class="cf-preview" id="cf-preview"><div class="cf-preview__color" id="cf-preview-color"></div></div>
      <div id="cf-picker-canvas-wrap">
        <div id="cf-sat-bg"></div>
        <div id="cf-val-bg"></div>
        <div id="cf-picker-cursor"></div>
      </div>
      <div id="cf-hue-row">
        <span id="cf-hue-label">H</span>
        <input type="range" id="cf-hue-slider" min="0" max="360" value="270">
      </div>
      <div id="cf-native-row">
        <span id="cf-native-label">P</span>
        <input type="color" id="cf-native-picker" value="#8b5cf6">
      </div>
      <div>
        <div class="cf-section-label">最近使用</div>
        <div class="cf-history-row" id="cf-history"></div>
      </div>
    </div>
    <div class="cf-right-col">
      <div class="cf-tabs">
        <button class="cf-tab active" data-fmt="hex">HEX</button>
        <button class="cf-tab" data-fmt="rgb">RGB</button>
        <button class="cf-tab" data-fmt="hsl">HSL</button>
        <button class="cf-tab" data-fmt="hsv">HSV</button>
      </div>
      <div id="cf-fields"></div>
      <div>
        <div class="cf-section-label">對比度</div>
        <div id="cf-contrast">
          <div class="cf-contrast-card">
            <div class="cf-contrast-card__lbl">與白色</div>
            <div class="cf-contrast-card__sw" id="cf-cw">Aa</div>
            <div class="cf-contrast-card__ratio" id="cf-cr-w"></div>
          </div>
          <div class="cf-contrast-card">
            <div class="cf-contrast-card__lbl">與黑色</div>
            <div class="cf-contrast-card__sw" id="cf-cb">Aa</div>
            <div class="cf-contrast-card__ratio" id="cf-cr-b"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;

  const container = document.getElementById('color-app');
  const styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  container.appendChild(styleEl);
  container.insertAdjacentHTML('beforeend', HTML);

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
  function contrast(frm, to) {
    const l1=lumin(frm.r,frm.g,frm.b), l2=lumin(to.r,to.g,to.b);
    const [L,D] = l1>l2 ? [l1,l2] : [l2,l1];
    return (L+0.05)/(D+0.05);
  }

  // ── State ─────────────────────────────────────────────
  const S = {h:270, s:85, v:90, a:1};
  let fmt = 'hex';

  // ── DOM ───────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelectorAll(sel);

  const canvas = $('cf-picker-canvas');
  const ctx = canvas.getContext('2d');
  const cursor = $('cf-picker-cursor');
  const hueSlider = $('cf-hue-slider');
  const nativePicker = $('cf-native-picker');
  const previewColor = $('cf-preview-color');
  const fieldsEl = $('cf-fields');
  const historyEl = $('cf-history');

  // ── DOM Gradient Picker ────────────────────────────────
  const pickerWrap = $('cf-picker-canvas-wrap');
  const satBg = $('cf-sat-bg');

  function updatePickerGradient() {
    const {h} = S;
    // Use CSS custom property for instant hue update
    pickerWrap.style.setProperty('--hue', h);
    // Saturation gradient: white → hue color
    satBg.style.background = `linear-gradient(to right, #fff 0%, hsl(${h},100%,50%) 100%)`;
  }

  function updateCursorPos() {
    const wrap = $('cf-picker-canvas-wrap');
    const rect = wrap.getBoundingClientRect();
    const x = (S.s / 100) * rect.width;
    const y = (1 - S.v / 100) * rect.height;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    // Cursor border color based on brightness
    const rgb = hsv2rgb(S.h, S.s, S.v);
    const brightness = (rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > 140 ? '#000' : '#fff';
    cursor.style.borderColor = brightness;
    cursor.style.boxShadow = `0 0 0 1px rgba(0,0,0,0.5),inset 0 0 0 1px rgba(0,0,0,0.3)`;
  }

  function updateCursorPosPicker(e) {
    const rect = $('cf-picker-canvas-wrap').getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    S.s = Math.round(x * 100);
    S.v = Math.round((1 - y) * 100);
    updateCursorPos();
    updatePreview();
    updateNativePicker();
    renderFields();
    updateContrast();
  }

  function updatePreview() {
    const {h,s,v} = S;
    const rgb = hsv2rgb(h, s, v);
    previewColor.style.backgroundColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  }

  function updateHueSlider() {
    hueSlider.value = S.h;
  }

  function updateNativePicker() {
    const rgb = hsv2rgb(S.h, S.s, S.v);
    nativePicker.value = rgb2hex(rgb.r, rgb.g, rgb.b);
  }

  function updateAll() {
    updatePickerGradient();
    updateCursorPos();
    updatePreview();
    updateHueSlider();
    updateNativePicker();
    renderFields();
    updateContrast();
    updateUrlHash();
  }

  // ── Picker Interaction ─────────────────────────────────
  let dragging = false;
  function pickerFromEvent(e) {
    const rect = pickerWrap.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    S.s = Math.round(x * 100);
    S.v = Math.round((1 - y) * 100);
    updateCursorPos();
    updatePreview();
    updateNativePicker();
    renderFields();
    updateContrast();
  }
  pickerWrap.addEventListener('mousedown', e => { dragging = true; pickerFromEvent(e); });
  document.addEventListener('mousemove', e => { if (dragging) pickerFromEvent(e); });
  document.addEventListener('mouseup', () => { if (dragging) { dragging = false; saveHistory(); } });
  pickerWrap.addEventListener('touchstart', e => { e.preventDefault(); dragging = true; pickerFromEvent(e.touches[0]); }, {passive:false});
  document.addEventListener('touchmove', e => { if(dragging) pickerFromEvent(e.touches[0]); }, {passive:false});
  document.addEventListener('touchend', () => { if(dragging) { dragging = false; saveHistory(); }});

  // ── Hue Slider ────────────────────────────────────────
  hueSlider.addEventListener('input', e => {
    S.h = parseInt(e.target.value);
    updatePickerGradient();
    updateCursorPos();
    updatePreview();
    updateNativePicker();
    renderFields();
    updateContrast();
  });
  hueSlider.addEventListener('change', () => saveHistory());

  // ── Native Picker ────────────────────────────────────
  nativePicker.addEventListener('input', e => {
    const rgb = hex2rgb(e.target.value);
    const hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
    S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
    updatePickerGradient();
    updateCursorPos();
    updatePreview();
    renderFields();
    updateContrast();
  });
  nativePicker.addEventListener('change', () => saveHistory());

  // ── Format Tabs ──────────────────────────────────────
  $$('.cf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.cf-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      fmt = tab.dataset.fmt;
      renderFields();
    });
  });

  // ── Field Rendering ─────────────────────────────────
  function sliderBgR(r,g,b) {
    return `linear-gradient(to right, rgb(0,${g},${b}), rgb(255,${g},${b}))`;
  }
  function sliderBgG(r,g,b) {
    return `linear-gradient(to right, rgb(${r},0,${b}), rgb(${r},255,${b}))`;
  }
  function sliderBgB(r,g,b) {
    return `linear-gradient(to right, rgb(${r},${g},0), rgb(${r},${g},255))`;
  }
  function sliderBgH(h,s,l) {
    return `linear-gradient(to right, hsl(0,${s}%,${l}%),hsl(60,${s}%,${l}%),hsl(120,${s}%,${l}%),hsl(180,${s}%,${l}%),hsl(240,${s}%,${l}%),hsl(300,${s}%,${l}%),hsl(360,${s}%,${l}%))`;
  }
  function sliderBgS(h,s,l) {
    return `linear-gradient(to right, hsl(${h},0%,${l}%),hsl(${h},100%,${l}%))`;
  }
  function sliderBgL(h,s) {
    return `linear-gradient(to right, #000, hsl(${h},${s}%,50%), #fff)`;
  }
  function sliderBgA(r,g,b,a) {
    return `linear-gradient(to right, rgba(${r},${g},${b},0), rgba(${r},${g},${b},1))`;
  }

  function renderFields() {
    const {h,s,v,a} = S;
    const rgb = hsv2rgb(h, s, v);
    const hsl = rgb2hsl(rgb.r, rgb.g, rgb.b);
    let html = '';

    if (fmt === 'hex') {
      const hex = rgb2hex(rgb.r, rgb.g, rgb.b);
      html = `
<div class="cf-field">
  <span class="cf-field__lbl hex">#</span>
  <input class="cf-field__inp" id="cf-f0" value="${hex.slice(1)}" maxlength="6" spellcheck="false" placeholder="FFFFFF">
  <button class="cf-copy" id="cf-copy-hex" title="Copy">
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M9.5 4.5V3A1.5 1.5 0 0 0 8 1.5H3A1.5 1.5 0 0 0 1.5 3v5A1.5 1.5 0 0 0 3 9.5H4.5" stroke="currentColor" stroke-width="1.3"/></svg>
  </button>
</div>
<div class="cf-field">
  <span class="cf-field__lbl">A</span>
  <input type="range" class="cf-field__sl" id="cf-fa" min="0" max="100" value="${Math.round(a*100)}" style="background:${sliderBgA(rgb.r,rgb.g,rgb.b,a)}">
  <span class="cf-field__val" id="cf-fa-v">${Math.round(a*100)}%</span>
</div>`;
    } else if (fmt === 'rgb') {
      html = `
<div class="cf-field"><span class="cf-field__lbl">R</span><input type="range" class="cf-field__sl" id="cf-fr" min="0" max="255" value="${rgb.r}" style="background:${sliderBgR(rgb.r,rgb.g,rgb.b)}"><input class="cf-field__inp" id="cf-fr-i" value="${rgb.r}" maxlength="3"><span class="cf-field__val" id="cf-fr-v">${rgb.r}</span></div>
<div class="cf-field"><span class="cf-field__lbl">G</span><input type="range" class="cf-field__sl" id="cf-fg" min="0" max="255" value="${rgb.g}" style="background:${sliderBgG(rgb.r,rgb.g,rgb.b)}"><input class="cf-field__inp" id="cf-fg-i" value="${rgb.g}" maxlength="3"><span class="cf-field__val" id="cf-fg-v">${rgb.g}</span></div>
<div class="cf-field"><span class="cf-field__lbl">B</span><input type="range" class="cf-field__sl" id="cf-fb" min="0" max="255" value="${rgb.b}" style="background:${sliderBgB(rgb.r,rgb.g,rgb.b)}"><input class="cf-field__inp" id="cf-fb-i" value="${rgb.b}" maxlength="3"><span class="cf-field__val" id="cf-fb-v">${rgb.b}</span></div>
<div class="cf-field"><span class="cf-field__lbl">A</span><input type="range" class="cf-field__sl" id="cf-fa" min="0" max="100" value="${Math.round(a*100)}" style="background:${sliderBgA(rgb.r,rgb.g,rgb.b,a)}"><span class="cf-field__val" id="cf-fa-v">${Math.round(a*100)}%</span></div>`;
    } else if (fmt === 'hsl') {
      html = `
<div class="cf-field"><span class="cf-field__lbl">H</span><input type="range" class="cf-field__sl" id="cf-fh" min="0" max="360" value="${hsl.h}" style="background:${sliderBgH(hsl.h,hsl.s,hsl.l)}"><span class="cf-field__val" id="cf-fh-v">${hsl.h}°</span></div>
<div class="cf-field"><span class="cf-field__lbl">S</span><input type="range" class="cf-field__sl" id="cf-fs" min="0" max="100" value="${hsl.s}" style="background:${sliderBgS(hsl.h,hsl.s,hsl.l)}"><span class="cf-field__val" id="cf-fs-v">${hsl.s}%</span></div>
<div class="cf-field"><span class="cf-field__lbl">L</span><input type="range" class="cf-field__sl" id="cf-fl" min="0" max="100" value="${hsl.l}" style="background:${sliderBgL(hsl.h,hsl.s)}"><span class="cf-field__val" id="cf-fl-v">${hsl.l}%</span></div>
<div class="cf-field"><span class="cf-field__lbl">A</span><input type="range" class="cf-field__sl" id="cf-fa" min="0" max="100" value="${Math.round(a*100)}" style="background:${sliderBgA(rgb.r,rgb.g,rgb.b,a)}"><span class="cf-field__val" id="cf-fa-v">${Math.round(a*100)}%</span></div>`;
    } else if (fmt === 'hsv') {
      html = `
<div class="cf-field"><span class="cf-field__lbl">H</span><input type="range" class="cf-field__sl" id="cf-fh" min="0" max="360" value="${h}" style="background:${sliderBgH(h,s,v)}"><span class="cf-field__val" id="cf-fh-v">${h}°</span></div>
<div class="cf-field"><span class="cf-field__lbl">S</span><input type="range" class="cf-field__sl" id="cf-fs" min="0" max="100" value="${s}" style="background:${sliderBgS(h,s,v)}"><span class="cf-field__val" id="cf-fs-v">${s}%</span></div>
<div class="cf-field"><span class="cf-field__lbl">V</span><input type="range" class="cf-field__sl" id="cf-fv" min="0" max="100" value="${v}" style="background:linear-gradient(to right,#000,hsl(${h},${s}%,50%))"><span class="cf-field__val" id="cf-fv-v">${v}%</span></div>
<div class="cf-field"><span class="cf-field__lbl">A</span><input type="range" class="cf-field__sl" id="cf-fa" min="0" max="100" value="${Math.round(a*100)}" style="background:${sliderBgA(rgb.r,rgb.g,rgb.b,a)}"><span class="cf-field__val" id="cf-fa-v">${Math.round(a*100)}%</span></div>`;
    }

    fieldsEl.innerHTML = html;
    attachFieldListeners();
  }

  function attachFieldListeners() {
    const copyBtn = $('cf-copy-hex');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const rgb = hsv2rgb(S.h, S.s, S.v);
        const hex = rgb2hex(rgb.r, rgb.g, rgb.b);
        navigator.clipboard.writeText(hex).then(() => {
          copyBtn.classList.add('copied');
          setTimeout(() => copyBtn.classList.remove('copied'), 1200);
        });
      });
    }

    const fa = $('cf-fa');
    if (fa) {
      fa.addEventListener('input', e => {
        S.a = parseInt(e.target.value) / 100;
        $('cf-fa-v').textContent = e.target.value + '%';
        updateContrast();
      });
    }

    if (fmt === 'hex') {
      const fi = $('cf-f0');
      if (fi) {
        fi.addEventListener('input', e => {
          let v = e.target.value.replace(/[^0-9A-Fa-f]/g,'').slice(0,6);
          e.target.value = v.toUpperCase();
          if (v.length === 6) {
            const rgb = hex2rgb(v);
            const hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
            S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
            updatePickerGradient(); updateCursorPos(); updatePreview(); updateNativePicker(); updateContrast();
          }
        });
      }
    } else if (fmt === 'rgb') {
      ['fr','fg','fb'].forEach(id => {
        const sl = $(id), inp = $(id+'-i'), val = $(id+'-v');
        if (!sl) return;
        const ch = id[1];
        const upd = (src) => {
          let n = Math.max(0, Math.min(255, parseInt(src === 'sl' ? sl.value : inp.value) || 0));
          if (src === 'sl') inp.value = n; else sl.value = n;
          val.textContent = n;
          const r = parseInt($('cf-fr').value)||0, g = parseInt($('cf-fg').value)||0, b2 = parseInt($('cf-fb').value)||0;
          const hsv = rgb2hsv(r, g, b2);
          S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
          updateCursorPos(); updatePreview(); updateNativePicker(); updateContrast();
        };
        sl.addEventListener('input', () => upd('sl'));
        inp.addEventListener('input', () => upd('inp'));
      });
    } else if (fmt === 'hsl') {
      const fh = $('cf-fh'), fs = $('cf-fs'), fl = $('cf-fl');
      if (fh) {
        const upd = () => {
          const hh = parseInt(fh.value)||0, ss = parseInt(fs.value)||0, ll = parseInt(fl.value)||0;
          fh.nextElementSibling.textContent = hh + '°';
          fs.nextElementSibling.textContent = ss + '%';
          fl.nextElementSibling.textContent = ll + '%';
          const rgb = hsl2rgb(hh, ss, ll);
          const hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
          S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
          updatePickerGradient(); updateCursorPos(); updatePreview(); updateNativePicker(); updateContrast();
        };
        fh.addEventListener('input', upd);
        fs.addEventListener('input', upd);
        fl.addEventListener('input', upd);
      }
    } else if (fmt === 'hsv') {
      const fh = $('cf-fh'), fs = $('cf-fs'), fv = $('cf-fv');
      if (fh) {
        const upd = () => {
          const hh = parseInt(fh.value)||0, ss = parseInt(fs.value)||0, vv = parseInt(fv.value)||0;
          fh.nextElementSibling.textContent = hh + '°';
          fs.nextElementSibling.textContent = ss + '%';
          fv.nextElementSibling.textContent = vv + '%';
          S.h = hh; S.s = ss; S.v = vv;
          updatePickerGradient(); updateCursorPos(); updatePreview(); updateNativePicker(); updateContrast();
        };
        fh.addEventListener('input', upd);
        fs.addEventListener('input', upd);
        fv.addEventListener('input', upd);
      }
    }
  }

  // ── Contrast ──────────────────────────────────────────
  function updateContrast() {
    const rgb = hsv2rgb(S.h, S.s, S.v);
    const W = {r:255,g:255,b:255}, B = {r:0,g:0,b:0};
    const crW = contrast(rgb, W);
    const crB = contrast(rgb, B);
    const cwEl = $('cf-cw'), cbEl = $('cf-cb'), crwEl = $('cf-cr-w'), crbEl = $('cf-cr-b');
    if (!cwEl) return;
    const rgbStr = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    cwEl.style.backgroundColor = rgbStr;
    cwEl.style.color = crW > 3 ? '#fff' : '#000';
    cbEl.style.backgroundColor = rgbStr;
    cbEl.style.color = crB > 3 ? '#fff' : '#000';
    crwEl.textContent = crW.toFixed(2) + ' : 1';
    crwEl.style.color = crW >= 4.5 ? 'var(--c-success)' : crW >= 3 ? '#fbbf24' : '#ef4444';
    crbEl.textContent = crB.toFixed(2) + ' : 1';
    crbEl.style.color = crB >= 4.5 ? 'var(--c-success)' : crB >= 3 ? '#fbbf24' : '#ef4444';
  }

  // ── History ───────────────────────────────────────────
  function loadHist() {
    try { return JSON.parse(localStorage.getItem('cf-hist') || '[]'); }
    catch { return []; }
  }
  function saveHist(h) { localStorage.setItem('cf-hist', JSON.stringify(h)); }

  function saveHistory() {
    const rgb = hsv2rgb(S.h, S.s, S.v);
    const hex = rgb2hex(rgb.r, rgb.g, rgb.b);
    let h = loadHist().filter(x => x !== hex);
    h.unshift(hex);
    h = h.slice(0, 16);
    saveHist(h);
    renderHist(h);
  }

  function renderHist(h) {
    if (!h || h.length === 0) { historyEl.innerHTML = ''; return; }
    historyEl.innerHTML = h.map((hex, i) =>
      `<div class="cf-history-swatch" data-hex="${hex}" title="${hex}">
        <div class="cf-history-swatch__color" style="background:${hex}"></div>
        <button class="cf-history-swatch__del" data-i="${i}">×</button>
      </div>`
    ).join('');
    historyEl.querySelectorAll('.cf-history-swatch').forEach(sw => {
      sw.addEventListener('click', e => {
        if (e.target.classList.contains('cf-history-swatch__del')) {
          const i = parseInt(e.target.dataset.i);
          const h = loadHist(); h.splice(i,1); saveHist(h); renderHist(h);
          return;
        }
        const hex = sw.dataset.hex;
        const rgb = hex2rgb(hex);
        const hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
        S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
        updateAll();
      });
    });
  }

  // ── URL Hash ──────────────────────────────────────────
  function updateUrlHash() {
    const rgb = hsv2rgb(S.h, S.s, S.v);
    history.replaceState(null, '', '#' + rgb2hex(rgb.r, rgb.g, rgb.b));
  }
  function loadFromHash() {
    const h = location.hash.slice(1);
    if (/^[0-9A-Fa-f]{6}$/.test(h)) {
      const rgb = hex2rgb(h);
      const hsv = rgb2hsv(rgb.r, rgb.g, rgb.b);
      S.h = hsv.h; S.s = hsv.s; S.v = hsv.v;
    }
  }

  // ── Init — defer until panel is visible ─────────────
  let initialized = false;

  function tryInit() {
    // Only run when #panel-color-format is visible (not hidden)
    var panel = document.getElementById('panel-color-format');
    if (!panel || panel.classList.contains('hidden')) return;
    if (initialized) return;
    initialized = true;

    // Resize canvas and run full update
    window.addEventListener('resize', function() { updateCursorPos(); });
    loadFromHash();
    updateAll();
    renderHist(loadHist());

    // Observe visibility changes as a safety net
    var observer = new MutationObserver(function() {
      if (!initialized) { tryInit(); }
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
  }

  // Try immediately (in case it loads when already visible)
  tryInit();

  // Also try on tab click (in case loaded when hidden)
  document.addEventListener('click', tryInit);
})();
