// JavaScript source code for game egg
// Coded and written by: Nellie Tobey
/* This file sets all the necessary items that enable snake_engine.js to work 
 * after the tardis image is clicked by user. Most mechanics of the game are in 
 * the snake_engine.js file.  This is all Vanilla JavaScript.  No imports or 
 * external libraries are needed for either file to work.
 * See snake_engine for more game mechanics functions.
 */

// DOM items:

// divs to hide or show on click:
let game_div;
//items in the game div can not be seen unless egg has been clicked
let expand_game_info;
let timespace;
let blueboxdiv;

// buttons
let play_game;
let pause_game;
let exit_game;

//game elements
let score;

let ctx;
let mycanvas;
let gameinterval;

function set_button_listeners() {
    //set_game_DOM() calls this function.
    //Elements should be set before this is called.
    exit_game.addEventListener('click', EXIT)
    play_game.addEventListener('click', PLAY)
    pause_game.addEventListener('click', PAUSE)
}
function set_game_DOM() {
    game_div = document.getElementById('game_div')
    expand_game_div = document.getElementById('expand_game_div')
    play_game = document.getElementById('play')
    pause_game = document.getElementById('pause')
    exit_game = document.getElementById('exit')
    score = document.getElementById('score')
    // on click of timespace, game_div displays, the moving image div is removed

    timespace = document.getElementById('timespace')
    blueboxdiv = document.getElementById('moving_image')
    mycanvas = document.getElementById('snake')
    ctx = mycanvas.getContext("2d")
   
    set_button_listeners()
}
function show_game() {
    set_game_DOM()
    hideBlueBox()
    hide_footer()
    hide_main()
    hide_nav()
    draw_borders()
    game_div.style.display = 'flex'
}

function hide_nav() {
    let nav = document.getElementById('my_nav')
    nav.style.display = 'none'
}

function show_nav() {
    let nav = document.getElementById('my_nav')
    nav.style.display='flex'
}

function hide_game() {
    game_div.style.display = 'none'

}
function show_instructions() {
    let info = document.getElementById('game_info')
    info.style.display = 'flex';
}
function hide_instructions() {
    let info = document.getElementById('game_info')
    info.style.display = 'none';
}
function hide_footer() {
    let footer = document.getElementById('footer')
    footer.style.display = 'none'
}

function show_footer() {
    let footer = document.getElementById('footer')
    footer.style.display = 'flex'
}

function show_main() {
    let main = document.getElementById('main')
    main.style.display = 'flex'
}

function hide_main() {
    let main = document.getElementById('main')
    main.style.display = 'none'
}

function showBlueBox() {
    blueboxdiv.style.display = 'flex'
}

function hideBlueBox() {
    blueboxdiv.style.display = 'none'
}

function PLAY() {
    //gameinterval = setInterval(game.loop(), 1000)
    try {

        if (game.state == 'off') {
            document.addEventListener('keydown', check_key);
        }
        gameinterval = setInterval(create_player, 1000)
        on()


    }
    catch {
        console.log('something failed in the PLAY().')
    }

}
function PAUSE() {
    game.state = 'waiting'
    clearInterval(gameinterval)
}

function EXIT() {
    clearInterval(gameinterval)
    reset()
    show_nav()
    show_main()
    show_footer()
    hide_game()
    showBlueBox()
}

function set_gameListeners() {
    let element = document.getElementById('timespace')
    element.addEventListener('click', show_game)   
    let info = document.getElementById('expand_game_info')
    info.addEventListener('click', show_instructions)
    let closeinfo = document.getElementById("close_info_box")
    closeinfo.addEventListener('click', hide_instructions)
}


/* BORDERS - Could not eliminate a strange padding created between the coordinates on canvas and 
 * the border of canvas.  Drawing the borders was the fix.
 */
function draw_borders() {
    let border_edge_x = mycanvas.width -9
    let border_edge_y = mycanvas.height - 9
    ctx.lineWidth = 1
    ctx.strokeStyle = 'blue'
    // --- TOP => right corner
    ctx.beginPath();
    ctx.moveTo(9, 9);
    ctx.lineTo(border_edge_x, 9);
    ctx.stroke();
    // --- TOP => bottom left
    ctx.beginPath();
    ctx.moveTo(9, 9);
    ctx.lineTo(9, border_edge_y);
    ctx.stroke();
    //Top right => bottom right
    ctx.beginPath();
    ctx.moveTo(border_edge_x, 9);
    ctx.lineTo(border_edge_x, border_edge_y);
    ctx.stroke();
    //--- bottom left => bottom right
    ctx.beginPath();
    ctx.moveTo(9, border_edge_y);
    ctx.lineTo(border_edge_x, border_edge_y);
    ctx.stroke();
}

function check_key(e) {
    e = e || window.event;

    

    let max_x = mycanvas.width - 30
    let min_x = 30
    let max_y = mycanvas.height - 40
    let min_y = 40
    let user_x = game.user_x
    let user_y = game.user_y
    if (e.code === 'Escape') {
        EXIT()
    }
   
    if (e.code === 'ArrowUp') {
      
        if (user_y > 0) {
            //game.move_player(0, -1)
            set_dirx(0)
            set_diry(-1)
            
        }
    }
    else if (e.code === 'ArrowDown') {
        if (user_y < mycanvas.height) {
            //game.move_player(0, 1)
            set_dirx(0)
            set_diry(1)
            
        }
    }
    else if (e.code === 'ArrowRight') {
        if (user_x < max_x) {
            //game.move_player(1, 0)
            set_dirx(1)
            set_diry(0)
        }
    }
    else if (e.code === 'ArrowLeft') {
        if (user_x > min_x) {
            //game.move_player(-1, 0)
            set_dirx(-1)
            set_diry(0)
        }
    }
    else {
        // does player loose tail if they bump the wall ? score?  
    }


}

window.addEventListener('load', (event) => {
   
    set_gameListeners()
});

