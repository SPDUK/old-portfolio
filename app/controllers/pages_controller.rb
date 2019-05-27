# frozen_string_literal: true

class PagesController < ApplicationController
  def home
    @topics = Topic.all
  end
end
