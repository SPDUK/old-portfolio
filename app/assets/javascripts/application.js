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
    .timeline({
      easing: 'easeOutQuad'
    })
    .add({
      targets: '#title .letters-left',
      opacity: [0, 1],
      translateX: ['0.5em', 0],
      duration: 300,
      offset: '-=300',
      delay: 350
    })
    .add({
      targets: '#title .letters-center',
      opacity: [0, 1],
      translateX: ['0.5em', 0],
      duration: 300,
      offset: '0'
    })
    .add({
      targets: '#title .letters-right',
      opacity: [0, 1],
      translateX: ['-0.5em', 0],
      duration: 400,
      offset: '-=600'
    })
    .add({
      targets: '.application-title-subtitle .letter', // subtitle animation
      opacity: [0, 0.85],
      duration: 400,
      offset: '-=775',
      delay(el, i) {
        return 36 * (i + 1);
      }
    })
    .add({
      targets: '.application-title-about',
      opacity: [0, 1],
      translateY: ['2rem', 0],
      duration: 400
    })
    .add({
      targets: '.application-links a',
      opacity: [0, 1],
      translateY: ['2rem', 0],
      delay: anime.stagger(250, { grid: [3, 1], from: 1 }) // fade from the center
    })
    .add({
      targets: '.translucent-bg',
      opacity: [0, 1],
      translateY: ['5rem', 0],
      duration: 500,
      complete: () => {
        animateIconGrid();
        document.body.classList.remove('no-scroll');
      }
    });

  // add an event listener to each icon, animate in the grid from that index on click
  $('.application-icons .col-3').each((idx, el) => {
    $(el).click(_evt => {
      animateGrid(idx, 150);
    });
  });
});
