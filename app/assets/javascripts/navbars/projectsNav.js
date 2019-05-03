//= require navbars/functions/setDarkTheme
//= require navbars/functions/setLightTheme
//= require navbars/functions/handleResize
//= require navbars/functions/handleNavScroll

// if we are on the blog layout all we need to do is set the theme
function setTheme() {
  const theme = Cookies.get('theme');
  if (theme === 'light') setLightTheme();
  else setDarkTheme();
}

function toggleTheme() {
  const theme = Cookies.get('theme');
  // toggle from dark (or no theme) to light
  if (!theme || theme === 'dark') setLightTheme();
  else setDarkTheme();
}

$(document).on('turbolinks:load', () => {
  setTheme();
  $('.theme-toggle').click(toggleTheme);
  const nav = document.querySelector('#nav');

  $(window).scroll(handleNavScroll);
  handleNavScroll();

  $(window).resize(handleResize);
});
