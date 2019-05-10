// adds the bootstrap dark theme, removes the light theme, animates the toggler

// append runs synchronously, so we await the function finishing and only add/remove
// the stylesheets when they're finished downloading
async function downloadDarkCSS() {
  // todo: add loading spinner or something to not flash the screen during load
  console.log('loading dark theme......');
  $('head').append(
    '<link href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/darkly/bootstrap.min.css" rel="stylesheet" integrity="sha384-w+8Gqjk9Cuo6XH9HKHG5t5I1VR4YBNdPt/29vwgfZR485eoEJZ8rJRbm3TR32P6k" crossorigin="anonymous" id="bootstrap-dark" />'
  );
  $('<link>', {
    rel: 'stylesheet',
    id: 'syntax-dark',
    type: 'text/css',
    href: 'https://res.cloudinary.com/dmjolhdaq/raw/upload/v1555203029/Portfolio/dracula.css'
  }).appendTo('head');
}

async function setDarkTheme() {
  Cookies.set('theme', 'dark');

  if (!$('#bootstrap-dark').length) {
    await downloadDarkCSS();
    console.log('done!');
  }

  // enable dark theme
  $('#bootstrap-dark').removeAttr('disabled');
  $('#syntax-dark').removeAttr('disabled');
  // disable light theme
  $('#bootstrap-light').attr('disabled', 'true');

  $('.theme-toggle').addClass('toggle-on');
}
