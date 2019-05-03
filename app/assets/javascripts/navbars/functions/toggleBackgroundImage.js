// used to toggle the background image based on a passed in theme color
function getImageWidth() {
  const w = $(document).width();
  if (w > 2560) return 3840; // 4k
  if (w > 1920) return 2560; // 1440p
  // if weird proportions (very tall but not widescreen..?)
  const h = $(window).height();
  if (h > 850) return 2560; // 1440p just to fit vertical space
  // if a very wide mobile screen or tablet
  if (w > 400) return 1920; // 1080p
  return 420; // mobile
}
const bgUrl = color =>
  `url('https://res.cloudinary.com/dmjolhdaq/image/upload/v1555440140/Portfolio/firewatch-${color}-${getImageWidth()}.jpg')`;

function toggleBackgroundImage(color) {
  const bg = document.getElementById('bg');
  const bg2 = document.getElementById('bg2');
  const opposite = color === 'dark' ? 'light' : 'dark';

  // if the url hasn't changed, don't do anything
  const url = bgUrl(color);
  if (url === bg.style.background) return;
  bg.style.backgroundImage = url;
  bg2.style.backgroundImage = bgUrl(opposite);
}
