/* ES5 syntax for older Eclipse JavaScript validators. */
var inquiryForm = document.querySelector('#inquiryForm');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = new FormData(inquiryForm);
    var subject = '[리전인사이트 연구문의] ' + data.get('subject');
    var body = [
      '이름: ' + data.get('name'),
      '회신 이메일: ' + data.get('email'),
      '',
      String(data.get('message'))
    ].join('\n');
    window.location.href = 'mailto:irie@irie.re.kr?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}

var homeLogo = document.querySelector('.logo-menu');

if (homeLogo) {
  var transitioning = false;
  var links = homeLogo.querySelectorAll('.letter-button');

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      event.preventDefault();
      if (transitioning) return;
      transitioning = true;

      var link = this;
      var destination = link.href;
      var toResearch = link.classList.contains('letter-r');
      var start = homeLogo.getBoundingClientRect();
      var startTop = start.top + (start.height - start.width * 621 / 584) / 2;
      var compact = window.innerWidth <= 560;
      var pagePadding = compact ? 18 : (window.innerWidth <= 860 ? 24 : Math.min(160, window.innerWidth * .08));
      var pageWidth = window.innerWidth - pagePadding * 2;
      var targetWidth = compact ? 94 : Math.min(200, pageWidth * .32);
      var targetHeight = targetWidth * 621 / 584;
      var targetLeft = toResearch ? window.innerWidth - pagePadding - targetWidth : pagePadding;
      var headerHeight = compact ? Math.max(165, targetHeight + 40) :
        (window.innerWidth <= 860 ? Math.max(220, targetHeight + 34) : 270);
      var targetTop = (headerHeight - targetHeight) / 2;

      var preview = document.createElement('iframe');
      preview.className = 'page-transition-preview';
      preview.title = '';
      preview.setAttribute('aria-hidden', 'true');
      preview.tabIndex = -1;

      var movingLogo = document.createElement('img');
      movingLogo.className = 'page-transition-logo';
      movingLogo.src = './images/logo-img.png';
      movingLogo.alt = '';
      movingLogo.style.cssText = 'left:' + start.left + 'px;top:' + startTop +
        'px;width:' + start.width + 'px';

      var started = false;
      function startTransition() {
        if (started) return;
        started = true;

        homeLogo.classList.add('is-transitioning');
        var branding = document.querySelector('.hero-branding');
        if (branding) branding.classList.add('is-transitioning');

        if (!preview.animate || !movingLogo.animate) {
          window.location.href = destination;
          return;
        }

        var duration = 820;
        preview.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: duration * .85, easing: 'ease-in-out', fill: 'forwards'
        });
        movingLogo.animate([
          { left: start.left + 'px', top: startTop + 'px', width: start.width + 'px', opacity: .1 },
          { left: start.left + 'px', top: startTop + 'px', width: start.width + 'px', opacity: 1, offset: .12 },
          { left: targetLeft + 'px', top: targetTop + 'px', width: targetWidth + 'px', opacity: 1 }
        ], { duration: duration, easing: 'cubic-bezier(.35,.05,.18,1)', fill: 'forwards' });

        window.setTimeout(function () { window.location.href = destination; }, duration + 30);
      }

      preview.addEventListener('load', function () {
        try {
          var style = preview.contentDocument.createElement('style');
          style.textContent = '.research-logo,.introduction-logo{visibility:hidden!important}';
          preview.contentDocument.head.appendChild(style);
        } catch (ignore) { /* The preview still fades in. */ }
        startTransition();
      }, false);
      preview.addEventListener('error', startTransition, false);
      window.setTimeout(startTransition, 1500);
      preview.src = destination;
      document.body.appendChild(preview);
      document.body.appendChild(movingLogo);
    }, false);
  }
}
