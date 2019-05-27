# frozen_string_literal: true

# TODO: remove and clean this kind of stuff up
class PagesController < ApplicationController
  def home
    @topics = Topic.all
  end
end
