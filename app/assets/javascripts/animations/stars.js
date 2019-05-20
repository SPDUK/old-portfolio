function drawStars() {
  // remove the snow canvas
  $('#snow').remove();

  // add the stars canvas and draw it
  if (!$('#stars').length) {
    $('body').append($('<div id=stars></div>'));
  }
  particlesJS('stars', {
    particles: {
      number: {
        value: 160,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 1.5,
        random: true,
        anim: {
          enable: false,
          speed: 3,
          size_min: 0.3,
          sync: false
        }
      },
      line_linked: {
        enable: false
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'bubble'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 250,
          size: 2,
          duration: 2,
          opacity: 1,
          speed: 3
        },
        push: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}
