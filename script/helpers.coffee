
root = this 

# http://coffeescriptcookbook.com/chapters/arrays/shuffling-array-elements
Array::shuffle = -> @sort -> 0.5 - Math.random()