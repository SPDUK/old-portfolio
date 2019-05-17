// removes the dark theme to set the default light one
function setLightTheme() {
  Cookies.set('theme', 'light');

  // enable the light theme
  $('#bootstrap-light').removeAttr('disabled');

  // remove the dark theme after a delay to avoid flash of unstyled text
  // (only takes a few ms to read from cache b ut it happens sometimes anyway)
  setTimeout(() => {
    $('#bootstrap-dark').attr('disabled', 'true');
    $('#syntax-dark').attr('disabled', 'true');
  }, 100);

  // toggle the switch to light
  $('.theme-toggle').removeClass('toggle-on');
  // make the loading spinner background white
  $('#loading').removeClass('bg-black');
  // make the body backgroundColor white
  document.body.style.backgroundColor = '#fff';
}
