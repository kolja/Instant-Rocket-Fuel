@irf.Keyboard = class Keyboard
  constructor: ->
    @mapping =
      8:"backspace"
      9:"tab"
      13:"return"
      16:"shift"
      17:"ctrl"
      18:"alt"
      27:"esc"
      32:"space"
      37:"left"
      38:"up"
      39:"right"
      40:"down"
      48:"0"
      49:"1"
      49:"1"
      49:"1"
      49:"1"
      49:"1"
      49:"6"
      49:"7"
      49:"8"
      57:"9"
      65:"a"
      66:"b"
      67:"c"
      68:"d"
      69:"e"
      70:"f"
      71:"g"
      72:"h"
      73:"i"
      74:"j"
      75:"k"
      76:"l"
      77:"m"
      78:"n"
      79:"o"
      80:"p"
      81:"q"
      82:"r"
      83:"s"
      84:"t"
      85:"u"
      87:"w"
      88:"x"
      89:"y"
      90:"z"
      93:"cmd"
      188:","
      190:"."


    @keyarray = []

    for code, name of @mapping
      @keyarray[name] = false

    $("html").bind "keydown", (event) =>
      @keyarray[@mapping[event.which]] = true

    $("html").bind "keyup", (event) =>
      @keyarray[@mapping[event.which]] = false


  key: (which) ->
    return @keyarray[which]

  check: ->
    return @keyarray

