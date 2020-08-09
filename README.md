# JS_Snake
# code author: Nellie Tobey
![Gif of the snake game. It's a little old english Police box that picks up squares to grow a blue tail. Game is over when the player looses all three lives.](https://github.com/nelliesnoodles/JS_Snake/blob/master/game.gif)

A Vanilla JavaScript snake game.

The game has two scripts.  

## snake.js controls:
  * the hide/show functions of the first displayed layout.
  * the DOM set
     -- the canvas and elements that are hidden or shown on click
  * the button handlers in game (Play, Pause, Exit, directional keys, instructions)
  * the blue border draw for navigation
  
## snake_engine.js controls:
  ### Game mechanics
  * player movement 
  * score
  * life
  * enemy draw
  * all clearing of collided items
  * the game object 
    --items in the game object include locations, score, state ...
    
  * Location class -- for storage of game item locations such as player, food, enemies
  * Collision class -- for detecting when coordinates overlap in a given range 
  
## Notes:
The tail does not collide with any objects currently. 
Next retro game project: PONG
  

