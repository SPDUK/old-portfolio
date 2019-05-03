//= require animations/stars
//= require navbars/functions/setDarkTheme
//= require navbars/functions/setLightTheme
//= require navbars/functions/hideScrolledNav
//= require navbars/functions/toggleBackgroundImage
//= require navbars/functions/handleResize
//= require navbars/functions/handleNavScroll

function toggleLight() {
  setLightTheme();
  toggleBackgroundImage('light');
  $('#canvas').remove();
}
function toggleDark() {
  setDarkTheme();
  toggleBackgroundImage('dark');
  // if there is no canvas, create it and draw shooting stars
  if (!$('#canvas').length) {
    $('#bg').append($('<canvas/>', { id: 'canvas' }));
  }
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
  setTheme();
  $('.theme-toggle').click(toggleTheme);

  const nav = document.querySelector('#nav');

  function handleScroll() {
    // animate the icon grid if it comes into view
    const icons = $('.application-info-icons');
    if (icons && window.scrollY - icons.position().top > 350) {
      animateIconGrid();
    }
    // animate the info list if it comes into view
    const infoList = $('.application-info-list');
    if (infoList && window.scrollY - infoList.position().top > 100) {
      animateInfoList();
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
