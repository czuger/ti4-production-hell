require 'pp'

systems = {}
planets = {}

File.open( 'systems-others.txt', 'r' ).readlines.each do |line|
  # p line
  # p line.split( /  / ).reject { |c| c.empty? }
  name, data = line.split( /  / ).reject { |c| c.empty? }
  # puts "name = #{name}, data = #{data}"

  data = data.split
  faction, type, production, influence, skip = data
  faction.upcase!

  skip = nil if skip =~ /^.$/
  type = nil if type == 'None'

  production = production.to_i
  influence = influence.to_i
  # p production, influence

  planet_data = { name: name, system: faction, production: production, influence: influence, skip: skip, type: type }
  planets[ name ] = planet_data

  systems[ faction ] ||= []
  systems[ faction ] << name
end

puts
pp systems
puts
pp planets