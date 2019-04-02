# frozen_string_literal: true

class Skill < ApplicationRecord
  validates_presence_of :title, :percent

  # after_initialize :set_defaults

  # def image_generator(height:, width:)
  #   "https://placehold.it/#{height}x#{width}"
  # end
  # def set_defaults
  #   self.badge ||= image_generator(height: "250", width: "250")
  # end
end
