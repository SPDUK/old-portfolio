# frozen_string_literal: true

class TopicsController < ApplicationController
  layout "blog"
  before_action :header_topics
  before_action :set_topic, only: :destroy

  access all: [:show],
         user: [:show],
         site_admin: :all

  def index
    @topics = Topic.all
  end

  def new
    @topic = Topic.new
  end

  def create
    @topic = Topic.new(topic_params)
    respond_to do |format|
      if @topic.save
        format.html { redirect_to blogs_path, notice: "Topic was successfully created." }
      else
        format.html { render :new }
      end
    end
  end

  def destroy
    @topic.destroy
    respond_to do |format|
      format.html { redirect_to blogs_url, notice: "Topic was successfully destroyed." }
    end
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


    def set_topic
      @topic = Topic.find(params[:id])
    end


    def topic_params
      params.require(:topic).permit([:title, :icon])
    end
end
