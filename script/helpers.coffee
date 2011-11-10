
root = this 

document.stateclass = {}

# http://coffeescriptcookbook.com/chapters/arrays/shuffling-array-elements
Array::shuffle = -> @sort -> 0.5 - Math.random()

Number::toHex = (padding=2) ->
  hex = @toString 16
  while (hex.length < padding) 
    hex = "0" + hex
  return hex