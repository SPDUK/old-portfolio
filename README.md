# README

[Set up cloudinary file uploads](https://cloudinary.com/documentation/rails_integration)
Create `cloudinary.yml` in the /config folder and fill out this info:

*the api_key must be in quotes*

```
development:
  cloud_name: cloudinary_name
  api_key: 'cloudinary_api_key'
  api_secret: cloudinary_secret
  enhance_image_tag: true
  static_file_support: false
  secure: true
production:
  cloud_name: cloudinary_name
  api_key: 'cloudinary_api_key'
  api_secret: cloudinary_secret
  enhance_image_tag: true
  static_file_support: true
  secure: true
test:
  cloud_name: cloudinary_name
  api_key: 'cloudinary_api_key'
  api_secret: cloudinary_secret
  enhance_image_tag: true
  static_file_support: false
  secure: true
```



---

**During development use Docker**
Allow the `run.sh` script to be run with `chmod u+x ./run.sh`, this will run `docker compose run app` so we can run commands just like we would if it wasn't inside docker.
Create the DB: `./run rake db:create`
Migrate the DB: `./run rake db:migrate`

simply start the server with `docker-compose up`

Visit `localhost:3000` where the server is running.

---

To generate placeholder content run `./run rake db:seed` and a test admin user is created as
`hello@world.com` with the password `password`.
You can modify the seeds in the `/db/seeds.rb` file.

To give a user admin, currently run `./run rails console` and then enter `User.first.update!(roles: [:site_admin])`
Or update the correct user by finding it first if you have multiple test users.

---

### Home Background Image

The background images should have 4 versions for different resolutions, and 2 variants (light/dark)
It builds a URL like so`.../firewatch-${color}-${width}.jpg` where color will be `light` or `dark` and `width` is one of:

- 3840 (4k, 3840x2160)
- 2560 (1440p, 2560x1440)
- 1920 (1080p, 1920x1080)
- 420 (mobile, 420x900)

So for example an image should be named `firewatch-dark-1080.jpg` when uploaded to cloudinary.
Any hidpi/modern phones will download the 1080p image.


### Project Images


When uploading an image for the projects, the resolutions should be
  - Main image: 2500x800
  - Thumb image: 768x768

The top 60px of all main image should be blurred (5px gaussian blur, preserve alpha) to enable the blur effect.

The main image will be used in the carousel if it's featured, it will also be a full width banner on the view page.


### Other info

The width of the blogs container is set up to be 80 characters wide at most, so 99% of code will naturally fit correctly inside the container.

`!important` is used sometimes with the css, it is used to prevent the styles being reset when changing themes, as bootstrap also likes to use `!important` too, not a big deal, but if you remove it bootstrap will override the styles when the theme is changed.

---

### Deployment

When deploying we use the `docker-compose.prod.yml` setup, where we launch an nginx server and serve the static files from rails with it, so after deploying you can just visit the website and nginx is already set up.

The database is hosted on the same server as the rails app.

**Initial setup**

- Create a digital ocean droplet, a \$5 one is good enough.
- ssh into the droplet, clone the repo, and open the directory with `cd portfolio`
- _we'll need to create the files being ignored by git and fill in the info._
- `sudo nano config/master.key` copy/paste a rails secret into it.
- `sudo nano config/cloudinary.yml` copy/paste the cloudinary.yml settings into it
- `cp deploy/post-receive .git/hooks && chmod +x .git/hooks/post-receive` to copy the post-recieve file in this repo to the `.git` folder
- `chmod +x deploy/deploy.sh && ./deploy/deploy.sh` to run the initial deployment which will start up the server.

Docker should start up, build the containers and load nginx, now we can visit the droplet and see it live.
Because we're using [volumes](https://docs.docker.com/storage/volumes/) for the database the data will persist even if the containers are stopped or deleted.

**Set up remote to track changes with git**

We previously set up git hooks, we can set the remote for production (locally) `git remote add production ssh://somebody@somewebsite.com/~/portfolio/.git` to assign our remote as the git repo contained in this specific project we cloned.

Now we have done this, to deploy to production all we need to do is `git push production` when we make changes we want to push.

(For future me, this can be done with [github webhooks](https://developer.github.com/webhooks/) instead, or better with a proper CI/CD tool like travis or circleci, but all I care about here is pushing stuff to the server.)

**Set up domain**

- Use [cloudflare](https://www.cloudflare.com/) for basic DDOS protection and caching.
- Set up the cloudflare DNS settings and domain settings to point to the DO droplet.

**Set up certbot for HTTPS**
- Install certbot
  ```
    sudo apt-get update
    sudo apt-get install software-properties-common
    sudo add-apt-repository universe
    sudo add-apt-repository ppa:certbot/certbot
    sudo apt-get update
    sudo apt-get install -y certbot python-certbot-nginx
    sudo certbot --nginx
  ```
- Get the cert (replace domain.com and www.domain.com with the correct domains)
  
  ```
  sudo certbot certonly --webroot -w /root/certs-data/ -d domain.com -d www.domain.com
  ```
- Our site now has HTTPS, and it should have created a renew script in `/etc/cron.d/certbot`, if it didn't just create a cronjob to renew it.