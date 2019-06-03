//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require cocoon
//= require gritter
// = require navbars/projectsNav
//= require helpers/loadingSpinner

// returns a new array with the data pos added on to the card
function setPositions() {
  const projects = Array.from(document.getElementsByClassName('project'));
  return projects.map((card, idx) => {
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

function animateCarousel(evt = false) {
  // if the event type is slide, we are fading the animation out,
  // otherwise the event is sliding in
  const animateOut = evt && evt.type === 'slide';
  // if going to the right we need to fade out from the right and in from the right
  const direction = evt && evt.direction === 'right' ? '-30' : '30';
  const translateX = animateOut ? [0, direction] : [direction, 0];
  // animate from 1 to 0 when going out, and 0 to 1 when coming in
  const opacity = animateOut ? [1, 0] : [0, 1];
  // animate out quicker
  const duration = animateOut ? 200 : 300;

  anime
    .timeline({
      easing: 'easeOutQuad'
    })
    .add({
      translateX,
      targets: '.carousel-caption h5',
      opacity,
      duration
    })
    .add({
      targets: '.carousel-caption .btn',
      translateX,
      opacity,
      duration
    });
}

$(document).on('turbolinks:load', () => {
  loadingSpinner();

  $('.carousel').carousel({
    interval: 5000
  });

  animateCarousel();
  // when the slide begins
  $('.carousel').on('slide.bs.carousel', animateCarousel);
  // after carousel has finished sliding
  $('.carousel').on('slid.bs.carousel', animateCarousel);

  const projects = document.getElementById('sortable');
  if (projects) {
    Sortable.create(projects, {
      onEnd: afterSort
    });
    setPositions();
  }

  // when clicking the thumbnail on mobile, visit the link
  $('.project').click(evt => {
    if (window.innerWidth >= 768) return;
    const { href } = evt.currentTarget.getElementsByTagName('a')[0];
    Turbolinks.visit(href);
  });
});
