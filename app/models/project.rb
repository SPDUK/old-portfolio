# frozen_string_literal: true

class Project < ApplicationRecord
  # tells projects it needs to call mount_uploader from carrierwave
  mount_uploader :thumb_image, ProjectUploader
  mount_uploader :main_image, ProjectUploader


  extend FriendlyId
  friendly_id :title, use: :slugged

  validates_presence_of :title, :body, :main_image, :thumb_image

  # not featured projects (bottom grid)
  def self.by_position
    where(featured: false).order(:position)
  end

  # featured projects (carousel)
  def self.featured
    where(featured: true).order(created_at: :desc)
  end
end
