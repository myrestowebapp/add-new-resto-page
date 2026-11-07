/* ==========================================================
   theme.js — light / dark / system theme switch (additive file)
   Does not touch any function in script.js.
   - Applied in <head> before first paint to avoid a flash.
   - The choice is remembered in localStorage (wrapped in try/catch).
   ========================================================== */
(function () {
  var KEY = 'ixpos-theme';           // 'light' | 'dark' | 'system'
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function stored() {
    try { return localStorage.getItem(KEY) || 'system'; } catch (e) { return 'system'; }
  }
  function resolve(choice) {
    if (choice === 'light' || choice === 'dark') return choice;
    return media && media.matches ? 'dark' : 'light';
  }
  function apply(choice) {
    root.setAttribute('data-theme', resolve(choice));
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.themeChoice === choice));
    });
  }

  apply(stored());                    // runs immediately (script is loaded in <head>)

  if (media && media.addEventListener) {
    media.addEventListener('change', function () {
      if (stored() === 'system') apply('system');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(stored());                  // mark the active toggle button now that it exists
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var choice = btn.dataset.themeChoice;
        try { localStorage.setItem(KEY, choice); } catch (e) { /* private mode: ignore */ }
        apply(choice);
      });
    });

    // Keyboard access for the sidebar steps (they are <div>s in the original markup):
    // Enter / Space triggers the same click handler that script.js already registered.
    document.querySelectorAll('.step-list .step').forEach(function (step) {
      step.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); step.click(); }
      });
    });
  });
})();
