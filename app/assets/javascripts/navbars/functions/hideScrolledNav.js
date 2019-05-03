let lastST = 0;
// hides the navbar when scrolling down, shows it when scrolling up
function hideScrolledNav() {
  const delta = 5;
  const navHeight = nav.offsetHeight;
  const ST = window.scrollY;
  if (Math.abs(lastST - ST) <= delta) return;

  // if scrolling down - hide the navbar
  if (ST > lastST && ST > navHeight) {
    nav.style.top = `${-navHeight}px`;
    // if scrolling up - show navbar
  } else if (ST + window.innerHeight < $(document).height()) {
    nav.style.top = '0px';
    // if the menu is open and they are scrolling up, close the menu
    const mobileNav = $('.navbar-toggler');
    if (mobileNav && mobileNav.attr('aria-expanded') === 'true') {
      mobileNav.click();
    }
  }
  lastST = ST;
}
