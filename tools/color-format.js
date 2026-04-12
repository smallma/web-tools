(function() {
  const css = `
    #color-app {
      --c-bg: #0d0d12;
      --c-card: rgba(25,25,38,0.6);
      --c-border: rgba(255,255,255,0.08);
      --c-text: #f0f0f5;
      --c-text-sec: #8888a0;
      --c-accent: #8b5cf6;
      --c-accent2: #06b6d4;
      --c-success: #34d399;
      --c-font: 'Inter', sans-serif;
      --c-mono: 'JetBrains Mono', monospace;

      font-family: var(--c-font);
      color: var(--c-text);
      height: 100%;
      overflow-y: auto;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    #color-app .cf-header { text-align: center; }
    #color-app .cf-header h1 {
      font-size: 1.8rem; font-weight: 700;
      background: linear-gradient(135deg, #8b5cf6, #06b6d4);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 4px;
    }
    #color-app .cf-header p { color: var(--c-text-sec); font-size: 0.9rem; }

    /* Color Preview & Picker */
    #color-app .cf-main { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
    @media(max-width:900px) { #color-app .cf-main { grid-template-columns: 1fr; } }

    #color-app .cf-picker-col { display: flex; flex-direction: column; gap: 16px; }
    #color-app .cf-swatch-preview {
      width: 100%; height: 120px; border-radius: 16px;
      border: 1px solid var(--c-border);
      transition: background-color 0.15s ease;
      position: relative; overflow: hidden;
    }
    #color-app .cf-swatch-preview__checker {
      position: absolute; inset: 0;
      background-image: linear-gradient(45deg,#1a1a2e 25%,transparent 25%),
        linear-gradient(-45deg,#1a1a2e 25%,transparent 25%),
        linear-gradient(45deg,transparent 75%,#1a1a2e 75%),
        linear-gradient(-45deg,transparent 75%,#1a1a2e 75%);
      background-size: 16px 16px;
      background-position: 0 0,0 8px,8px -8px,-8px 0;
      background-color: #12121e;
    }
    #color-app .cf-swatch-preview__color {
      position: absolute; inset: 0;
      transition: background-color 0.15s ease;
    }

    #color-app .cf-color-picker-wrap {
      position: relative; width: 100%; height: 200px; border-radius: 12px;
      overflow: hidden; cursor: crosshair; border: 1px solid var(--c-border);
    }
    #color-app .cf-color-picker-wrap__sat {
      position: absolute; inset: 0;
      background: linear-gradient(to right, #fff 0%, hsl(0,100%,50%) 100%);
    }
    #color-app .cf-color-picker-wrap__hue {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, transparent 0%, #000 100%);
    }
    #color-app .cf-picker-cursor {
      position: absolute; width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.3);
      transform: translate(-50%,-50%); pointer-events: none;
    }
    #color-app .cf-hue-slider {
      width: 100%; height: 18px; border-radius: 9px;
      -webkit-appearance: none; appearance: none;
      background: linear-gradient(to right,
        hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%),
        hsl(90,100%,50%), hsl(120,100%,50%), hsl(150,100%,50%),
        hsl(180,100%,50%), hsl(210,100%,50%), hsl(240,100%,50%),
        hsl(270,100%,50%), hsl(300,100%,50%), hsl(330,100%,50%), hsl(360,100%,50%));
      cursor: pointer; outline: none;
    }
    #color-app .cf-hue-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
      background: #fff; border: 2px solid rgba(0,0,0,0.3);
      box-shadow: 0 1px 4px rgba(0,0,0,0.4); cursor: grab;
    }
    #color-app .cf-native-picker {
      width: 100%; height: 48px; border-radius: 10px; border: 1px solid var(--c-border);
      cursor: pointer; padding: 4px; background: rgba(0,0,0,0.3);
    }
    #color-app .cf-native-picker::-webkit-color-swatch-wrapper { padding: 0; border-radius: 8px; }
    #color-app .cf-native-picker::-webkit-color-swatch { border: none; border-radius: 8px; }

    /* Format Values */
    #color-app .cf-formats { display: flex; flex-direction: column; gap: 12px; }
    #color-app .cf-format-tabs {
      display: flex; gap: 4px; background: var(--c-card);
      border: 1px solid var(--c-border); border-radius: 10px; padding: 4px;
    }
    #color-app .cf-format-tab {
      flex: 1; padding: 7px 4px; border: none; border-radius: 7px;
      background: transparent; color: var(--c-text-sec);
      font-size: 0.8rem; font-weight: 600; font-family: var(--c-mono);
      cursor: pointer; transition: all 0.2s;
    }
    #color-app .cf-format-tab:hover { color: var(--c-text); background: rgba(255,255,255,0.06); }
    #color-app .cf-format-tab.active {
      background: var(--c-accent); color: #fff;
      box-shadow: 0 2px 8px rgba(139,92,246,0.35);
    }
    #color-app .cf-format-values { display: flex; flex-direction: column; gap: 10px; }
    #color-app .cf-field-row {
      display: flex; align-items: center; gap: 8px;
      background: rgba(0,0,0,0.25); border: 1px solid var(--c-border);
      border-radius: 10px; padding: 10px 14px;
      transition: border-color 0.2s;
    }
    #color-app .cf-field-row:focus-within { border-color: var(--c-accent); }
    #color-app .cf-field-label {
      font-family: var(--c-mono); font-size: 0.75rem; font-weight: 600;
      color: var(--c-text-sec); width: 20px; flex-shrink: 0;
    }
    #color-app .cf-field-label.hex { color: var(--c-accent2); }
    #color-app .cf-field-input {
      flex: 1; background: transparent; border: none; outline: none;
      color: var(--c-text); font-family: var(--c-mono); font-size: 0.95rem;
      text-transform: uppercase; width: 100%;
    }
    #color-app .cf-field-slider {
      flex: 1; height: 6px; border-radius: 3px;
      -webkit-appearance: none; appearance: none;
      background: rgba(255,255,255,0.1); cursor: pointer; outline: none;
    }
    #color-app .cf-field-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
      background: #fff; border: 2px solid rgba(0,0,0,0.3);
      box-shadow: 0 1px 3px rgba(0,0,0,0.4); cursor: grab;
    }
    #color-app .cf-field-val {
      font-family: var(--c-mono); font-size: 0.8rem; color: var(--c-text-sec);
      width: 36px; text-align: right; flex-shrink: 0;
    }
    #color-app .cf-copy-btn {
      padding: 6px; border: 1px solid var(--c-border); border-radius: 6px;
      background: transparent; color: var(--c-text-sec); cursor: pointer;
      transition: all 0.2s; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    #color-app .cf-copy-btn:hover { color: var(--c-accent); border-color: var(--c-accent); background: rgba(139,92,246,0.1); }
    #color-app .cf-copy-btn.copied { color: var(--c-success); border-color: var(--c-success); background: rgba(52,211,153,0.1); }

    /* Contrast & Tints */
    #color-app .cf-contrast-section { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    #color-app .cf-contrast-card {
      background: var(--c-card); border: 1px solid var(--c-border);
      border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 10px;
    }
    #color-app .cf-contrast-card__label {
      font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--c-text-sec);
    }
    #color-app .cf-contrast-card__swatch {
      height: 56px; border-radius: 10px; display: flex; align-items: center;
      justify-content: center; font-family: var(--c-mono); font-size: 0.85rem; font-weight: 600;
      transition: background-color 0.15s;
    }
    #color-app .cf-contrast-card__ratio {
      font-size: 1.1rem; font-weight: 700;
    }

    /* History */
    #color-app .cf-history { display: flex; flex-direction: column; gap: 10px; }
    #color-app .cf-history__label {
      font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--c-text-sec);
    }
    #color-app .cf-history__row {
      display: flex; gap: 8px; align-items: center; flex-wrap: wrap;
    }
    #color-app .cf-history__swatch {
      width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--c-border);
      cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; position: relative; overflow: hidden;
    }
    #color-app .cf-history__swatch:hover { transform: scale(1.15); box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
    #color-app .cf-history__swatch__checker {
      position: absolute; inset: 0;
      background-image: linear-gradient(45deg,#1a1a2e 25%,transparent 25%),
        linear-gradient(-45deg,#1a1a2e 25%,transparent 25%),
        linear-gradient(45deg,transparent 75%,#1a1a2e 75%),
        linear-gradient(-45deg,transparent 75%,#1a1a2e 75%);
      background-size: 8px 8px;
      background-position: 0 0,0 4px,4px -4px,-4px 0;
      background-color: #12121e;
    }
    #color-app .cf-history__swatch__color {
      position: absolute; inset: 0;
      transition: background-color 0.15s;
    }
    #color-app .cf-history__swatch__del {
      position: absolute; top: -4px; right: -4px; width: 14px; height: 14px;
      border-radius: 50%; background: #ef4444; border: none; cursor: pointer;
      display: none; align-items: center; justify-content: center;
      font-size: 8px; color: #fff; line-height: 1;
    }
    #color-app .cf-history__swatch:hover .cf-history__swatch__del { display: flex; }

    #color-app .cf-hidden { display: none !important; }
  `;

  const html = `
    <div id="color-app-inner">
      <header class="cf-header">
        <h1>Color Format Converter</h1>
        <p>HEX · RGB · HSL · HSV 即時轉換</p>
      </header>

      <div class="cf-main">
        <!-- Left: Picker -->
        <div class="cf-picker-col">
          <div class="cf-swatch-preview" id="cf-swatch">
            <div class="cf-swatch-preview__checker"></div>
            <div class="cf-swatch-preview__color" id="cf-swatch-color"></div>
          </div>

          <div class="cf-color-picker-wrap" id="cf-picker-wrap">
            <div class="cf-color-picker-wrap__sat" id="cf-sat"></div>
            <div class="cf-color-picker-wrap__hue" id="cf-val"></div>
            <div class="cf-picker-cursor" id="cf-cursor"></div>
          </div>

          <input type="range" class="cf-hue-slider" id="cf-hue" min="0" max="360" value="270">

          <input type="color" class="cf-native-picker" id="cf-native" value="#8b5cf6">

          <div class="cf-history">
            <div class="cf-history__label">最近使用</div>
            <div class="cf-history__row" id="cf-history-row"></div>
          </div>
        </div>

        <!-- Right: Formats -->
        <div class="cf-formats">
          <div class="cf-format-tabs">
            <button class="cf-format-tab active" data-format="hex">HEX</button>
            <button class="cf-format-tab" data-format="rgb">RGB</button>
            <button class="cf-format-tab" data-format="hsl">HSL</button>
            <button class="cf-format-tab" data-format="hsv">HSV</button>
          </div>

          <div class="cf-format-values" id="cf-fields">
            <!-- Dynamic fields injected here -->
          </div>

          <div class="cf-contrast-section">
            <div class="cf-contrast-card">
              <div class="cf-contrast-card__label">與白色對比</div>
              <div class="cf-contrast-card__swatch" id="cf-c1-swatch" style="color:#fff">Aa</div>
              <div class="cf-contrast-card__ratio" id="cf-c1-ratio"></div>
            </div>
            <div class="cf-contrast-card">
              <div class="cf-contrast-card__label">與黑色對比</div>
              <div class="cf-contrast-card__swatch" id="cf-c2-swatch" style="color:#000">Aa</div>
              <div class="cf-contrast-card__ratio" id="cf-c2-ratio"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const appContainer = document.getElementById('color-app');
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  appContainer.appendChild(styleEl);
  appContainer.insertAdjacentHTML('beforeend', html);

  const app = appContainer;

  // ── State ──────────────────────────────────────────────
  let current = { h: 270, s: 100, v: 90, a: 1 }; // HSV
  let currentFormat = 'hex';
  const MAX_HISTORY = 16;

  // ── DOM refs ───────────────────────────────────────────
  const $ = sel => app.querySelector(sel);
  const $$ = sel => app.querySelectorAll(sel);

  const pickerWrap = $('cf-picker-wrap');
  const satEl = $('cf-sat');
  const valEl = $('cf-val');
  const cursor = $('cf-cursor');
  const hueSlider = $('cf-hue');
  const nativePicker = $('cf-native');
  const swatchColor = $('cf-swatch-color');
  const fieldsEl = $('cf-fields');
  const historyRow = $('cf-history-row');

  // ── Color Math ────────────────────────────────────────
  function hsvToRgb(h, s, v) {
    s /= 100; v /= 100;
    const hn = ((h % 360) + 360) % 360;
    const c = v * s;
    const x = c * (1 - Math.abs((hn / 60) % 2 - 1));
    const m = v - c;
    let r, g, b;
    if (hn < 60)       { r=c; g=x; b=0; }
    else if (hn < 120) { r=x; g=c; b=0; }
    else if (hn < 180) { r=0; g=c; b=x; }
    else if (hn < 240) { r=0; g=x; b=c; }
    else if (hn < 300) { r=x; g=0; b=c; }
    else               { r=c; g=0; b=x; }
    return { r: Math.round((r+m)*255), g: Math.round((g+m)*255), b: Math.round((b+m)*255) };
  }

  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    const d = max - min;
    let h = 0, s = max === 0 ? 0 : (d/max)*100;
    if (d !== 0) {
      if (max === r)       h = ((g-b)/d + (g<b?6:0)) * 60;
      else if (max === g)  h = ((b-r)/d + 2) * 60;
      else                 h = ((r-g)/d + 4) * 60;
    }
    return { h: Math.round(h), s: Math.round(s), v: Math.round(max*100) };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    const l = (max+min)/2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      if (max === r)       h = ((g-b)/d + (g<b?6:0)) * 60;
      else if (max === g)  h = ((b-r)/d + 2) * 60;
      else                 h = ((r-g)/d + 4) * 60;
    }
    return { h: Math.round(h), s: Math.round(s*100), l: Math.round(l*100) };
  }

  function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    if (s === 0) { const v = Math.round(l*255); return {r:v,g:v,b:v}; }
    const q = l < 0.5 ? l*(1+s) : l+s-l*s;
    const p = 2*l-q;
    const h2r = (p,q,t) => {
      if (t<0) t+=1; if (t>1) t-=1;
      if (t<1/6) return p+(q-p)*6*t;
      if (t<1/2) return q;
      if (t<2/3) return p+(q-p)*(2/3-t)*6;
      return p;
    };
    return {
      r: Math.round(h2r(p,q,h+1/3)*255),
      g: Math.round(h2r(p,q,h)*255),
      b: Math.round(h2r(p,q,h-1/3)*255)
    };
  }

  function rgbToHex(r, g, b) {
    return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('').toUpperCase();
  }

  function hexToRgb(hex) {
    hex = hex.replace('#','');
    if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
    const n = parseInt(hex, 16);
    return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
  }

  function lumin(r,g,b) {
    const a=[r,g,b].map(v=>{ v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4); });
    return a[0]*0.2126+a[1]*0.7152+a[2]*0.0722;
  }

  function contrastRatio(rgb1, rgb2) {
    const l1 = lumin(rgb1.r,rgb1.g,rgb1.b);
    const l2 = lumin(rgb2.r,rgb2.g,rgb2.b);
    const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (lighter + 0.05) / (darker + 0.05);
  }

  // ── Format Strings ────────────────────────────────────
  function toHex() { const {r,g,b} = hsvToRgb(current.h,current.s,current.v); return rgbToHex(r,g,b); }
  function toRgb() { const {r,g,b} = hsvToRgb(current.h,current.s,current.v); return `rgb(${r}, ${g}, ${b})`; }
  function toRgba() { const {r,g,b} = hsvToRgb(current.h,current.s,current.v); return `rgba(${r}, ${g}, ${b}, ${current.a})`; }
  function toHsl() { const rgb = hsvToRgb(current.h,current.s,current.v); const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b); return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`; }
  function toHsla() { const rgb = hsvToRgb(current.h,current.s,current.v); const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b); return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${current.a})`; }
  function toHsv() { return `hsv(${current.h}, ${current.s}%, ${current.v}%)`; }

  // ── Picker ───────────────────────────────────────────
  function updatePickerVisual() {
    const {h,s,v} = current;
    satEl.style.background = `linear-gradient(to right, #fff 0%, hsl(${h},100%,50%) 100%)`;
    valEl.style.background = `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,${v/100}) 100%)`;
    cursor.style.left = `${s}%`;
    cursor.style.top = `${100-v}%`;
    cursor.style.backgroundColor = `hsl(${h},${s}%,${v/2}%)`;
  }

  function updateSwatch() {
    const {h,s,v} = current;
    const {r,g,b} = hsvToRgb(h,s,v);
    swatchColor.style.backgroundColor = `rgb(${r},${g},${b})`;
    nativePicker.value = rgbToHex(r,g,b);
  }

  function updateHueSlider() {
    const {h} = current;
    hueSlider.value = h;
  }

  function updateContrast() {
    const rgb = hsvToRgb(current.h, current.s, current.v);
    const white = {r:255,g:255,b:255};
    const black = {r:0,g:0,b:0};
    const cr1 = contrastRatio(rgb, white);
    const cr2 = contrastRatio(rgb, black);
    const c1swatch = $('cf-c1-swatch');
    const c2swatch = $('cf-c2-swatch');
    const rgbStr = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    c1swatch.style.backgroundColor = rgbStr;
    c2swatch.style.backgroundColor = rgbStr;
    $('cf-c1-ratio').textContent = cr1.toFixed(2) + ' : 1';
    $('cf-c2-ratio').textContent = cr2.toFixed(2) + ' : 1';
    $('cf-c1-ratio').style.color = cr1 >= 4.5 ? 'var(--c-success)' : cr1 >= 3 ? '#fbbf24' : '#ef4444';
    $('cf-c2-ratio').style.color = cr2 >= 4.5 ? 'var(--c-success)' : cr2 >= 3 ? '#fbbf24' : '#ef4444';
  }

  function updateCursorFromHsv() {
    cursor.style.left = `${current.s}%`;
    cursor.style.top = `${100-current.v}%`;
    cursor.style.backgroundColor = `hsl(${current.h},${current.s}%,${current.v/2}%)`;
  }

  function fullUpdate() {
    updatePickerVisual();
    updateSwatch();
    updateHueSlider();
    updateContrast();
    renderFields(currentFormat, false);
    updateUrlHash();
  }

  // ── Field Rendering ──────────────────────────────────
  function renderFields(fmt, focusInput) {
    const {h,s,v} = current;
    const rgb = hsvToRgb(h,s,v);
    const hsl = rgbToHsl(rgb.r,rgb.g,rgb.b);
    const alpha = current.a;

    const sliderBg = (hval, sval, vval, dim) => {
      if (dim === 's') return `linear-gradient(to right, hsl(${hval},0%,${vval}%) 0%, hsl(${hval},100%,${vval}%) 100%)`;
      if (dim === 'v') return `linear-gradient(to right, #000 0%, hsl(${hval},${sval}%,50%) 100%)`;
      if (dim === 'h') {
        return `linear-gradient(to right, hsl(0,${sval}%,${vval}%), hsl(60,${sval}%,${vval}%), hsl(120,${sval}%,${vval}%), hsl(180,${sval}%,${vval}%), hsl(240,${sval}%,${vval}%), hsl(300,${sval}%,${vval}%), hsl(360,${sval}%,${vval}%))`;
      }
      return '';
    };

    let fields = '';

    if (fmt === 'hex') {
      const hex = rgbToHex(rgb.r,rgb.g,rgb.b);
      fields = `
        <div class="cf-field-row">
          <span class="cf-field-label hex">#</span>
          <input class="cf-field-input" id="cf-f0" value="${hex.slice(1)}" maxlength="6" spellcheck="false">
          <button class="cf-copy-btn" id="cf-copy-hex" title="Copy HEX">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M9.5 4.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v5A1.5 1.5 0 0 0 3 9.5H4.5" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">A</span>
          <input type="range" class="cf-field-slider" id="cf-fa" min="0" max="100" value="${Math.round(alpha*100)}"
            style="background: linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b},0), rgb(${rgb.r},${rgb.g},${rgb.b}))">
          <span class="cf-field-val" id="cf-fa-val">${Math.round(alpha*100)}%</span>
        </div>`;
    } else if (fmt === 'rgb') {
      fields = `
        <div class="cf-field-row">
          <span class="cf-field-label">R</span>
          <input type="range" class="cf-field-slider" id="cf-fr" min="0" max="255" value="${rgb.r}"
            style="background: linear-gradient(to right, rgb(0,${rgb.g},${rgb.b}), rgb(255,${rgb.g},${rgb.b}))">
          <input class="cf-field-input" id="cf-fr-i" value="${rgb.r}" maxlength="3" style="width:48px;text-align:right">
          <span class="cf-field-val" id="cf-fr-val">${rgb.r}</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">G</span>
          <input type="range" class="cf-field-slider" id="cf-fg" min="0" max="255" value="${rgb.g}"
            style="background: linear-gradient(to right, rgb(${rgb.r},0,${rgb.b}), rgb(${rgb.r},255,${rgb.b}))">
          <input class="cf-field-input" id="cf-fg-i" value="${rgb.g}" maxlength="3" style="width:48px;text-align:right">
          <span class="cf-field-val" id="cf-fg-val">${rgb.g}</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">B</span>
          <input type="range" class="cf-field-slider" id="cf-fb" min="0" max="255" value="${rgb.b}"
            style="background: linear-gradient(to right, rgb(${rgb.r},${rgb.g},0), rgb(${rgb.r},${rgb.g},255))">
          <input class="cf-field-input" id="cf-fb-i" value="${rgb.b}" maxlength="3" style="width:48px;text-align:right">
          <span class="cf-field-val" id="cf-fb-val">${rgb.b}</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">A</span>
          <input type="range" class="cf-field-slider" id="cf-fa" min="0" max="100" value="${Math.round(alpha*100)}"
            style="background: linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b},0), rgba(${rgb.r},${rgb.g},${rgb.b},1))">
          <span class="cf-field-val" id="cf-fa-val">${Math.round(alpha*100)}%</span>
        </div>`;
    } else if (fmt === 'hsl') {
      fields = `
        <div class="cf-field-row">
          <span class="cf-field-label">H</span>
          <input type="range" class="cf-field-slider" id="cf-fh" min="0" max="360" value="${hsl.h}"
            style="background: ${sliderBg(hsl.h,100,50,'h')}">
          <span class="cf-field-val" id="cf-fh-val">${hsl.h}°</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">S</span>
          <input type="range" class="cf-field-slider" id="cf-fs" min="0" max="100" value="${hsl.s}"
            style="background: linear-gradient(to right, hsl(${hsl.h},0%,${hsl.l}%), hsl(${hsl.h},100%,${hsl.l}%))">
          <span class="cf-field-val" id="cf-fs-val">${hsl.s}%</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">L</span>
          <input type="range" class="cf-field-slider" id="cf-fl" min="0" max="100" value="${hsl.l}"
            style="background: linear-gradient(to right, #000, hsl(${hsl.h},${hsl.s}%,50%), #fff)">
          <span class="cf-field-val" id="cf-fl-val">${hsl.l}%</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">A</span>
          <input type="range" class="cf-field-slider" id="cf-fa" min="0" max="100" value="${Math.round(alpha*100)}"
            style="background: linear-gradient(to right, hsla(${hsl.h},${hsl.s}%,${hsl.l}%,0), hsla(${hsl.h},${hsl.s}%,${hsl.l}%,1))">
          <span class="cf-field-val" id="cf-fa-val">${Math.round(alpha*100)}%</span>
        </div>`;
    } else if (fmt === 'hsv') {
      fields = `
        <div class="cf-field-row">
          <span class="cf-field-label">H</span>
          <input type="range" class="cf-field-slider" id="cf-fh" min="0" max="360" value="${h}"
            style="background: ${sliderBg(h,100,50,'h')}">
          <span class="cf-field-val" id="cf-fh-val">${h}°</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">S</span>
          <input type="range" class="cf-field-slider" id="cf-fs" min="0" max="100" value="${s}"
            style="background: linear-gradient(to right, hsl(${h},0%,${v}%), hsl(${h},100%,${v}%))">
          <span class="cf-field-val" id="cf-fs-val">${s}%</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">V</span>
          <input type="range" class="cf-field-slider" id="cf-fv" min="0" max="100" value="${v}"
            style="background: linear-gradient(to right, #000, hsl(${h},${s}%,50%))">
          <span class="cf-field-val" id="cf-fv-val">${v}%</span>
        </div>
        <div class="cf-field-row">
          <span class="cf-field-label">A</span>
          <input type="range" class="cf-field-slider" id="cf-fa" min="0" max="100" value="${Math.round(alpha*100)}"
            style="background: linear-gradient(to right, hsva(${h},${s}%,${v}%,0), hsva(${h},${s}%,${v}%,1))">
          <span class="cf-field-val" id="cf-fa-val">${Math.round(alpha*100)}%</span>
        </div>`;
    }

    fieldsEl.innerHTML = fields;
    attachFieldListeners(fmt, focusInput);
  }

  function attachFieldListeners(fmt, focusInput) {
    const copyHex = $('cf-copy-hex');
    if (copyHex) {
      copyHex.addEventListener('click', () => {
        const hex = toHex();
        navigator.clipboard.writeText(hex).then(() => {
          copyHex.classList.add('copied');
          setTimeout(() => copyHex.classList.remove('copied'), 1200);
        });
      });
    }

    const fa = $('cf-fa');
    if (fa) {
      fa.addEventListener('input', e => {
        current.a = parseInt(e.target.value) / 100;
        $('cf-fa-val').textContent = e.target.value + '%';
        updateSwatch();
        updateContrast();
        updateUrlHash();
      });
    }

    if (fmt === 'hex') {
      const fi = $('cf-f0');
      if (fi) {
        fi.addEventListener('input', e => {
          let v = e.target.value.replace(/[^0-9A-Fa-f]/g,'').slice(0,6);
          e.target.value = v.toUpperCase();
          if (v.length === 6) {
            const rgb = hexToRgb(v);
            const hsv = rgbToHsv(rgb.r,rgb.g,rgb.b);
            current = { ...current, h: hsv.h, s: hsv.s, v: hsv.v };
            fullUpdate();
          }
        });
        if (focusInput) fi.focus();
      }
    } else if (fmt === 'rgb') {
      ['fr','fg','fb'].forEach(id => {
        const slider = $(`cf-${id}`);
        const input = $(`cf-${id}-i`);
        const val = $(`cf-${id}-val`);
        if (!slider || !input || !val) return;
        const channel = id[1]; // r,g,b
        const update = (val, src) => {
          const v = Math.max(0, Math.min(255, parseInt(val) || 0));
          if (src === 'slider') { input.value = v; val.textContent = v; }
          else { slider.value = v; val.textContent = v; }
          const rgb = { r: parseInt($('cf-fr-i').value)||0, g: parseInt($('cf-fg-i').value)||0, b: parseInt($('cf-fb-i').value)||0 };
          const hsv = rgbToHsv(rgb.r,rgb.g,rgb.b);
          current = { ...current, h: hsv.h, s: hsv.s, v: hsv.v };
          updatePickerVisual();
          updateSwatch();
          updateContrast();
          updateUrlHash();
        };
        slider.addEventListener('input', e => update(e.target.value, 'slider'));
        input.addEventListener('input', e => update(e.target.value, 'input'));
      });
    } else if (fmt === 'hsl') {
      ['fh','fs','fl'].forEach(id => {
        const slider = $(`cf-${id}`);
        const val = $(`cf-${id}-val`);
        if (!slider || !val) return;
        const max = id === 'fh' ? 360 : 100;
        const unit = id === 'fh' ? '°' : '%';
        const update = v => {
          const n = Math.max(0, Math.min(max, parseInt(v)||0));
          slider.value = n; val.textContent = n + unit;
          const hsl = { h: parseInt($('cf-fh').value)||0, s: parseInt($('cf-fs').value)||0, l: parseInt($('cf-fl').value)||0 };
          const rgb = hslToRgb(hsl.h,hsl.s,hsl.l);
          const hsv = rgbToHsv(rgb.r,rgb.g,rgb.b);
          current = { ...current, h: hsv.h, s: hsv.s, v: hsv.v };
          updatePickerVisual();
          updateSwatch();
          updateContrast();
          updateUrlHash();
        };
        slider.addEventListener('input', e => update(e.target.value));
      });
    } else if (fmt === 'hsv') {
      ['fh','fs','fv'].forEach(id => {
        const slider = $(`cf-${id}`);
        const val = $(`cf-${id}-val`);
        if (!slider || !val) return;
        const max = id === 'fh' ? 360 : 100;
        const unit = id === 'fh' ? '°' : '%';
        const update = v => {
          const n = Math.max(0, Math.min(max, parseInt(v)||0));
          slider.value = n; val.textContent = n + unit;
          current = { ...current, [id[1] === 'h' ? 'h' : id[1] === 's' ? 's' : 'v']: n };
          updateCursorFromHsv();
          updateSwatch();
          updateHueSlider();
          updateContrast();
          updateUrlHash();
        };
        slider.addEventListener('input', e => update(e.target.value));
      });
    }
  }

  // ── Picker Drag ──────────────────────────────────────
  function pickerFromEvent(e) {
    const rect = pickerWrap.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const s = Math.round(x * 100);
    const v = Math.round((1 - y) * 100);
    current = { ...current, s, v };
    fullUpdate();
    saveToHistory();
  }

  let pickerDrag = false;
  pickerWrap.addEventListener('mousedown', e => { pickerDrag = true; pickerFromEvent(e); });
  document.addEventListener('mousemove', e => { if (pickerDrag) pickerFromEvent(e); });
  document.addEventListener('mouseup', () => { if (pickerDrag) { pickerDrag = false; saveToHistory(); } });

  // ── Hue Slider ───────────────────────────────────────
  hueSlider.addEventListener('input', e => {
    current = { ...current, h: parseInt(e.target.value) };
    fullUpdate();
  });
  hueSlider.addEventListener('change', () => saveToHistory());

  // ── Native Picker ────────────────────────────────────
  nativePicker.addEventListener('input', e => {
    const hex = e.target.value;
    const rgb = hexToRgb(hex);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    current = { ...current, h: hsv.h, s: hsv.s, v: hsv.v };
    fullUpdate();
  });
  nativePicker.addEventListener('change', () => saveToHistory());

  // ── Format Tabs ───────────────────────────────────────
  $$('.cf-format-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.cf-format-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFormat = tab.dataset.format;
      renderFields(currentFormat, false);
    });
  });

  // ── History ───────────────────────────────────────────
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem('cf-history') || '[]'); }
    catch { return []; }
  }

  function saveHistory(hist) {
    localStorage.setItem('cf-history', JSON.stringify(hist));
  }

  function saveToHistory() {
    const rgb = hsvToRgb(current.h, current.s, current.v);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    let hist = loadHistory().filter(h => h !== hex);
    hist.unshift(hex);
    hist = hist.slice(0, MAX_HISTORY);
    saveHistory(hist);
    renderHistory(hist);
  }

  function renderHistory(hist) {
    historyRow.innerHTML = hist.map((hex, i) => `
      <div class="cf-history__swatch" data-hex="${hex}" title="${hex}">
        <div class="cf-history__swatch__checker"></div>
        <div class="cf-history__swatch__color" style="background:${hex}"></div>
        <button class="cf-history__swatch__del" data-idx="${i}">×</button>
      </div>
    `).join('');

    historyRow.querySelectorAll('.cf-history__swatch').forEach(swatch => {
      swatch.addEventListener('click', e => {
        if (e.target.classList.contains('cf-history__swatch__del')) {
          const idx = parseInt(e.target.dataset.idx);
          let hist = loadHistory();
          hist.splice(idx, 1);
          saveHistory(hist);
          renderHistory(hist);
          return;
        }
        const hex = swatch.dataset.hex;
        const rgb = hexToRgb(hex);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        current = { ...current, h: hsv.h, s: hsv.s, v: hsv.v };
        fullUpdate();
      });
    });
  }

  // ── URL Hash ──────────────────────────────────────────
  function updateUrlHash() {
    const rgb = hsvToRgb(current.h, current.s, current.v);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    history.replaceState(null, '', '#' + hex);
  }

  function loadFromHash() {
    const hash = location.hash.slice(1);
    if (/^[0-9A-Fa-f]{6}$/.test(hash)) {
      const rgb = hexToRgb(hash);
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      current = { ...current, h: hsv.h, s: hsv.s, v: hsv.v };
    }
  }

  // ── Init ──────────────────────────────────────────────
  loadFromHash();
  fullUpdate();
  renderHistory(loadHistory());

  // Initial render for fields
  renderFields(currentFormat, false);
})();
