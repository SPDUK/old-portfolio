# frozen_string_literal: true

module CurrentUserConcern
  extend ActiveSupport::Concern
  # override current_user coming from devise
  def current_user
    # because we are overriding devise we call super to keep the original functionality
    # but add more of our own custom logic
    super || guest_user
  end
  # create a guest User struct that will act like a User but have placeholder info
  def guest_user
    guest = GuestUser.new
    guest.name = "Guest User"
    guest.first_name = "Guest"
    guest.last_name = "User"
    guest.email = "guest@example.com"
    guest
  end
end
