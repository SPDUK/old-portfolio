//= require navbars/functions/handleNavScroll

// handles navbar colors based on width of the window
const WIDE_AMOUNT = 768;
let isWide = window.innerWidth >= WIDE_AMOUNT;
function handleResize() {
  // if window is being resized UNDER wide amount, and the window was previously wide
  // remove event listener and reset mobile settings
  if (window.innerWidth <= WIDE_AMOUNT && isWide) {
    nav.classList.add('bg-light');
    nav.classList.add('navbar-light');
    nav.classList.remove('bg-transparent');
    nav.classList.remove('navbar-transparent');
    isWide = false;
  }
  // if window is being resized OVER wide amount, and the window was previously NOT wide
  // add event listener back and set the positional wide settings
  if (window.innerWidth >= WIDE_AMOUNT && !isWide) {
    isWide = true;
    handleNavScroll();
  }
}
