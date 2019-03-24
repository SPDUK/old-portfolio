# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # configure permitted before all devise controllers (add :name field)
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name])
  end
end
