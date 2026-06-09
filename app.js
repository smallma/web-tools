/* ========================================
   App Navigation & Tool Switching
   ======================================== */
(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const navItems = Array.from(document.querySelectorAll('.nav-item[data-tool]'));
  const panels = Array.from(document.querySelectorAll('.tool-panel'));
  const mainContent = document.getElementById('main-content');

  function getNavLabel(item) {
    return item.querySelector('.nav-item__label')?.textContent?.trim() || item.dataset.tool;
  }

  function ensureLiveRegion() {
    let region = document.getElementById('app-live-region');
    if (region) {
      return region;
    }

    region = document.createElement('div');
    region.id = 'app-live-region';
    region.className = 'sr-only';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    document.body.appendChild(region);
    return region;
  }

  function announce(message) {
    const region = ensureLiveRegion();
    region.textContent = '';
    window.requestAnimationFrame(() => {
      region.textContent = message;
    });
  }

  function hasLinkedLabel(el) {
    if (el.id) {
      const cssId = window.CSS && typeof window.CSS.escape === 'function' ? window.CSS.escape(el.id) : el.id;
      if (document.querySelector(`label[for="${cssId}"]`)) {
        return true;
      }
    }
    return Boolean(el.closest('label'));
  }

  function inferControlLabel(el, panelLabel, index) {
    if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) {
      return null;
    }
    if (hasLinkedLabel(el)) {
      return null;
    }

    if (el.type === 'range') {
      return `${panelLabel} 滑桿 ${index}`;
    }
    if (el.type === 'color') {
      return `${panelLabel} 顏色選擇 ${index}`;
    }
    if (el.type === 'text' || el.tagName === 'TEXTAREA') {
      return `${panelLabel} 文字輸入 ${index}`;
    }
    if (el.tagName === 'SELECT') {
      return `${panelLabel} 選項 ${index}`;
    }
    if (el.tagName === 'BUTTON') {
      const txt = el.textContent.trim();
      return txt ? `${panelLabel} ${txt}` : `${panelLabel} 按鈕 ${index}`;
    }
    return `${panelLabel} 控制項 ${index}`;
  }

  function enhancePanelA11y(panel, panelLabel) {
    const controls = panel.querySelectorAll('button, input, select, textarea');
    controls.forEach((control, idx) => {
      const label = inferControlLabel(control, panelLabel, idx + 1);
      if (label) {
        control.setAttribute('aria-label', label);
      }

      if (control instanceof HTMLInputElement && control.type === 'range') {
        control.setAttribute('aria-valuemin', control.min || '0');
        control.setAttribute('aria-valuemax', control.max || '100');
        control.setAttribute('aria-valuenow', control.value);
        control.addEventListener('input', () => {
          control.setAttribute('aria-valuenow', control.value);
        });
      }
    });
  }

  // ── Sidebar toggle ────────────────────
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // ── Tool switching ────────────────────
  function activateTool(toolId, options = {}) {
    const { moveFocus = false, announceChange = true } = options;
    let activeLabel = toolId;

    // Update nav items
    navItems.forEach((item) => {
      const isActive = item.dataset.tool === toolId;
      item.classList.toggle('nav-item--active', isActive);
      item.setAttribute('aria-selected', String(isActive));
      item.setAttribute('tabindex', isActive ? '0' : '-1');
      item.title = getNavLabel(item);
      if (isActive) {
        activeLabel = getNavLabel(item);
        if (moveFocus) {
          item.focus();
        }
      }
    });

    // Update panels
    panels.forEach((panel) => {
      const isActive = panel.id === `panel-${toolId}`;
      panel.classList.toggle('hidden', !isActive);
      panel.toggleAttribute('hidden', !isActive);
      panel.setAttribute('aria-hidden', String(!isActive));
      if (isActive) {
        panel.setAttribute('tabindex', '0');
        enhancePanelA11y(panel, activeLabel);
      } else {
        panel.removeAttribute('tabindex');
      }
    });

    mainContent.setAttribute('aria-label', `工具面板：${activeLabel}`);

    // Save last used tool
    try {
      localStorage.setItem('devtools-active', toolId);
    } catch (_) {}

    if (announceChange) {
      announce(`已切換到 ${activeLabel}`);
    }
  }

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      activateTool(item.dataset.tool, { moveFocus: false, announceChange: true });
    });

    item.addEventListener('keydown', (event) => {
      const currentIndex = navItems.indexOf(item);
      if (currentIndex === -1) {
        return;
      }

      const goToIndex = (nextIndex) => {
        const target = navItems[nextIndex];
        if (!target) {
          return;
        }
        activateTool(target.dataset.tool, { moveFocus: true, announceChange: true });
      };

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        goToIndex((currentIndex + 1) % navItems.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        goToIndex((currentIndex - 1 + navItems.length) % navItems.length);
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToIndex(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goToIndex(navItems.length - 1);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateTool(item.dataset.tool, { moveFocus: true, announceChange: true });
      }
    });
  });

  // ── Restore last tool ─────────────────
  function init() {
    let lastTool = 'ada-contrast';
    try {
      lastTool = localStorage.getItem('devtools-active') || 'ada-contrast';
    } catch (_) {}

    // Ensure the saved tool exists
    const exists = navItems.some((i) => i.dataset.tool === lastTool);
    activateTool(exists ? lastTool : 'ada-contrast', { moveFocus: false, announceChange: false });
  }

  init();
})();
