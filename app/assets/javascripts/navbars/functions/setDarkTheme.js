//= require "helpers/load"
// adds the bootstrap dark theme, removes the light theme, animates the toggler

// append runs synchronously, so we await the function finishing and only add/remove
// the stylesheets when they're finished downloading

function setAttrs() {
  // enable dark theme
  $('#bootstrap-dark').removeAttr('disabled');
  $('#syntax-dark').removeAttr('disabled');
  // disable light theme
  $('#bootstrap-light').attr('disabled', 'true');
}
async function downloadDarkCSS() {
  $('#loading').addClass('show');

  const syntaxDark =
    'https://res.cloudinary.com/dmjolhdaq/raw/upload/v1555203029/Portfolio/dracula.css';
  const bootstrapDark =
    'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/darkly/bootstrap.min.css';

  // load all the css files, then add an id and stop loading when they've finished loading
  Promise.all([load.css(syntaxDark), load.css(bootstrapDark)])
    .then(() => {
      // add the IDs to the links we just added
      document.querySelector(`link[href='${bootstrapDark}']`).id = 'bootstrap-dark';
      document.querySelector(`link[href='${syntaxDark}']`).id = 'syntax-dark';

      $('#loading').removeClass('show');
      setAttrs();
    })
    // reload page if it fails to load
    .catch(() => window.location.reload());
}

async function setDarkTheme() {
  Cookies.set('theme', 'dark');

  if (!$('#bootstrap-dark').length) {
    downloadDarkCSS();
  } else {
    setAttrs();
  }

  $('.theme-toggle').addClass('toggle-on');
}
