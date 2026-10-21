/* ES5: button hover shares the existing SVG glow and click transition. */
(function () {
  var menu = document.querySelector('.ri-vector-menu');
  if (!menu) return;
  var links = menu.querySelectorAll('.ri-entry-link');
  for (var i = 0; i < links.length; i++) {
    (function (link) {
      var kind = link.getAttribute('data-symbol');
      var state = 'is-entry-' + kind + '-active';
      var hovered = false;
      var focused = false;
      function update() { menu.classList.toggle(state, hovered || focused); }
      link.addEventListener('mouseenter', function () { hovered = true; update(); });
      link.addEventListener('mouseleave', function () { hovered = false; update(); });
      link.addEventListener('focus', function () { focused = true; update(); });
      link.addEventListener('blur', function () { focused = false; update(); });
      link.addEventListener('click', function (event) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        var symbol = menu.querySelector('.ri-vector-logo .ri-symbol-' + kind);
        if (!symbol) return;
        var click = document.createEvent('MouseEvents');
        click.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        event.preventDefault();
        if (symbol.dispatchEvent(click)) window.location.href = link.href;
      });
    }(links[i]));
  }
}());
