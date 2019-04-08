# frozen_string_literal: true

module BlogsHelper
  def gravatar_helper(user)
    image_tag "https://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(user.email)}", width: 40
  end

  def markdown(text)
    options = {
      filter_html: true,
      hard_wrap:   true
    }
    extensions = {
      autolink:           true,
      tables:             true,
      superscript:        true,
      fenced_code_blocks: true
    }
    renderer = Rouge::Renderer.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)
    markdown.render(text).html_safe
  end
end
