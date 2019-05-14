//= require rails-ujs
//= require activestorage
//= require cable
//= require turbolinks
//= require cocoon
//= require gritter
//= require navbars/blogNav
//= require "helpers/loadingSpinner"

$(document).on('turbolinks:load', () => {
  loadingSpinner();
});
