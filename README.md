# JS_Snake
# code author: Nellie Tobey
![Gif of the snake game. It's a little old english Police box that picks up squares to grow a blue tail. Game is over when the player looses all three lives.](https://github.com/nelliesnoodles/JS_Snake/blob/master/game.gif)

A Vanilla JavaScript snake game.

The game has two scripts.  

This game does have a bug I haven't fixed.  It is resolved in the Angular version, but I haven't come back to fix this one yet.  That first 'pellet' of food will get the TARDIS stuck until you move it right, which pushes you into a Dalek.  I'll fix it eventually 'One hopes to herself quietly'. 

When I set about to build this game, it was for an Easter Egg in my portfolio.  I realized after many hours of scrolling to my egg, clicking and waiting, that I could take the bit of code I already had, and build it separately first.  When it was working, mostly properly (Eeeepp!) I added to the django portfolio.  Modifications are necessary for this to work with Django.  Image sources for the player/enemy object must be loaded from the back end, to the front with some trickery.  By adding a <script> in the Django html page, I could declare the images it would send through to the browswer and Javascript could then use them from the front. 

## snake.js controls:
  * the hide/show functions of the first displayed layout.
  * the DOM set
     -- the canvas and elements that are hidden or shown on click
  * the button handlers in game (Play, Pause, Exit, directional keys, instructions)
  * the blue border draw for navigation
  
## snake_engine.js controls:

The player object will move in the first set direction, until the user changes direction with either the arrow keys on the keyboard, or 
the button arrow keys on the mobile screen.  The blue box can move anywhere within the x axis but a border is drawn at the top and bottom to indicate
where the y axis boundaries are.  To grow the tail, the player object must get close enough to a food object (A small white square). The player gains points as the 
tail gets longer, and loses a life, and 100 points every time they collide with a plunger face.   The collision points are determined by the upper right corner of an object currently, so the player can technically pass along the bottom of the yellow bucket head's body without a collision being detected. 
After all, its Time and Relative Dimension in Space, there is room for some wibbly wobbly timey whimey stuff. 
(And I haven't gotten the ceter => center dynamics figured out yet.) 

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

## Message from Nellie:

Feel free to fork the code, and play with making your own.
I made the images on pixelart.com so that they would be the size I wanted and image sizing wouldn't be an issue.  They can size up, but they don't get prettier.  There
are many free resources for game/sprite images.  Take it, break it, have fun.
As always... WHY NOT?
  

