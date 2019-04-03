// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require cocoon
//= require gritter
//= require_tree .

const waveOptions = {
  '/': {
    el: '#site',
    color: '#020406',
    shininess: 61.0,
    waveHeight: 12.5,
    waveSpeed: 0.65,
    zoom: 1
  },
  '/edit': {
    el: '#site',
    color: '#020406',
    shininess: 32.0,
    waveHeight: 24.5,
    waveSpeed: 0.8,
    zoom: 0.9
  },
  '/login': {
    el: '#site',
    color: '#020406',
    shininess: 32.0,
    waveHeight: 24.5,
    waveSpeed: 0.8,
    zoom: 0.9
  },
  '/register': {
    el: '#site',
    color: '#020406',
    shininess: 32.0,
    waveHeight: 24.5,
    waveSpeed: 0.8,
    zoom: 0.9
  },
  '/contact': {
    el: '#site',
    color: '#020406',
    shininess: 32.0,
    waveHeight: 24.5,
    waveSpeed: 0.8,
    zoom: 1.2
  },
  '/about-me': {
    el: '#site',
    color: '#020406',
    shininess: 32.0,
    waveHeight: 24.5,
    waveSpeed: 0.8,
    zoom: 0.6
  }
};

// only load background animation if it's a path we want to animate
const { pathname } = window.location;
if (Object.keys(waveOptions).includes(pathname)) {
  document.addEventListener('turbolinks:load', () => {
    // const waves = VANTA.WAVES({
    //   ...waveOptions[pathname]
    // });
    // do something cool with colors and options
    // setInterval(() => {
    //   const r = Math.floor(Math.random() * 256) + 1
    //   const g = Math.floor(Math.random() * 256) + 1
    //   const b = Math.floor(Math.random() * 256) + 1
    //   waves.options.color = `rgb(${r},${g},${b})`
    // }, 1000);
  });
}
$(document).ready(() => {
  $('#remove-notice').click(() => $('.notice').remove());
  setTimeout(() => {
    $('.notice').fadeOut('slow', function() {
      $(this).remove();
    });
  }, 3500);
}, 3500);
