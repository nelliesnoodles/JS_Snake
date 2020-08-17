// JavaScript source code
// Coded and written by: Nellie Tobey

// game engine for egg
/* ctx and canvas are set in snake.js when user clicks on the small
 * tardis image just above the footer.  Once this is working and deployed,
 * my hope is to reconstruct it in such a way that anyone can use it to build
 * their own, with documentation and plenty of comments to help along the way.
 */


let game = {
    'state': 'off',
    'score': 0,
    'player_image': null,
    'playerH': 30,
    'playerW': 20,
    'user_x': 50,
    'user_y': 50,
    'tail': [],
    'food': [],
    'lives': 3,
    'speed': 20,
    'dirx': 1,
    'diry': 0,
    'player_loc': null,
    'tail_loc': [],
    'food_loc': null,
    'enemy_loc': [],
    'max_tail' : 1,

}

//---- CLASSES ------//

class Collision {
    /*
     * item_x, item_y
     * item2_x, item2_y
     * Check if the coordinates are within range of each other, or collide     *
     */
    constructor(item_x, item_y, item2_x, item2_y) {
        this.item_x = item_x
        this.item_y = item_y
        this.item2_x = item2_x
        this.item2_y = item2_y
    }

    set_range(range_x, range_y) {
        this.range_x = range_x
        this.range_y = range_y
    }

    check_collide_x() {
        /*
         * If the x, y of the class items are within range of each other,
         * return a True for collision detected, False if they are not within range
         */
        var check_x = Math.abs(this.item_x - this.item2_x)

        if (check_x <= this.range_x) {
            return true
        }
        return false
    }

    check_collide_y() {
        var check_y = Math.abs(this.item_y - this.item2_y)
        if (check_y <= this.range_y) {
            return true
        }
        return false

    }
    check_all_xy() {
        let collision_on_x = this.check_collide_x()
        let collision_on_y = this.check_collide_y()
        if (collision_on_x || collision_on_y) {
            return true
        }
        return false
    }
    get_coords() {
        var difference_x = Math.abs(this.item_x - this.item2_x)
        var difference_y = Math.abs(this.item_y - this.item2_y)
        var new_y = this.item_y - difference_y
        var new_x = this.item_x - difference_x
        if (this.item_y <= this.item2_y) {
            new_y = this.item2_y + difference_y
        }
        if (this.item_x <= this.item2_x) {
            new_x = this.item2_x + difference_x
        }
        let coords = [new_x, new_y]
        return coords


    }
}


class Location {
    constructor(height, width, topx, topy) {
        this.height = height
        this.width = width
        this.topx = topx
        this.topy = topy
        this.bottomx = 1
        this.bottomy = 1
        this.onmap = false
    }
    set_bottoms = () => {
        let bottomX = this.topx + this.width
        let bottomY = this.topy + this.height
        this.bottomx = bottomX
        this.bottomy = bottomY
    }
    get_coords = () => {
        return [this.topx, this.topy, this.width, this.height]
    }
    get_clears = () => {
        return [this.topx, this.topy, this.width, this.height]
    }
    set_on = () => {
        this.onmap = true
    }
    set_off = () => {
        this.onmap = false
    }
}



//----------- SETTERS ------------//
function set_enemys() {
    let x1 = Math.round(mycanvas.width/2)- 30
    let x2 = 50
    let x3 = mycanvas.width - 30
    let y3 = mycanvas.height - 40
    let y1 = Math.round(mycanvas.height / 2)
    let y2 = 10
    let h = 30
    let w = 20

    let first_dal = new Location(h, w, x1, y1)
    first_dal.on_map = true
    let second_dal = new Location(h, w, x2, y2)
    second_dal.on_map = true
    let third_dal = new Location(h, w, x3, y3)
    third_dal.on_map = true
    game.enemy_loc.push(first_dal, second_dal, third_dal)

}

function set_x() {
    let max = mycanvas.width -20

    let speed = game.speed
    let dir = game.dirx
    let temp = game.user_x

    let newx = temp + (speed * dir)

    if(newx > max){
        newx = max
    }

    if (newx < 0) {
        game.user_x = 0
    }
    if (game.dirx < 0) {
        max = mycanvas.width
    }
    if (newx > max) {
        newx = max
    }


    if (newx >= 0 && newx <= max) {
        game.user_x = newx
    }

    else {
        game.dirx = 0
    }
}



function set_y() {
    let max = mycanvas.height - 30

    let speed = game.speed
    let dir = game.diry
    let temp = game.user_y
    let newy = temp + (speed * dir)
    if (game.diry < 0) {
        max = mycanvas.height
    }
    if (newy < 0) {
        newy = 0
    }
    if (newy > mycanvas.height) {
        newy = mycanvas.height
    }
    if (newy > 0 && newy < max) {
        game.user_y = newy
    }

    else {
        set_diry(0)
    }

}

