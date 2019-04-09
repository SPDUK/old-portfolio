//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require rails-ujs
//= require activestorage
//= require cable
//= require turbolinks
//= require cocoon
//= require gritter

$(document).on('turbolinks:load', () => {
  // scroll top on page load
  window.scroll({
    top: 0.000001,
    left: 0,
    behavior: 'smooth'
  });
  const nav = document.querySelector('.blog-nav');
  // initial window state of wide if it's over bootstrap small size
  const WIDE_AMOUNT = 768;
  let isWide = window.innerWidth > WIDE_AMOUNT;

  function wideSettings() {
    if (window.scrollY < 200) {
      nav.classList.remove('bg-white');
      const fontSize = 18 - this.scrollY / 100;
      const height = 80 - this.scrollY / 10;
      nav.style.fontSize = fontSize <= 16 ? '16px' : `${fontSize}px`;
      nav.style.height = height <= 60 ? '60px' : `${height}px`;
      nav.style.backgroundColor = `rgba(255,255,255, ${window.scrollY / 100})`;
    } else {
      nav.classList.add('bg-white');
      nav.style.fontSize = `16px`;
      nav.style.height = `60px`;
    }
  }

  if (isWide) {
    // only add scroll listener if on desktop
    $(window).scroll(wideSettings);
    // set default settings, turbolinks sometimes breaks typical page flow so it needs to recalculate on refresh
    wideSettings();
  }

  function handleResize() {
    // if window is being resized UNDER wide amount, and the window was previously wide
    // remove event listener and reset mobile settings
    if (window.innerWidth < WIDE_AMOUNT && isWide) {
      $(window).off('scroll', wideSettings);
      nav.classList.add('bg-white');
      nav.style.fontSize = 'unset';
      nav.style.height = 'unset';
      isWide = false;
    }
    // if window is being resized OVER wide amount, and the window was previously NOT wide
    // add event listener back and set the positional wide settings
    if (window.innerWidth > WIDE_AMOUNT && !isWide) {
      $(window).scroll(wideSettings);
      wideSettings();
      isWide = true;
    }
  }
  $(window).resize(handleResize);
});
