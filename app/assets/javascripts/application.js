//= require rails-ujs
//= require activestorage
//= require cable
//= require turbolinks
//= require gritter
//= require navbars/homeNav
//= require animations/animateGrid
//= require animations/animateInfoList
//= require helpers/loadingSpinner

// stops preserving scroll, no need to scroll up on page visit
history.scrollRestoration = 'manual';

$(document).on('turbolinks:load', () => {
  loadingSpinner();
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
      easing: 'easeOutExpo',
      duration: 1200
    });

  // add an event listener to each icon, animate in the grid from that index on click
  $('.application-info-icons .col-3').each((idx, el) => {
    $(el).click(_evt => {
      animateGrid(idx, 150);
    });
  });
});
