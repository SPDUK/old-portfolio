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

---

When uploading an image the resolutions should be

- Main image: 600x400
- Thumb image: 350x200

---

---

**During development use Docker**
Create the DB: `./run rake db:create`
Migrate the DB: `./run rake db:migrate`

simply start the server with `docker-compose up`

---

To generate placeholder content run `./run rake db:setup` and a test admin user is created as `hello@world.com` with the password `password`.
You can modify the seeds in the `/db/seeds.rb` file.

To give a user admin, currently run `./run rails console` and then enter `User.first.update!(roles: [:site_admin])`
Or update the correct user by finding it first if you have multiple test users.

---

### Background Image

The background images should have 4 versions for different resolutions, and 2 variants (light/dark)
It builds a URL like so`.../firewatch-${color}-${width}.jpg` where color will be `light` or `dark` and `width` is one of:

- 3840 (4k, 3840x2160)
- 2560 (1440p, 2560x1440)
- 1920 (1080p, 1920x1080)
- 420 (mobile, 900x420)

So for example an image should be named `firewatch-dark-1080.jpg` when uploaded to cloudinary.
Any hidpi/modern phones will download the 1080p image.
