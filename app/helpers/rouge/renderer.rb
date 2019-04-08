# frozen_string_literal: true

require "redcarpet"
require "rouge"
require_dependency "rouge/plugins/redcarpet"

class Rouge::Renderer < Redcarpet::Render::HTML
  include Rouge::Plugins::Redcarpet
end
