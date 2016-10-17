FROM ruby:2.1.10

# Install Bundler
RUN /bin/bash -l -c "gem install bundler --no-ri --no-rdoc"

# This allows Docker caching on gems for faster image rebuild
WORKDIR /tmp
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN bundle install

RUN mkdir /guess-who
WORKDIR /guess-who
ADD . /guess-who
