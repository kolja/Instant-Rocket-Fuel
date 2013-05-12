#
#  vector.coffee
#
#  Created by Kolja Wilcke in October 2011
#  Copyright 2011. All rights reserved.
#
#  The underscore at the end of a method signifies that it operates on itself
#

@irf.Vector = class Vector
  constructor: (x = 0, y = 0) ->
    @x = x
    @y = y

  clone: ->
    new Vector @x, @y

  # Add another Vector
  add: (vec) ->
    new Vector @x + vec.x, @y + vec.y

  add_: (vec) ->
    @x += vec.x
    @y += vec.y

  # Subtract another Vector
  subtract: (vec) ->
    new Vector @x - vec.x, @y - vec.y

  subtract_: (vec) ->
    @x -= vec.x
    @y -= vec.y

  # multiply the vector with a Number
  mult: (num) ->
    new Vector @x * num, @y * num

  mult_: (num) ->
    @x *= num
    @y *= num

  # returns the length of the vector (Betrag)
  length: ->
    Math.sqrt @x*@x + @y*@y

  # return the length squared (for optimisation)
  lengthSquared: ->
    @x*@x + @y*@y

  # returns the normalized vector (Length = 1)
  norm: (factor=1) ->
    if ( @length() > 0 )
      return @mult factor/l
    else
      return null

  norm_: (factor=1) ->
    if ( @length() > 0 )
      return @mult_ factor/l
    else
      return null

  # returns the scalarproduct
  scalarProduct: (vec) ->
    @x * vec.x + @y * vec.y

  sameDirection: (vec) ->
    if (@lengthSquared() < @add(vec).lengthSquared())
      return true
    else
      return false

  # returns the angle it forms with a given vector
  angleWith: (vec) ->
    Math.acos( @scalarProduct( vec ) / @length() * vec.length() )

  # returns the vectorproduct (vector/Kreuzprodukt) -- not yet implemented
  vectorProduct: (vec) ->
    return this

  # returns the component parallel to a given vector
  projectTo: (vec) ->
    vec.mult( @scalarProduct(vec) / vec.lengthSquared() )

  projectTo_: (vec) ->
    m = @scalarProduct(vec) / vec.lengthSquared()
    @x *= m
    @y *= m


  # Class method: checks if two vectors are intersecting - returns intersection point
  @intersecting: (oa, a, ob, b) ->

    c = ob.subtract oa
    b = b.mult -1
    col = []

    col[0] = a.clone()
    col[1] = b.clone()
    col[2] = c.clone()
    l=0; m=1; n=2

    # Multiplicator

    mult = col[0].y / col[0].x

    # Bring Matrix into Triangular shape

    col[0].y = 0
    col[1].y = col[1].y - (mult * col[1].x)
    col[2].y = col[2].y - (mult * col[2].x)

    # Reverse Substitution

    mu = col[n].y / col[m].y
    # lb = (col[n].x - (col[m].x * mu)) / col[l].x #  mu is sufficient so this doesn't need to be done

    return ob.subtract( b.mult(mu) )

  print: ->
    return "(#{@x}, #{@y})"

