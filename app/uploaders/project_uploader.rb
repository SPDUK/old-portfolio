# frozen_string_literal: true

# TODO: make this always use https
class ProjectUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  process tags: ["portfolio"]



  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_whitelist
    %w(jpg jpeg gif png)
  end
end
