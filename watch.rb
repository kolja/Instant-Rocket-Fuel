#!/usr/bin/env ruby

require 'directory_watcher'

dw = DirectoryWatcher.new '.'
dw.interval = 1.0
dw.glob = 'script/*.coffee'
dw.reset true
dw.add_observer do |*args| 
  args.each do |event|
    puts "#{Time.now.strftime("%I:%M:%S")} #{event.path} #{event.type}"
    puts `cake build:coffee`
  end
end

dw.start
gets      # when the user hits "enter" the script will terminate
dw.stop
