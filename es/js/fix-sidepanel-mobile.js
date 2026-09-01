/**
 * fix-sidepanel-mobile.js
 * Fixes the "smushed layout" bug after the Artie (DocSearch) sidepanel closes
 * on mobile/Docusaurus.
 *
 * Root cause: Algolia's Sidepanel.js sets inline style `marginRight` (or
 * `marginLeft`) directly on document.body (or a configured selector element)
 * when the sidepanel opens in "inline" mode. On close it is supposed to reset
 * these to "", but on mobile the reset sometimes races or fails, leaving the
 * layout squished.
 *
 * Fix: Use a MutationObserver to watch the sidepanel container for the
 * `is-open` class being removed, then forcefully clear all inline margin
 * and transition styles from <body> and <html>.
 */
(function () {
  var savedScrollY = 0;

  function clearLayoutStyles() {
    // Clear any inline styles Algolia leaves on body or html
    var targets = [document.body, document.documentElement];
    targets.forEach(function (el) {
      if (!el) return;
      el.style.removeProperty('margin-left');
      el.style.removeProperty('margin-right');
      el.style.removeProperty('transition');
      el.style.removeProperty('width');
      // These are only set on mobile by the Algolia :has() rule override
      el.style.removeProperty('position');
      el.style.removeProperty('overflow');
    });
  }

  function attachObserver() {
    var container = document.querySelector('.DocSearch-Sidepanel-Container');
    if (!container) {
      setTimeout(attachObserver, 400);
      return;
    }

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type !== 'attributes' || mutation.attributeName !== 'class') return;

        var target = mutation.target;
        var wasOpen = (mutation.oldValue || '').indexOf('is-open') !== -1;
        var isOpen = target.classList.contains('is-open');

        if (!wasOpen && isOpen) {
          // Panel just opened: save scroll position
          savedScrollY = window.scrollY || window.pageYOffset || 0;
        } else if (wasOpen && !isOpen) {
          // Panel just closed: clear leftover inline margin/layout styles and
          // restore scroll position after the browser reflows
          requestAnimationFrame(function () {
            clearLayoutStyles();
            requestAnimationFrame(function () {
              window.scrollTo(0, savedScrollY);
            });
          });
        }
      });
    });

    observer.observe(container, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachObserver);
  } else {
    attachObserver();
  }
})();

