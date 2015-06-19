require 'rubygems'
require 'sinatra/base'
require 'sinatra/content_for'
require 'active_record'

ActiveRecord::Base.establish_connection(
  :adapter  => 'sqlite3',
  :database =>  'data/people.sqlite3.db'
)

connection_handle = ActiveRecord::Base.connection

class People < ActiveRecord::Base
  self.table_name = "people"
end

class GuessWho < Sinatra::Base
  helpers Sinatra::ContentFor

  # base route
  get '/' do
    erb :game
  end

  # logic to get random people
  get '/random.json' do
    content_type :json

    num = 4
    @correct_id = rand(num)
    @people = People.order("random()").limit(num)
    @correct = @people[@correct_id]

    {
      description: @correct.description,
      original_thumbnail: @correct.thumbnail,
      thumbnail: "/img/thumbnail/#{@correct.id}.png",
      web_url: @correct.web_url,
      correct_answer_id: @correct_id.to_i,
      options: @people.map(&:name)
    }.to_json
  end

  after do
    ActiveRecord::Base.connection.close
  end
end
