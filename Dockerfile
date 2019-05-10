FROM ruby:2.6.0
RUN apt-get update -qq && apt-get install -y nodejs
RUN mkdir /portfolio
WORKDIR /portfolio

COPY Gemfile /portfolio/Gemfile
COPY Gemfile.lock /portfolio/Gemfile.lock
RUN bundle install
COPY . /portfolio

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]