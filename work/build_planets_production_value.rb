require 'pp'
require 'json'

other_planets = JSON.parse( File.read('other_planets.json') )
factions_planets = JSON.parse( File.read('factions_planets.json') )

other_planets.merge!( factions_planets )

result = {}

other_planets.each do |planet, planet_data|
  result[ planet ] = planet_data[ 'production' ]
end

puts( result.to_json )