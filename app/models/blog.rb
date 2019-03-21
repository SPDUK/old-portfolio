# frozen_string_literal: true

class Blog < ApplicationRecord
  # handles permission for checking if a blog is visible to the public
  enum status: { draft: 0, published: 1 }
  extend FriendlyId
  friendly_id :title, use: :slugged
end
