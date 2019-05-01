// simply return if it has already ran (used for scroll listener initial fade in)
let animated = false;
function animateIconGrid(from = 'center') {
  if (animated) return;
  animateGrid();
  animated = true;
}

// seperate function to be called manually sometimes
function animateGrid(from = 'center', stagger = '350') {
  anime({
    targets: '.application-info-icons .col-3',
    easing: 'easeOutExpo',
    opacity: [0, 1],
    delay: anime.stagger(stagger, { grid: [4, 5], from })
  });
}
