# frozen_string_literal: false

module DefaultPageContent
  extend ActiveSupport::Concern

  included do
    before_action :set_page_defaults
  end

  def set_page_defaults
    @page_title = "SP | Portfolio"
    @seo_keywords = "spdevuk spduk portfolio react ruby rails elixir javascript nodejs uk england cambridge cambridgeshire"
  end
end
