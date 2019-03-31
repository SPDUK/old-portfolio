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

function afterSort(e) {
  const order = setPositions();
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  fetch('/projects/sort', {
    method: 'PUT',
    body: JSON.stringify({ order }),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    credentials: 'same-origin'
  })
    .then(res => console.log(res))
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.log(error));
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
