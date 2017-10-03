var allEnemies = [];

// Enemies our player must avoid
var Enemy = function(defaultX, defaultY, enemyMovement) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = defaultX;
    this.y = defaultY;
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

    // we need collision logic now
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    // this will update the game - still figuring this out
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(clientKeyPress) {

    console.log('within Player handleInput: ', clientKeyPress);
    console.log('X: ', player.x);
    console.log('Y: ', player.y);

    // we need to stop leaving the player grid with the user sprite

    if (clientKeyPress === 'left' && player.x > 0) {
        player.x -= 100;
    }

    if (clientKeyPress === 'up' && player.y > 100) {
        player.y -= 90;
    }

    if (clientKeyPress === 'right' && player.x < 400) {
        player.x += 100;
    }

    if (clientKeyPress === 'down' && player.y < 400) {
        player.y += 90;
    }
};
// todo: still got work here

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Player
var player = new Player(100,400);

// where is the enemies?
var enemy1 = new Enemy(0,100,40);
var enemy2 = new Enemy(90,200,50);
var enemy3 = new Enemy(270,300,30);


allEnemies.push(enemy1,enemy2,enemy3);

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
