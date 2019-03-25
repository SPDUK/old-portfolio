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
    OpenStruct.new(name: "Guest User",
                  first_name: "Guest",
                  last_name: "User",
                  email: "guest@example.com")
  end
end
