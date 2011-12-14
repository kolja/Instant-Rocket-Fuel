fs     = require 'fs'
{exec} = require 'child_process'

libFiles  = [
  'lib/helpers'
  'lib/timer'
  'lib/vector'
  'lib/boundingbox'
  'lib/eventmanager'
  'lib/keyboard'
  'lib/game'
  'lib/map'
  'lib/background'
  'lib/sprite'
  'lib/scene'
  'lib/scenemanager'
  'lib/camera'
]
appFiles = [
  'asteroids'
  'demoscene_bigbackground'
  'demoscene_height'
  'demoscene_iso'
  'demoscene_jumpnrun'
  'demoscene_maze'
  'spaceship'
  'hero'
]

task 'build:coffee', 'Build single application file from source files', ->
  files = libFiles.concat appFiles
  appContents = new Array remaining = files.length
  for file, index in files then do (file, index) ->
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