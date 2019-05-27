# frozen_string_literal: true

# test admin user for development

User.create!(email: "hello@world.com", name: "hello", password: "password", roles: [:site_admin]) if Rails.env == "development"
# edit topics here



# add a topic icon + title here, or create one after logging in
topics = [
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302614/Portfolio/html5-original.svg", title: "HTML" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302560/Portfolio/css3-original.svg", title: "CSS" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302758/Portfolio/sass-original.svg", title: "Sass" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302644/Portfolio/jquery-original.svg", title: "jQuery" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302682/Portfolio/javascript-original.svg", title: "JavaScript" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302738/Portfolio/ruby-original.svg", title: "Ruby" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302819/Portfolio/rails-original-wordmark.svg", title: "Rails" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556303055/Portfolio/logo-elixir.svg", title: "Elixir" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302728/Portfolio/react-original.svg", title: "React" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556304915/Portfolio/redux-original.svg", title: "Redux" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302721/Portfolio/nodejs-original.svg", title: "Node.js" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302786/Portfolio/webpack-original.svg", title: "Webpack" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302631/Portfolio/heroku-original.svg", title: "Heroku" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302849/Portfolio/google-original.svg", title: "Google Cloud" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302578/Portfolio/docker-original.svg", title: "Docker" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556304721/Portfolio/postgresql-original.svg", title: "PostgreSQL" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302711/Portfolio/mongodb-original.svg", title: "MongoDB" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556304915/Portfolio/redis-original.svg", title: "Redis" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302663/Portfolio/git-original.svg", title: "Git" },
    { icon: "https://res.cloudinary.com/dmjolhdaq/image/upload/v1556302702/Portfolio/linux-original.svg", title: "Linux" }
]



topics.each do |topic|
  Topic.create!(title: topic[:title], icon: topic[:icon])
end
puts "topics created"

10.times do |idx|
  Blog.create!(
    title: "My Blog Post #{idx}",
    body: "Duis vel erat quis nunc blandit finibus. Ut aliquam sit amet mi a aliquet. Mauris vehicula leo at eros pulvinar, quis tincidunt metus egestas. Donec vestibulum massa a velit gravida vulputate. Nunc sed tellus tincidunt, mollis metus a, venenatis metus. Cras tellus eros, euismod non tortor nec, maximus hendrerit velit. Pellentesque maximus, augue eget scelerisque faucibus, lectus massa ornare tellus, non efficitur quam nulla ut felis. Ut feugiat quam quis eros rhoncus, nec egestas erat laoreet. Maecenas vel fermentum ex, sed elementum metus. Cras erat eros, tristique eu bibendum ut, sagittis at justo. Vestibulum diam quam, sodales sit amet leo vel, porta commodo diam. Vestibulum in quam id dui molestie ullamcorper. Praesent feugiat euismod diam, quis fringilla neque auctor nec. Etiam eu placerat tellus, at finibus magna. Integer nec consectetur arcu, nec vehicula nulla.",
    topic_id: Topic.last.id
  )
end

puts "10 blog posts created"
