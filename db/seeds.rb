# frozen_string_literal: true

3.times do |idx|
  Topic.create!(title: "Topic #{idx}")
end
puts '3 topics created'
10.times do |idx|
  Blog.create!(
    title: "My Blog Post #{idx}",
    body: 'Duis vel erat quis nunc blandit finibus. Ut aliquam sit amet mi a aliquet. Mauris vehicula leo at eros pulvinar, quis tincidunt metus egestas. Donec vestibulum massa a velit gravida vulputate. Nunc sed tellus tincidunt, mollis metus a, venenatis metus. Cras tellus eros, euismod non tortor nec, maximus hendrerit velit. Pellentesque maximus, augue eget scelerisque faucibus, lectus massa ornare tellus, non efficitur quam nulla ut felis. Ut feugiat quam quis eros rhoncus, nec egestas erat laoreet. Maecenas vel fermentum ex, sed elementum metus. Cras erat eros, tristique eu bibendum ut, sagittis at justo. Vestibulum diam quam, sodales sit amet leo vel, porta commodo diam. Vestibulum in quam id dui molestie ullamcorper. Praesent feugiat euismod diam, quis fringilla neque auctor nec. Etiam eu placerat tellus, at finibus magna. Integer nec consectetur arcu, nec vehicula nulla.',
    topic_id: Topic.last.id
  )
end

puts '10 blog posts created'

5.times do |idx|
  Skill.create!(
    title: "Rails #{idx}",
    percent: 15
  )
end

puts '5 skills created'

8.times do |idx|
  Project.create!(
    title: "Project title: #{idx}",
    subtitle: 'Ruby on Rails',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non risus ac augue elementum cursus ut vitae purus. Curabitur ligula odio, imperdiet vel venenatis quis.',
    main_image: 'http://placehold.it/600x400',
    thumb_image: 'http://placehold.it/350x200'
  )
end
Project.create!(
  title: 'Project title: 8 for Angular',
  subtitle: 'Angular',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non risus ac augue elementum cursus ut vitae purus. Curabitur ligula odio, imperdiet vel venenatis quis.',
  main_image: 'http://placehold.it/600x400',
  thumb_image: 'http://placehold.it/350x200'
)
puts '9 projects created'

3.times do |idx|
  Project.last.technologies.create!(
    name: "Technology #{idx}"
  )
end

puts '3 technologies created'
