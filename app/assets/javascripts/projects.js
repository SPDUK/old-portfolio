//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require cocoon
//= require gritter
//= require Sortable.min.js

function ready(fn) {
  if (
    document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

if (window.location.pathname === '/projects') {
  ready();
}

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
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  try {
    await fetch('/projects/sort', {
      method: 'PUT',
      body: JSON.stringify({ order }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      credentials: 'same-origin'
    });
  } catch (err) {
    console.log(err);
  }
}

ready(() => {
  const projects = document.getElementById('sortable');
  if (projects) {
    Sortable.create(projects, {
      onEnd: afterSort
    });
    setPositions();
  }
});
