Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'modal_dashboards#index'

  get 'modal_dashboards/index'

  post 'modal_dashboards/create_user', to: 'modal_dashboards#create_user'
  post 'modal_dashboards/create_employment', to: 'modal_dashboards#create_employment'
  get '/employment_form', to: 'modal_dashboards#employment_form'
end
