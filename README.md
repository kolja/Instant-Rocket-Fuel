# Instant Rocket Fuel

If you want to create a browser game with Coffeescript based on the Canvas element, you will likely need some classes like that provide a game loop, Sprites, Animation and so on.

Have a look at the documentation at <a href="http://kolja.github.io/Instant-Rocket-Fuel/">http://kolja.github.com/Instant-Rocket-Fuel/</a>.

* Game

  To create a game, just inherit from Game and overwrite the *update* and *render* functions.
  Update and render will run in a timebased loop.
  
* Scenemanager

  You can choose to add more than one Scene to your game. 
  Just put them in separate classes and add them to the Scenemanager.
  
* Sprite

  Add Sprites to the Objects in your game and render them to the canvas.
  A Sprite can be instantiated with a Texture. Then you can add Shapes (Static Images) and Animations to it.

* Vector

  to control the movement of the objects in your game, just supply them with a Vector for speed and location.
  There are functions to add, subtract and do all kinds of operations.
