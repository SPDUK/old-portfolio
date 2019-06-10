let listAnimated = false;
function animateInfoList() {
  if (listAnimated) return;
  anime
    .timeline()
    .add({
      targets: '.application-info-list li',
      easing: 'easeOutExpo',
      opacity: [0, 1],
      translateX: [100, 0],
      delay: anime.stagger(350)
    })
    .add({
      targets: '.application-info-animate',
      easing: 'easeOutExpo',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(250, { grid: [3, 1], from: 2 })
    });

  listAnimated = true;
}
