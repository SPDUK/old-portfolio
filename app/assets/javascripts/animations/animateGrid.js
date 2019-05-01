let animated = false;
function animateIconGrid() {
  if (animated) return;
  anime({
    targets: '.application-info-icons .col-3',
    easing: 'easeOutExpo',
    opacity: [0, 1],
    delay: anime.stagger(350, { grid: [4, 5], from: 'center' })
  });
  animated = true;
}
