// removes the dark theme to set the default light one
function setLightTheme() {
  Cookies.set('theme', 'light');

  // enable the light theme
  $('#bootstrap-light').removeAttr('disabled');

  // remove the dark theme
  $('#bootstrap-dark').attr('disabled', 'true');
  $('#syntax-dark').attr('disabled', 'true');

  $('.theme-toggle').removeClass('toggle-on');
}
