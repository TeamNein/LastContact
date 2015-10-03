Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.force = {x:0.0, y:0.0};

function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'astronaut');
    this.anchor.setTo(0, 0);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowRotation = false; 
    // later can shift world bounds to make the player fall off screen into pits
    this.body.collideWorldBounds = true;
    this.body.gravity.y = 150;

    game.add.existing(this); 

    this.cursors = game.input.keyboard.createCursorKeys();

    wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
}


Player.prototype.update = function() {
    if (wasd.up.isDown) {
        this.y -= 3;
    }
    if (wasd.down.isDown) {
        this.y += 3;
    }
    if (wasd.left.isDown) {
        this.x -= 3;
    }
    if (wasd.right.isDown) {
        this.x += 3;
    }

}