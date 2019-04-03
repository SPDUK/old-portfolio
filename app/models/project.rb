# frozen_string_literal: true

class Project < ApplicationRecord
  # tells projects it needs to call mount_uploader from carrierwave
  mount_uploader :thumb_image, ProjectUploader
  mount_uploader :main_image, ProjectUploader

  has_many :technologies
  # allow nesting of technologies while creating a Project
  # Project.create(title: ..., .., technologies_attributes: [{name: "some technology"}])
  accepts_nested_attributes_for :technologies,
                                # we can delete nested attributes (technologies)
                                allow_destroy: true,
                                reject_if: ->(attrs) { attrs["name"].blank? }

  validates_presence_of :title, :body, :main_image, :thumb_image




  def self.by_position
    order(:position)
  end

  def self.rails
    where(subtitle: "Ruby on Rails")
  end
end
