jQuery(document).on('turbolinks:load', function() {
  const comments = $('#comments');
  if (comments.length > 0) {
    App.global_chat = App.cable.subscriptions.create(
      { channel: 'BlogsChannel', blog_id: comments.data('blog-id') },
      {
        connected() {},
        disconnected() {},
        received(data) {
          return comments.append(data.comment);
        },
        send_comment(comment, blog_id) {
          return this.perform('send_comment', { comment, blog_id });
        }
      }
    );
  }
  // find the new comment form and add a function to call on submit
  // trims the text area and makes sure it has text in it, then prevents default
  // because we're using websockets for this function
  // we send the textarea.val and the blog id to the send_comment function to add the comment
  return $('#new_comment').submit(function(e) {
    const $this = $(this);
    const textarea = $this.find('#comment_content');
    if ($.trim(textarea.val()).length > 1) {
      App.global_chat.send_comment(textarea.val(), comments.data('blog-id'));
      textarea.val('');
    }
    e.preventDefault();
    return false;
  });
});
