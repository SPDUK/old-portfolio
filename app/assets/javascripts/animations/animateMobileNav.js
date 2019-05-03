function animateMobileNav() {
  $('.navbar-toggler').click(() => {
    if ($('.collapsed')[0]) {
      anime({
        targets: '.nav-link',
        opacity: [0, 1],
        duration: 900,
        easing: 'easeOutExpo',
        delay: anime.stagger(110)
      });
    }
  });
}
