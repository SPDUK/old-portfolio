# frozen_string_literal: true

# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!



# changes error tag provided by actionview to add a bootstrap is-invalid class instead
ActionView::Base.field_error_proc = proc do |html_tag, _instance|
  class_attr_index = html_tag.index 'class="'

  if class_attr_index
    html_tag.insert class_attr_index + 7, "is-invalid "
  else
    html_tag.insert html_tag.index(">"), ' class="is-invalid"'
  end
end
