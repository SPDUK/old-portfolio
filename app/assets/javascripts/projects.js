//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require cocoon
//= require gritter
// = require navbars/projectsNav
//= require "helpers/loadingSpinner"

// returns a new array with the data pos added on to the card
function setPositions() {
  const cards = Array.from(document.getElementsByClassName('card'));
  return cards.map((card, idx) => {
    card.setAttribute('data-pos', idx + 1);
    return {
      id: card.getAttribute('data-id'),
      position: idx + 1
    };
  });
}

async function afterSort() {
  const order = setPositions();

  $.ajax({
    type: 'PUT',
    url: '/projects/sort',
    data: { order }
  });
}

function animateCarouselIn(evt = false) {
  anime
    .timeline()
    .add({
      easing: 'easeOutQuad',
      translateX: [-30, 0],
      targets: '.carousel-caption h5',
      opacity: [0, 1],
      duration: 350
    })
    .add({
      easing: 'easeOutQuad',
      targets: '.carousel-caption .btn',
      translateX: [-30, -0],
      opacity: [0, 1],
      duration: 350
    });
}

function animateCarouselOut(evt = false) {
  anime
    .timeline()
    .add({
      easing: 'easeOutQuad',
      targets: '.carousel-caption h5',
      translateX: [0, -30],
      opacity: [1, 0],
      duration: 200
    })
    .add({
      easing: 'easeOutQuad',
      targets: '.carousel-caption .btn',
      translateX: [0, -30],
      opacity: [1, 0],
      duration: 200
    });
}
$(document).on('turbolinks:load', () => {
  loadingSpinner();

  $('.carousel').carousel({
    interval: 5000
  });
  animateCarouselIn();

  // when the slide begins
  $('.carousel').on('slide.bs.carousel', animateCarouselOut);

  // after carousel has finished sliding
  $('.carousel').on('slid.bs.carousel', animateCarouselIn);

  const projects = document.getElementById('sortable');
  if (projects) {
    Sortable.create(projects, {
      onEnd: afterSort
    });
    setPositions();
  }
});
