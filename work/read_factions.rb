require 'pp'

systems = {}
planets = {}

File.open( 'systems-factions.txt', 'r' ).readlines.each do |line|
  # p line
  # p line.split( /  / ).reject { |c| c.empty? }
  name, faction, data = line.split( /  / ).reject { |c| c.empty? }
  puts "name = #{name}, faction = #{faction}, data = #{data}"

  faction.strip!

  data = data.strip.match( /(\d) (\d)/)
  production = data[1].to_i
  influence = data[2].to_i
  # p production, influence

  planet_data = { name: name, system: faction, production: production, influence: influence }
  planets[ name ] = planet_data

  systems[ faction ] ||= []
  systems[ faction ] << name
end

puts
pp systems
puts
pp planets