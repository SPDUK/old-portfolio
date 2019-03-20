# frozen_string_literal: true

Rails.application.routes.draw do
  root to: 'pages#home'
  resources :projects, except: [:show]
  resources :blogs

  get 'project/:id', to: 'projects#show', as: 'project_show'
  get '/about-me', to: 'pages#about'
  get '/contact', to: 'pages#contact'
end
