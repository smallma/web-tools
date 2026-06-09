# Dev Tools Hub — 可用性與無障礙優化紀錄

## 專案結構

```
index.html        — 主頁面（tab 導覽 + tabpanel 容器）
style.css         — 全域樣式（token、layout、a11y utilities）
app.js            — tab 切換邏輯、鍵盤操作、自動 ARIA 增強
tools/*.js        — 各工具面板（自含 CSS + HTML + JS）
```

---

## ✅ 已完成（第一輪：全域層）

### index.html
- [x] 修正側欄 nav：`role="tablist"` + `aria-orientation="vertical"`
- [x] 每個 nav-item 補上 `id="tab-xxx"`、`aria-controls="panel-xxx"`、`tabindex`
- [x] 修掉原始 HTML 中多餘殘留標籤（box-shadow 後面多了一個 `</button>` 前的孤立 badge）
- [x] 每個 tabpanel 補 `aria-labelledby="tab-xxx"` + `hidden` attribute
- [x] 每個 panel 內加 `<h2 class="sr-only">` 隱藏標題
- [x] 加入 skip-link `<a class="skip-link" href="#main-content">`
- [x] 加入 `<h1 class="sr-only">` 頁面主標題
- [x] `<main>` 補 `aria-label`

### style.css
- [x] 提升 `--text-secondary` 對比（`#8888a0` → `#d0d3ea`）
- [x] 提升 `--text-muted` 對比（`#55556a` → `#aab0cc`）
- [x] 提升 `--border-color` 可見度（opacity 0.07 → 0.16）
- [x] badge 顏色提升（`#c4b5fd` → `#f1ebff`）
- [x] 新增 `.sr-only` utility
- [x] 新增 `.skip-link` + `:focus` 顯示
- [x] 新增全域 `*:focus-visible` 高亮（白色 outline + 藍色 box-shadow）
- [x] 側欄 nav 改為 `overflow-y: auto`（長清單可捲動）
- [x] tool-panel 加 `padding-bottom: 24px`
- [x] 新增 `@media (prefers-reduced-motion: reduce)` 關閉動畫

### app.js
- [x] 改用 roving tabindex 模式（active tab = 0，其餘 = -1）
- [x] 支援 ArrowUp/ArrowDown/Home/End/Enter/Space 鍵盤切換
- [x] 切換時同步 `aria-selected`、`aria-hidden`、`hidden` attribute
- [x] 新增 `aria-live="polite"` region，切換工具時語音通知
- [x] `enhancePanelA11y()`：對面板內無標記控制項自動補 `aria-label`
- [x] 對所有 `input[type=range]` 自動補 `aria-valuemin/max/now` 並監聽 input 事件即時更新
- [x] 各 nav-item 加 `title` tooltip（collapsed 狀態也能辨識）

---

## ✅ 已完成（第二輪：逐工具精修）

目標：讓每個 tab 內部的控制項也符合 WCAG 2.1 AA，且好用。**13 個工具全數完成，已用 Playwright（系統 Chrome）逐 tab 驗證：全部正常渲染、零 JS 錯誤。**

### 處理方式
- **設計層重做（5 個）**：text-shadow、color-format、glassmorphism、gradient-advanced、linear-gradient
- **a11y + 痛點微調（8 個）**：ada-contrast、box-shadow、filter、transform、flexbox-grid、border-radius、border、typography-scale
- 統一設計語言：`--c-text-sec` 一律提升至 `#aab0cc`（對比 AA）、h1 漸層標題、`280px 1fr` grid、複製鈕 `.copied` + `role="status" aria-live`、clipboard 失敗 fallback `execCommand`。

### 驗證中發現並修復的 Bug（非計畫內）
- **color-format.js**：原掛載點寫死 `color-app`，重做時誤改成 `color-format-app` → 修回 `color-app`（對齊 index.html）。另修了原本就存在的 init 順序 bug（事件綁定在 DOM 掛載前執行）。
- **flexbox-grid.js**：`init()` 用 `$id('fg-controls').innerHTML = ...` 覆寫整個容器，把內部的 `fg-count` 一起清掉，導致 `addEventListener` 抓到 null 報錯 → 改為只覆寫 `#fg-container-ctrl` 子容器。

### 各工具重點改動

#### P1（高影響）

