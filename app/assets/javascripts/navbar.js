//= require stars

function getImageWidth() {
  const w = $(document).width();
  if (w > 2560) return 3840; // 4k
  if (w > 1920) return 2560; // 1440p
  // if weird proportions (very tall but not widescreen..?)
  const h = $(window).height();
  if (h > 850) return 2560; // 1440p just to fit vertical space
  // if a very wide mobile screen or tablet
  if (w > 400) return 1920; // 1080p
  return 420; // mobile
}
function toggleBackgroundImage(color) {
  const width = getImageWidth();
  const url = `url('https://res.cloudinary.com/dmjolhdaq/image/upload/v1555440140/Portfolio/firewatch-${color}-${width}.jpg')`;
  // if the url hasn't changed, don't do anything
  if (url === document.body.style.background) return;
  document.body.style.backgroundImage = url;
}
function setLightTheme() {
  Cookies.set('theme', 'light');
  $('.theme-toggle').removeClass('toggle-on');
  $('#bootstrap-dark').remove();
  $('#syntax-dark').remove();
  toggleBackgroundImage('light');
  stopDrawingStars();
  $('#canvas').remove();
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
  toggleBackgroundImage('dark');

  $('.theme-toggle').addClass('toggle-on');
  $('#bootstrap-light').remove();
  $('#syntax-light').remove();

  // if there is no canvas (toggling from light mode), create it and draw shooting stars
  if (!$('#canvas').length) {
    $('body').append($('<canvas/>', { id: 'canvas' }));
  }
  drawStars();
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
  $('.theme-toggle').click(toggleTheme);

  const nav = document.querySelector('#nav');
  // initial window state of wide if it's over bootstrap small size
  const WIDE_AMOUNT = 768;
  let isWide = window.innerWidth >= WIDE_AMOUNT;

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
    const remove = theme === 'light' ? 'transparent' : 'light';
    nav.classList.add(`bg-${theme}`);
    nav.classList.add(`navbar-${theme}`);
    nav.classList.remove(`bg-${remove}`);
    nav.classList.remove(`navbar-${remove}`);
  }
  function handleScroll() {
    // do fancy scrolling animations on desktop
    const title = $('#title');
    const titleHeight = title.length ? title.position().top - 60 : 200;
    if (isWide) {
      if (window.scrollY < titleHeight) {
        toggleNavColors('transparent');
        const fontSize = 18 - window.scrollY / 60;
        const height = 80 - window.scrollY / 6;
        nav.style.fontSize = fontSize <= 16 ? '16px' : `${fontSize}px`;
        nav.style.height = height <= 60 ? '60px' : `${height}px`;
      } else {
        toggleNavColors('light');
        nav.style.fontSize = `16px`;
        nav.style.height = `60px`;
      }
    }
    // always hide navbar if scrolling down, show if scrolling up
    if (window.scrollY > titleHeight + 60 * 2) {
      hideScrolledNav();
    }

    // if on the blogs page and the page can be paginated, use infinite scrolling
    const url = $('a[rel="next"]').attr('href');
    if (url && window.scrollY > document.body.clientHeight - window.innerHeight - 50) {
      $('.pagination').text('Loading more blogs...');
      $.getScript(url);
    }
  }

  $(window).scroll(handleScroll);
  handleScroll();

  function handleResize() {
    // if window is being resized UNDER wide amount, and the window was previously wide
    // remove event listener and reset mobile settings
    if (window.innerWidth <= WIDE_AMOUNT && isWide) {
      nav.classList.add('bg-light');
      nav.classList.add('navbar-light');
      nav.classList.remove('bg-transparent');
      nav.classList.remove('navbar-transparent');
      nav.style.fontSize = 'unset';
      nav.style.height = 'unset';
      isWide = false;
    }
    // if window is being resized OVER wide amount, and the window was previously NOT wide
    // add event listener back and set the positional wide settings
    if (window.innerWidth >= WIDE_AMOUNT && !isWide) {
      isWide = true;
      handleScroll();
    }
    const theme = Cookies.get('theme');
    toggleBackgroundImage(theme);
  }
  $(window).resize(handleResize);
});
