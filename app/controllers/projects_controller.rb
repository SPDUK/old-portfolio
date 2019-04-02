# frozen_string_literal: true

class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show edit update destroy]
  # user authorization
  access all: [:show, :index, :rails],
  user: { except: [:destroy, :new, :create, :update, :edit, :sort] },
  site_admin: :all
  layout "project"

  def index
    @projects = Project.by_position
  end

  def rails
    @rails = Project.rails
  end

  # TODO: fix
  # this is a bad query that could be better by limiting the amount of updates or doing it all at once
  def sort
    params[:order].each do |order|
      Project.find(order[:id]).update(position: order[:position])
    end
    head 200, content_type: "text/html"
  end

  def new
    @project = Project.new
    # instantiates 3 technologies for the project and makes them available to the form
    3.times { @project.technologies.build }
  end

  def show; end

  def edit; end

  def create
    @project = Project.new(project_params)
    respond_to do |format|
      if @project.save
        format.html { redirect_to projects_path, notice: "project was successfully created." }
        format.json { render :show, status: :created, location: @project }
      else
        format.html { render :new }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to projects_url, notice: "project was successfully updated." }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to projects_url, notice: "Project was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

    def set_project
      @project = Project.find(params[:id])
    end

    # whitelists the fields and technologies_attributes
    def project_params
      params.require(:project).permit(:title,
                                      :subtitle,
                                      :thumb_image,
                                      :main_image,
                                      :body,
                                      technologies_attributes: [:name])
    end
end
