# frozen_string_literal: true

# TODO: remove and clean this kind of stuff up
class PagesController < ApplicationController
  def home
    @posts = Blog.all
    @skills = Skill.all
  end
end
