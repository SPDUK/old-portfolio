# frozen_string_literal: true

class CommentsController < ApplicationController
  # grab the current user and build a comment (automatically associates the comment to the user)
  def create
    @comment = current_user.comments.build(comment_params)
  end

  private

    def comment_params
      params.require(:comment).permit(:content)
    end
end
