
class DataSource

    constructor: ({read, @file, @callback}) ->
        @mapData = {}
        if typeof(read) == "function"
            @read = read
        switch read
            when "image"
                @read = @readImage
            when "file"
                @read = @readFile
            else
                @read = @readLiteral

    # http://stackoverflow.com/questions/934012/get-image-data-in-javascript
    readImage: ->
        img = new Image()
        img.src = @file
        img.onload = =>
            canvas = document.createElement("canvas")
            @mapData.width = canvas.width = img.width
            @mapData.height = canvas.height = img.height
            ctx = canvas.getContext("2d")
            ctx.drawImage( img, 0, 0)
            data = ctx.getImageData(0,0,@mapData.width,@mapData.height).data

            for p,i in data by 4
                row = Math.floor((i/4)/@mapData.width)
                @mapData[row] ?= []
                @mapData[row].push [Number(data[i]).toHex(),Number(data[i+1]).toHex(),Number(data[i+2]).toHex(),Number(data[i+3]).toHex()]

            @callback @mapData

    # untested!
    readFile: ->
        request = new XMLHttpRequest()
        request.onload = ->
            @mapData = JSON.parse request.responseText
            @callback @mapdata
        request.open "GET", @file, true
        request.send()

    readLiteral: ->
        @mapData = @file
        setTimeout =>
            @callback @mapData
        ,100

module.exports = DataSource

