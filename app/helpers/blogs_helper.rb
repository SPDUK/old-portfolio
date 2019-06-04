# frozen_string_literal: true

module BlogsHelper
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
