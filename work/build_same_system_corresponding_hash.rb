require 'pp'
require 'json'

planet_systems = JSON.parse( File.read('planets_systems.json') )
factions_systems = JSON.parse( File.read('factions_systems.json') )

planet_systems.merge!( factions_systems )

def find_system_from_planet( planet_systems, planet )
  planet_systems.each do |system, planets|
    p system, planets, planet
    puts
    return system if planets.include?( planet )
  end
end

result = {}

planet_systems.values.each do |planets|
  planets.each do |planet|
    system = find_system_from_planet( planet_systems, planet )
    p system
    result[ planet ] = planet_systems[ system ]
  end
end

File.open( 'planets_in_same_system_corresponding_table.json', 'w' ){ |f| f.puts( result.to_json ) }