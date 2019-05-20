//= require animations/stars
//= require animations/snow
//= require animations/animateMobileNav
//= require navbars/functions/setDarkTheme
//= require navbars/functions/setLightTheme
//= require navbars/functions/hideScrolledNav
//= require navbars/functions/toggleBackgroundImage
//= require navbars/functions/handleResize
//= require navbars/functions/handleNavScroll

function toggleLight() {
  setLightTheme();
  toggleBackgroundImage('light');
  drawSnow();
}
function toggleDark() {
  setDarkTheme();
  toggleBackgroundImage('dark');
  drawStars();
}
// set the theme based on the cookies
function setTheme() {
  const theme = Cookies.get('theme');
  if (theme === 'light') {
    toggleLight();
  } else {
    toggleDark();
  }
}

// toggle the theme
function toggleTheme() {
  const theme = Cookies.get('theme');
  // toggle from dark (or no theme) to light
  if (!theme || theme === 'dark') {
    toggleLight();
  } else {
    toggleDark();
  }
}

$(document).on('turbolinks:load', () => {
  animateMobileNav();

  setTheme();
  $('.theme-toggle').click(toggleTheme);

  const nav = document.querySelector('#nav');

  function handleScroll() {
    // animate the info list if it comes into view
    const infoList = $('.application-info-list');
    if (window.scrollY - infoList.position().top > 100) {
      animateInfoList();
    }
    // animate the icon grid if it comes into view
    const icons = $('.application-info-icons');
    if (window.scrollY - icons.position().top > 100) {
      animateIconGrid();
    }

    handleNavScroll();
    // if on the blogs page and the page can be paginated, use infinite scrolling
  }

  $(window).scroll(handleScroll);
  handleScroll();

  $(window).resize(() => {
    handleResize();
    const theme = Cookies.get('theme');
    toggleBackgroundImage(theme);
  });
});
