var allEnemies = [];

// Enemies our player must avoid
var Enemy = function(defaultX, defaultY, enemyMovement) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = defaultX;
    this.y = defaultY;

    this.width = 70;
    this.height = 70;

    this.enemyMovement = enemyMovement;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // as stated above
    this.x += this.enemyMovement * dt;

    // need to somehow get enemies looping in this method
    this.x = this.x >= 505 ? 0 : this.x;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getBoundingRect = function() {
    return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x;
    this.y = y;

    this.width = 50;
    this.height = 50;

    this.sprite = 'images/char-boy.png';
};

// checks if the player has reached the pool to win
Player.prototype.checkIfWin = function() {
    return this.y === -10;
};

// 2d Collision detection function, returns true if a collision was detected
Player.prototype.detectCollision = function(rect2) {
    var rect1 = this.getBoundingRect();

    return (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y);

};

// used this function to show a simple "YOU WIN" text in the UI when player is complete
Player.prototype.update = function(dt) {
    if (this.checkIfWin()) {
        document.getElementById("win").innerHTML = 'YOU WIN!!!'
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(clientKeyPress) {

    console.log('within Player handleInput: ', clientKeyPress);
    console.log('X: ', this.x);
    console.log('Y: ', this.y);

    // we need to stop leaving the player grid with the user sprite
    if (clientKeyPress === 'left' && this.x > 0) {
        this.x -= 100;
    }

    if (clientKeyPress === 'up' && this.y > 30) {
        if (this.y < 100) {
            this.y -= 10;
        }
        this.y -= 80;
    }

    if (clientKeyPress === 'right' && this.x < 400) {
        this.x += 100;
    }

    if (clientKeyPress === 'down' && this.y < 400) {
        this.y += 80;
    }
};

Player.prototype.getBoundingRect = function() {
    return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(100,400);

// created this so that I could use this function as well when the game is reset - reset() within engine.js
function startGame() {
    allEnemies = [];

    player = new Player(100,400);

    var enemy1 = new Enemy(0,100,40);
    var enemy2 = new Enemy(90,200,50);
    var enemy3 = new Enemy(270,300,30);

    allEnemies.push(enemy1,enemy2,enemy3);
}

startGame();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
