// used when loading the projects page initially, and when resizing the projects page

function setCarouselImage() {
  $('.carousel-item').each((idx, el) => {
    // if the screen is wide, use the main wide image, else use the thumb
    const backgroundImage =
      window.innerWidth > 768 ? $(el).attr('main-image') : $(el).attr('thumb-image');

    // if the width is very wide,
    // set a gradient around the image that fades out the edges to black
    if (window.innerWidth > 2500) {
      $(el).css({
        backgroundImage: `radial-gradient(
          circle,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) 70%,
          rgba(0, 0, 0, 1) 95%
        ),
        url('${backgroundImage}')`
      });
    } else if (window.innerWidth < 768) {
      $(el).css({
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 36%, rgba(0,0,0,1) 75%),
      url('${backgroundImage}')`
      });
    } else {
      $(el).css({
        backgroundImage: `url('${backgroundImage}')`
      });
    }
  });
}
