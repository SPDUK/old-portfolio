# frozen_string_literal: true

class AddFeaturedToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :featured, :boolean
  end
end
