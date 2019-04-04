# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :blog

  validates :content, presence: true, length: { minimum: 5, maximum: 1000 }

  # runs right after comment creation
  # perform_later runs the job as soon as it possibly can, but not instantly (queues it)
  after_create_commit { CommentBroadcastJob.perform_later(self) }
end
