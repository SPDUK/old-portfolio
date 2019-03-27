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
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require three.min.js
//= require waves.min.js

const waveOptions = {
  '/': {
    el: '#site',
    color: '#0e1012',
    shininess: 61.0,
    waveHeight: 12.5,
    waveSpeed: 0.65,
    zoom: 1
  },
  '/edit': {
    el: '#site',
    color: '#0F0B0C',
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
document.addEventListener('turbolinks:load', function(event) {
  const url = new URL(event.data.url);
  VANTA.WAVES({
    ...waveOptions[url.pathname]
  });
});
