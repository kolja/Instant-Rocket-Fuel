# This file is used to determine which class are appended
# to the namespace 'IRF'

classes = [
  "Background"
  "BoundingBox"
  "Camera"
  "EventManager"
  "Game"
  "Keyboard"
  "Map"
  "Scene"
  "SceneManager"

  "Sprite"
  "Shape"
  "Animation"

  "Tile"
  "Timer"
  "Vector"
]

# Namespace where to attack classes
@IRF = {}

# TODO: Get rid of eval(c)
for c in classes
  @IRF[c] = eval(c)