function set_dirx(newdirx) {
    game.dirx = newdirx

}

function set_diry(newdiry) {
    game.diry = newdiry
}


//--------  RESET -----------//

function reset() {
    game = {
        'state': 'off',
        'score': 0,
        'player_image': null,
        'playerH': 30,
        'playerW': 20,
        'user_x': 20,
        'user_y': 50,
        'tail': [],
        'food': [],
        'lives': 3,
        'speed': 20,
        'dirx': 1,
        'diry': 0,
        'player_loc': null,
        'tail_loc': [],
        'food_loc': null,
        'enemy_loc': [],
        'max_tail': 1,

    }
    updateScore()
    clearscreen()
    hide_game_over()
    reset_hearts()
}

function off() {
    game.state = 'off'
}

function on() {
    if (game.state == 'off') {
        set_enemys()
    }
    game.state = 'on'
}


function clearscreen() {
    let game_canvas = document.getElementById('snake')
    if (ctx) {
        let upperx = game_canvas.width
        let uppery = game_canvas.height
        ctx.clearRect(0, 0, upperx, uppery)
    }
}

function clearitem(coord_in) {
    let x = coord_in[0]
    let y = coord_in[1]
    let w = coord_in[2]
    let h = coord_in[3]
    //test

    if (ctx) {
        ctx.clearRect(x, y, w, h)
    }
}


//------------ CHECK ----------//

function check_collision(x, y, x2, y2) {
    /* The set range should reflect the speed of the user item
     * I have ten hardcoded in, but if a mechanic to increase speed is added, this may need to
     * be adjusted to reflect the change.
     */

    let collide = new Collision(x, y, x2, y2)
    collide.set_range(10, 15)
    if (collide.check_collide_x() && collide.check_collide_y()) {
        //console.log(`x = ${x}, foodx = ${x2}`, 'collision true')
        //console.log(`y=${y}, foody = ${y2}`, 'collision true')
        return true
    }

    return false

}

//--------- HEARTS ---------//
function lose_life() {
    let hearts = game.lives
    if (hearts == 2) {
        let third = document.getElementById('third')
        third.style.display = 'none'
    }
    if (hearts == 1) {
        let second = document.getElementById('second')
        second.style.display = 'none';
    }
    if (hearts == 0) {
        let first = document.getElementById('first')
        first.style.display = 'none';
        hold(500)
        game_over()

    }
}

