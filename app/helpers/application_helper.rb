# frozen_string_literal: false

module ApplicationHelper
  def login_helper(style = "")
    if current_user.is_a?(GuestUser)
      (link_to "Register", new_user_registration_path, class: style) +
      (link_to "Login", new_user_session_path, class: style)
    else
      link_to "Logout", destroy_user_session_path, method: :delete, class: style
    end
  end


  def nav_helper(style, tag_type)
    nav_items = [
    { title: "Home", url: root_path },
    { title: "About Me", url: about_me_path },
    { title: "Contact", url: contact_path },
    { title: "My Blog", url: blogs_path },
    { title: "Projects", url: projects_path }
    ]
    nav_links = ""
    nav_items.each do |link|
      nav_links << "<#{tag_type}><a href=#{link[:url]} class='#{style} #{active? link[:url]}'>#{link[:title]}</a></#{tag_type}>"
    end
    nav_links.html_safe
  end


  def active?(path)
    "active" if current_page? path
  end


  # if any alerts exist, load a gritter alert for it
  def alerts
    alert = (flash[:alert] || flash[:error] || flash[:notice])
    if alert
      alert_generator(alert)
    end
  end

  # generate an alart based on the error message passed in (eg: works for blog.errors)
  def alert_generator(msg)
    js add_gritter(msg, sticky: false)
  end

  # jQuery (full), popper.js, bootstrap js&css, js-cookie
  def cdn_links
    %{
      <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
      <script
      src="https://code.jquery.com/jquery-3.4.0.min.js"
      integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg="
      crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
      <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/flatly/bootstrap.min.css" rel="stylesheet" integrity="sha384-T5jhQKMh96HMkXwqVMSjF3CmLcL1nT9//tCqu9By5XSdj7CwR0r+F3LTzUdfkkQf" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,400i" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Poppins:700" rel="stylesheet">
  }.html_safe
  end
end
