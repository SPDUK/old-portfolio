# frozen_string_literal: true

Rails.application.routes.draw do
  # custom path for devise
  devise_for :users, path: "", path_names: { sign_in: "login", sign_out: "logout", sign_up: "register" }
  root to: "pages#home"

  resources :projects, except: [:show] do
    put :sort, on: :collection
  end

  resources :blogs do
    member do
      get :toggle_status
    end
  end

  resources :topics, only: [:index, :show]



  get "projects/rails", to: "projects#rails"
  get "project/:id", to: "projects#show", as: "project_show"
end
