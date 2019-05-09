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

  def blog_status_icon(blog)
    blog.draft? ? "mr-3 fa-upload" : "mr-3 fa-check"
  end

  # calculates the read time based on 200 words per minute
  def read_time(text)
    num_words = text.scan(/\s/).length
    time = num_words / 200
    # if the read time is less than 1 minute, just return 1
    time > 0 ? time : 1
  end
end
