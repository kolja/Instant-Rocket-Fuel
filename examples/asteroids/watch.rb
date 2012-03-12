#!/usr/bin/env ruby

require 'directory_watcher'

cake_cmd = "cake"

dw = DirectoryWatcher.new '.'
dw.interval = 1.0
dw.glob = 'src/**/*.coffee'
dw.reset true
dw.add_observer do |*args|
  args.each do |event|
    puts "#{Time.now.strftime("%I:%M:%S")} #{event.path} #{event.type}"
    begin
      `#{cake_cmd} build`
    rescue Errno::ENOENT => e
      warn "[WARNING] '#{cake_cmd}' not found. Trying 'cake.coffeescript'"
      cake_cmd = "cake.coffeescript"
    end
  end
end

dw.start
gets      # when the user hits "enter" the script will terminate
dw.stop

