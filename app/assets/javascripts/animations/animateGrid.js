// simply return if it has already ran (used for scroll listener initial fade in)
let animated = false;
function animateIconGrid(from = 'center') {
  if (animated) return;
  animateGrid();
  animated = true;
}

// seperate function to be called manually sometimes
function animateGrid(from = 'center', stagger = '200') {
  anime({
    targets: '.application-icons .col-3',
    easing: 'easeOutQuad',
    opacity: [0, 1],
    delay: anime.stagger(stagger, { grid: [4, 5], from })
  });
}
