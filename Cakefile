fs     = require 'fs'
{exec} = require 'child_process'

appFiles  = [
  'mapdata'
  'helpers'
  'game'
  'asteroids'
  'map'
  'spaceship'
  'sprite'
  'state'
  'state_intro'
  'state_main'
  'statemanager'
  'timer'
  'vector'
]

task 'build:coffee', 'Build single application file from source files', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "script/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile 'script/js/game.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec 'coffee --compile script/js/game.coffee', (err, stdout, stderr) ->
        throw err if err
        console.log stdout + stderr
        fs.unlink 'script/js/game.coffee', (err) ->
          throw err if err
          console.log 'Done.'

task 'build:sass', 'Compile sass files into css', ->
  exec 'sass stylesheets/main.sass stylesheets/css/main.css', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr