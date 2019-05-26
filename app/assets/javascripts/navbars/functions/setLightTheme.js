// removes the dark theme to set the default light one
function setLightTheme() {
  Cookies.set('theme', 'light');

  // enable the light theme
  document.getElementById('bootstrap-light').disabled = false;

  // remove the dark theme after a delay to avoid flash of unstyled text
  // (only takes a few ms to read from cache but it happens sometimes anyway)
  setTimeout(() => {
    // disable stylesheets for dark themes (use if to avoid error on page load)
    const bsDark = document.getElementById('bootstrap-dark');
    if (bsDark) bsDark.disabled = true;
    const syntaxDark = document.getElementById('syntax-dark');
    if (syntaxDark) syntaxDark.disabled = true;
  }, 50);

  // toggle the switch to light
  $('.theme-toggle').removeClass('toggle-on');
  // make the loading spinner background white
  $('#loading').removeClass('bg-black');
}
