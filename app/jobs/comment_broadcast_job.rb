# frozen_string_literal: true

class CommentBroadcastJob < ApplicationJob
  # queue to take in comments in the correct order
  queue_as :default
  def perform(comment)
    # broadcast the comment to the correct channel
    ActionCable.server.broadcast("blogs_#{comment.blog.id}_channel", comment: render_comment(comment))
  end

    private
      def render_comment(comment)
        CommentsController.render partial: "comments/comment", locals: { comment: comment }
      end
end
