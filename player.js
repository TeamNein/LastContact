Player.prototype = Object.create(Phaser.Sprite.prototype);

Player.prototype.constructor = Player;

Player.prototype.force = {x:0.0, y:0.0};

function Player(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'astronaut');
    // this.anchor.setTo(0, 0); // do we need this?
    game.physics.enable(this, Phaser.Physics.ARCADE);
    
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

    // cycle through walk animations specified in the sprite sheet
    var spriteFPS = 5;
    this.animations.add('left', [0, 1, 2], spriteFPS, true);
    this.animations.add('right', [4, 5, 6], spriteFPS, true);

}

Player.prototype.update = function() {
    player.body.velocity.x = 0;

    // Up and down can be combined with left/right, so keep them
    // separate from the rest to allow diagonal jumps/falls
    if (wasd.up.isDown) { // && this.body.touching.down) {
        this.y += -4;
    } 
    else if (wasd.down.isDown) {
        this.y += 3;
    }

    if (wasd.left.isDown) {
        player.body.velocity.x = -150;
        this.animations.play('left');
    }
    else if (wasd.right.isDown) {
        this.body.velocity.x = 150;
        this.animations.play('right');

    } 
    else {
        //  Stand still
        this.animations.stop();

        this.frame = 3;
    }


}