root = ::File.dirname(__FILE__)
require ::File.join( root, 'server' )

ENV["RACK_ENV"] ||= "development"
if ENV["RACK_ENV"] == "development"
  require 'dotenv'
  Dotenv.load
end

run GuessWho.new