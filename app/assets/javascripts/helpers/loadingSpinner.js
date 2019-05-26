function applySpinnerClasses() {
  $('html').addClass('no-scrollbar');
  $('#loading').addClass('show');
  if (Cookies.get('theme') === 'dark') $('#loading').addClass('bg-black');
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
    if (!el.href || el.href.endsWith('#') || el.getAttribute('data-method') === 'delete') return;
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
  anime({
    targets: 'body',
    easing: 'easeInOutSine',
    opacity: [0, 1],
    duration: 450
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
}
