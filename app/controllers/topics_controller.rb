# frozen_string_literal: true

class TopicsController < ApplicationController
  layout "blog"
  before_action :header_topics

  def index
    @topics = Topic.all
  end

  def show
    @topic = Topic.find(params[:id])
    if logged_in?(:site_admin)
      @blogs = @topic.blogs.recent
    else
      @blogs = @topic.blogs.recent.published.order(created_at: :desc)
    end
    @page_title = "My blogs!"
  end

  private
    def header_topics
      @header_topics = Topic.with_blogs
    end
end
