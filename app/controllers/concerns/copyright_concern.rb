# frozen_string_literal: true

module CopyrightConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_copyright
  end

  def set_copyright
    @copyright = "&copy; #{Time.now.year} | <b>spdevuk</b> all rights reserved".html_safe
  end
end
