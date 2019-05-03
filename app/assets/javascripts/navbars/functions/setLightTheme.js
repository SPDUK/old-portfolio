// removes the dark theme to set the default light one
function setLightTheme() {
  Cookies.set('theme', 'light');
  $('.theme-toggle').removeClass('toggle-on');
  $('#bootstrap-dark').remove();
  $('#syntax-dark').remove();
}
