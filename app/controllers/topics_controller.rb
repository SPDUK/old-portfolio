# frozen_string_literal: true

class TopicsController < ApplicationController
  layout "blog"
  before_action :set_navbar_topics

  def index
    @topics = Topic.all
  end

  def show
    @topic = Topic.find(params[:id])
    if logged_in?(:site_admin)
      @blogs = @topic.blogs.recent.page(params[:page]).per(5)
    else
      @blogs = @topic.blogs.recent.published.page(params[:page]).per(5).order(created_at: :desc)
    end
    @page_title = "My blogs!"
  end

  private

    def set_navbar_topics
      @navbar_topics = Topic.with_blogs
    end
end
