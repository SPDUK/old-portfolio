//= require navbars/functions/toggleNavColors
//= require navbars/functions/hideScrolledNav

// handles navbar changing colors based on scrolling up and down
function handleNavScroll() {
  // initial window state of wide if it's over bootstrap small size
  const WIDE_AMOUNT = 768;
  const isWide = window.innerWidth >= WIDE_AMOUNT;

  if (window.scrollY < 1) {
    // if the window is wide, turn the navbar transparent when scrolled up to the top
    if (isWide) {
      toggleNavColors('transparent');
    }
    // if the window is scrolled down fade out, if scrolled up fade in
    $('#mouse-scroll').fadeIn(300);
  } else if (isWide) {
    toggleNavColors('light');
  }
  // always hide navbar if scrolling down, show if scrolling up
  if (window.scrollY > 60) {
    hideScrolledNav();
    // hide the mouse-scroll icon if scrolling down
    $('#mouse-scroll').fadeOut(300);
  }
}
