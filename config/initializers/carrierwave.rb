# frozen_string_literal: true

CarrierWave.configure do |config|
  # throw errors if failing in dev
  config.ignore_integrity_errors = false
  config.ignore_processing_errors = false
  config.ignore_download_errors = false
end
