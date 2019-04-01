# README

[Set up cloudinary file uploads](https://cloudinary.com/documentation/rails_integration)
Create `cloudinary.yml` in the /config folder and fill out this info:

```
development:
  cloud_name: cloudinary_name
  api_key: 'cloudinary_api_key'
  api_secret: cloudinary_secret
  enhance_image_tag: true
  static_file_support: false
production:
  cloud_name: cloudinary_name
  api_key: 'cloudinary_api_key'
  api_secret: cloudinary_secret
  enhance_image_tag: true
  static_file_support: true
test:
  cloud_name: cloudinary_name
  api_key: 'cloudinary_api_key'
  api_secret: cloudinary_secret
  enhance_image_tag: true
  static_file_support: false
```

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...
