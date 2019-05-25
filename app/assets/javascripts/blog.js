//= require rails-ujs
//= require activestorage
//= require cable
//= require turbolinks
//= require cocoon
//= require gritter
//= require navbars/blogNav
//= require "helpers/loadingSpinner"

async function copyLink() {
  // this only works with https or while using localhost
  await navigator.clipboard.writeText(window.location.href);
  $.gritter.add({
    title: 'Link copied to clipboard! 🤍',
    text: ' ',
    time: 3000
  });
}
$(document).on('turbolinks:load', () => {
  loadingSpinner();

  $('#share').click(copyLink);
});
