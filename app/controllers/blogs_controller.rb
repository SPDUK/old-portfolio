# frozen_string_literal: true

class BlogsController < ApplicationController
  before_action :set_blog, only: %i[show edit update destroy toggle_status]
  before_action :set_header_topics, except: [:update, :create, :destroy, :toggle_status]
  # user authorization
  access all: [:show, :index],
         user: { except: [:destroy, :new, :create, :update, :edit] },
         site_admin: :all
  # declare which layout to use
  layout "blog"

  # GET /blogs
  def index
    if logged_in?(:site_admin)
      @blogs = Blog.includes(:topic).recent.page(params[:page]).per(20)
    else
      @blogs = Blog.includes(:topic).recent.published.page(params[:page]).per(20).order(created_at: :desc)
    end
    @page_title = "Blog | SP"
  end

  # GET /blogs/1
  def show
    # if the user is an admin or the blog is published, show it, else redirect back
    if logged_in?(:site_admin) || @blog.published?
      @blog = Blog.friendly.find(params[:id])
      @page_title = "#{@blog.title} | SP"
      @seo_keywords << @blog.title
    else
      redirect_to root_path, notice: "You are not authorized to access this page."
    end
  end

  # GET /blogs/new
  def new
    @blog = Blog.new
  end

  # GET /blogs/1/edit
  def edit; end

  # POST /blogs
  def create
    @blog = Blog.new(blog_params)

    respond_to do |format|
      if @blog.save
        format.html { redirect_to @blog, notice: "Blog was successfully created." }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /blogs/1
  def update
    respond_to do |format|
      if @blog.update(blog_params)
        format.html { redirect_to @blog, notice: "Blog was successfully updated." }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /blogs/1
  def destroy
    @blog.destroy
    respond_to do |format|
      format.html { redirect_to blogs_url, notice: "Blog was successfully destroyed." }
    end
  end

  def toggle_status
    if @blog.draft?
      @blog.published!
    else
      @blog.draft!
    end
    redirect_to blogs_url, notice: "Post status has been updated!"
  end


  private

    # Use callbacks to share common setup or constraints between actions.
    def set_blog
      @blog = Blog.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def blog_params
      params.require(:blog).permit(:title, :body, :topic_id, :status)
    end

    def set_header_topics
      @header_topics = Topic.with_blogs
    end
end
