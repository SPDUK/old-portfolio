# frozen_string_literal: true

class Project < ApplicationRecord
  # tells projects it needs to call mount_uploader from carrierwave
  mount_uploader :thumb_image, ProjectUploader
  mount_uploader :main_image, ProjectUploader

  has_many :technologies, dependent: :delete_all
  # allow nesting of technologies while creating a Project
  # Project.create(title: ..., .., technologies_attributes: [{name: "some technology"}])
  accepts_nested_attributes_for :technologies,
                                # we can delete nested attributes (technologies)
                                allow_destroy: true,
                                reject_if: ->(attrs) { attrs["name"].blank? }

  validates_presence_of :title, :body, :main_image, :thumb_image




  # not featured projects (bottom grid)
  def self.by_position
    where(featured: false).order(:position)
  end

  # featured projects (carousel)
  def self.featured
    where(featured: true)
  end
end
