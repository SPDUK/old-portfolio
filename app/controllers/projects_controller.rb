# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show edit update destroy]
  # user authorization
  access all: [:show, :index],
  user: { except: [:destroy, :new, :create, :update, :edit, :sort] },
  site_admin: :all
  layout "project"

  def index
    @featured = Project.featured
    @projects = Project.by_position
  end

  def sort
    if logged_in?(:site_admin)
      params[:order].each do |_key, value|
        Project.find(value[:id]).update(position: value[:position])
      end
      head 200, content_type: "text/html"
    end
  end

  def new
    @project = Project.new
  end

  def show; end

  def edit; end

  def create
    @project = Project.new(project_params)
    respond_to do |format|
      if @project.save
        format.html { redirect_to projects_path, notice: "project was successfully created." }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to projects_url, notice: "project was successfully updated." }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to projects_url, notice: "Project was successfully destroyed." }
    end
  end

  private

    def set_project
      @project = Project.find(params[:id])
    end

    # whitelists the fields
    def project_params
      params.require(:project).permit(:title,
                                      :thumb_image,
                                      :thumb_image_cache,
                                      :main_image,
                                      :main_image_cache,
                                      :body,
                                      :featured)
    end
end
