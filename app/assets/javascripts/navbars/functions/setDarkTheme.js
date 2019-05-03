// adds the bootstrap dark theme, removes the light theme, animates the toggler
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
