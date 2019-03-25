# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # makes sure the name was supplied
  validates_presence_of :name

  # virtual attrs
  def first_name
    # self is the specific User (eg: User.last.first_name)
    self.name.split.first
  end
  def last_name
    self.name.split.last
  end
end