#### tools/ada-contrast.js
- [x] color picker `input[type=color]` 加語義化 `aria-label`（如「前景色」「背景色」）
- [x] hex 文字輸入加 `<label>` 或 `aria-label`
- [x] 結果區加 `role="status" aria-live="polite"`，比例變動時通知螢幕閱讀器
- [x] slider 加可讀 label（目前只有視覺標籤）
- [x] 評估 preview 區塊是否需要 `role="img" aria-label`

#### tools/color-format.js
- [x] 每個色彩格式欄位加 `aria-label`（如「紅色通道」「色相」）
- [x] 複製按鈕加 `aria-label="複製 HEX 值"`；複製後改為 `aria-label="已複製"`
- [x] 對比度結果區加 `aria-live`
- [x] 自訂色彩選取器（cf-picker）加鍵盤操作（目前只能滑鼠拖曳）

#### tools/text-shadow.js
- [x] **移除 `prompt()` 對話框**，改用 inline input 編輯圖層名稱
- [x] 每個圖層加 `aria-label="陰影圖層 N"`
- [x] 刪除按鈕加 `aria-label="刪除圖層 N"`
- [x] 考慮拖拽排序加 aria-grabbed / aria-dropeffect 或用 live region 回報

### P2（中影響）

#### tools/flexbox-grid.js
- [x] item count input 加 label
- [x] Flex/Grid 切換 tab 同步 `aria-selected`
- [x] 預覽區加 `role="region" aria-label="佈局預覽"`
- [x] 確保所有 select/option 有合理 label

#### tools/border-radius.js
- [x] 四角滑桿各加語義 label（左上、右上、左下、右下）
- [x] 鏈結鎖按鈕加 `aria-pressed` 狀態
- [x] 預覽區加 `role="img" aria-label`

#### tools/glassmorphism.js
- [x] 每個效果滑桿加描述性 label（模糊、透明度、邊框⋯）
- [x] 背景選擇按鈕加 `aria-label`

#### tools/filter.js
- [x] 預覽圖片 alt 改為描述性（包含當前 filter 值）
- [x] preset 按鈕加 `aria-label="預設：[名稱]"`
- [x] 所有 slider 加 label 關聯

### P3（低影響）

#### tools/border.js
- [x] select 加 label
- [x] 各方向 input 加語義描述

#### tools/gradient-advanced.js
- [x] 色標 stop 加 `aria-label="色標 N: #色碼 位置%"`
- [x] 刪除色標加 `aria-label`
- [x] preset 加 `aria-label`

#### tools/linear-gradient.js
- [x] 內部 tab 補 `aria-selected` 同步
- [x] 色標拖曳區加鍵盤替代操作

#### tools/box-shadow.js
- [x] 圖層列表加 aria-label
- [x] 圖層新增/刪除按鈕加語義

#### tools/typography-scale.js
- [x] select 與 input 加 label
- [x] 輸出文字樣式加 `role="region"`

#### tools/transform.js
- [x] 各滑桿加語義 label（rotateX、translateY⋯）
- [x] reset 按鈕加 `aria-label`

---

## 🎨 對比度備忘

| Token | 舊值 | 新值 | 對比（vs #0b0b10） |
|-------|------|------|-------------------|
| --text-primary | #f0f0f5 | #f3f5ff | ~18:1 ✅ |
| --text-secondary | #8888a0 | #d0d3ea | ~11:1 ✅ |
| --text-muted | #55556a | #aab0cc | ~7.5:1 ✅ |
| badge color | #c4b5fd | #f1ebff | ~15:1 ✅ |

所有文字 token 均通過 WCAG 2.1 AA（最低 4.5:1 for normal text）。

---

## 技術筆記

- **自動 ARIA 增強**：`app.js` 的 `enhancePanelA11y()` 會在每次切換 tab 時掃描 active panel 內所有控制項，對缺少 label 的元素自動補上 `aria-label`。因此即使工具檔案本身未修改，螢幕閱讀器也能有基本可用性。
- **鍵盤操作模型**：採用 WAI-ARIA Authoring Practices 的 vertical tablist roving tabindex 模式。
- **reduced-motion**：全域 `prefers-reduced-motion: reduce` 媒體查詢會關閉所有動畫與過渡。
- **工具檔格式**：每個 `tools/*.js` 都是 IIFE，內含 CSS（用 `<style>` 注入）+ HTML（用 `innerHTML` 注入）+ JS 邏輯。修改時需注意不要破壞既有的 scoped CSS selector。
