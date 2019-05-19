# frozen_string_literal: true

class RemoveComments < ActiveRecord::Migration[5.2]
  def change
    drop_table :comments do |t|
      t.text :content
      t.references :user, foreign_key: true
      t.references :blog, foreign_key: true

      t.timestamps
    end
  end
end
