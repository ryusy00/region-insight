/* ES5: shared by research and introduction pages. */
(function () {
  var pages = document.querySelectorAll('.tab-page');
  for (var p = 0; p < pages.length; p++) {
    (function (page) {
      var tabs = page.querySelectorAll('[role="tab"]');
      function panelFor(tab) {
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        return panel && page.contains(panel) ? panel : null;
      }
      function selectTab(tab, focus) {
        if (!panelFor(tab)) return;
        page.classList.add('has-selection');
        for (var j = 0; j < tabs.length; j++) {
          var selected = tabs[j] === tab;
          tabs[j].setAttribute('aria-selected', selected ? 'true' : 'false');
          tabs[j].tabIndex = selected ? 0 : -1;
          var panel = panelFor(tabs[j]);
          if (panel) panel.hidden = !selected;
        }
        if (focus) tab.focus();
      }
      for (var i = 0; i < tabs.length; i++) {
        (function (tab, index) {
          tab.addEventListener('click', function () { selectTab(tab, false); }, false);
          tab.addEventListener('keydown', function (event) {
            var next = index;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = tabs.length - 1;
            else return;
            event.preventDefault();
            selectTab(tabs[next], true);
          }, false);
        }(tabs[i], i));
      }
      var initial = null;
      var defaultPanel = page.getAttribute('data-default-tab');
      for (var k = 0; k < tabs.length; k++) {
        if ('#' + tabs[k].getAttribute('aria-controls') === window.location.hash) initial = tabs[k];
      }
      if (!initial && defaultPanel) {
        for (var n = 0; n < tabs.length; n++) {
          if (tabs[n].getAttribute('aria-controls') === defaultPanel) initial = tabs[n];
        }
      }
      if (initial) selectTab(initial, false);
      else if (tabs.length) selectTab(tabs[0], false);
    }(pages[p]));
  }
}());
