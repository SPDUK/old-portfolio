# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'pages#home'
  resources :projects, except: [:show]
  resources :blogs do
    member do
      get :toggle_status
    end
  end

  get 'projects/rails', to: 'projects#rails'
  get 'project/:id', to: 'projects#show', as: 'project_show'
  get '/about-me', to: 'pages#about'
  get '/contact', to: 'pages#contact'
end
