# frozen_string_literal: true

class Project < ApplicationRecord
  include Placeholder

  # tells projects it needs to call mount_uploader from carrierwave
  mount_uploader :thumb_image, ProjectUploader
  mount_uploader :main_image, ProjectUploader

  has_many :technologies
  # allow nesting of technologies while creating a Project
  # Project.create(title: ..., .., technologies_attributes: [{name: "some technology"}])
  accepts_nested_attributes_for :technologies,
                                reject_if: ->(attrs) { attrs["name"].blank? }

  validates_presence_of :title, :body, :main_image, :thumb_image




  def self.by_position
    order(:position)
  end

  def self.rails
    where(subtitle: "Ruby on Rails")
  end

  # after a project has been initialized (Project.new)
  after_initialize :set_defaults

  def set_defaults
    # self is the current item being created
    self.main_image ||= Placeholder.image_generator(height: "600", width: "400")
    self.thumb_image ||= Placeholder.image_generator(height: "350", width: "200")
  end
end
