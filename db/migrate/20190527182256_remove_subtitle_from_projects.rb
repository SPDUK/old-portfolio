# frozen_string_literal: true

class RemoveSubtitleFromProjects < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :subtitle
  end
end