function hold(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function reset_hearts() {
    let first = document.getElementById('first')
    let second = document.getElementById('second')
    let third = document.getElementById('third')
    first.style.display = 'flex'
    second.style.display = 'flex'
    third.style.display = 'flex'

}




//-----  FOOD HELPER ----//
function which_xy(loc_x, loc_y) {

    let maxlocx = mycanvas.width
    let maxlocy = mycanvas.height
    let quartx = Math.round(maxlocx / 4)
    let quarty = Math.round(maxlocy / 4)

    let halfx = Math.round(maxlocx / 2)
    let halfy = Math.round(maxlocy / 2)
    let edgex = maxlocx - 40
    let edgey = maxlocy - 40
    let newx = 0
    let newy = 0


    if (loc_x < 20) {
        newx = halfx
    }
    else if (loc_x < halfx) {
        newx = halfx + quartx
    }
    else if (loc_x > edgex) {
        newx = halfx - quartx
    }
    else {
        newx = 10
    }

    if (loc_y < 20) {
        newy = halfy

    }
    else if (loc_y < halfy) {
        newy = halfy - quarty

    }
    else if (loc_y > edgey) {
        newy = halfy + quarty
    }
    else {
        newy = 10
    }

    return [newx, newy]
}

//-------- PLAYER -----//

function create_player(){


    let player = new Image()
    player.src = "tardis4.png"
    let old_coords = null
    let crossPATH = false
    let food_locs = game.food_loc
    let exterminate = false


    if (game.player_loc != null) {
        let obj = game.player_loc
        old_coords = obj.get_clears()
        x1 = old_coords[0]
        y1 = old_coords[1]
        // always clear old player position
        clearitem(old_coords)
        let enemys = game.enemy_loc

        if (enemys.length > 0) {
            for (i in enemys) {
                let dalek = enemys[i]
                let D_coords = dalek.get_coords()
                let DX = D_coords[0]
                let DY = D_coords[1]
                let hit = check_collision(x1, y1, DX, DY)

                if (hit && dalek.on_map) {
                    exterminate = true
                    dalek.on_map = false
                    w = dalek.width
                    h = dalek.height
                    ctx.clearRect(DX, DY, w, h)
                    game.lives -= 1

                    lose_life()
                    game.score -= 100
                    updateScore()

                }
            };
        }





        // if there is a food item, check for collision
        if (food_locs) {
            let food = food_locs.get_coords()

            let x = food[0]
            let y = food[1]
            crossPATH = check_collision(x, y, x1, y1)
            //if there is collision, add to tail length
            //remove food items, empty list
            //add to score
            if (crossPATH == true) {
                game.max_tail += 1
                game.score += 200
                updateScore()
                let oldfood = game.food_loc
                let oldfoodxy = oldfood.get_clears()
                clearitem(oldfoodxy[0], oldfoodxy[1], oldfoodxy[2], oldfoodxy[3])
                game.food_loc = null
                score = true
                //game.speed += 5
            }
        }
    }
    //move player
    update()
    draw_daleks()
    //draw the new player position
    player.onload = () => {


        let w = game.playerW
        let h = game.playerH
        let ux = game.user_x
        let uy = game.user_y
        let player_in = new Location(h, w, ux, uy)

        game.player_loc = player_in
        //console.log(game.player_loc)

        if (ctx) {
            ctx.drawImage(player, ux, uy, w, h)
        }
        else {
            console.log('CTX not found')
        }
        //console.log('player loaded:', ux, uy)
    }

    if (!crossPATH) {

        draw_food()
    }


    if (old_coords) {
        let tails = game.tail_loc
        let max = tails.length
        let gametail = game.max_tail
        let diff = game.speed
        var newx = old_coords[0]
        var newy = old_coords[1]
        var newW = 20
        var newH = 30
        if (game.diry == 0) {
            newW = diff
            newH = 30
        }

        if (game.dirx == 0) {
            newH = diff
            newW = 20
        }

        if (game.diry < 0) {
            newy += 10
        }



        if (game.diry == 0 && game.dirx == 0) {
            if (game.score > 0) {
                game.score -= 100
            }

        }



        var newcoords = [newx, newy, newW, newH]
        if (max == 0) {

            tails.push(newcoords)
        }
        else if (max > 0) {
            if (max < gametail) {
                tails.push(newcoords)
            }
            else {
                let old_tail = tails.shift(0)
                clearitem(old_tail)
                tails.push(newcoords)
            }
        }


        draw_tail()



    }
}


//----------   DALEK ---------------//


function draw_daleks() {
    let enemys = game.enemy_loc
    let dalek = new Image
    dalek.src = 'yellowD.png'

    if (enemys.length > 0) {
        dalek.onload = () => {
            for (i in enemys) {
                let obj = enemys[i]
                let coords = obj.get_coords()
                if (obj.on_map) {

                    ctx.drawImage(dalek, coords[0], coords[1], obj.width, obj.height)
                }
            };

        }

    }

}

function game_over() {
    let end = document.getElementById('game_over')
    end.style.display = "flex"
    clearscreen()
    clearInterval(gameinterval)
}

function hide_game_over() {
    let end = document.getElementById('game_over')
    end.style.display = 'none'

}



//  ---- FOOD ----//

function draw_food() {
    let player = game.player_loc
    let food = game.food_loc
    if (player && !food) {


        let currentcoords = player.get_coords()



        let currentx = currentcoords[0]
        let currenty = currentcoords[1]

        let newloc = which_xy(currentx, currenty)
        let newobj = new Location(10, 10, newloc[0], newloc[1])

        game.food_loc = newobj
        //let lognew = game.food_loc




        ctx.fillStyle = 'green'
        ctx.fillRect(newloc[0], newloc[1], 10, 10)

    }

    else if (player && food != null) {


        let stored_loc = food.get_coords()
        ctx.fillStyle = 'white'
        ctx.fillRect(stored_loc[0], stored_loc[1], 10, 10)



    }
    else {
        let first = new Location(10, 10, 10, 10)
        game.food_loc = first
        ctx.fillStyle = 'white'
        ctx.fillRect(10, 10, 10, 10)


    }

 };

// ---- TAIL -----//
function draw_tail() {
    //let tail = new Image()
    //tail.src = 'dust.png'
    let tail = game.tail_loc
    for (let i = 0; i < tail.length; i++) {
        let coords = tail[i]
        let x = coords[0]
        let y = coords[1]
        let w = coords[2]
        let h = coords[3]

        ctx.fillStyle = 'blue'
        //let mycanvas = document.getElementById('snake')

        ctx.fillRect(x, y, w, h)
    };



    };

function updateScore() {
    let score = document.getElementById('score')
    score.innerHTML = game.score
}

//-----  MOVE -----//
function update() {

    /* These keep the blue user object moving
     * the direction is changed in snake.js with check_key(e)
     * upon hitting the boundaries of the canvas, the directions are set to 0
     * and no movement is made on either or both x and y axis.
     */
    set_x()
    set_y()
    }
