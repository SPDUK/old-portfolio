  # frozen_string_literal: true

  module DeviseWhitelist
    extend ActiveSupport::Concern

    included do
      # configure permitted before all devise controllers (add :name field)
      before_action :configure_permitted_parameters, if: :devise_controller?
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name])
    end
  end
