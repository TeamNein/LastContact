// Game bounds
var boundsX = 800, boundsY = 600;
var game = new Phaser.Game(boundsX, boundsY, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});

function preload() {
    // Load in the images 
    game.load.image('backdrop', 'starBG.jpg');
    game.load.spritesheet('astronaut', 'astro_sheet.png', 64, 64);
    // game.load.image('enemy', 'enemy.png');
    // game.load.image('teammate', 'teammate.png');
    // game.load.image('button', 'button.png');
    // Template: 
    // game.load.image('', '.png');
}

// Object/group variables
var player;
// var enemy;
// var button;

// Controls
var cursors;

function create() {
    game.physics.enable(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    player = new Player(game, game.world.centerX, game.world.centerY);

    game.camera.follow(player);
}

function update() {

}
