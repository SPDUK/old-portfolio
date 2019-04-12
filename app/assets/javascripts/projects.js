//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require cocoon
//= require gritter

// returns a new array with the data pos added on to the card, and
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

$(document).on('turbolinks:load', () => {
  const projects = document.getElementById('sortable');
  if (projects) {
    Sortable.create(projects, {
      onEnd: afterSort
    });
    setPositions();
  }
});
