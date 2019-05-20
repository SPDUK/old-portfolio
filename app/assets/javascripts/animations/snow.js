function drawSnow() {
  // remove the stars canvas
  $('#stars').remove();

  // add the snow canvas and draw it
  if (!$('#snow').length) $('body').append($('<div id=snow></div>'));

  particlesJS(
    'snow',

    {
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#fff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 2.5,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.2,
            sync: false
          }
        },
        line_linked: {
          enable: false
        },
        move: {
          enable: true,
          speed: 3,
          direction: 'bottom',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
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
            distance: 200,
            size: 2,
            duration: 0.4,
            opacity: 0.9,
            speed: 3
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    }
  );
}
