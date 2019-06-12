function applySpinnerClasses() {
  $('html').addClass('no-scrollbar');
  $('#loading').addClass('show');
  // make the background theme dark or light depending on the theme
  if (Cookies.get('theme') === 'dark') $('#loading').addClass('bg-black');
  else $('#loading').addClass('bg-light');
}
function removeSpinnerClasses() {
  $('html').removeClass('no-scrollbar');
  $('#loading').removeClass('show');
}

// whenever clicking a link, add the spinner
// apply an animation when clicking any link to fade in the spinner
function applyLinkAnimation() {
  $('a').each((i, el) => {
    // if the link is just a link added there by bootstrap, don't add the
    // loading spinner
    // also skips over deletes, because we confirm them with an alert which can be cancelled
    // skips over any anchor links (links to current page)
    if (
      !el.href ||
      el.href.endsWith('#') ||
      el.getAttribute('data-method') === 'delete' ||
      el.classList.contains('anchor')
    )
      return;

    const { pathname } = new URL(el.href);
    // ignore any empty links and the navbar dropdown
    if (!pathname) return;
    $(el).click(applySpinnerClasses);
  });
}

// by default the page will load with the spinner on, we just remove it when everything has finished loading
function loadingSpinner() {
  // the loading spinner can run on page load, when it does
  // respect the theme selection and add a dark background
  if (Cookies.get('theme') === 'dark') $('#loading').addClass('bg-black');

  // fade the body in on page load
  anime
    .timeline({
      easing: 'easeOutQuad'
    })
    .add({
      targets: 'body',
      opacity: [0, 1],
      duration: 100
    });

  applyLinkAnimation();

  // check to see if the page has loaded every 10ms until it has,
  // then fade out and stop checking
  const interval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(interval);

      // stop the loading animation
      removeSpinnerClasses();
    }
  }, 10);

  // https://github.com/turbolinks/turbolinks/issues/75#issuecomment-445325162
  // stops links to the current page from re-loading the page when clicked
  document.addEventListener('turbolinks:click', function(event) {
    const anchorElement = event.target;
    const isSamePageAnchor =
      anchorElement.hash &&
      anchorElement.origin === window.location.origin &&
      anchorElement.pathname === window.location.pathname;

    if (isSamePageAnchor) {
      Turbolinks.controller.pushHistoryWithLocationAndRestorationIdentifier(
        event.data.url,
        Turbolinks.uuid()
      );
      event.preventDefault();
    }
  });
}
