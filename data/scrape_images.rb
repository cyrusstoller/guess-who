require 'rubygems'
require 'active_record'

require 'fileutils'
require 'open-uri'

ActiveRecord::Base.establish_connection(
  :adapter  => 'sqlite3',
  :database =>  'data/palo_alto.sqlite3.db'
)

class People < ActiveRecord::Base
  self.table_name = "people"
end

def main
	base_image_dir = 'public/img/thumbnail'
	FileUtils::mkdir_p base_image_dir

	People.all.each do |person|
		puts person.name
		filename = File.join(base_image_dir, person.id.to_s + ".png")

		download = open(person.thumbnail)
		IO.copy_stream(download, filename)
	end
end

main