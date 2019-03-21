# frozen_string_literal: true

class Project < ApplicationRecord
  include Placeholder
  validates_presence_of :title, :body, :main_image, :thumb_image

  def self.rails
    where(subtitle: 'Ruby on Rails')
  end

  # after a project has been initialized (Project.new)
  after_initialize :set_defaults

  def set_defaults
    # self is the current item being created
    self.main_image ||= Placeholder.image_generator(height: '600', width: '400')
    self.thumb_image ||= Placeholder.image_generator(height: '350', width: '200')
  end
end
