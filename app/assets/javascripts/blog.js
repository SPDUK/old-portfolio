//= require rails-ujs
//= require activestorage
//= require cable
//= require turbolinks
//= require gritter
//= require navbars/blogNav
//= require helpers/loadingSpinner
//= require helpers/copyToClipboard

const handleShareClick = () => {
  copyToClipboard(
    window.location.href,
    'Link URL copied to clipboard! 👍',
    $('.blog-title-text h4').text()
  );
};
$(document).on('turbolinks:load', () => {
  loadingSpinner();

  $('#share').click(handleShareClick);
});
