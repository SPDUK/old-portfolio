//= require rails-ujs
//= require activestorage
//= require cable
//= require turbolinks
//= require cocoon
//= require gritter

function setLightTheme() {
  Cookies.set('theme', 'light');
  $('.theme-toggle').removeClass('toggle-on');
  $('#bootstrap-dark').remove();
  $('#syntax-dark').remove();
}
function setDarkTheme() {
  Cookies.set('theme', 'dark');
  $('head').append(
    '<link href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/darkly/bootstrap.min.css" rel="stylesheet" integrity="sha384-w+8Gqjk9Cuo6XH9HKHG5t5I1VR4YBNdPt/29vwgfZR485eoEJZ8rJRbm3TR32P6k" crossorigin="anonymous" id="bootstrap-dark" />'
  );
  $('<link>', {
    rel: 'stylesheet',
    id: 'syntax-dark',
    type: 'text/css',
    href: 'https://res.cloudinary.com/dmjolhdaq/raw/upload/v1555203029/Portfolio/dracula.css'
  }).appendTo('head');

  $('.theme-toggle').addClass('toggle-on');
  $('#bootstrap-light').remove();
  $('#syntax-light').remove();
}

function setTheme() {
  const theme = Cookies.get('theme');
  if (theme === 'light') setLightTheme();
  else setDarkTheme();
}

function toggleTheme() {
  const theme = Cookies.get('theme');
  // toggle from dark (or no theme) to light
  if (!theme || theme === 'dark') {
    setLightTheme();
  } else {
    setDarkTheme();
  }
}

$(document).on('turbolinks:load', () => {
  setTheme();
  // change this to class as we have 2
  $('.theme-toggle').click(toggleTheme);

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

  let lastST = 0;
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

  function toggleNavColors(theme) {
    const remove = theme === 'light' ? 'dark' : 'light';
    nav.classList.add(`bg-${theme}`);
    nav.classList.add(`navbar-${theme}`);
    nav.classList.remove(`bg-${remove}`);
    nav.classList.remove(`navbar-${remove}`);
  }
  function handleScroll() {
    // do fancy scrolling animations on desktop
    if (isWide) {
      if (window.scrollY < 200) {
        toggleNavColors('dark');
        const fontSize = 18 - this.scrollY / 100;
        const height = 80 - this.scrollY / 10;
        nav.style.fontSize = fontSize <= 16 ? '16px' : `${fontSize}px`;
        nav.style.height = height <= 60 ? '60px' : `${height}px`;
      } else {
        toggleNavColors('light');
        nav.style.fontSize = `16px`;
        nav.style.height = `60px`;
      }
    } else {
      nav.classList.add('bg-light');
    }
    // always hide navbar if scrolling down, show if scrolling up
    if (window.scrollY > 300) {
      hideScrolledNav();
    }
  }

  $(window).scroll(handleScroll);
  handleScroll();

  function handleResize() {
    // if window is being resized UNDER wide amount, and the window was previously wide
    // remove event listener and reset mobile settings
    if (window.innerWidth < WIDE_AMOUNT && isWide) {
      nav.classList.add('bg-dark');
      nav.style.fontSize = 'unset';
      nav.style.height = 'unset';
      isWide = false;
    }
    // if window is being resized OVER wide amount, and the window was previously NOT wide
    // add event listener back and set the positional wide settings
    if (window.innerWidth > WIDE_AMOUNT && !isWide) {
      isWide = true;
    }
  }
  $(window).resize(handleResize);
});
