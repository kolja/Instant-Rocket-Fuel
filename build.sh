#!/usr/bin/env ruby

# Get running cake command
cake_cmd = "cake"
begin
  `#{cake_cmd}`
rescue Errno::ENOENT => e
  cake_cmd = "cake.coffeescript"
  `#{cake_cmd}` rescue raise "Cake not found"
end

puts "[BUILDING] InstantRocketFuel..."
puts `#{cake_cmd} build`

Dir.new("examples").each do |example|
  next if ["..", "."].include?(example)

  puts "[BUILDING] #{example}"
  puts `cd examples/#{example}; #{cake_cmd} build`
end

