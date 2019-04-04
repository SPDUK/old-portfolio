# frozen_string_literal: true

class GuestUser < User
  # has :id so warden can find it
  attr_accessor :name, :first_name, :last_name, :email, :id
end
