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
//= require cable
//= require turbolinks
//= require cocoon
//= require gritter
//= require navbar
//= require animations/info

// stops preserving scroll, no need to scroll up on page visit
history.scrollRestoration = 'manual';

$(document).on('turbolinks:load', () => {
  document.body.classList.add('no-scroll');

  // scroll the about div to the top of the page when clicking the mouse scroller icon
  $('#mouse-scroll').click(() => {
    $('#mouse-scroll').fadeOut(300);
    const { top } = $('#about').offset();
    window.scrollTo({
      top,
      left: 0,
      behavior: 'smooth'
    });
  });

  // wrap every subtitle letter in a span
  $('.application-title-subtitle').each(function() {
    $(this).html(
      $(this)
        .text()
        .replace(/\S/g, "<span class='letter'>$&</span>")
    );
  });

  // title animation
  anime
    .timeline()
    .add({
      targets: '#title .letters-left',
      opacity: [0, 1],
      translateX: ['0.5em', 0],
      easing: 'easeOutExpo',
      duration: 600,
      offset: '-=300',
      delay: 350
    })
    .add({
      targets: '#title .letters-center',
      opacity: [0, 1],
      translateX: ['0.5em', 0],
      easing: 'easeOutExpo',
      duration: 300,
      offset: '0'
    })
    .add({
      targets: '#title .letters-right',
      opacity: [0, 1],
      translateX: ['-0.5em', 0],
      easing: 'easeOutExpo',
      duration: 600,
      offset: '-=600'
    })
    .add({
      targets: '.application-title-subtitle .letter', // subtitle animation
      opacity: [0, 0.85],
      easing: 'easeOutExpo',
      duration: 400,
      offset: '-=775',
      delay(el, i) {
        return 36 * (i + 1);
      },
      complete: () => document.body.classList.remove('no-scroll')
    })
    .add({
      targets: '#mouse-scroll',
      opacity: [0, 1],
      translateY: ['1em', 0],
      easing: 'easeOutExpo',
      duration: 1200
    })
    .add({
      targets: '.application-info',
      opacity: [0, 1],
      translateY: ['5rem', 0],
      duration: 1200
    });

  // animate the scroller inside the mouse
  anime({
    targets: '#mouse-scroll-line',
    translateY: 25,
    loop: true,
    easing: 'easeOutExpo',
    opacity: [1, 0],
    duration: 1300
  });
});
