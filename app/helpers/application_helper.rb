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

  def source_helper
    if session[:source]
      greeting = "Thanks for visiting me from #{session[:source]}"
      content_tag(:p, greeting, class: "source-greeting")
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
end
