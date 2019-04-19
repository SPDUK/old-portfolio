function drawStars() {
  // helpers
  function lineToAngle(x1, y1, length, radians) {
    const x2 = x1 + length * Math.cos(radians);
    const y2 = y1 + length * Math.sin(radians);
    return { x: x2, y: y2 };
  }

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function degreesToRads(degrees) {
    return (degrees / 180) * Math.PI;
  }

  // particle
  const particle = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 0,

    create(x, y, speed, direction) {
      const obj = Object.create(this);
      obj.x = x;
      obj.y = y;
      obj.vx = Math.cos(direction) * speed;
      obj.vy = Math.sin(direction) * speed;
      return obj;
    },

    getSpeed() {
      return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    },

    setSpeed(speed) {
      const heading = this.getHeading();
      this.vx = Math.cos(heading) * speed;
      this.vy = Math.sin(heading) * speed;
    },

    getHeading() {
      return Math.atan2(this.vy, this.vx);
    },

    setHeading(heading) {
      const speed = this.getSpeed();
      this.vx = Math.cos(heading) * speed;
      this.vy = Math.sin(heading) * speed;
    },

    update() {
      this.x += this.vx;
      this.y += this.vy;
    }
  };

  // Canvas and settings
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);
  const stars = [];
  const shootingStars = [];
  const layers = [
    { speed: 0.015, scale: 0.2, count: 320 },
    { speed: 0.03, scale: 0.5, count: 50 },
    { speed: 0.05, scale: 0.75, count: 30 }
  ];
  const starsAngle = 145;
  const shootingStarSpeed = {
    min: 10,
    max: 20
  };
  const shootingStarOpacityDelta = 0.01;
  const trailLengthDelta = 0.01;
  const shootingStarEmittingInterval = 900;
  const shootingStarLifeTime = 600;
  const maxTrailLength = 300;
  const starBaseRadius = 2;
  const shootingStarRadius = 3;
  $(window).click(createShootingStar);

  // create all stars
  for (let j = 0; j < layers.length; j += 1) {
    const layer = layers[j];
    for (let i = 0; i < layer.count; i += 1) {
      const star = particle.create(randomRange(0, width), randomRange(0, height), 0, 180);
      star.radius = starBaseRadius * layer.scale;
      star.setSpeed(layer.speed);
      star.setHeading(degreesToRads(starsAngle));
      stars.push(star);
    }
  }

  function createShootingStar() {
    const shootingStar = particle.create(
      randomRange(width / 2, width),
      randomRange(0, height / 2),
      0,
      0
    );
    shootingStar.setSpeed(randomRange(shootingStarSpeed.min, shootingStarSpeed.max));
    shootingStar.setHeading(degreesToRads(randomRange(110, 180)));
    shootingStar.radius = shootingStarRadius;
    shootingStar.opacity = 0;
    shootingStar.trailLengthDelta = 0;
    shootingStar.isSpawning = true;
    shootingStar.isDying = false;
    shootingStars.push(shootingStar);
  }

  function killShootingStar(shootingStar) {
    setTimeout(function() {
      shootingStar.isDying = true;
    }, shootingStarLifeTime);
  }

  function drawShootingStar(p) {
    const { x } = p;
    const { y } = p;
    const currentTrailLength = maxTrailLength * p.trailLengthDelta;
    const pos = lineToAngle(x, y, -currentTrailLength, p.getHeading());

    context.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;

    const starLength = 5;
    context.beginPath();
    context.moveTo(x - 1, y + 1);

    context.lineTo(x, y + starLength);
    context.lineTo(x + 1, y + 1);

    context.lineTo(x + starLength, y);
    context.lineTo(x + 1, y - 1);

    context.lineTo(x, y + 1);
    context.lineTo(x, y - starLength);

    context.lineTo(x - 1, y - 1);
    context.lineTo(x - starLength, y);

    context.lineTo(x - 1, y + 1);
    context.lineTo(x - starLength, y);

    context.closePath();
    context.fill();

    // trail
    context.fillStyle = `rgba(255, 221, 157, ${p.opacity})`;
    context.beginPath();
    context.moveTo(x - 1, y - 1);
    context.lineTo(pos.x, pos.y);
    context.lineTo(x + 1, y + 1);
    context.closePath();
    context.fill();
  }

  function drawStar(star) {
    context.fillStyle = 'rgb(255, 255,255)';
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
    context.fill();
  }

  function update() {
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgb(0,0,0,0)';
    context.fillRect(0, 0, width, height);
    context.fill();

    for (let i = 0; i < stars.length; i += 1) {
      const star = stars[i];
      star.update();
      drawStar(star);
      if (star.x > width) {
        star.x = 0;
      }
      if (star.x < 0) {
        star.x = width;
      }
      if (star.y > height) {
        star.y = 0;
      }
      if (star.y < 0) {
        star.y = height;
      }
    }

    for (let i = 0; i < shootingStars.length; i += 1) {
      const shootingStar = shootingStars[i];
      if (shootingStar.isSpawning) {
        shootingStar.opacity += shootingStarOpacityDelta;
        if (shootingStar.opacity >= 1.0) {
          shootingStar.isSpawning = false;
          killShootingStar(shootingStar);
        }
      }
      if (shootingStar.isDying) {
        shootingStar.opacity -= shootingStarOpacityDelta;
        if (shootingStar.opacity <= 0.0) {
          shootingStar.isDying = false;
          shootingStar.isDead = true;
        }
      }
      shootingStar.trailLengthDelta += trailLengthDelta;

      shootingStar.update();
      if (shootingStar.opacity > 0.0) {
        drawShootingStar(shootingStar);
      }
    }

    // delete dead shooting shootingStars
    for (let i = shootingStars.length - 1; i >= 0; i -= 1) {
      if (shootingStars[i].isDead) {
        shootingStars.splice(i, 1);
      }
    }
    requestAnimationFrame(update);
  }

  update();

  // shooting stars
  setInterval(createShootingStar, shootingStarEmittingInterval);
}
