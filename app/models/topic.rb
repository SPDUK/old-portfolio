# frozen_string_literal: true

class Topic < ApplicationRecord
  validates_presence_of :title, :icon
  has_many :blogs

  extend FriendlyId
  friendly_id :title, use: :slugged


  def self.with_blogs
    # filter out any topics that do not have any blogs associated to them
    includes(:blogs).where.not(blogs: { id: nil, status: "draft"  })
  end
end
