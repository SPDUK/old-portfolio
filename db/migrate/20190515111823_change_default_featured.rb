# frozen_string_literal: true

class ChangeDefaultFeatured < ActiveRecord::Migration[5.2]
  def change
    change_column :projects, :featured, :boolean, default: false
  end
end
