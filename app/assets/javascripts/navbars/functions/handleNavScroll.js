//= require navbars/functions/toggleNavColors
//= require navbars/functions/hideScrolledNav

// handles navbar changing colors based on scrolling up and down
function handleNavScroll() {
  // initial window state of wide if it's over bootstrap small size
  const WIDE_AMOUNT = 768;
  const isWide = window.innerWidth >= WIDE_AMOUNT;

  const title = $('#title');
  const titleHeight = title.length ? title.position().top - 60 : 200;
  if (window.scrollY < titleHeight) {
    // if the window is wide, turn the navbar transparent when scrolled up to th e top
    if (isWide) {
      toggleNavColors('transparent');
      const fontSize = 18 - window.scrollY / 60;
      const height = 80 - window.scrollY / 6;
      nav.style.fontSize = fontSize <= 16 ? '16px' : `${fontSize}px`;
      nav.style.height = height <= 60 ? '60px' : `${height}px`;
    }
    // if the window is scrolled down fade out, if scrolled up fade in
    $('#mouse-scroll').fadeIn(300);
  } else if (isWide) {
    toggleNavColors('light');
    nav.style.fontSize = `16px`;
    nav.style.height = `60px`;
  }
  // always hide navbar if scrolling down, show if scrolling up
  if (window.scrollY > titleHeight + 60 * 2) {
    hideScrolledNav();
    // hide the mouse-scroll icon if scrolling down
    $('#mouse-scroll').fadeOut(300);
  }
}
