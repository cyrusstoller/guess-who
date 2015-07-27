root = ::File.dirname(__FILE__)
require ::File.join( root, 'server' )

ENV["RACK_ENV"] ||= "development"

require 'dotenv'
Dotenv.load

unless ENV["RACK_ENV"] == "development"
  realm = ENV["REALM"] || "Walled Garden"

  use Rack::Auth::Basic, realm do |u, p|
    u == ENV["USERNAME"] && p == ENV["PASSWORD"]
  end
end
use Rack::Static, :urls => ["/css", "/img", "/js"], :root => "public"
use Rack::CommonLogger

run GuessWho.new