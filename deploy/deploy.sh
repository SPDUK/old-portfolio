#!/bin/bash
# stop the currently running server
docker-compose down

prod="docker-compose.prod.yml"
# build the containers
docker-compose -f $prod build 
# create and migrate the DB to the latest versions
docker-compose run -f $prod app rake db:create RAILS_ENV=production
docker-compose run -f $prod app rake db:migrate RAILS_ENV=production

# run the server
docker-compose -f $prod up -d