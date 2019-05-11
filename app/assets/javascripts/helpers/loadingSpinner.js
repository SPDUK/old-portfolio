// whenever clicking a link, add the spinner

// apply an animation when clicking any link to fade in the spinner
function applyLinkAnimation() {
  $('a').each((i, el) => {
    const { pathname } = new URL(el.href);
    // ignore any empty links and the navbar dropdown
    if (!pathname || el.id === 'navbarDropdown') return;

    $(el).click(_ => {
      $('#loading').addClass('show');
      $('html').addClass('no-scrollbar');
    });
  });
}

// by default the page will load with the spinner on, we just remove it when everything has finished loading
function loadingSpinner() {
  applyLinkAnimation();
  $('html').addClass('no-scrollbar');

  // check to see if the page has loaded every 30ms until it has,
  // then fade out and stop checking
  const interval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(interval);

      // fade out after 100ms to make the animation look smoother
      setTimeout(() => {
        $('html').removeClass('no-scrollbar');
        $('#loading').removeClass('show');
      }, 150);
    }
  }, 30);
}

// TODO: if theme is light show light background and black spinner
