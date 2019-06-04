# frozen_string_literal: false

module ApplicationHelper
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



  # wrap each link in a tag type, optionally pass in a class
  # only use turbolinks when visiting the same path that they are currently on
  # it "loads" twice otherwise and ruins the loading animation
  def nav_helper(style, tag_type)
    nav_items = [
    { title: "HOME", url: root_path },
    { title: "BLOG", url: blogs_path },
    { title: "PROJECTS", url: projects_path },
    { title: "GITHUB", url: "https://github.com/SPDUK" }
    ]
    nav_links = ""
    nav_items.each do |link|
      nav_links << "<#{tag_type}><a href=#{link[:url]} class='#{style} #{active? link[:url]}'  data-turbolinks=#{use_turbo? link[:url]}>#{link[:title]}</a></#{tag_type}>"
    end
    nav_links.html_safe
  end

  def use_turbo?(path)
    current_page? path || (path == "/blogs" && controller_name == "blogs")
  end




  # also applies active to blogs while on blog routes
  def active?(path)
    if current_page? path
      "active"
    elsif path === "/blogs" && controller_name === "blogs"
      "active"
    elsif path === "/blogs" && controller_name === "topics"
      "active"
    end
  end


  # if any alerts exist, load a gritter alert for it
  # generate an alart based on the error message passed in (eg: works for blog.errors)
  def alerts
    notice = (flash[:alert] || flash[:notice])
    error = flash[:error]
    if error
      error_generator(error)
    elsif notice
      alert_generator(notice)
    end
  end

  def error_generator(error)
    js add_gritter(error, title: "Error!", sticky: true)
  end

  def alert_generator(notice)
    js add_gritter(notice, sticky: false, time: 1000)
  end


  # jQuery (full), popper.js, bootstrap js&css, js-cookie, anime.js
  def cdn_links
    %{
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <script
      src="https://code.jquery.com/jquery-3.4.0.min.js"
      integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
      crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/flatly/bootstrap.min.css" rel="stylesheet" integrity="sha384-T5jhQKMh96HMkXwqVMSjF3CmLcL1nT9//tCqu9By5XSdj7CwR0r+F3LTzUdfkkQf" crossorigin="anonymous" id="bootstrap-light" disabled="false">
      <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.min.js"></script>
  }.html_safe
  end
end
